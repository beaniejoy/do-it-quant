from urllib.request import urlopen
from bs4 import BeautifulSoup
from html_table_parser import parser_functions as parser

import datetime
from file_rw import *
import math

import os
import shutil


# 웹에서 필요한 데이터 크롤링 해오는 함수
def crawl(j_code, c_name):
    url = "http://comp.fnguide.com/SVO2/asp/SVD_Main.asp?pGB=1&gicode=A" + str(j_code) +"&cID=&MenuYn=Y&ReportGB=&NewMenuID=101"
    html = urlopen(url)
    bsObj = BeautifulSoup(html, "html.parser")
    # 웹사이트에서 필요한 부분을 가져오는 코드
    div = bsObj.find_all("div", attrs={"id":"div15"})

    # 재무 정보를 제공을 안한 경우 --> [제외]
    if len(div) < 1:
        return "no_info"

    no_data = bsObj.find_all("div", attrs={"id":"divNotData"})
    if len(no_data) > 0:
        no_data = no_data[0].find_all("div", attrs={"class":"um_notdata"})
        if len(no_data) > 0:
            if "재무정보를 제공하지 않습니다." in no_data[0]:
                return "no_info"

    div = div[0]
    # 연결 - 전체 데이터
    table = div.find_all("table", attrs={"class":"us_table_ty1 h_fix zigbg_no"})[0]

    html_table = parser.make2d(table)

    # 예외 처리
    if (len(html_table[0]) != len(html_table[1])):
        if len(html_table[0]) > len(html_table[1]):
            n = len(html_table[0]) - len(html_table[1])
            html_table[0] = html_table[0][:-1*n]
        else:
            n = len(html_table[1]) - len(html_table[0])
            for i in range(n):
                html_table[0].append('Net Quarter')

    # 디버깅용 print ^_^
    print(j_code, c_name)
    df = pd.DataFrame(data=html_table[1:], index=range(0, len(html_table)-1), columns=html_table[0])
    del df['Net Quarter']
    dfl = df.values.tolist()

    # 예외 처리
    if len(dfl) < 1:
        return "no_info"

    for i, date in enumerate(dfl[0]):
        if "(E)" in date:
            dfl[0][i] = date[26:]
            if "(E)" in dfl[0][i]:
                dfl[0][i] = dfl[0][i][:-3]
        if "(P)" in date:
            dfl[0][i] = date[24:]
            if "(P)" in dfl[0][i]:
                dfl[0][i] = dfl[0][i][:-3]

    # null 처리
    for l in dfl[1:]:
        for i in range(len(l)):
            if l[i] == '':
                l[i] = None

    df = pd.DataFrame(data=dfl[1:], index=range(0, len(dfl)-1), columns=dfl[0])
    df.name = c_name

    # 예외 처리: 데이터가 없는 경우..
    if len(dfl[0]) < 2:
        return "no_info"
    if len(dfl) < 2:
        return "no_info"

    return df

# 정보가 있는 가장 최신 정보 리턴
def dataProcess(df, c_code, c_name):

    QuantDataTable = {}
    CompanyDetailTable = {}
    QuantDataTable["cmpName"] = c_name
    QuantDataTable["code"] = c_code
    CompanyDetailTable["code"] = c_code
    CompanyDetailTable["cmpName"] = c_name

    # 2020-07-16: 이제 아무 정보 없어도 null 넣어서 리턴
    # QuantDataTable
    q_item = ['cmpName', 'code', 'debtRatio', 'reserveRatio', 'operatingProfitRatio', 'roa', 'roe', 'per', 'pbr']
    for item in q_item:
        if item not in QuantDataTable.keys():
            QuantDataTable[item] = None
    # CompanyDetailTable
    c_item = ['code', 'cmpName', 'totalAsset', 'totalEquity', 'totalDebt', 'sales', 'operatingProfit', 'netIncome']
    for item in c_item:
        if item not in CompanyDetailTable.keys():
            CompanyDetailTable[item] = None

    # 크롤링 데이터 없으면 바로 리턴
    if type(df) == type("no_info"):
        return QuantDataTable, CompanyDetailTable, -1

    tmp = df[df.columns[0]]

    # 정보가 있는 가장 최신 날짜 찾기
    flag = False
    for i in range(len(df.columns)-1, 0, -1):
        thisColumn = df.columns[i]
        for item in df[thisColumn]:
            if type(item) != type(None):
                flag = True
                break
        if flag:
            break

    # 데이터가 없으면 바로 리턴 (예외 처리)
    if not flag:
        return QuantDataTable, CompanyDetailTable, -1

    for i in range(len(df[thisColumn])):
        # 데이터 타입 처리
        if type(df[thisColumn][i]) != type(None):
            if df[thisColumn][i] == "완전잠식":
                df[thisColumn][i] = None
            elif "N/A" in df[thisColumn][i]:
                df[thisColumn][i] = None
            elif type(df[thisColumn][i]) == type("string"):
                if ',' in df[thisColumn][i]:
                    df[thisColumn][i] = df[thisColumn][i].replace(',', '')
                df[thisColumn][i] = float(df[thisColumn][i])

        # QuantDataTable
        if 'PER' in tmp[i]:
            QuantDataTable['per'] = df[thisColumn][i]
        elif 'PBR' in tmp[i]:
            QuantDataTable['pbr'] = df[thisColumn][i]
        elif 'ROA' in tmp[i]:
            QuantDataTable['roa'] = df[thisColumn][i]
        elif 'ROE' in tmp[i]:
            QuantDataTable['roe'] = df[thisColumn][i]
        elif '부채비율' in tmp[i]:
            QuantDataTable['debtRatio'] = df[thisColumn][i]
        elif '영업이익률' in tmp[i]:
            QuantDataTable['operatingProfitRatio'] = df[thisColumn][i]
        elif '유보율' in tmp[i]:
            QuantDataTable['reserveRatio'] = df[thisColumn][i]

        # CompanyDetailTable
        # 종가는 매일 갱신
        elif tmp[i] == '자산총계':
            CompanyDetailTable['totalAsset'] = df[thisColumn][i]
        elif tmp[i] == '자본총계':
            CompanyDetailTable['totalEquity'] = df[thisColumn][i]
        elif tmp[i] == '부채총계':
            CompanyDetailTable['totalDebt'] = df[thisColumn][i]
        elif tmp[i] == '매출액':
            CompanyDetailTable['sales'] = df[thisColumn][i]
        elif tmp[i] == '영업이익':
            CompanyDetailTable['operatingProfit'] = df[thisColumn][i]
        # 2020-07-20 오타로 인한 null 수정
        elif tmp[i] == '당기순이익':
            CompanyDetailTable['netIncome'] = df[thisColumn][i]

    return QuantDataTable, CompanyDetailTable, 1


# 이익 잉여금
def crawl2(c_code):

    url = "http://comp.fnguide.com/SVO2/asp/SVD_Finance.asp?pGB=1&gicode=A" + str(c_code) + "&cID=&MenuYn=Y&ReportGB=&NewMenuID=103&stkGb=701"
    html = urlopen(url)
    bsObj = BeautifulSoup(html, "html.parser")

    tables = bsObj.find_all("table", attrs={"class":"us_table_ty1 h_fix zigbg_no"})

    if len(tables) < 3:
        return None

    table = tables[2]
    html_table = parser.make2d(table)
    flag = True
    cnt = 0
    for row in html_table:
        if "이익잉여금" in row[0]:
            flag = False
            ri = cnt - 1
        # null 처리
        for i in range(len(row)):
            if row[i] == '':
                row[i] = None
        cnt += 1
    # 이익잉여금 정보 없으면 return
    if flag:
        return None

    df = pd.DataFrame(data=html_table[1:], index=range(0, len(html_table)-1), columns=html_table[0])
    d = df.columns[len(df.columns)-1]

    if df[d].iloc[ri] == None:
        return None
    # float 형식으로 변환
    df[d].iloc[ri] = str(df[d].iloc[ri])
    if ',' in str(df[d].iloc[ri]):
        df[d].iloc[ri] = df[d].iloc[ri].replace(',', '')
    return float(df[d].iloc[ri])


def setTime():
    now = datetime.datetime.now()
    nowDate = now.strftime('%Y_%m_%d')
    nds = str(nowDate)
    nds += '_'
    nds_l = nds.split('_')
    y = int(nds_l[0])
    m = int(nds_l[1])
    if 3 < m <= 12:
        fds = str(y) + '_03'
    else:
        fds = str(y - 1) + '_12'

    return str(nds), str(fds)



jongmok_code = ExcelRead("./data/sangjang_jongmokCode.xlsx")
QTable = []
CTable = []
# no_info = []

nds, fds = setTime()

# # 문제 되는 기업 찾고 여기서 체크!
# c_name = "NH프라임리츠"
# c_code = "338100"
# crawl(c_code, c_name)

''' Main 구동은 아래부터!! '''
for i in jongmok_code.index:
  c_name = jongmok_code.iloc[i]["회사명"]
  c_code = str(jongmok_code.iloc[i]["종목코드"])
  market = jongmok_code.iloc[i]["업종"]
  desc = jongmok_code.iloc[i]["주요제품"]

  # 종목코드 처리
  if len(c_code) < 6:
      ii = 6 - len(c_code)
      c_code = '0' * ii + str(c_code)

  # 일반 재무데이터
  df = crawl(c_code, c_name)
  # 2020-07-16:
  # 아무 정보 없는 기업도 null 만 넣은 후 업데이트
  # if type(df) == type("no_info"):
      # no_info.append(c_name)
  # else:
  Qdata, Cdata, data_status = dataProcess(df, c_code, c_name)
  # if type(Qdata) == type("no_info"):
  #     no_info.append(c_name)
  # 2020-07-20 NaN 처리
  if type(desc) != type('str'):
      if math.isnan(desc):
          desc = None
  Cdata["description"] = desc
  Cdata["market"] = market
  # 정보가 없을 경우
  if data_status < 0:
      Cdata["retainedEarnings"] = None
  else:
      retainedEarnings = crawl2(c_code)
      Cdata["retainedEarnings"] = retainedEarnings

  QTable.append(Qdata)
  CTable.append(Cdata)


# no_info = set(no_info)
# no_info = list(no_info)

fn1 = './data/' + str(fds) + '/QuantDataTable.json'
fn2 = './data/' + str(fds) + '/CompanyDetailTable.json'
# fn3 = './data/' + str(fds) + '/no_info.json'

dn = './data/' + str(fds)
if os.path.isdir(dn):
    shutil.rmtree(dn)
os.mkdir(dn)

#json 파일로 저장
JsonWrite(fn1, QTable)
JsonWrite(fn2, CTable)
# JsonWrite(fn3, no_info)

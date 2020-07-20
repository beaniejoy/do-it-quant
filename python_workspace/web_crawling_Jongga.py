from urllib.request import urlopen
from bs4 import BeautifulSoup
from html_table_parser import parser_functions as parser

import datetime
# 파일 입출력 담당
from file_rw import *

import os
# delete directory and files at once
import shutil

# 네이버 금융으로 url 변경
def crawl(c_code):

    # url = "http://www.thinkpool.com/itemanal/i/chart.jsp?code="
    url = "https://finance.naver.com/item/main.nhn?code="
    url += str(c_code)
    html = urlopen(url)
    bsObj = BeautifulSoup(html, "html.parser")

    ps = bsObj.find_all("p", attrs={"class":"no_today"})

    if len(ps) < 1:
        return None

    p = ps[0]
    em = p.find_all("em", attrs={"class":"X"})
    if len(em) < 1:
        em = p.find_all("em", attrs={"class":"no_up"})
    if len(em) < 1:
        em = p.find_all("em", attrs={"class":"no_down"})
    # 정보 없는 경우
    if len(em) < 1:
        return None

    em = em[0]
    res = em.find_all("span", attrs={"class":"blind"})

    if len(res) < 1:
        return None

    # float로 처리
    res = res[0].text
    if ',' in res:
        res = res.replace(',', '')
    res = float(res)

    return res


jongmok_code = ExcelRead("./data/sangjang_jongmokCode.xlsx")
jongga_data = {}
# 2020-07-16 이제 종가 데이터 없더라도 null로 올려서 보관
# no_jongga = []

for i in jongmok_code.index:
    c_name = jongmok_code.iloc[i]["회사명"]
    jongga_data[c_name] = {}
    c_code = str(jongmok_code.iloc[i]["종목코드"])
    if len(c_code) < 6:
        ii = 6 - len(c_code)
        c_code = '0' * ii + str(c_code)
    jongga = crawl(c_code)
    jongga_data[c_name]["code"] = c_code
    jongga_data[c_name]["endPrice"] = jongga
    # 디버깅용 ^^
    print(c_code, c_name, jongga)

# 2020-07-15 : 테이블 형태 바뀜
result = []
for k in jongga_data:
    result.append(jongga_data[k])

now = datetime.datetime.now()
nowDate = now.strftime('%Y_%m_%d')
nds = str(nowDate)

fn1 = './data/' + str(nds) + '/dailyUpdateData.json'
# fn2 = './data/' + str(nds) + '/no_jongga.json'

dn = './data/' + str(nds)
if os.path.isdir(dn):
    shutil.rmtree(dn)
os.mkdir(dn)

#json 파일로 저장
JsonWrite(fn1, result)
# JsonWrite(fn2, no_jongga)

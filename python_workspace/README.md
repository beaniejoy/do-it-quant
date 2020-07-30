# Do IT Quant

### DIQ

📈 본 문서는 KB데이타시스템 연수원 프로젝트에서 데이터를 처리하기 위한 문서이며, 상장된 법인의 재무 정보를 크롤링해서 가공한 뒤 저장하는 코드입니다.

> 프로젝트를 성공적으로 마무리할 수 있기를 기원합니다!

### 개요

데이터 크롤링을 하는 스크립트는 python_workspace 디렉토리에 다음과 같은 형태로 구성되어 있습니다:

```bash
python_workspace
├── README.md
├── __pycache__
│   └── file_rw.cpython-37.pyc
├── data
│   ├── 2020_03
│   │   ├── CompanyDetailTable.json
│   │   └── QuantDataTable.json
│   ├── 2020_07_20
│   │   └── dailyUpdateData.json
│   ├── final_data
│   │   └── 2020_07_20
│   │       ├── CompanyDetailTable.json
│   │       ├── QuantDataTable.json
│   │       └── dailyUpdateData.json
│   └── sangjang_jongmokCode.xlsx
├── file_rw.py
├── final.py
├── logo
│   ├── 000020.jpg
│   ├── 000390.jpg
│   ├── 000400.jpg
│   ├── 000430.jpg
│   ├── 000720.jpg
│   ├── 000810.jpg
~~~~~~~~~~~~~~~~~~~~~~~
│   └── 353200.jpg
├── merge.py
├── web_crawling_Jongga.py
├── web_crawling_general.py
└── web_crawling_logo.py
```

❗️data 안의 sangjang_jongmokCode.xlsx 는  (https://kind.krx.co.kr/corpgeneral/corpList.do?method=loadInitPage) 한국 거래소에서 제공하는 데이터를 다운로드 받았습니다.

💡실행 순서는 다음과 같습니다:

1. ./web_crawling_Jongga.py (월요일부터 금요일까지 매일 5시에 실행)
2. ./web_crawling_general.py (6개월에 한 번씩 실행)
3. ./final.py (월요일부터 금요일까지 매일 7시에 실행)
4. ./web_crawling_logo.py (1번만 실행 - ui용 로고 크롤링)

- **web_crawling_Jongga.py**

    ./web_crawling_Jongga.py 파일을 매일 오후 5시에 실행하면, 네이버 증권 페이지에서 그날의 종가를 가져와 ./data 디렉토리에 <년-월-일(오늘 날짜)> 디렉토리를 만듭니다. 그 후 만든 디렉토리 안에 종가 데이터를 dailyUpdateData.json 으로, ~~종가가 없는 기업의 이름 리스트를 no_jongga.json으로 저장합니다.~~ 이제 종가 데이터가 없어도 null을 넣어 저장합니다.

- **web_crawling_general.py**

    ./web_crawling_general.py 파일을 6개월에 한 번 실행하면 기업가이드 페이지에서 기업의 재무 데이터를 가져와 ./data 디렉토리에 <년-월(해당 날짜)> 디렉토리를 만들고 그 안에 재무 데이터 중 quant 페이지의 필수 정보를 QuantDataTable.json으로, 기업 상세 정보는 CompanyDetailTable.json으로, ~~재무 데이터가 없는 기업 이름 리스트는 no_info.json으로 저장합니다~~. 재무데이터가 없는 기업도 한국 거래소에서 제공하는 종목코드, 업종, 상세 설명만 넣고 나머지엔 null만 넣어 저장합니다.

- ~~merge.py~~

    ~~./merge.py 파일 → 테이블 분리 전 사용하던 파일. 종가는 매일 긁어와야 하므로 서버에 부담이 되어 테이블을 분리 했습니다. 현재 주석 처리한 스크립트~~

- **final.py**

    ./final.py 파일을 매일 오후 7시에 실행하면, ./data/final_data 디렉토리 안에 <년-월-일(오늘 날짜)> 디렉토리를 만들고 이 안에 위에서 만든 파일을 복사해서 저장해 둡니다. 서버가 데이터를 가져가기 편하도록 만들어 놓은 스크립트 입니다.

- **web_crawling_logo.py**

    (2020.07.22 ui에 로고를 넣어야 해서 추가) [https://www.jobplanet.co.kr/companies/?page=](https://www.jobplanet.co.kr/companies/?page=)<페이지 번호> 사이트에서 크롤링 해왔습니다.

    ❗️http 403 forbidden 에러(크롤링 차단 에러 해결법) 

    : 하단 링크 참조!

    - 이미지 다운: [http://blog.daum.net/hwangkiha/7069171](http://blog.daum.net/hwangkiha/7069171)
    - urlopen: [https://m.blog.naver.com/PostView.nhn?blogId=ksh60706&logNo=221173154419&proxyReferer=https:%2F%2Fwww.google.com%2F](https://m.blog.naver.com/PostView.nhn?blogId=ksh60706&logNo=221173154419&proxyReferer=https:%2F%2Fwww.google.com%2F)

### 📝 file_rw.py

이 스크립트는 파일 입출력을 할 때 깔끔하게 처리하기 위해 존재합니다. (사실 별 기능을 하지 않고 있기 때문에 제거하고 입출력 하는 부분은 파이썬에서 기본적으로 제공하는 함수로 대체하여 사용해도 무방합니다.)

- 기능
    - JsonWrite(fn, data):

        fn 경로에 data를 json 형식으로 저장합니다.

    - JsonRead(fn):

        fn 경로에 있는 json 파일을 읽어옵니다.

    - ExcelRead(fn):

        fn 경로에 있는 엑셀 파일을 읽어옵니다.

### 🌐 web_crawling_Jongga.py

web_crawling_Jongga.py 스크립트를 실행하면 "./data/오늘날짜" 폴더에 오늘 자 종가 데이터를 웹에서 가져와 dailyUpdateData.json 파일로 저장합니다. (원래 jongga.json이었음.. 그 흔적이 스크립트 이름에 남아 있다 😂) 

~~종가 데이터를 제공하지 않는 종목에 관해서는 따로 리스트에 저장하여 no_jongga.json 파일로 저장합니다. (사실 별로 중요하지 않은 파일이라 추후에 이 부분은 제거할까 합니다.)~~ 현재 제거

- 필요 모듈:
    - **urllib.request:** url을 통해 요청 --> http 요청 가능 모듈 필요
    - **BeautifulSoup:** beautifulsoup4 패키지 사용
    - **html_table_parser:** html_table_parser 패키지 사용
- 코드 설명

    ```python
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
    ```

    종가 데이터는 https://finance.naver.com/item/main.nhn?code=<기업코드> 네이버 금융에서 크롤링해왔습니다.

    urlopen 함수를 사용하여 원하는 주소로부터 웹페이지를 가져온 후, BeautifulSoup 객체로 변환합니다.

    이 객체에서 html_table_parser을 사용해서 파싱한 후 필요한 데이터만을 가져와 리턴합니다.

    ```python
    jongmok_code = ExcelRead("./data/sangjang_jongmokCode.xlsx")
    ```

    한국에서 상장된 기업들의 기업, 종목코드, 업종 등을 나타내는 데이터 입니다.

    이 데이터는 [http://comp.fnguide.com/SVO2/ASP/SVD_UJRank.asp?pGB=1&gicode=A005930&cID=&MenuYn=Y&ReportGB=&NewMenuID=301&stkGb=701](http://comp.fnguide.com/SVO2/ASP/SVD_UJRank.asp?pGB=1&gicode=A005930&cID=&MenuYn=Y&ReportGB=&NewMenuID=301&stkGb=701) 에서 다운로드 받아서 사용했습니다.

    (업종별 순위[MKF500 | 연결 | 전체 | 최근결산월기준])

    xls 파일로 제공하기 때문에 편의를 위해 xlsx 파일로 변환한 후 python의 xlrd 라이브러리를 사용해서 파싱했습니다.

    이 데이터에서 크롤링할 기업 정보(기업 이름, 기업 코드)를 가져와 사용합니다.

    ```python
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
    ```

    크롤링 해온 정보를 jongga_data dictionary로 저장합니다.

    ```python
    # 2020-07-15 : 테이블 형태 바뀜
    result = []
    for k in jongga_data:
        result.append(jongga_data[k])
    ```

    DB의 테이블 형태를 바꿨기 때문에 편의를 위해 데이터를 다시 가공했습니다.

    ```python
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
    ```

    가공한 데이터를 오늘자 날짜 디렉토리 안에 dailyUpdateData.json으로 저장합니다.

cron을 사용하면 이 스크립트를 원하는 시간에 자동으로 반복적으로 실행시킬 수 있습니다.

다음 명령어를 터미널에서 crontab -e를 치면 열리는 스크립트에 저장해 놓으면 월요일부터 금요일까지 매일 17시에 스크립트를 실행합니다.

```bash
0 17 * * 1-5 python [python_workspace까지의 경로!]/python_workspace/web_crawling_Jongga.py
```

📝 설명이 잘 나와 있는 사이트를 첨부합니다. 

- [https://zetawiki.com/wiki/리눅스_반복_예약작업_cron,_crond,_crontab](https://zetawiki.com/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4_%EB%B0%98%EB%B3%B5_%EC%98%88%EC%95%BD%EC%9E%91%EC%97%85_cron,_crond,_crontab)

### 🌐 web_crawling_general.py

web_crawling_general.py 스크립트를 실행하면 "./data_/해당 날짜" 폴더에 필요한 기업 재무 데이터를 웹에서 가져와 QuantDataTable.json과 CompanyDetailTable.json으로 저장합니다. 

~~재무 데이터를 제공하지 않는 종목에 관해서는 따로 리스트에 저장하여 no_info.json 파일로 저장합니다.~~  현재 제거

- 필요 모듈:

    web_crawling_Jongga.y 에 쓰인 패키지와 동일합니다.

- 코드 설명:

    ```python
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
    ```

    웹에서 필요한 데이터를 크롤링 해오는 함수입니다.

    데이터는 [http://comp.fnguide.com/SVO2/asp/SVD_Main.asp?pGB=1&gicode=A](http://comp.fnguide.com/SVO2/asp/SVD_Main.asp?pGB=1&gicode=A)<기업코드>&cID=&MenuYn=Y&ReportGB=&NewMenuID=101 사이트에서 크롤링 해왔습니다.

    ```python
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
    ```

    이익잉여금 데이터는 위의 crawl 함수의 url에서 제공하지 않기 때문에 따로 다른 url에서 가져왔습니다. 

    해당 정보는 [http://comp.fnguide.com/SVO2/asp/SVD_Finance.asp?pGB=1&gicode=A<기업코드>&cID=&MenuYn=Y&ReportGB=&NewMenuID=103&stkGb=701](http://comp.fnguide.com/SVO2/asp/SVD_Finance.asp?pGB=1&gicode=A<기업코드>&cID=&MenuYn=Y&ReportGB=&NewMenuID=103&stkGb=701) 에서 크롤링해왔습니다.

    ```python
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
            elif tmp[i] == '당기손이익':
                CompanyDetailTable['netIncome'] = df[thisColumn][i]

        return QuantDataTable, CompanyDetailTable, 1
    ```

    crawl, crawl2에서 가져온 정보를 서버에서 필요로 하는 형태로 가공하는 함수입니다.  (필요한 데이터 형식이 바뀌어 대규모 공사를 했습니다! 🤯) 

    테이블 두개와 데이터 상태를 리턴합니다. 데이터 상태가 -1이면 대부분의 데이터가 null 값이라는 뜻입니다.

    ```python
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
    ```

    파일/디렉토리 이름 세팅용 함수입니다.

    general 데이터는 현재 날짜의 데이터를 가져오는 것이 아니라 주기적으로 3월 12월 등의 날짜에 업데이트 되므로 날짜를  조금 변경해서 세팅합니다.

    ```python
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
    ```

    이제 위에서 만든 함수를 사용하여 실제로 데이터를 받아온 후,

    ```python
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
    ```

    가공한 데이터를 해당 날짜/맞는 파일 이름으로 저장합니다

다음 명령어를 터미널에서 crontab -e를 치면 열리는 스크립트에 저장해 놓으면 6개월에 한번  18시에 스크립트를 실행합니다.

```bash
0 18 1 6 * python [python_workspace까지의 경로!]/python_workspace/web_crawling_general.py
```

### 🌐 web_crawling_logo.py

web_crawling_logo.py 스크립트를 실행하면 "./logo" 폴더에 필요한 기업 로고를 종목코드 + jpg 로 저장합니다. 

- 필요 모듈

    web_crawling_Jongga.py에서 사용된 모듈과 동일합니다.

- 코드 설명

    ```python
    jongmok_code = pd.read_excel("./data/sangjang_jongmokCode.xlsx")

    cpMap = {}
      for i in jc.index:
          c_name = jc.iloc[i]["회사명"]
          c_code = str(jc.iloc[i]["종목코드"])
          if len(c_code) != 6:
              n = 6 - len(c_code)
              c_code = '0' * n + c_code
          cpMap[c_name] = c_code
    ```

    다시 한 번 엑셀에서 상장된 기업의 정보를 가져와서 사용하기 쉽게 회사명 - 종목코드 명으로 맵핑 해두는 코드입니다. 이렇게 맵핑해둔 이유는 1. 잡플래닛 사이트에 기업로고가 잘 모아져 있어 이 사이트를 사용했는데, 이 사이트에 올라온 기업의 수가 너무 많고 상장이 안된 기업도 포함하고 있었기 때문에 필요 없는 기업을 거르기 위해. 2. 파일 이름을 한글(기업이름)로 하지 않기 위해서 입니다.

    ```python
    	cnt = 0
      # 총 1529 개의 페이지가 있음...!
      for i in range(1, 1530):
          url = "https://www.jobplanet.co.kr/companies/?page="
          url += str(i)
          '''
          issue!: HTTP 403: 서버에서 사람이 아닌 자동으로 내용을 읽는 Spider/Bot 으로 판단하여 차단시켜버린 것
          참고 웹사이트 : https://m.blog.naver.com/PostView.nhn?blogId=ksh60706&logNo=221173154419&proxyReferer=https:%2F%2Fwww.google.com%2F
          '''
          reqUrl = req.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
          html = req.urlopen(reqUrl).read()
          # html = urlopen(url)
          bsObj = BeautifulSoup(html, "html.parser")
          sections = bsObj.find_all("section", attrs={"class":"company content_ty3"})

          for section in sections:
              imgUrl = section.find("img")["src"]
              imgAlt = section.find("img")["alt"]
              imgAlt = imgAlt.strip()
              if "(주)" in imgAlt:
                  imgAlt = imgAlt[:-3]
              if imgAlt not in cpMap.keys():
                  continue
              fn = cpMap[imgAlt]
              opener = req.build_opener()
              opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
              req.install_opener(opener)
              req.urlretrieve(imgUrl, './logo/' + fn + '.jpg')
              cnt += 1

          # 페이지 다 볼 필요 없고 다 찾으면 리턴!
          if cnt >= len(cpMap):
              break

          # 디버깅용 ^^
          print("page: ", i)
          print("img find: ", cnt)
    ```

    이제 잡플래닛 사이트에서 기업 로고를 받아오는 부분입니다. 

    지금까지의 사이트들과는 다르게 잡플래닛 사이트에서는 크롤러를 차단해놔 http `html = urlopen(url)` 을 바로 사용할 수 없었습니다. 

    그래서 request 작업을 할 때 `reqUrl = req.Request(url, headers={'User-Agent': 'Mozilla/5.0'})` 이렇게 header를 설정하여 User-Agent를 지정해주면 잘 실행됩니다.

    이미지를 가져와 저장하는 부분도 비슷하게 처리를 해주면 잘 실행됩니다.

    http 403 에러가 발생하여 유저 에이전트를 헤더에 추가하는 부분만 제외하면 지금 까지의 방식과 유사하므로 추가적인 설명은 생략합니다.

### 🙏🏻 ~~merge.py~~

[~~merge.py](http://merge.py) 스크립트를 실행하면 ./data/final/오늘날짜 디렉토리에 CompanyDetailTable.json, QuantDataTable.json, no_info데이터를 저장합니다.~~ 

~~종가 데이터는 매일 갱신되고 나머지 데이터는 6개월에 한 번씩 갱신되므로 따로 실행시켜 매일 다시 합쳐서 오늘자 날짜로 디렉토리에 저장해놓습니다.~~

~~단순히 데이터를 합쳐서 저장해놓는 코드이므로 코드 설명은 생략하겠습니다.~~

~~다음 명령어를 터미널에서 crontab -e를 치면 열리는 스크립트에 저장해 놓으면 월요일부터 금요일까지 매일 17시에 스크립트를 실행합니다.~~

```bash
# 0 18 * * 1-5 python [python_workspace까지의 경로!]/python_workspace/merge.py
```

### 🙏🏻 final.py

[final.py](http://final.py) 스크립트를 실행하면 ./data/final/오늘날짜 디렉토리에 CompanyDetailTable.json, QuantDataTable.json, dailyUpdateTable.json 파일을 복사합니다.

단순히 서버에서 데이터 취합해서 사용하기 편한 상태로 만들어 놓는 스크립트이므로 코드 설명은 생략하겠습니다.

다음 명령어를 터미널에서 crontab -e를 치면 열리는 스크립트에 저장해 놓으면 월요일부터 금요일까지 매일 19시에 스크립트를 실행합니다.

```bash
0 19 * * 1-5 python [python_workspace까지의 경로!]/python_workspace/final.py
```
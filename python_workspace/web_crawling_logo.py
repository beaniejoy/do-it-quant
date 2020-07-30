from urllib.request import urlopen
import urllib.request as req
from bs4 import BeautifulSoup
from html_table_parser import parser_functions as parser

import pandas as pd

def crawl_url(jc):

  cpMap = {}
  for i in jc.index:
      c_name = jc.iloc[i]["회사명"]
      c_code = str(jc.iloc[i]["종목코드"])
      if len(c_code) != 6:
          n = 6 - len(c_code)
          c_code = '0' * n + c_code
      cpMap[c_name] = c_code

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
          req.urlretrieve(imgUrl, '/home/ec2-user/app/diq/data/logo/' + fn + '.jpg')
          cnt += 1

      # 페이지 다 볼 필요 없고 다 찾으면 리턴!
      if cnt >= len(cpMap):
          break

      # 디버깅용 ^^
      print("page: ", i)
      print("img find: ", cnt)

jongmok_code = pd.read_excel("/home/ec2-user/app/diq/data/sangjang_jongmokCode.xlsx")

crawl_url(jongmok_code)

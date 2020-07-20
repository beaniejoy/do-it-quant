# import json
#
# import os
# import shutil
#
# from file_rw import *
# import datetime
#
# def setTime():
#     now = datetime.datetime.now()
#     nowDate = now.strftime('%Y_%m_%d')
#     nds = str(nowDate)
#
#     # 테스트 이후 실제 쓰일 코드
#     nds_l = nds.split('_')
#     y = int(nds_l[0])
#     m = int(nds_l[1])
#     if 3 < m <= 12:
#         tds = str(y) + '_03'
#     else:
#         tds = str(y - 1) + '/12'
#
#     return str(nds), str(tds)
#
#     return str(nds), str(nds+'_')
#
# d1, d2 = setTime()
#
# fn1 = "./data/" + d1 + "/jongga.json"
#
# fn2 = "./data/" + d2 + "/CompanyDetailTable.json"
# fn3 = "./data/" + d2 + "/QuantDataTable.json"
# fn4 = "./data/" + d2 + "/no_info.json"
#
# endPriceData = JsonRead(fn1)
# CData = JsonRead(fn2)
#
# for c_data in CData:
#     c_name = c_data["name"]
#     if c_name in endPriceData.keys():
#         c_data["endPrice"] = float(endPriceData[c_name]["endPrice"])
#     else:
#         c_data["endPrice"] = None
#
# dirN = "./data/final_data/" + str(d1)
# if os.path.isdir(dirN):
#     shutil.rmtree(dirN)
# os.mkdir(dirN)
#
# fileN = dirN + "/CompanyDetailTable.json"
#
# #json 파일로 저장
# JsonWrite(fileN, CData)
# # 나머지 파일은 그냥 복사!
# shutil.copy(fn3, dirN)
# shutil.copy(fn4, dirN)

import json

import os
import shutil

from file_rw import *
import datetime

def setTime():
    now = datetime.datetime.now()
    nowDate = now.strftime('%Y_%m_%d')
    nds = str(nowDate)

    nds_l = nds.split('_')
    y = int(nds_l[0])
    m = int(nds_l[1])
    if 3 < m <= 12:
        tds = str(y) + '_03'
    else:
        tds = str(y - 1) + '_12'

    return str(nds), str(tds)


d1, d2 = setTime()

fn1 = "./data/" + d1 + "/dailyUpdateData.json"

fn2 = "./data/" + d2 + "/CompanyDetailTable.json"
fn3 = "./data/" + d2 + "/QuantDataTable.json"
# fn4 = "./data/" + d2 + "/no_info.json"

endPriceData = JsonRead(fn1)
CData = JsonRead(fn2)

# 2020-07-15 이제 안 합치고 따로 저장
# for c_data in CData:
#     c_name = c_data["name"]
#     if c_name in endPriceData.keys():
#         c_data["endPrice"] = float(endPriceData[c_name]["endPrice"])
#     else:
#         c_data["endPrice"] = None

dirN = "./data/final_data/" + str(d1)
if os.path.isdir(dirN):
    shutil.rmtree(dirN)
os.mkdir(dirN)

# fileN = dirN + "/CompanyDetailTable.json"
# #json 파일로 저장
# JsonWrite(fileN, CData)

# 나머지 파일은 그냥 복사!
shutil.copy(fn1, dirN)
shutil.copy(fn2, dirN)
shutil.copy(fn3, dirN)
# shutil.copy(fn4, dirN)

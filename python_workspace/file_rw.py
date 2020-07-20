import json
import pandas as pd
import numpy as np


class NpEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, np.integer):
      return int(obj)
    elif isinstance(obj, np.int64):
      return int(obj)
    else:
      # return super(NpEncoder, self).default(obj)
      return str(obj)


def JsonWrite(fn, data):
    #json 파일로 저장
    with open(fn, 'w', encoding='UTF-8-sig') as make_file:
        json.dump(data, make_file, indent="\t", cls=NpEncoder, ensure_ascii=False)

def JsonRead(fn):
    with open(fn, 'r', encoding="utf-8-sig") as json_file:
        data = json.load(json_file)
    return data

def ExcelRead(fn):
    return pd.read_excel(fn)

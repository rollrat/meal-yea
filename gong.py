# 공휴일 계산기

import datetime
import requests
import json
from bs4 import BeautifulSoup, element

def getHolidayDataFrame(year: int):
    url = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo"
    api_key_encoded = "sTU%2B%2FTZpKfo%2B5deGXn6EaYvwfZSwfhaEOHM8U2nh8CxIq8fBwPq9h8tTGrqMbnH35xRa3KQtp1o32L5WzRIKKg%3D%3D"
    api_key_decoded = requests.utils.unquote(api_key_encoded, encoding="utf-8")
    
    params = {
        "ServiceKey": api_key_decoded,
        "solYear": year,
        "numOfRows": 100
    }
    
    weekday_name = ["월", "화", "수", "목", "금", "토", "일"]
    
    response = requests.get(url, params=params)
    xml = BeautifulSoup(response.text, "lxml")
    
    def parseItem(item: element.Tag) -> dict:
        dt = datetime.datetime.strptime(item.find("locdate").text.strip(), '%Y%m%d')
        item_dict = {
            "name": item.find("datename").text.strip(),
            "year": dt.year,
            "month": dt.month,
            "day": dt.day,
        }
        return item_dict
    
    return [parseItem(x) for x in xml.find("items")]

print(json.dumps(getHolidayDataFrame(2022), ensure_ascii=False))
print(json.dumps(getHolidayDataFrame(2023), ensure_ascii=False))
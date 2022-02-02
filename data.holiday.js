// Meal Reservation System
//
//  data.holiday.js - holiday data
//
// Copyright rollrat. 2022. All rights reserved.

/*
ref: https://yogyui.tistory.com/entry/2022%EB%85%84-%EA%B3%B5%ED%9C%B4%EC%9D%BC%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-feat-%EA%B3%B5%EA%B3%B5%EB%8D%B0%EC%9D%B4%ED%84%B0%ED%8F%AC%ED%84%B8

import datetime
import requests
import json
from bs4 import BeautifulSoup, element

def getHolidayDataFrame(year: int):
    url = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo"
    api_key_encoded = "Your API Key"
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
*/

var data_holiday = [
  { name: "1월1일", year: 2022, month: 1, day: 1 },
  { name: "설날", year: 2022, month: 1, day: 31 },
  { name: "설날", year: 2022, month: 2, day: 1 },
  { name: "설날", year: 2022, month: 2, day: 2 },
  { name: "삼일절", year: 2022, month: 3, day: 1 },
  { name: "대통령선거일", year: 2022, month: 3, day: 9 },
  { name: "어린이날", year: 2022, month: 5, day: 5 },
  { name: "부처님오신날", year: 2022, month: 5, day: 8 },
  { name: "전국동시지방선거", year: 2022, month: 6, day: 1 },
  { name: "현충일", year: 2022, month: 6, day: 6 },
  { name: "광복절", year: 2022, month: 8, day: 15 },
  { name: "추석", year: 2022, month: 9, day: 9 },
  { name: "추석", year: 2022, month: 9, day: 10 },
  { name: "추석", year: 2022, month: 9, day: 11 },
  { name: "대체공휴일", year: 2022, month: 9, day: 12 },
  { name: "개천절", year: 2022, month: 10, day: 3 },
  { name: "한글날", year: 2022, month: 10, day: 9 },
  { name: "대체공휴일", year: 2022, month: 10, day: 10 },
  { name: "기독탄신일", year: 2022, month: 12, day: 25 },
  { name: "1월1일", year: 2023, month: 1, day: 1 },
  { name: "설날", year: 2023, month: 1, day: 21 },
  { name: "설날", year: 2023, month: 1, day: 22 },
  { name: "설날", year: 2023, month: 1, day: 23 },
  { name: "대체공휴일", year: 2023, month: 1, day: 24 },
  { name: "삼일절", year: 2023, month: 3, day: 1 },
  { name: "어린이날", year: 2023, month: 5, day: 5 },
  { name: "부처님오신날", year: 2023, month: 5, day: 27 },
  { name: "현충일", year: 2023, month: 6, day: 6 },
  { name: "광복절", year: 2023, month: 8, day: 15 },
  { name: "추석", year: 2023, month: 9, day: 28 },
  { name: "추석", year: 2023, month: 9, day: 29 },
  { name: "추석", year: 2023, month: 9, day: 30 },
  { name: "개천절", year: 2023, month: 10, day: 3 },
  { name: "한글날", year: 2023, month: 10, day: 9 },
  { name: "기독탄신일", year: 2023, month: 12, day: 25 },
];

function tryGetHoliday(year, month, day) {
  for (var x of data_holiday) {
    if (x.year == year && x.month == month && x.day == day) return x.name;
  }
  return null;
}

# 📈 Do It Quant

[![Build Status](https://travis-ci.org/hanbinleejoy/do-it-quant.svg?branch=master)](https://travis-ci.org/hanbinleejoy/do-it-quant)

> 연수 기간 mini project 내용입니다.

<br>

## 🤝 Team

- Front, Mobile: [feelcard](https://github.com/feelcard)
  - [Financial Data Crawling Repo](https://github.com/SeoYeonii/Do_IT_Quant/tree/master/python_workspace)
- Back, Cloud: hanbinleejoy
- Data Crawling: [SeoYeonii](https://github.com/SeoYeonii)
  - [React-Native Mobile Repo](https://github.com/feelcard/React_Native_Test)

<br>

## Stack

- Front(Mobile): React-Native, Android
- Back: Spring Boot `2.2.6` (Java 8)
- Test: JUnit4
- Build: Gradle `5.6.4` 
- DB: MariaDB(AWS RDS)
- Cloud: AWS EC2
- Crawling: python

<br>

## API 요구사항

- `company_data` (분기마다 자동 update)
  - `per`
  - `pbr`
  - `roa`
  - `roe`
  - `debt_ratio`(부채비율)
  - `operating_profit_ratio`(영업이익률)
  - `reserve_ratio`(유보율)

- `company_detail` (분기마다 자동 update)
  - `code`(종목코드)
  - `cmp_name`(종목명/기업이름)
  - `total_asset`(총자산)
  - `total_equity`(총자본)
  - `total_debt`(총부채)
  - `sales`(매출액)
  - `operating_profit`(영업이익)
  - `net_income`(당기손이익)
  - `retained_earnings`(이익 잉여금)
  - `description`(기업상세설명)
  - `market`(업종)

- `daily_price` (매일 장마감 기준으로 자동 update)
  - `code`(종목코드)
  - `end_price`(종가)
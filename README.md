# 📈 Do It Quant

[![Build Status](https://travis-ci.org/hanbinleejoy/do-it-quant.svg?branch=master)](https://travis-ci.org/hanbinleejoy/do-it-quant)

<br>

## 💡 Introduction

- 주식 투자를 도와주는 Quant 기반 종목 추천 모바일 앱입니다.  
- 7개 중요 투자지표를 토대로 사용자가 비중치를 직접 입력하면 이 비중치들을 기준으로 계산하여 
1 ~ 10위 까지의 종목을 제시해주는 앱입니다.  
- 이를 통해 주관적인 판단에 의한 투자가 아닌 기계적으로 투자할 수 있게 도와주는 서비스를 제공합니다.  
- 적립식 주식 투자, 다양한 투자 포트폴리오 구성 등 여러 부문에 활용할 수 있을 것으로 기대합니다.

<br>

## 🤝 Team

- Front, Mobile: [`feelcard`](https://github.com/feelcard)
  - [React-Native Mobile Repo](https://github.com/feelcard/React_Native_Test)
- Back, Cloud: `hanbinleejoy`
- Data Crawling: [`SeoYeonii`](https://github.com/SeoYeonii)
  - [Financial Data Crawling Repo](https://github.com/SeoYeonii/Do_IT_Quant/tree/master/python_workspace)

<br>

## 🔖 Stack

- Front(Mobile): React-Native, Android
- Back: Spring Boot `2.2.6` (Java 8)
- Test: JUnit4
- Build: Gradle `5.6.4` 
- DB: MariaDB(AWS RDS)
- Cloud: AWS EC2
- Crawling: python

<br>

## 🔖 서비스 구조

<p align="center"><img src="https://user-images.githubusercontent.com/41675375/90765283-a08acc00-e324-11ea-8916-d2722c01359c.png" width="700" height="350"></p>

<br>

## 🔖 랜더링 화면

<p align="center"><img src="https://user-images.githubusercontent.com/41675375/90776942-b8b71700-e335-11ea-8100-c75714e84e62.png" width="400" height="300"></p>

<br>

<p align="center"><img src="https://user-images.githubusercontent.com/41675375/90777248-19465400-e336-11ea-82d0-91ab8140d93c.png" width="550" height="300"></p>

<br>

<p align="center"><img src="https://user-images.githubusercontent.com/41675375/90777286-2a8f6080-e336-11ea-85a4-1e10204cb901.png" width="400" height="300"></p>

<br>

<p align="center"><img src="https://user-images.githubusercontent.com/41675375/90777329-3aa74000-e336-11ea-9547-cd868db26e13.png" width="400" height="300"></p>


<br>

## 🔖 API 요구사항(DB Table 구성)

- **company_data** (분기마다 자동 update)
  - `per`
  - `pbr`
  - `roa`
  - `roe`
  - `debt_ratio`(부채비율)
  - `operating_profit_ratio`(영업이익률)
  - `reserve_ratio`(유보율)

- **company_detail** (분기마다 자동 update)
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

- **daily_price** (매일 장마감 기준으로 자동 update)
  - `code`(종목코드)
  - `end_price`(종가)


<br>

## 🔖 시스템 작동 설명

<br>

### Scheduling 설정

> 1. `daily_price`: 매일 16:00에 DB 업데이트
> 2. `quant_data`, `company_detail`: 분기마다 DB 업데이트(2, 5, 8, 11월 기준 15일로 설정)

<br>

#### AWS Linux 서버 내 Scheduling 설정

```cmd
$crontab -e

0 0 15 2,5,8,11 * python3 /home/ec2-user/app/diq/web_crawling_general.py
0 16 * * 1-5 python3 /home/ec2-user/app/diq/web_crawling_Jongga.py
```
1. `daily_price`: 매일 16시 0분에 명령 자동 실행, 
  - `dailyUpdateData.json` 파일 반환
2. `quant_data`, `company_detail`: 2, 5, 8, 11월 15일 0시 0분에 명령 자동 실행
  - `QuantDataTable.json`, `CompanyDetailTable.json` 파일 반환


<br>

#### Spring Boot 설정

```java
@SpringBootApplication
@EnableScheduling
public class QuantApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuantApplication.class, args);
	}
}
```
- `@EnableScheduling` 설정을 통해 Spring Boot에 Scheduler 등록

```java
// QuantDataController.java, CompanyDetailController.java 
@Scheduled(cron = "0 30 0 * 2,5,7,11 *", zone = "Asia/Seoul")
public ResponseEntity<String> bulkUpdate() 
        throws JsonParseException, JsonMappingException, IOException {
    //해당 Logic...
}

// DailyPriceController.java
@Scheduled(cron = "0 30 16 * * 1-5", zone = "Asia/Seoul")
public ResponseEntity<String> bulkUpdate() 
        throws JsonParseException, JsonMappingException, IOException {
    //해당 Logic...
}
```
1. python 코드 실행이 완료되는데 20 ~ 30분정도 소요되므로 Spring Boot에서는 Linux서버 설정보다 30분 늦게 Scheduling 설정
2. python 코드로 crawling된 데이터들을 담은 json 파일을 WAS에서 받아서 처리한다. 
   - `dailyUpdateData.json` > `DailyPriceController.java`
   - `QuantDataTable.json` > `QuantDataController.java`
   - `CompanyDetailTable.json` > `CompanyDetailController.java`

<br>

### React-Native 내 Async Storage 사용

사용자가 Modify 페이지를 통해 7개 지표에 대한 비중치를 수정할 때마다 클라우드 서버 DB에 요청한다면 비효율적이라고 생각했습니다.  
이에 앱을 처음 시작했을 때 React-Native에서 지원하는 Async Storage에 서버 DB 데이터들을 한 번 동기화한다면 서버의 부담을 줄일 수 있을 것이라 판단하고 개발을 진행했습니다.


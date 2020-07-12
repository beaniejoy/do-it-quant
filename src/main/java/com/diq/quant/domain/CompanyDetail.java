package com.diq.quant.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.diq.quant.dto.CompanyDetailResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class CompanyDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String code; // 종목코드
	
	private String name; // 기업 이름
		
	private Integer endPrice; // 종가 (하루 장 마감)
	
	private Long totalAsset; // 총 자산
	
	private Long totalEquity; // 총 자본
	
	private Long totalDebt; // 총 부채
	
	private Long sales; // 매출액
	
	private Long operatingProfit; // 영업이익
	
	private Long netIncome; // 당기순이익
	
	private Long capitalSurplus; // 자본잉여금
	
	private Long retainedEarnings; // 이익잉여금
	
	private Long paidInCapital; // 
	
	private String description; // 해당 기업 설명
	
	private String market; // 해당 업종
	
	public CompanyDetailResponse toResponse() {
		
		return CompanyDetailResponse.builder()
				.id(id)
				.code(code)
				.name(name)
				.endPrice(endPrice)
				.totalAsset(totalAsset)
				.totalEquity(totalEquity)
				.totalDebt(totalDebt)
				.sales(sales)
				.operatingProfit(operatingProfit)
				.netIncome(netIncome)
				.capitalSurplus(capitalSurplus)
				.retainedEarnings(retainedEarnings)
				.paidInCapital(paidInCapital)
				.description(description)
				.market(market)
				.build();
	}
}

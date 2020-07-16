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
	
	private String cmpName; // 기업 이름
	
	private String description; // 해당 기업 설명
	
	private String market; // 해당 업종
			
	private Long totalAsset; // 총 자산
	
	private Long totalEquity; // 총 자본
	
	private Long totalDebt; // 총 부채
	
	private Long sales; // 매출액
	
	private Long operatingProfit; // 영업이익
			
	private Long retainedEarnings; // 이익잉여금
		
	public CompanyDetailResponse toResponse() {
		
		return CompanyDetailResponse.builder()
				.id(id)
				.code(code)
				.cmpName(cmpName)
				.description(description)
				.market(market)
				.totalAsset(totalAsset)
				.totalEquity(totalEquity)
				.totalDebt(totalDebt)
				.sales(sales)
				.operatingProfit(operatingProfit)
				.retainedEarnings(retainedEarnings)
				.build();
	}
}

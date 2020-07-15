package com.diq.quant.dto;

import com.diq.quant.domain.CompanyDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDetailRequest {

	private String code;

	private String name;
	
	private String description;

	private String market;

	private Long totalAsset;

	private Long totalEquity;

	private Long totalDebt;

	private Long sales;

	private Long operatingProfit;

	private Long retainedEarnings;

	public CompanyDetail toEntity() {
		
		return CompanyDetail.builder()
				.code(code)
				.name(name)
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

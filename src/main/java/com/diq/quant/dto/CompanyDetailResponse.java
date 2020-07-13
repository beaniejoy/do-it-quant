package com.diq.quant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDetailResponse {

	private Long id;

	private String code;

	private String cmpName;
	
	private String description;

	private String market;

	private Integer startPrice;

	private Integer endPrice;

	private Long totalAsset;

	private Long totalEquity;

	private Long totalDebt;

	private Long sales;

	private Long operatingProfit;

	private Long netIncome;

	private Long retainedEarnings;

}

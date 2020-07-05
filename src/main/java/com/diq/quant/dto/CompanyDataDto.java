package com.diq.quant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDataDto {
	
	private String name;
	
	private Double debtRatio;
	private Double reserveRatio;
	private Double operatingProfit;
	private Double roa;
	private Double roe;
	private Double per;
	private Double pbr;
	
	
}

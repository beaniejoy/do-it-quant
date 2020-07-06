package com.diq.quant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDataDto {

	private String code;
	private String name;

	private Double debtRatio;
	private Double reserveRatio;
	private Double operatingProfit;
	private Double roa;
	private Double roe;
	private Double per;
	private Double pbr;

}

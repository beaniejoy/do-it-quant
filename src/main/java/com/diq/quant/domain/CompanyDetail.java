package com.diq.quant.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
	
	private String code;
	
	private String name;
	
	private Integer startPrice;
	
	private Integer endPrice;
	
	private Long totalAsset;
	
	private Long totalEquity;
	
	private Long totalDebt;
	
	private Long sales;
	
	private Long operatingProfit;
	
	private Long netIncome;
	
	private Long capitalSurplus;
	
	private Long retainedEarnings;
	
	private Long paidInCapital;
	
	private String description;
	
	private String market;
}

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
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class CompanyData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
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

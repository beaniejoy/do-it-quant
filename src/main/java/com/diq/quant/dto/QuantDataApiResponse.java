package com.diq.quant.dto;

import com.diq.quant.domain.QuantData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuantDataApiResponse {

	private Long id;
	
	private String code;

	private String cmpname;

	private Double debtRatio;

	private Double reserveRatio;

	private Double operatingProfit;

	private Double roa;

	private Double roe;

	private Double per;

	private Double pbr;
	
	public static QuantDataApiResponse toResponse(QuantData entity) {
		
		return QuantDataApiResponse.builder()
				.id(entity.getId())
				.code(entity.getCode())
				.cmpname(entity.getCmpname())
				.debtRatio(entity.getDebtRatio())
				.reserveRatio(entity.getReserveRatio())
				.operatingProfit(entity.getOperatingProfit())
				.roa(entity.getRoa())
				.roe(entity.getRoe())
				.per(entity.getPer())
				.pbr(entity.getPbr())
				.build();
	}
}

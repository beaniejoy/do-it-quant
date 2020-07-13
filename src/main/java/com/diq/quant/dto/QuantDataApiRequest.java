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
public class QuantDataApiRequest {

	private String code;

	private String cmpName;

	private Double debtRatio;

	private Double reserveRatio;

	private Double operatingProfitRatio;

	private Double roa;

	private Double roe;

	private Double per;

	private Double pbr;
	
	public QuantData toEntity() {
		
		return QuantData.builder()
				.code(code)
				.cmpName(cmpName)
				.debtRatio(debtRatio)
				.reserveRatio(reserveRatio)
				.operatingProfitRatio(operatingProfitRatio)
				.roa(roa)
				.roe(roe)
				.per(per)
				.pbr(pbr)
				.build();
	}
}

package com.diq.quant.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.diq.quant.dto.QuantDataApiResponse;
import com.diq.quant.dto.QuantDataWithRankDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class QuantData {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String code;

	private String cmpName;

	private Double debtRatio;

	private Double reserveRatio;

	private Double operatingProfitRatio;

	private Double roa;

	private Double roe;

	private Double per;

	private Double pbr;

	public QuantDataApiResponse toResponse() {

		return QuantDataApiResponse.builder()
				.id(id)
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

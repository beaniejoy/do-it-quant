package com.diq.quant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuantDataRankDto {

	private Long id;
	
	private String code;

	private String cmpName;

	private Integer rankDebtRatio;

	private Integer rankReserveRatio;

	private Integer rankOper;

	private Integer rankRoa;

	private Integer rankRoe;

	private Integer rankPer;

	private Integer rankPbr;
	
	
}

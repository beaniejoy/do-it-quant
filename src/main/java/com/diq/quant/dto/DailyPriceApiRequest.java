package com.diq.quant.dto;

import com.diq.quant.domain.DailyPrice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyPriceApiRequest {
		
	private String code;
	
	private Integer endPrice;
	
	public DailyPrice toEntity() {
		
		return DailyPrice.builder()
				.code(code)
				.endPrice(endPrice)
				.build();
	}
}

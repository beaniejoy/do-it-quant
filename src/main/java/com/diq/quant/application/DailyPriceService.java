package com.diq.quant.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.diq.quant.domain.DailyPrice;
import com.diq.quant.domain.DailyPriceRepository;
import com.diq.quant.dto.DailyPriceApiRequest;
import com.diq.quant.dto.DailyPriceApiResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DailyPriceService {

	private final DailyPriceRepository dailyPriceRepository;

	public List<DailyPriceApiResponse> getDailyPriceList() {
		
		return dailyPriceRepository.findAll().stream()
				.map(DailyPrice::toResponse)
				.collect(Collectors.toList());
	}

	public DailyPriceApiResponse getDailyPrice(Long id) {
		DailyPrice dailyPrice = dailyPriceRepository.findById(id)
				.orElseThrow(() -> new DailyPriceNotFoundException(id));
		
		return dailyPrice.toResponse();
	}

	public void bulkUpdate(List<DailyPriceApiRequest> dailyPriceApiRequestList) {
		
		dailyPriceRepository.deleteAll();
		
		for(DailyPriceApiRequest request: dailyPriceApiRequestList) {
			dailyPriceRepository.save(request.toEntity());
		}
	}
	
	
}

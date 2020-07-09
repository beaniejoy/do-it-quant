package com.diq.quant.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diq.quant.domain.QuantDataRepository;
import com.diq.quant.dto.QuantDataApiRequest;
import com.diq.quant.dto.QuantDataApiResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class QuantDataService {
	
	private final QuantDataRepository quantDataRepository;
	
	public List<QuantDataApiResponse> getQuantDataList(){
		return quantDataRepository.findAll().stream()
		.map(QuantDataApiResponse::toResponse)
		.collect(Collectors.toList());
	}

	public void bulkUpdate(List<QuantDataApiRequest> requestList) {
		
		
	}
	
}

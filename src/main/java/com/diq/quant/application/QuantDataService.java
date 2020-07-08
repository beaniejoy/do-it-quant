package com.diq.quant.application;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.diq.quant.domain.QuantDataRepository;
import com.diq.quant.dto.QuantDataApiResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class QuantDataService {
	
	private final QuantDataRepository quantDataRepository;
	
	public List<QuantDataApiResponse> getQuantDataList(){
		return null;
	}
	
}

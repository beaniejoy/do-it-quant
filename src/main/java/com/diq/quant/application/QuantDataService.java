package com.diq.quant.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diq.quant.domain.QuantData;
import com.diq.quant.domain.QuantDataRepository;
import com.diq.quant.dto.QuantDataApiRequest;
import com.diq.quant.dto.QuantDataApiResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class QuantDataService {

	private final QuantDataRepository quantDataRepository;

	public List<?> getRankList() {
		
		return null;
	}
	
	public List<QuantDataApiResponse> getQuantDataList() {
		return quantDataRepository.findAll().stream()
				.map(quantData -> {
					return quantData.toResponse();
				})
				.collect(Collectors.toList());
	}
		
	public QuantDataApiResponse getQuantData(Long id) {
		QuantData quantData = quantDataRepository.findById(id)
				.orElseThrow(() -> new QuantDataNotFoundException(id));
		
		return quantData.toResponse();
	}

	public QuantDataApiResponse addQuantData(QuantDataApiRequest request) {

		QuantData saved = quantDataRepository.save(request.toEntity());

		return saved.toResponse();
	}

	// 크롤링한 json 객체를 한꺼번에 테이블에 insert
	public void bulkUpdate(List<QuantDataApiRequest> requestList) {

		// 테이블 내 모든 데이터 삭제
		// deleteAll은 select를 먼저 수행하므로 상당한 비용을 동반 
		// (대체할 수 있는 메서드가 무엇인지) 
		quantDataRepository.deleteAll();

		// 모든 신규 데이터들 insert
		for(QuantDataApiRequest request: requestList) {
			quantDataRepository.save(request.toEntity());
		}
		
	}

	

}

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

	public List<QuantDataApiResponse> getQuantDataList() {
		return quantDataRepository.findAll().stream()
				.map(quantData -> {
					return quantData.toResponse();
				})
				.collect(Collectors.toList());
	}

	public QuantDataApiResponse addQuantData(QuantDataApiRequest request) {

		QuantData saved = quantDataRepository.save(request.toEntity());

		return saved.toResponse();
	}

	public void bulkUpdate(List<QuantDataApiRequest> requestList) {

		// 테이블 내 모든 데이터 삭제
		quantDataRepository.truncateTable();

//		// 모든 신규 데이터들 insert
//		for(QuantDataApiRequest request: requestList) {
//			quantDataRepository.save(request.toEntity());
//		}
//		
	}

}

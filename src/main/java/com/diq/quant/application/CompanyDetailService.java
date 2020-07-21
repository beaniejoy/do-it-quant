package com.diq.quant.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diq.quant.domain.CompanyDetail;
import com.diq.quant.domain.CompanyDetailRepository;
import com.diq.quant.dto.CompanyDetailRequest;
import com.diq.quant.dto.CompanyDetailResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CompanyDetailService {

	private final CompanyDetailRepository companyDetailRepository;

	
	
	public List<CompanyDetailResponse> getCompanyDetailList() {
	
		return companyDetailRepository.findAll().stream()
				.map(CompanyDetail::toResponse)
				.collect(Collectors.toList());
	}

	public CompanyDetailResponse getCompanyDetail(Long id) {

		CompanyDetail companyDetail = companyDetailRepository.findById(id)
				.orElseThrow(() -> new CompanyDetailNotFoundException(id));

		return companyDetail.toResponse();
	}

	public void bulkUpdate(List<CompanyDetailRequest> requestList) {

		// 테이블 내 모든 데이터 삭제
		// deleteAll은 select를 먼저 수행하므로 상당한 비용을 동반
		// (대체할 수 있는 메서드가 무엇인지)
		companyDetailRepository.deleteAll();

		// 모든 신규 데이터들 insert
		for (CompanyDetailRequest request : requestList) {
			companyDetailRepository.save(request.toEntity());
		}

	}

}
package com.diq.quant.application;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.diq.quant.domain.CompanyDetail;
import com.diq.quant.domain.CompanyDetailRepository;
import com.diq.quant.dto.CompanyDetailResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CompanyDetailService {

	private final CompanyDetailRepository companyDetailRepository;
	
	public CompanyDetailResponse getCompanyDetail(Long id) {
		// TODO Auto-generated method stub
		CompanyDetail companyDetail = companyDetailRepository.findById(id)
				.orElseThrow(() -> new CompanyDetailNotFound(id));
		
		return companyDetail.toResponse();
	}

}

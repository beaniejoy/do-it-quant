package com.diq.quant.interfaces;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.diq.quant.application.CompanyDetailService;
import com.diq.quant.dto.CompanyDetailResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CompanyDetailController {
	
	private final CompanyDetailService companyDetailService;
	
	// 종목코드로 받아와도 될듯
	@GetMapping("/companies/{id}")
	public CompanyDetailResponse detail(@PathVariable("id") Long id) {
		return companyDetailService.getCompanyDetail(id);
	}
}

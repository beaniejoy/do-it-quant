package com.diq.quant.interfaces;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.diq.quant.dto.CompanyDetailResponse;

@RestController
public class CompanyDetailController {
	
	@GetMapping("/companies/{id}")
	public CompanyDetailResponse detail(@PathVariable("id") Long id) {
		return null;
	}
}

package com.diq.quant.application;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.diq.quant.domain.CompanyDetailRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduledService {
	
	private final CompanyDetailRepository companyDetailRepository;
	
	public void updateData() {
		
	}
	
	public void firstSetting() {
		
	}
	
}

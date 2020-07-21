package com.diq.quant.interfaces;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.diq.quant.application.CompanyDetailService;
import com.diq.quant.dto.CompanyDetailRequest;
import com.diq.quant.dto.CompanyDetailResponse;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CompanyDetailController {
	
	private final CompanyDetailService companyDetailService;
	
	@GetMapping("/companies")
	public List<CompanyDetailResponse> list() {
		return companyDetailService.getCompanyDetailList();
	}
	
	// 종목코드로 받아와도 될듯
	@GetMapping("/companies/{id}")
	public CompanyDetailResponse detail(@PathVariable("id") Long id) {
		return companyDetailService.getCompanyDetail(id);
	}
	
	// 3개월 단위로 update
	@Scheduled(cron = "0 19 11 21 2,5,7,11 *", zone = "Asia/Seoul")
	public ResponseEntity<String> bulkUpdate() 
			throws JsonParseException, JsonMappingException, IOException {
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		DatePath datePath = new DatePath();
		datePath.setQuarterPath();
		
		String absolutePath = "/home/ec2-user/app/diq";
		String filePath = absolutePath + "/data/" + datePath.getPath() + "/CompanyDetailTable.json";
		
		List<CompanyDetailRequest> companyDetailRequestList = objectMapper.readValue(new File(filePath),
				new TypeReference<List<CompanyDetailRequest>>() {});
		
		companyDetailService.bulkUpdate(companyDetailRequestList);
		
		return ResponseEntity.ok("Update All Success");
	}
	
}

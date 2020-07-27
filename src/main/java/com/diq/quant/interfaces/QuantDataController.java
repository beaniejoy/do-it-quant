package com.diq.quant.interfaces;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diq.quant.application.QuantDataService;
import com.diq.quant.dto.QuantDataApiRequest;
import com.diq.quant.dto.QuantDataApiResponse;
import com.diq.quant.dto.QuantDataWithRankDto;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class QuantDataController {

	private final QuantDataService quantDataService;

	@GetMapping("/quantdata/rank")
	public List<QuantDataWithRankDto> rank() {
		return quantDataService.getRankList();
	}
	
	@GetMapping("/quantdata")
	public List<QuantDataApiResponse> list() {
		return quantDataService.getQuantDataList();
	}

	@GetMapping("/quantdata/{id}")
	public QuantDataApiResponse detail(@PathVariable("id") Long id) {
		return quantDataService.getQuantData(id);
	}

	@PostMapping("/quantdata")
	public ResponseEntity<?> create(@RequestBody QuantDataApiRequest request) throws URISyntaxException {

		QuantDataApiResponse response = quantDataService.addQuantData(request);

		URI location = new URI("/quantdata/" + response.getId());
		return ResponseEntity.created(location).body("{}");
	}
	
	// 3개월 단위로 자동 update
	// crawling data -> DB insert 자동화 작업
//	@Scheduled(cron = "0 43 10 21 2,5,7,11 *", zone = "Asia/Seoul")
	public ResponseEntity<String> bulkUpdate()
			throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();

		DatePath datePath = new DatePath();
		datePath.setQuarterPath();
		
		String absolutePath = "/home/ec2-user/app/diq";
		String filePath = absolutePath + "/data/" + datePath.getPath() + "/QuantDataTable.json";
		
		List<QuantDataApiRequest> quantDataApiRequestList = objectMapper.readValue(new File(filePath),
				new TypeReference<List<QuantDataApiRequest>>() {
		});

		quantDataService.bulkUpdate(quantDataApiRequestList);
		return ResponseEntity.ok("Update All Success");
	}
}

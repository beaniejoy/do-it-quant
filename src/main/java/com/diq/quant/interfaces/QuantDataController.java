package com.diq.quant.interfaces;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diq.quant.application.QuantDataService;
import com.diq.quant.dto.QuantDataApiRequest;
import com.diq.quant.dto.QuantDataApiResponse;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class QuantDataController {

	private final QuantDataService quantDataService;

	// TODO: rank 결과 리스트 반환
	// 사용자 임의의 기준 설정에 대한 파라미터를 ReqeustBody로 받아와야 할 듯
	// 반환 리스트로 rank 결과 + 모든 데이터 포함할지 결정
	@GetMapping("/quantdata/rank")
	public List<?> rank() {
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
	
	// crawling data -> DB insert 자동화 작업
	@Scheduled(cron = "0 16 9 14 2,5,7,11 *", zone = "Asia/Seoul")
	public ResponseEntity<String> bulkUpdate()
			throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();

		List<QuantDataApiRequest> quantDataApiRequestList = objectMapper.readValue(new File("QuantDataTable.json"),
				new TypeReference<List<QuantDataApiRequest>>() {
		});

		quantDataService.bulkUpdate(quantDataApiRequestList);
		return ResponseEntity.ok("Update All Success");
	}
}

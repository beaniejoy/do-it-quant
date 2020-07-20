package com.diq.quant.interfaces;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.diq.quant.application.DailyPriceService;
import com.diq.quant.dto.DailyPriceApiRequest;
import com.diq.quant.dto.DailyPriceApiResponse;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DailyPriceController {

	private final DailyPriceService dailyPriceService;

	@GetMapping("/dailyprices")
	public List<DailyPriceApiResponse> list() {
		return dailyPriceService.getDailyPriceList();
	}

	@GetMapping("/dailyprices/{id}")
	public DailyPriceApiResponse detail(@PathVariable Long id) {
		return dailyPriceService.getDailyPrice(id);
	}

	// automatically daily update
//	@Scheduled(cron = "0 30 16 * * *", zone = "Asia/Seoul")
	public ResponseEntity<String> bulkUpdate() throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();

		DatePath datePath = new DatePath();
		datePath.setDailyDatePath();
		
		String filePath = "./data/" + datePath.getPath() + "/dailyUpdateData.json";
		
		List<DailyPriceApiRequest> dailyPriceApiRequestList = objectMapper.readValue(new File(filePath),
				new TypeReference<List<DailyPriceApiRequest>>() {
				});

		dailyPriceService.bulkUpdate(dailyPriceApiRequestList);

		return ResponseEntity.ok("Update All Success");
	}
}

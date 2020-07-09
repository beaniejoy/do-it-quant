package com.diq.quant.interfaces;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.diq.quant.application.QuantDataService;
import com.diq.quant.dto.QuantDataApiRequest;
import com.diq.quant.dto.QuantDataApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class QuantDataController {

	private final QuantDataService quantDataService;

	@GetMapping("/quantdata")
	public List<QuantDataApiResponse> list() {
		return quantDataService.getQuantDataList();
	}

	@GetMapping("/quantdata/{id}")
	public QuantDataApiResponse detail(@PathVariable("id") Long id) {
		return null;
	}

	@PostMapping("/quantdata")
	public ResponseEntity<?> bulkUpdate(@RequestBody List<QuantDataApiRequest> requestList) throws URISyntaxException {

		quantDataService.bulkUpdate(requestList);
		return ResponseEntity.created(new URI("")).body("");
	}
}

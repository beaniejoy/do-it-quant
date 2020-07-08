package com.diq.quant.interfaces;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.diq.quant.dto.QuantDataApiResponse;

@RestController
public class QuantDataController {
	
	@GetMapping("/quantdata")
	public List<QuantDataApiResponse> list() {
		return null;
	}
	
	@GetMapping("/quantdata/{id}")
	public QuantDataApiResponse detail(@PathVariable("id") Long id) {
		return null;
	}
}

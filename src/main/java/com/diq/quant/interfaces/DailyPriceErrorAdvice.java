package com.diq.quant.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.diq.quant.application.DailyPriceNotFoundException;

@ControllerAdvice
public class DailyPriceErrorAdvice {

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(DailyPriceNotFoundException.class)
	public String handleNotFound() {
		return "{}";
	}
}

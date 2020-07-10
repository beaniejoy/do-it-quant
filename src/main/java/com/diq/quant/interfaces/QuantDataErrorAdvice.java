package com.diq.quant.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.diq.quant.application.QuantDataNotFoundException;

@ControllerAdvice
public class QuantDataErrorAdvice {

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(QuantDataNotFoundException.class)
	public String handleNotFound() {
		return "{}";
	}
}

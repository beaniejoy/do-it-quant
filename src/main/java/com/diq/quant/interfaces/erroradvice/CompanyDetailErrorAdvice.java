package com.diq.quant.interfaces.erroradvice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.diq.quant.application.CompanyDetailNotFoundException;

@ControllerAdvice
public class CompanyDetailErrorAdvice {

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(CompanyDetailNotFoundException.class)
	public String handleNotFound() {
		return "{}";
	}
}

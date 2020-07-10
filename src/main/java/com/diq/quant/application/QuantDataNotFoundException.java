package com.diq.quant.application;

public class QuantDataNotFoundException extends RuntimeException {
	
	public QuantDataNotFoundException(Long id) {
		super("There is no data in the \"quant_data\" table: id " +id);
	}
}

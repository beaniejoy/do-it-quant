package com.diq.quant.application;

public class DailyPriceNotFoundException extends RuntimeException {

	public DailyPriceNotFoundException(Long id) {
		super("There is no data in the \"daily_price\" table: id " + id);
	}

}

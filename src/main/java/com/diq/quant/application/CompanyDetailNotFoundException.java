package com.diq.quant.application;

public class CompanyDetailNotFoundException extends RuntimeException {

	public CompanyDetailNotFoundException(Long id) {
		super("There is no data in the \"company_detail\" table: id " + id);
	}

}

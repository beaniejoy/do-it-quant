package com.diq.quant.application;

public class CompanyDetailNotFound extends RuntimeException {

	public CompanyDetailNotFound(Long id) {
		super("There is no data in the \"company_detail\" table: id " + id);
	}

}

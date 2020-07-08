package com.diq.quant.application;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.diq.quant.domain.QuantData;
import com.diq.quant.domain.QuantDataRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduledService {
	
	private final QuantDataRepository companyDataRepository;
	
	public void updateData() {

	}
	
	@Scheduled(cron = "0 30 15 * * *", zone = "Asia/Seoul" )
	public void firstSetting() {
		// URL에 대해 변수화 설정할 것

		QuantData entity = crawling("A200412");
		
		companyDataRepository.save(entity);
		
	}

	private QuantData crawling(String companyCode) {

		String financeRatioUrl = "http://comp.fnguide.com/SVO2/ASP/SVD_FinanceRatio.asp?pGB=1&gicode=" + companyCode
				+ "&cID=&MenuYn=Y&ReportGB=&NewMenuID=104&stkGb=701";

		String investUrl = "http://comp.fnguide.com/SVO2/ASP/SVD_Invest.asp?pGB=1&gicode=" + companyCode
				+ "&cID=&MenuYn=Y&ReportGB=&NewMenuID=105&stkGb=701";

		Document docFinanceRatio = null;
		Document docInvest = null;

		try {
			docFinanceRatio = Jsoup.connect(financeRatioUrl).get();
			docInvest = Jsoup.connect(investUrl).get();
			System.out.println("Success!");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// target category name 설정
		List<String> targetFinanceList = new ArrayList<>();
		Map<Integer, Double> dataMap = new HashMap<>();

		targetFinanceList.add("부채비율");
		targetFinanceList.add("유보율");
		targetFinanceList.add("영업이익률");
		targetFinanceList.add("ROA");
		targetFinanceList.add("ROE");

		Element financeTable = docFinanceRatio.select(".us_table_ty1.h_fix.zigbg_no").get(0);

		Elements financeCategoryNames = financeTable.select("tbody tr");

		for (Element nameElement : financeCategoryNames) {
			String name = nameElement.select(".txt_acd dt").text();
			if (targetFinanceList.contains(name)) {
				Elements dataElements = nameElement.select("td");
				Double data = Double
						.parseDouble(dataElements.get(dataElements.size() - 1).text().trim().replace(",", ""));

				dataMap.put(targetFinanceList.indexOf(name), data);
			}
		}

		List<String> targetInvestList = new ArrayList<>();

		targetInvestList.add("PER");
		targetInvestList.add("PBR");

		Element investTable = docInvest.select(".us_table_ty1.h_fix.zigbg_no").get(0);

		Elements investCategoryNames = investTable.select("tbody tr");

		for (Element nameElement : investCategoryNames) {
			String name = nameElement.select(".clf dt").text();
			if (targetInvestList.contains(name)) {
				Elements dataElements = nameElement.select("td");

				Double data = Double
						.parseDouble(dataElements.get(dataElements.size() - 1).text().trim().replace(",", ""));

				dataMap.put(targetInvestList.indexOf(name) + 5, data);
			}
		}
		
		QuantData entity = QuantData.builder()
				.code(companyCode)
				.cmpname("company1")
				.debtRatio(dataMap.get(0))
				.reserveRatio(dataMap.get(1))
				.operatingProfit(dataMap.get(2))
				.roa(dataMap.get(3))
				.roe(dataMap.get(4))
				.per(null)
				.pbr(null)
				.build();
		return entity;
	}

}

package com.diq.quant.interfaces;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.diq.quant.application.QuantDataService;
import com.diq.quant.dto.QuantDataApiResponse;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = QuantDataController.class)
public class QuantDataControllerTest {

	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private QuantDataService quantDataService;
	
	
	
	@Test
	public void list() throws Exception {
		
		QuantDataApiResponse mockQuantResponse = QuantDataApiResponse.builder()
				.build();
		
		List<QuantDataApiResponse> quantResponses = new ArrayList<>();
		quantResponses.add(mockQuantResponse);
		
		when(quantDataService.getQuantDataList()).thenReturn(quantResponses);
		
		mvc.perform(get("/quantdata"))
		.andExpect(status().isOk())
		.andDo(print());
		
	}

}

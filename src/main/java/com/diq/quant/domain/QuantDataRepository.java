package com.diq.quant.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuantDataRepository extends JpaRepository<QuantData, Long>{
	
	@Query(value = "TRUNCATE TABLE quant_data", nativeQuery = true)
	Object truncateTable();
}

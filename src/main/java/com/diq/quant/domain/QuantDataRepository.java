package com.diq.quant.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuantDataRepository extends JpaRepository<QuantData, Long>{
	
	@Query(value = "TRUNCATE TABLE quant_data", nativeQuery = true)
	Object truncateTable();

	@Query(value = "WITH table_rank_pbr " + 
			"AS (SELECT id, cmp_name, pbr, " + 
			"RANK() OVER(ORDER BY pbr) rank_pbr " + 
			"FROM QUANT_DATA " + 
			"WHERE pbr > 0 " + 
			"UNION " + 
			"SELECT id, cmp_name, pbr, " + 
			"(RANK() OVER(ORDER BY pbr DESC) + SELECT COUNT(id) " + 
			"FROM QUANT_DATA " + 
			"WHERE pbr> 0) rank_pbr " + 
			"FROM QUANT_DATA " + 
			"WHERE pbr <= 0 or pbr is null) " + 
			",table_rank_per  " + 
			"AS (SELECT id, cmp_name, per, " + 
			"RANK() OVER(ORDER BY per) rank_per " + 
			"FROM QUANT_DATA " + 
			"WHERE per > 1 " + 
			"UNION " + 
			"SELECT id, cmp_name, per, " + 
			"(RANK() OVER(ORDER BY per DESC) + SELECT COUNT(id) " + 
			"FROM QUANT_DATA " + 
			"WHERE per> 1) rank_per " + 
			"FROM QUANT_DATA " + 
			"WHERE per <= 1 OR per is null) " + 
			"SELECT " + 
			"a.id, a.cmp_name, a.code, " + 
			"RANK() OVER(ORDER BY NVL(a.DEBT_RATIO, 99999)) rank_debt_ratio, " + 
			"RANK() OVER(ORDER BY a.RESERVE_RATIO DESC) rank_reserve_ratio, " + 
			"RANK() OVER(ORDER BY a.OPERATING_PROFIT_RATIO DESC) rank_oper, " + 
			"RANK() OVER(ORDER BY a.ROA DESC) rank_roa, " + 
			"RANK() OVER(ORDER BY a.ROE DESC) rank_roe, " + 
			"b.RANK_PBR, " + 
			"c.RANK_PER, " + 
			"FROM QUANT_DATA a, table_rank_pbr b, table_rank_per c " + 
			"WHERE a.id = b.id AND a.id=c.id; ", nativeQuery = true)
	List<Object> findAllByRank();
}

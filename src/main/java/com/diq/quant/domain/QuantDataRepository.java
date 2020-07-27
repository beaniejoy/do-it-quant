package com.diq.quant.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuantDataRepository extends JpaRepository<QuantData, Long>{
	
	@Query(value = "TRUNCATE TABLE quant_data", nativeQuery = true)
	Object truncateTable();

	@Query(value = "WITH table_rank_pbr AS ((SELECT id, cmp_name, pbr, " + 
			"RANK() OVER(ORDER BY pbr) rank_pbr " + 
			"FROM quant_data " + 
			"WHERE pbr > 0) " + 
			"UNION  " + 
			"(SELECT id, cmp_name, pbr, " + 
			"(RANK() OVER(ORDER BY pbr DESC) + (SELECT COUNT(id) " + 
			"FROM quant_data " + 
			"WHERE pbr> 0)) rank_pbr " + 
			"FROM quant_data " + 
			"WHERE pbr <= 0 or pbr is null)) " + 
			",table_rank_per " + 
			"AS ((SELECT id, cmp_name, per, " + 
			"RANK() OVER(ORDER BY per) rank_per " + 
			"FROM quant_data " + 
			"WHERE per > 1) " + 
			"UNION " + 
			"(SELECT id, cmp_name, per, " + 
			"(RANK() OVER(ORDER BY per DESC) + (SELECT COUNT(id) " + 
			"FROM quant_data " + 
			"WHERE per> 1)) rank_per " + 
			"FROM quant_data " + 
			"WHERE per <= 1 OR per is null)) " + 
			"SELECT " + 
			"a.id, a.cmp_name, a.code, " + 
			"RANK() OVER(ORDER BY NVL(a.debt_ratio, 99999)) rank_debt_ratio, " + 
			"RANK() OVER(ORDER BY a.reserve_ratio DESC) rank_reserve_ratio, " + 
			"RANK() OVER(ORDER BY a.operating_profit_ratio DESC) rank_oper, " + 
			"RANK() OVER(ORDER BY a.roa DESC) rank_roa, " + 
			"RANK() OVER(ORDER BY a.roe DESC) rank_roe, " + 
			"b.rank_pbr, " + 
			"c.rank_per, " + 
			"a.debt_ratio, " +
			"a.reserve_ratio, " +
			"a.operating_profit_ratio, " +
			"a.roa, " +
			"a.roe, " +
			"a.pbr, " +
			"a.per " +
			"FROM quant_data a, table_rank_pbr b, table_rank_per c " + 
			"WHERE a.id=b.id AND a.id=c.id; ", nativeQuery = true)
	List<Object> findAllByRank();
}

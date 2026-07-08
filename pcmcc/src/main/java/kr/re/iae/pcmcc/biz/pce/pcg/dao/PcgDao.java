package kr.re.iae.pcmcc.biz.pce.pcg.dao;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgaVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgbVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgcVo;

public interface PcgDao {

   public List<PgaVo> selectEstiCode(Map param);

   public String insertEstiCode(PgaVo pgaVo);

   public int updateEstiCode(PgaVo pgaVo);

   public int deleteEstiCode(Map param);

   public List<PgbVo> checkProject(Map param);

   public List<PgbVo> selectProjectCodeList(Map param);

   public int insertProjectCode(PgbVo pgbVo);

   public int updateProjectCode(PgbVo pgbVo);

   public int deleteProjectCode(Map param);

   public int deleteProjectCodeAll(Map<String, String> param);

   public List<PgbVo> selectProjectCodeExcelList(Map param);

   public List<PgcVo> selectEmplNoList(Map param);

   public int insertEmplNo(PgcVo pgcVo);

   public int updateEmplNo(PgcVo pgcVo);

   public int deleteEmplNo(Map param);

   public int deleteAll(Map<String, String> param);

   public int copyPgc(Map<String, String> param);

}

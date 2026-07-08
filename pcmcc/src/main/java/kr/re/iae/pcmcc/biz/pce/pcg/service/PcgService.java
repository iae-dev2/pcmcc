package kr.re.iae.pcmcc.biz.pce.pcg.service;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgaVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgbVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgcVo;

public interface PcgService {

   public List<PgaVo> selectEstiCode(Map param);

   public int saveEstiCode(List<PgaVo> haavolist) throws Exception;

   public List<PgbVo> checkProject(Map param);

   public List<PgbVo> selectProjectCodeList(Map param);

   public int saveProjectCode(List<PgbVo> pgbvolist) throws Exception;

   public int batchInsertPgb(List<PgbVo> list) throws Exception;

   public List<PgbVo> selectProjectCodeExcelList(Map<String, String> param);

   public List<PgcVo> selectEmplNoList(Map param);

   public int saveEmplNoList(List<PgcVo> pgcvolist) throws Exception;

   public int copyPgc(Map<String, String> param);

   public int batchInsertPgc(List<PgcVo> list) throws Exception;

}

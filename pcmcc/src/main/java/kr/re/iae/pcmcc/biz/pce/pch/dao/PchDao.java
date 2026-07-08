package kr.re.iae.pcmcc.biz.pce.pch.dao;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pce.pch.vo.PchContVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchEmpVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchExcelVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchPrjVo;

public interface PchDao {

   public List<PchPrjVo> selectProjectCodeList(Map<String, String> paramMap);

   public List<PchContVo> selectProjectContributeList(Map<String, String> paramMap);

   public int updateContribution(PchContVo vo);

   public List<PchExcelVo> selectProjectExcelList(Map<String, String> paramMap);

   public List<PchEmpVo> selectEmplNoList(Map<String, String> paramMap);

   public List<PchContVo> selectEmplNoContributeList(Map<String, String> paramMap);

   public List<PchExcelVo> selectEmplNoExcelList(Map<String, String> paramMap);

   public List<PchPrjVo> selectPhcProjectCodeList(Map<String, String> paramMap);

   public List<PchEmpVo> selectPhcEmpList(Map<String, String> paramMap);

   public int deletePhcEmplNo(Map<String, String> paramMap);

}

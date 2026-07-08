package kr.re.iae.pcmcc.biz.pcc.pca.dao;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pcc.pca.vo.EmpVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.PrjVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekFileVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekVo;

public interface PcaDao {

   public List<PrjVo> selectPrjGoal(Map<String, String> paramMap);

   public List<PrjVo> selectOldGoal(Map<String, String> paramMap);

   public int updateProjectGoal(PrjVo vo);

   public List<EmpVo> selectContributionList(Map<String, String> paramMap);

   public float selectContributionSum(Map<String, String> paramMap);

   public List<WeekFileVo> selectFileInfo(WeekFileVo vo);

   public int updateWeekFile(WeekFileVo vo);

   public List<WeekVo> selectWrmDataList(Map<String, String> paramMap);

   public List<Map<String, String>> selectDeptNameList(Map<String, String> paramMap);

   public List<EmpVo> selectAdditionalEmplNoList(Map<String, String> paramMap);

   public int insertEstiEmplNo(Map<String, String> paramMap);

   public int deleteEstiEmplNo(Map<String, String> paramMap);

   public int updateContribution(EmpVo vo);

   public int updateEstiStep2(Map<String, String> paramMap);

   public int updateEstiStep2CheckRetire(Map<String, String> paramMap);

   public String selectReview(Map<String, String> paramMap);

   public int updateEstiStep5(Map<String, String> paramMap);

}

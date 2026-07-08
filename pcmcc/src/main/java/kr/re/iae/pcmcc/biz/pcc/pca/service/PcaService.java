package kr.re.iae.pcmcc.biz.pcc.pca.service;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pcc.pca.vo.EmpVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.PcaVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.PrjVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekFileVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekVo;

public interface PcaService {

   public List<PrjVo> selectPrjGoal(Map<String, String> paramMap);

   public List<PrjVo> selectOldGoal(Map<String, String> paramMap);

   public int updateProjectGoal(PrjVo vo);

   public List<EmpVo> selectContributionList(Map<String, String> paramMap);

   public float selectContributionSum(Map<String, String> paramMap);

   public List<WeekVo> selectWrmDataList(Map<String, String> paramMap);

   public List<WeekFileVo> selectFileInfo(WeekFileVo vo);

   public int updateWeekFile(WeekFileVo filevo) throws Exception;

   public List<Map<String, String>> selectDeptNameList(Map<String, String> paramMap);

   public List<EmpVo> selectAdditionalEmplNoList(Map<String, String> paramMap);

   public int insertEstiEmplNo(Map<String, String> paramMap);

   public int deleteEstiEmplNo(Map<String, String> paramMap);

   public int updateContribution(List<EmpVo> empvolist) throws Exception;

   public int updateEstiStep2(PcaVo pcavo);

   public String selectReview(Map<String, String> paramMap);

   public int updateEstiStep5(Map<String, String> paramMap);

}

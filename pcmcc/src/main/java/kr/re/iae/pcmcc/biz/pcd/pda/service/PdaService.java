package kr.re.iae.pcmcc.biz.pcd.pda.service;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pcd.pda.vo.EmpVo;

public interface PdaService {

   public List<EmpVo> selectProjectEmpList(Map<String, String> paramMap);

   public String selectReview(Map<String, String> paramMap);

//   public int insertReview(Map<String, String> paramMap);

   /* 승인 */
   public int updateEstiStep4(Map<String, String> paramMap);

   /* 반려 */
   public int updateEstiStep3(Map<String, String> paramMap);

}

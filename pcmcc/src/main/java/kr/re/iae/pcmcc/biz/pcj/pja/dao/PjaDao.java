package kr.re.iae.pcmcc.biz.pcj.pja.dao;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pcj.pja.vo.EmpVo;

public interface PjaDao {

   public List selectProjectCodeList(Map<String, Object> paramMap);

   public List<EmpVo> selectProjectEmpList(Map<String, String> paramMap);

   public String selectReview(Map<String, String> paramMap);

}

package kr.re.iae.pcmcc.biz.pce.pch.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.pce.pch.dao.PchDao;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchContVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchEmpVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchExcelVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchPrjVo;

@Repository
public class PchDaoImpl implements PchDao {

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   /** 관리자 - 기여율평가 - 과제별 기여율관리 */
   @Override
   public List<PchPrjVo> selectProjectCodeList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pch.selectProjectCodeList", paramMap);
   }

   @Override
   public List<PchContVo> selectProjectContributeList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pch.selectProjectContributeList", paramMap);
   }

   @Override
   public int updateContribution(PchContVo vo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pch.updateContribution", vo);
   }

   @Override
   public List<PchExcelVo> selectProjectExcelList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pch.selectProjectExcelList", paramMap);
   }

   /** 관리자 - 기여율평가 - 개인별 기여율관리 */
   @Override
   public List<PchEmpVo> selectEmplNoList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pch.selectEmplNoList", paramMap);
   }

   @Override
   public List<PchContVo> selectEmplNoContributeList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pch.selectEmplNoContributeList", paramMap);
   }

   @Override
   public List<PchExcelVo> selectEmplNoExcelList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pch.selectEmplNoExcelList", paramMap);
   }

   /** 관리자 - 기여율평가 - 과제별 인원관리 */
   @Override
   public List<PchPrjVo> selectPhcProjectCodeList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pch.selectPhcProjectCodeList", paramMap);
   }

   @Override
   public List<PchEmpVo> selectPhcEmpList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pch.selectPhcEmpList", paramMap);
   }

   @Override
   public int deletePhcEmplNo(Map<String, String> paramMap) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pce.pch.deletePhcEmplNo", paramMap);
   }

}

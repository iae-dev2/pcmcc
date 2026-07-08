package kr.re.iae.pcmcc.biz.pcc.pca.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.pcc.pca.dao.PcaDao;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.EmpVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekFileVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.PrjVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekVo;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.FileVo;

@Repository
public class PcaDaoImpl implements PcaDao {

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   @Override
   public List<PrjVo> selectPrjGoal(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcc.pca.selectPrjGoal", paramMap);
   }

   @Override
   public List<PrjVo> selectOldGoal(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcc.pca.selectOldGoal", paramMap);
   }

   @Override
   public int updateProjectGoal(PrjVo vo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pcc.pca.updateProjectGoal", vo);
   }

   @Override
   public List<EmpVo> selectContributionList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcc.pca.selectContributionList", paramMap);
   }

   @Override
   public float selectContributionSum(Map<String, String> paramMap) {
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.pcc.pca.selectContributionSum", paramMap);
   }

   @Override
   public List<WeekFileVo> selectFileInfo(WeekFileVo vo) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcc.pca.selectFileInfo", vo);
   }

   @Override
   public int updateWeekFile(WeekFileVo vo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pcc.pca.updateWeekFile", vo);
   }

   @Override
   public List<WeekVo> selectWrmDataList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcc.pca.selectWrmDataList", paramMap);
   }

   @Override
   public List<Map<String, String>> selectDeptNameList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcc.pca.selectDeptNameList", paramMap);
   }

   @Override
   public List<EmpVo> selectAdditionalEmplNoList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcc.pca.selectAdditionalEmplNoList", paramMap);
   }

   @Override
   public int insertEstiEmplNo(Map<String, String> paramMap) {
      int count = sqlsession.insert("kr.re.iae.pcmcc.biz.pcc.pca.insertEstiEmplNo", paramMap);

      if (count > 0) {
         return count;
      }
      else {
         return -1;
      }
   }

   @Override
   public int deleteEstiEmplNo(Map<String, String> paramMap) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcc.pca.deleteEstiEmplNo", paramMap);
   }

   @Override
   public int updateContribution(EmpVo vo) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcc.pca.updateContribution", vo);
   }

   @Override
   public int updateEstiStep2(Map<String, String> paramMap) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pcc.pca.updateEstiStep2", paramMap);
   }

   @Override
   public int updateEstiStep2CheckRetire(Map<String, String> paramMap) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pcc.pca.updateEstiStep2CheckRetire", paramMap);
   }

   @Override
   public String selectReview(Map<String, String> paramMap) {
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.pcc.pca.selectReview", paramMap);
   }

   @Override
   public int updateEstiStep5(Map<String, String> paramMap) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcc.pca.updateEstiStep5", paramMap);
   }

}

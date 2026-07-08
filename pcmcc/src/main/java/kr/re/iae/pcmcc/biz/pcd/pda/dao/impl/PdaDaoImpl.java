package kr.re.iae.pcmcc.biz.pcd.pda.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.pcd.pda.dao.PdaDao;
import kr.re.iae.pcmcc.biz.pcd.pda.vo.EmpVo;

@Repository
public class PdaDaoImpl implements PdaDao {

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   @Override
   public List<EmpVo> selectProjectEmpList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcd.pda.selectProjectEmpList", paramMap);
   }

   @Override
   public String selectReview(Map<String, String> paramMap) {
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.pcd.pda.selectReview", paramMap);
   }

   @Override
   public int insertReview(Map<String, String> paramMap) {
      int count = sqlsession.insert("kr.re.iae.pcmcc.biz.pcd.pda.insertReview", paramMap);

      if (count > 0) {
         return count;
      }
      else {
         return -1;
      }
   }

   @Override
   public int updateEstiStep4(Map<String, String> paramMap) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcd.pda.updateEstiStep4", paramMap);
   }

   @Override
   public int updateEstiStep3(Map<String, String> paramMap) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcd.pda.updateEstiStep3", paramMap);
   }

}

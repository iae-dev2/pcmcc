package kr.re.iae.pcmcc.biz.pcj.pja.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.pcj.pja.dao.PjaDao;
import kr.re.iae.pcmcc.biz.pcj.pja.vo.EmpVo;

@Repository
public class PjaDaoImpl implements PjaDao {

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   @Override
   public List selectProjectCodeList(Map<String, Object> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcj.pja.selectProjectCodeList", paramMap);
   }

   @Override
   public List<EmpVo> selectProjectEmpList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcj.pja.selectProjectEmpList", paramMap);
   }

   @Override
   public String selectReview(Map<String, String> paramMap) {
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.pcj.pja.selectReview", paramMap);
   }

}

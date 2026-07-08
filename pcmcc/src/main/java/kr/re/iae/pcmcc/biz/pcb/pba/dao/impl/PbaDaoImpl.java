package kr.re.iae.pcmcc.biz.pcb.pba.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.pcb.pba.dao.PbaDao;
import kr.re.iae.pcmcc.biz.pcb.pba.vo.AddVo;
import kr.re.iae.pcmcc.biz.pcb.pba.vo.PrjCodeVo;

@Repository
public class PbaDaoImpl implements PbaDao {

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   @Override
   public List<PrjCodeVo> selectPrjCodeList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcb.pba.selectProjectCodeList", paramMap);
   }

   @Override
   public float selectAverageCont(Map<String, String> paramMap) {
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.pcb.pba.selectAverageCont", paramMap);
   }

   @Override
   public List<AddVo> selectAdditionalPrjList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pcb.pba.selectAdditionalProjectList", paramMap);
   }

   @Override
   public int insertPrjCode(PrjCodeVo vo) {
      int count = sqlsession.insert("kr.re.iae.pcmcc.biz.pcb.pba.insertProjectCode", vo);

      if (count > 0) {
         return count;
      }
      else {
         return -1;
      }
   }

   @Override
   public int deletePrjCode(PrjCodeVo vo) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcb.pba.deleteProjectCode", vo);
   }

   @Override
   public int updateWork(PrjCodeVo vo) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcb.pba.updateWork", vo);
   }

   @Override
   public int updateFinish(PrjCodeVo vo) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcb.pba.updateFinish", vo);
   }

   @Override
   public int updateConfirm(PrjCodeVo vo) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pcb.pba.updateConfirm", vo);
   }

}

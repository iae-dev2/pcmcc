package kr.re.iae.pcmcc.biz.pce.pcg.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.pce.pcg.dao.PcgDao;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgaVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgbVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgcVo;

@Repository
public class PcgDaoImpl implements PcgDao {

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   @Override
   public List<PgaVo> selectEstiCode(Map param) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pcg.selectEstiCode", param);
   }

   @Override
   public String insertEstiCode(PgaVo pgaVo) {
      int count = sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pcg.insertEstiCode", pgaVo);
      if (count > 0) {
         return pgaVo.getvEstiCode();
      }
      else {
         return "fail";
      }
   }

   @Override
   public int updateEstiCode(PgaVo pgaVo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.updateEstiCode", pgaVo);
   }

   @Override
   public int deleteEstiCode(Map param) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.deleteEstiCode", param);
   }

   @Override
   public List<PgbVo> checkProject(Map param) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pcg.checkProject", param);
   }

   @Override
   public List<PgbVo> selectProjectCodeList(Map param) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pcg.selectProjectCodeList", param);
   }

   @Override
   public int insertProjectCode(PgbVo pgbVo) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pcg.insertProjectCode", pgbVo);
   }

   @Override
   public int updateProjectCode(PgbVo pgbVo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.updateProjectCode", pgbVo);
   }

   @Override
   public int deleteProjectCode(Map param) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.deleteProjectCode", param);
   }

   @Override
   public int deleteProjectCodeAll(Map<String, String> param) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.deleteProjectCodeAll", param);
   }

   @Override
   public List<PgbVo> selectProjectCodeExcelList(Map param) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pcg.selectProjectCodeExcelList", param);
   }

   @Override
   public List<PgcVo> selectEmplNoList(Map param) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pcg.selectEmplNoList", param);
   }

   @Override
   public int insertEmplNo(PgcVo pgcVo) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pcg.insertEmplNo", pgcVo);
   }

   @Override
   public int updateEmplNo(PgcVo pgcVo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.updateEmplNo", pgcVo);
   }

   @Override
   public int deleteEmplNo(Map param) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.deleteEmplNo", param);
   }

   @Override
   public int deleteAll(Map<String, String> param) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.deleteAll", param);
   }

   @Override
   public int copyPgc(Map<String, String> param) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcg.copyPgc", param);
   }

}

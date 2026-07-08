package kr.re.iae.pcmcc.biz.pce.pci.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.pce.pci.dao.PciDao;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaHalfYearVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PibVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PicVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PidVo;

@Repository
public class PciDaoImpl implements PciDao {

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비관리 */
   @Override
   public List<PiaVo> selectPiaList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.selectPiaList", paramMap);
   }

   @Override
   public List<Map<String, String>> checkPiaProject(Map paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.checkPiaProject", paramMap);
   }

   @Override
   public int insertPia(PiaVo piaVo) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pci.insertPia", piaVo);
   }

   @Override
   public int updatePia(PiaVo piaVo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.updatePia", piaVo);
   }

   @Override
   public int deletePia(Map<String, String> paramMap) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.deletePia", paramMap);
   }

   @Override
   public int deletePiaAll(Map<String, String> paramMap) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.deletePiaAll", paramMap);
   }

   @Override
   public int insertPiaMonthlyAuto(Map<String, String> paramMap) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pci.insertPiaMonthlyAuto", paramMap);
   }

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비관리 */
   @Override
   public List<PiaHalfYearVo> selectPiaHalfYearList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.selectPiaHalfYearList", paramMap);
   }

   @Override
   public int insertPiaHalfYear(PiaHalfYearVo piaVo) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pci.insertPiaHalfYear", piaVo);
   }

   @Override
   public int updatePiaHalfYear(PiaHalfYearVo piaVo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.updatePiaHalfYear", piaVo);
   }

   // 내부인건비/간접비 계산(분기별/반기별)
   @Override
   public int deletePiaHalfYear(Map<String, String> paramMap) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.deletePiaHalfYear", paramMap);
   }

   @Override
   public int insertPiaHalfYearHist(Map<String, String> paramMap) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pci.insertPiaHalfYearHist", paramMap);
   }

   @Override
   public int insertPiaHalfYearAuto(Map<String, String> paramMap) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pci.insertPiaHalfYearAuto", paramMap);
   }

   /** 관리자 - 인건비 확보 - 개인별인건비 */
   @Override
   public List<PibVo> selectPibList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.selectPibList", paramMap);
   }

   @Override
   public int insertPib(PibVo pibVo) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pci.insertPib", pibVo);
   }

   @Override
   public int updatePib(PibVo pibVo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.updatePib", pibVo);
   }

   @Override
   public int deletePib(Map<String, String> paramMap) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.deletePib", paramMap);
   }

   @Override
   public int deletePibAll(Map<String, String> paramMap) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.deletePibAll", paramMap);
   };

   /** 관리자 - 인건비 확보 - 인건비확보율관리 */
   @Override
   public List<PicVo> selectPicGrid2List(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.selectPicGrid2List", paramMap);
   }

   @Override
   public List<PicVo> selectPicGrid3List(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.selectPicGrid3List", paramMap);
   }

   @Override
   public int deletePic(Map<String, String> paramMap) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pce.pci.deletePic", paramMap);
   }

   @Override
   public int insertPic(Map<String, String> paramMap) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pci.insertPic", paramMap);
   }

   @Override
   public int insertPicHist(Map<String, String> paramMap) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pci.insertPicHist", paramMap);
   }

   @Override
   public List<PidVo> selectPidList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.selectPidList", paramMap);
   }

   @Override
   public List<PidVo> selectPieList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.selectPieList", paramMap);
   }

   @Override
   public List<PicVo> selectPifEntrustList(Map<String, String> paramMap) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pci.selectPifEntrustList", paramMap);
   }

   @Override
   public int updateEntrust(Map<String, Object> paramMap) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pci.updateEntrust", paramMap);
   }
}

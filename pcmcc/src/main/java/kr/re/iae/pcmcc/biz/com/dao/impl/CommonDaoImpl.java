package kr.re.iae.pcmcc.biz.com.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.com.dao.CommonDao;

@Repository("commonDao")
public class CommonDaoImpl implements CommonDao {

   private static final Logger logger = LoggerFactory.getLogger(CommonDaoImpl.class);

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   @Override
   public List selectEstiCodeList(Map param) {
      logger.debug("평가코드 조회 DAO : selectEstiCodeList");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectEstiCodeList", param);
      return result;
   }

   @Override
   public List selectProjectCodeList(Map param) {
      logger.debug("공통코드 조회 DAO : selectProjectCodeList");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectProjectCodeList", param);
      return result;
   }

   @Override
   public List selectCommonCodeList(Map param) {
      logger.debug("공통코드 조회 DAO : selectCommonCodeList");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectCommonCodeList", param);
      return result;
   }

   @Override
   public List selectAccountCommonCodeList(Map param) {
      logger.debug("공통코드 조회 DAO : selectAccountCommonCodeList");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectAccountCommonCodeList", param);
      return result;
   }

   @Override
   public List selectHrCommonCodeList(Map param) {
      logger.debug("공통코드 조회 DAO : selectHumanCommonCodeList");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectHrCommonCodeList", param);
      return result;
   }

   @Override
   public List selectHrClassCodeList(Map param) {
      logger.debug("공통코드 조회 DAO : selectHumanClassCodeList");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectHrClassCodeList", param);
      return result;
   }

   @Override
   public List selectTaxCodeList(Map param) {
      logger.debug("공통코드 조회 DAO : selectAccountCommonCodeList");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectTaxCodeList", param);
      return result;
   }

   @Override
   public List selectGwCommonCodeList(Map param) {
      logger.debug("공통코드 조회 DAO : selectAccountCommonCodeList");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectGwCommonCodeList", param);
      return result;
   }

   @Override
   public List<Map<String, String>> selectHrInfo(Map<String, Object> param) {
      logger.debug("사원 목록 조회 DAO : selectHrInfo");
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectHrInfo", param);
   }

   @Override
   public List selectEmployee(Map param) {
      logger.debug("사원 개별 조회 DAO : selectEmployee");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectEmployee", param);
      return result;
   }

   @Override
   public List selectHrPosition(Map param) {
      logger.debug("직위 목록 조회 DAO : selectHrPosition");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectHrPosition", param);
      return result;
   }

   @Override
   public List selectHrDuty(Map param) {
      logger.debug("직책 목록 조회 DAO : selectHrDuty");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectHrDuty", param);
      return result;
   }

   @Override
   public List selectHrDept(Map param) {
      logger.debug("부서 목록 조회 DAO : selectHrDept");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectHrDept", param);
      return result;
   }

   @Override
   public Map<String, String> checkDept(Map param) {
      logger.debug("부서 코드 체크 DAO : selectDept");
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.com.commonSql.checkDept", param);
   }

   @Override
   public List selectHrTeam(Map param) {
      logger.debug("팀 목록 조회 DAO : selectHrTeam");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectHrTeam", param);
      return result;
   }

   @Override
   public List selectKeyProject(Map param) {
      logger.debug("과제 목록 조회 DAO : selectKeyProject");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectKeyProject", param);
      return result;
   }

   @Override
   public List selectProject(Map param) {
      logger.debug("과제 목록 조회 DAO : selectProject");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectProject", param);
      return result;
   }

   @Override
   public Map<String, String> checkProject(Map param) {
      logger.debug("차수과제 코드체크 DAO : selectProject");
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.com.commonSql.checkProject", param);
   }

   @Override
   public List selectBankInfo(Map param) {
      logger.debug("은행 코드 조회 DAO : selectBankInfo");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectBankInfo", param);
      return result;
   }

   @Override
   public List selectCustomer(Map param) {
      logger.debug("거래처 목록 조회 DAO : selectCustomer");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectCustomer", param);
      return result;
   }

   @Override
   public int selectFileSeq() {
      logger.debug("파일Seq조회 DAO : selectFileSeq");
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.com.commonSql.selectFileSeq");
   }

   @Override
   public List selectBudgetCode(Map param) {
      logger.debug("세목코드 조회 DAO : selectBudgetCode");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectBudgetCode", param);
      return result;
   }

   @Override
   public List selectDetailBudgetCode(Map param) {
      logger.debug("세세목코드 조회 DAO : selectDetailBudgetCode");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectDetailBudgetCode", param);
      return result;
   }

   @Override
   public List selectBudgetTypeB(Map param) {
      //세세목코드만 조회하는 팝업
      logger.debug("예산코드 조회 DAO : selectBudgetTypeB");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectBudgetTypeB", param);
      return result;
   }

   @Override
   public List selectLinkProject(Map param) {
      logger.debug("연계프로젝트조회 DAO : selectLinkProject");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectLinkProject", param);
      return result;
   }

   @Override
   public List selectAccount(Map param) {
      logger.debug("계정코드 조회 DAO : selectAccount");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectAccount", param);
      return result;
   }

   @Override
   public List selectOppVou(Map param) {
      logger.debug("상계전표 조회 DAO : selectOppVou");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectOppVou", param);
      return result;
   }

   @Override
   public List selectPayCode(Map param) {
      logger.debug("급여코드 조회 DAO : selectPayment");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectPayCode", param);
      return result;
   }

   @Override
   public List selectPayCodeList(Map param) {
      logger.debug("콤보박스 조회용 급여코드 조회 DAO : selectPayment");
      List result = sqlsession.selectList("kr.re.iae.pcmcc.biz.com.commonSql.selectPayCodeList", param);
      return result;
   }

}

package kr.re.iae.pcmcc.biz.com.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.re.iae.pcmcc.biz.com.dao.CommonDao;
import kr.re.iae.pcmcc.biz.com.service.CommonService;

@Service("commonService")
public class CommonServiceImpl implements CommonService {

   @Autowired
   private CommonDao comDao;

   @Override
   public List selectEstiCodeList(Map mapParam) {
      List list = comDao.selectEstiCodeList(mapParam);
      return list;
   }

   @Override
   public List selectProjectCodeList(Map mapParam) {
      List list = comDao.selectProjectCodeList(mapParam);
      return list;
   }

   @Override
   public List selectCommonCodeList(Map mapParam) {
      List list = comDao.selectCommonCodeList(mapParam);
      return list;
   }

   @Override
   public List selectAccountCommonCodeList(Map mapParam) {
      List list = comDao.selectAccountCommonCodeList(mapParam);
      return list;
   }

   @Override
   public List selectHrCommonCodeList(Map mapParam) {
      List list = comDao.selectHrCommonCodeList(mapParam);
      return list;
   }

   @Override
   public List selectHrClassCodeList(Map mapParam) {
      List list = comDao.selectHrClassCodeList(mapParam);
      return list;
   }

   @Override
   public List selectTaxCodeList(Map mapParam) {
      List list = comDao.selectTaxCodeList(mapParam);
      return list;
   }

   @Override
   public List selectGwCommonCodeList(Map mapParam) {
      List list = comDao.selectGwCommonCodeList(mapParam);
      return list;
   }

   @Override
   public List<Map<String, String>> selectHrInfo(Map<String, Object> mapParam) {
      return comDao.selectHrInfo(mapParam);
   }

   @Override
   public List selectEmployee(Map mapParam) {
      List list = comDao.selectEmployee(mapParam);
      return list;
   }

   @Override
   public List selectHrPosition(Map mapParam) {
      List list = comDao.selectHrPosition(mapParam);
      return list;
   }

   @Override
   public List selectHrDuty(Map mapParam) {
      List list = comDao.selectHrDuty(mapParam);
      return list;
   }   

   @Override
   public List selectHrDept(Map mapParam) {
      List list = comDao.selectHrDept(mapParam);
      return list;
   }

   public Map<String, String> checkDept(Map<String, String> mapParam) {
      return comDao.checkDept(mapParam);
   }

   @Override
   public List selectHrTeam(Map mapParam) {
      List list = comDao.selectHrTeam(mapParam);
      return list;
   }

   @Override
   public List selectBankInfo(Map mapParam) {
      List list = comDao.selectBankInfo(mapParam);
      return list;
   }

   @Override
   public List selectKeyProject(Map mapParam) {
      List list = comDao.selectKeyProject(mapParam);
      return list;
   }

   @Override
   public List selectProject(Map mapParam) {
      List list = comDao.selectProject(mapParam);
      return list;
   }

   public Map<String, String> checkProject(Map<String, String> mapParam) {
      return comDao.checkProject(mapParam);
   }

   @Override
   public List selectCustomer(Map mapParam) {
      List list = comDao.selectCustomer(mapParam);
      return list;
   }

   @Override
   public int selectFileSeq() {
      return comDao.selectFileSeq();
   }

   @Override
   public List selectBudgetCode(Map mapParam) {
      List list = comDao.selectBudgetCode(mapParam);
      return list;
   }

   @Override
   public List selectDetailBudgetCode(Map mapParam) {
      List list = comDao.selectDetailBudgetCode(mapParam);
      return list;
   }

   @Override
   public List selectBudgetTypeB(Map mapParam) {
      List list = comDao.selectBudgetTypeB(mapParam);
      return list;
   }

   @Override
   public List selectLinkProject(Map mapParam) {
      List list = comDao.selectLinkProject(mapParam);
      return list;
   }

   @Override
   public List selectAccount(Map mapParam) {
      List list = comDao.selectAccount(mapParam);
      return list;
   }

   @Override
   public List selectOppVou(Map mapParam) {
      List list = comDao.selectOppVou(mapParam);
      return list;
   }

   @Override
   public List selectPayCode(Map mapParam) {
      List list = comDao.selectPayCode(mapParam);
      return list;
   }

   @Override
   public List selectPayCodeList(Map mapParam) {
      List list = comDao.selectPayCodeList(mapParam);
      return list;
   }

}

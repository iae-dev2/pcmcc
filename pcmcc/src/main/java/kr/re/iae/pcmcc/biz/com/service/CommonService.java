package kr.re.iae.pcmcc.biz.com.service;

import java.util.List;
import java.util.Map;

public interface CommonService {

   public List selectEstiCodeList(Map mapParam);

   public List selectProjectCodeList(Map mapParam);

   public List selectCommonCodeList(Map param);

   public List selectAccountCommonCodeList(Map param);

   public List selectHrCommonCodeList(Map param);

   public List selectHrClassCodeList(Map param);

   public List selectTaxCodeList(Map param);

   public List selectGwCommonCodeList(Map param);

   public List<Map<String, String>> selectHrInfo(Map<String, Object> mapParam);

   public List selectEmployee(Map param);

   public List selectHrPosition(Map param);

   public List selectHrDuty(Map param);

   public List selectHrDept(Map param);

   public Map<String, String> checkDept(Map<String, String> param);

   public List selectHrTeam(Map param);

   public List selectBankInfo(Map mapParam);

   public List selectKeyProject(Map param);

   public List selectProject(Map param);

   public Map<String, String> checkProject(Map<String, String> param);

   public List selectCustomer(Map param);

   public int selectFileSeq();

   public List selectBudgetCode(Map mapParam);

   public List selectDetailBudgetCode(Map mapParam);

   public List selectBudgetTypeB(Map mapParam);

   public List selectLinkProject(Map param);

   public List selectAccount(Map mapParam);

   public List selectOppVou(Map mapParam);

   public List selectPayCode(Map mapParam);

   public List selectPayCodeList(Map mapParam);

}

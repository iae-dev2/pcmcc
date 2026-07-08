package kr.re.iae.pcmcc.biz.com.dao;

import java.util.List;
import java.util.Map;

public interface CommonDao {

   public List selectEstiCodeList(Map param);

   public List selectProjectCodeList(Map param);

   public List selectCommonCodeList(Map param);

   public List selectAccountCommonCodeList(Map param);

   public List selectHrCommonCodeList(Map param);

   public List selectHrClassCodeList(Map param);

   public List selectTaxCodeList(Map param);

   public List selectGwCommonCodeList(Map param);

   public List<Map<String, String>> selectHrInfo(Map<String, Object> param);

   public List selectEmployee(Map mapParam);

   public List selectHrPosition(Map mapParam);

   public List selectHrDuty(Map mapParam);

   public List selectHrDept(Map mapParam);

   public Map<String, String> checkDept(Map param);

   public List selectHrTeam(Map mapParam);

   public List selectBankInfo(Map mapParam);

   public List selectKeyProject(Map mapParam);

   public List selectProject(Map mapParam);

   public Map<String, String> checkProject(Map<String, String> param);

   public List selectCustomer(Map mapParam);

   public int selectFileSeq();

   public List selectBudgetCode(Map param);

   public List selectDetailBudgetCode(Map param);

   public List selectBudgetTypeB(Map param);

   public List selectLinkProject(Map param);

   public List selectAccount(Map param);

   public List selectOppVou(Map param);

   public List selectPayCode(Map param);

   public List selectPayCodeList(Map param);

}

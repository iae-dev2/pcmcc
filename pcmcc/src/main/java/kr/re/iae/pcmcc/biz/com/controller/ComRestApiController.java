package kr.re.iae.pcmcc.biz.com.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.View;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.re.iae.pcmcc.biz.com.service.CommonService;
import kr.re.iae.pcmcc.biz.com.util.AuthenticationInterceptor;
import kr.re.iae.pcmcc.biz.com.util.ExcelView;

@RestController
public class ComRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(ComRestApiController.class);

   @Autowired
   private CommonService commonService;

   /**
    * @default used by 예산코드 조회 TAC4001
    * @param
    */
   @RequestMapping(value = "/com/getEstiCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getEstiCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가코드 조회");

      List list = commonService.selectEstiCodeList(paramMap);

      return list;
   }

   /**
    * @default used by 과제코드 조회 TAC4003
    * @param
    */
   @RequestMapping(value = "/com/getProjectCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getProjectCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가코드 조회");

      List list = commonService.selectProjectCodeList(paramMap);

      return list;
   }

   /**
    * @default used by 공통코드 조회 TCZ2099
    * @param
    */
   @RequestMapping(value = "/com/getCommonCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getCommonCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 공통코드 조회");

      List list = commonService.selectCommonCodeList(paramMap);

      return list;
   }

   /**
    * @default used by 회계용 공통코드조회 TEZ2099
    * @param
    */
   @RequestMapping(value = "/com/getAccountCommonCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getAccountCommonCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 회계 공통코드 조회");

      List list = commonService.selectAccountCommonCodeList(paramMap);

      return list;
   }

   /**
    * @default used by 인사용 공통코드조회 TAZ2099
    * @param
    */
   @RequestMapping(value = "/com/getHrCommonCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getHumanCommonCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인사 공통코드 조회");

      List list = commonService.selectHrCommonCodeList(paramMap);

      return list;
   }

   /**
    * @default used by 인사용 표준명칭조회 TAZ2005 TAZ2006
    * @param
    */
   @RequestMapping(value = "/com/getHrClassCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getHrClassCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인사 공통코드 조회");

      List list = commonService.selectHrClassCodeList(paramMap);
      return list;
   }

   /**
    * @default used by 세무 공통코드조회 TEZ2002
    * @param
    */
   @RequestMapping(value = "/com/getTaxCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getTaxCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 회계 공통코드 조회");

      List list = commonService.selectTaxCodeList(paramMap);

      return list;
   }

   /**
    * @default used by 그룹웨어 공통코드조회 IGWU7.TKZ2099
    * @param
    */
   @RequestMapping(value = "/com/getGwCommonCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getGwCommonCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 회계 공통코드 조회");

      List list = commonService.selectGwCommonCodeList(paramMap);

      return list;
   }

   /**
    * @default used by 사원 목록 조회 공통팝업
    * @param Map { vName: 사원이름, vEmplNo: 사원번호, vRetire: 퇴직여부 }
    */
   @RequestMapping(value = "/com/getHrInfo", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<Map<String, String>> getHrInfo(@RequestParam Map<String, Object> paramMap, @RequestParam(value = "vRetire", required = false) String vRetire) {
      logger.debug("Welcome rest api. 사원 목록 조회");

      if (paramMap.get("vEmplNo") != null) {
         paramMap.put("vEmpLen", paramMap.get("vEmplNo").toString().length());
      }

      paramMap.put("vRetire", vRetire);

      return commonService.selectHrInfo(paramMap);
   }

   /**
    * @default used by 직위 목록 조회 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/getHrPosition", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getHrPosition(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 직위 목록 조회");

      List list = commonService.selectHrPosition(null);

      return list;
   }

   /**
    * @default used by 직책 목록 조회
    * @param
    */
   @RequestMapping(value = "/com/getHrDuty", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getHrDuty(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 직책 목록 조회");

      List list = commonService.selectHrDuty(null);

      return list;
   }

   /**
    * @default used by 부서목록 조회 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/getHrDept", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getHrDept(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 부서 목록 조회");

      List list = commonService.selectHrDept(paramMap);

      return list;
   }

   /**
    * @default used by 부서목록 체크 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/checkHrDept", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public Map<String, String> checkHrDept(@RequestParam(value = "vDeptCode") String vdeptcode) {
      logger.debug("Welcome rest api. 부서 정보 체크");

      Map<String, String> paramMap = new HashMap<String, String>();
      paramMap.put("vDeptCode", vdeptcode);

      Map<String, String> emptyMap = new HashMap<String, String>();

      emptyMap.put("vDeptCode", "");
      emptyMap.put("vDeptName", "");

      Map<String, String> map = commonService.checkDept(paramMap);
      if (map == null) {
         map = emptyMap;
      }

      return map;
   }

   /**
    * @default used by 팀 조회 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/getHrTeam", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getHrTeam(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 팀 목록 조회");

      List list = commonService.selectHrTeam(paramMap);

      return list;
   }

   /**
    * @default used by 은행코드 조회 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/getBankInfo", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getBankInfo(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 은행코드 조회");

      List list = commonService.selectBankInfo(paramMap);

      return list;
   }

   /**
    * @default used by 총괄 과제 목록 조회 공통팝업
    * @param code
    *           required
    */
   @RequestMapping(value = "/com/getKeyProjectList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getKeyPrj(@RequestParam(value = "vTeamCode", required = false) String code) {
      logger.debug("Welcome rest api. 총괄과제 목록 조회");

      Map<String, String> paramMap = new HashMap<String, String>();
      paramMap.put("vTeamCode", code);

      List list = commonService.selectKeyProject(paramMap);

      return list;
   }

   /**
    * @default used by 과제 목록 조회 공통팝업
    * @param code
    *           required
    */
   @RequestMapping(value = "/com/getProjectList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getPrj(@RequestParam(value = "vTeamCode", required = false) String code, @RequestParam(value = "vEstiStep", required = false, defaultValue = "3") String step) {
      logger.debug("Welcome rest api. 과제 목록 조회");

      Map<String, String> paramMap = new HashMap<String, String>();
      paramMap.put("vTeamCode", code);
      paramMap.put("vEstiStep", step);

      List list = commonService.selectProject(paramMap);

      return list;
   }

   /**
    * @default used by 차수과제 정보 체크
    * @param code
    *           required
    */
   @RequestMapping(value = "/com/checkProject", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public Map<String, String> checkPorject(@RequestParam(value = "vProjectCode") String vprojectcode) {
      logger.debug("Welcome rest api. 차수과제 정보 체크");

      Map<String, String> paramMap = new HashMap<String, String>();
      paramMap.put("vProjectCode", vprojectcode);

      Map<String, String> emptyMap = new HashMap<String, String>();

      emptyMap.put("vProjectCode", "");
      emptyMap.put("vKeyProjectName", "");

      Map<String, String> map = commonService.checkProject(paramMap);
      if (map == null) {
         map = emptyMap;
      }

      return map;
   }

   /**
    * @default used by 거래처 조회 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/getCustomer", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getCustomer(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 거래처 조회");

      // Map<String, String> paramMap = new HashMap<String, String>();
      // paramMap.put("VTEAMCODE", code);

      List list = commonService.selectCustomer(paramMap);

      return list;
   }

   /**
    * @default used by 예산코드 조회 공통팝업 - master
    * @param
    */
   @RequestMapping(value = "/com/getBudgetMaster", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getBudget(@RequestParam(value = "vProjectCode", required = false) String prjcode) {
      logger.debug("Welcome rest api. 거래처 조회");
      logger.debug("vProjectCode : " + prjcode);

      Map<String, String> paramMap = new HashMap<String, String>();
      paramMap.put("vProjectCode", prjcode);

      List list = commonService.selectBudgetCode(paramMap);

      return list;
   }

   /**
    * @default used by 예산코드 조회 공통팝업 - detail
    * @param
    */
   @RequestMapping(value = "/com/getBudgetDetail", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getDetailBudget(@RequestParam(value = "vParentBudgetCode") String code, @RequestParam(value = "vProjectCode", required = false) String prjcode) {
      logger.debug("Welcome rest api. 예산코드 조회");

      Map<String, String> paramMap = new HashMap<String, String>();
      paramMap.put("vProjectCode", prjcode);
      paramMap.put("vParentBudgetCode", code);

      List list = commonService.selectDetailBudgetCode(paramMap);

      return list;
   }

   /**
    * @default used by 예산코드 조회 공통팝업(그리드 1개)
    * @param
    */
   @RequestMapping(value = "/com/getBudgetTypeB", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getBudgetTypeB(@RequestParam Map<String, String> paramMap, @RequestParam(value = "vProjectCode", required = false) String prjcode) {
      logger.debug("Welcome rest api. 예산코드 조회");

      paramMap.put("vProjectCode", prjcode);

      List list = commonService.selectBudgetTypeB(paramMap);

      return list;
   }

   /**
    * @default used by 연계과제 조회 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/getLinkProject", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getLinkProject() {
      logger.debug("Welcome rest api. 연계과제 조회");

      Map<String, String> paramMap = new HashMap<String, String>();

      List list = commonService.selectLinkProject(paramMap);

      return list;
   }

   /**
    * @default used by 계정과목 조회 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/getAccount", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getAccount(@RequestParam Map<String, String> paramMap, @RequestParam(value = "accountBalance", required = false) String accountBalance) {
      logger.debug("Welcome rest api, 계정정보 조회");
      logger.debug("accountBalance : " + accountBalance);

      paramMap.put("accountBalance", accountBalance);

      List list = commonService.selectAccount(paramMap);

      return list;
   }

   /**
    * @default used by 상계전표 조회 공통팝업
    * @param Map
    *           {aOppAccount:계정코드}
    */
   @RequestMapping(value = "/com/getOppVou", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getOppVou(@RequestParam Map<String, String> paramMap, @RequestParam(value = "aOppAccount", required = false) String aOppAccount) {
      logger.debug("Welcome rest api. 상계전표 조회");

      paramMap.put("aOppAccount", aOppAccount);

      List list = commonService.selectOppVou(paramMap);

      return list;
   }

   /**
    * @default used by 급여코드 조회 공통팝업
    * @param
    */
   @RequestMapping(value = "/com/getPayCode", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getPayCode(@RequestParam Map<String, String> paramMap, @RequestParam(value = "vYear", required = false) String vYear) {
      logger.debug("Welcome rest api, 급여코드 조회");
      logger.debug("vYear : " + vYear);

      paramMap.put("vYear", vYear);

      List list = commonService.selectPayCode(paramMap);

      return list;
   }

   /**
    * @default used by 급여코드 조회 콤보박스 전용
    * @param
    */
   @RequestMapping(value = "/com/getPayCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List getPayCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api, 급여코드 조회 - 콤보박스 조회 용");

      List list = commonService.selectPayCodeList(paramMap);

      return list;
   }

   /**
    * @default used by 엑셀 다운로드
    * @param
    * @throws UnsupportedEncodingException
    */
   @RequestMapping(value = "/com/exportExcel", produces = "html/text;charset=UTF-8", method = RequestMethod.POST)
   public View exportExcel(Model model, HttpServletRequest request) throws UnsupportedEncodingException {
      logger.debug("Welcome rest apo, jqxGrid Export Controller - Excel");

      String decode_info = new String(request.getParameter("jqxGridInfo").getBytes("8859_1"), "UTF-8");
      logger.debug(decode_info);

      try {
         ObjectMapper mapper = new ObjectMapper();
         Map<String, Object> map = new HashMap<String, Object>();
         map = mapper.readValue(decode_info, new TypeReference<Map<String, Object>>() {
         });

         String title = (String) map.get("title");
         model.addAttribute("title", map.get("title"));

         Map<String, Object> columns = (Map) map.get("columninfo");
         model.addAttribute("columns", columns);

         List<Map<String, Object>> datalist = (ArrayList) map.get("datalist");
         model.addAttribute("datalist", datalist);
      }
      catch (JsonGenerationException e) {
         e.printStackTrace();
      }
      catch (JsonMappingException e) {
         e.printStackTrace();
      }
      catch (IOException e) {
         e.printStackTrace();
      }

      return new ExcelView();
   }

   /**
    * @default used by 과제관리시스템 접속 URL 반환
    * @param
    * @throws
    */
   @RequestMapping(value = "/com/getPrmUrl", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public String getProUrl(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api, 과제관리시스템 접속 URL 조회");

      String URL = "";
      URL = AuthenticationInterceptor.encrypt(paramMap.get("vEmplNo")).replaceAll("[+]", "%2B");

      return URL;
   }

}

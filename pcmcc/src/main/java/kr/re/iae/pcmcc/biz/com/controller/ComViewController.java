package kr.re.iae.pcmcc.biz.com.controller;

import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ComViewController {

   private static final Logger logger = LoggerFactory.getLogger(ComViewController.class);

   @Value("#{jdbc['jdbc.dev.url']}")
   private String jdbc_url;

   /**
    * 기본 컨텍스트 접근 시 리다이렉트
    */
   @RequestMapping(value = "/", method = RequestMethod.GET)
   public String getHome(Locale locale, Model model, @RequestParam(value = "emplno", required = false) String vemplno, RedirectAttributes redirectAttributes, HttpServletRequest request) {
      logger.debug("Welcome home! 기여도평가 시스템 ROOT 접속");

      HttpSession session = request.getSession();

      @SuppressWarnings("unchecked")
      Map<String, String> map = (Map<String, String>) session.getAttribute("login");

      if (map != null) {
         return "redirect:/pca";
      }

      return "redirect:/loginError";
   }

   /**
    * 에러 페이지 2021-06-28
    */
   @RequestMapping(value = "/loginError", method = RequestMethod.GET)
   public String getLoginErrorView(Locale locale, Model model) {
      logger.debug("Welcome home! 로그인 에러");
      String state = "o";

      if ((jdbc_url).contains("192.168")) {
         state = "d";
      }

      model.addAttribute("state", state);

      return "com/login.content";
   }

   /**
    * robots.txt 2021-03-15
    */
   @RequestMapping(value = "/robots.txt")
   @ResponseBody
   public String robots() {
      return "User-agent: *\nDisallow: /\n";
   }

   /**
    * 사원 목록 조회 팝업
    */
   @RequestMapping(value = "/com/emp/popup", method = RequestMethod.GET)
   public String getCommonEmploeePopup(Locale locale, Model model, @RequestParam(value = "vName", required = false) String vname, @RequestParam(value = "vEmplNo", required = false) String vemplno,
         @RequestParam(value = "vRetire", required = false) String vRetire) {
      logger.debug("사원 목록 조회 팝업");
      model.addAttribute("vName", vname);
      model.addAttribute("vEmplNo", vemplno);
      model.addAttribute("vRetire", vRetire);

      return "/com/emp.content";
   }

   /**
    * 직위 목록 조회 팝업
    */
   @RequestMapping(value = "/com/pos/popup", method = RequestMethod.GET)
   public String getCommonPositionPopup(Locale locale, Model model, @RequestParam(value = "vPosCode", required = false) String vposcode, @RequestParam(value = "vPosName", required = false) String vposname) {
      logger.debug("직위 목록 조회 팝업");
      model.addAttribute("vPosCode", vposcode);
      model.addAttribute("vPosName", vposname);

      return "/com/pos.content";
   }

   /**
    * 부서 목록 조회 팝업
    */
   @RequestMapping(value = "/com/dep/popup", method = RequestMethod.GET)
   public String getCommonDepartmentPopup(Locale locale, Model model, @RequestParam(value = "vDeptCode", required = false) String vdeptcode, @RequestParam(value = "vDeptName", required = false) String vdeptname) {
      logger.debug("부서 목록 조회 팝업");
      model.addAttribute("vDeptCode", vdeptcode);
      model.addAttribute("vDeptName", vdeptname);

      return "/com/dep.content";
   }

   /**
    * 팀 목록 조회 팝업
    */
   @RequestMapping(value = "/com/tem/popup", method = RequestMethod.GET)
   public String getCommonTeamPopup(Locale locale, Model model, @RequestParam(value = "vTeamCode", required = false) String vteamcode, @RequestParam(value = "vTeamName", required = false) String vteamname) {
      logger.debug("부서 목록 조회 팝업");
      model.addAttribute("vTeamCode", vteamcode);
      model.addAttribute("vTeamName", vteamname);

      return "/com/tem.content";
   }

   /**
    * 총괄 과제 목록 조회 팝업
    */
   @RequestMapping(value = "/com/kpm/popup", method = RequestMethod.GET)
   public String getCommonKeyProjectPopup(Locale locale, Model model, @RequestParam(value = "vKeyProjectCode", required = false) String vKeyProjectCode,
         @RequestParam(value = "vKeyProjectName", required = false) String vKeyProjectName) {
      logger.debug("총괄 과제 목록 조회 팝업");
      model.addAttribute("vKeyProjectCode", vKeyProjectCode);
      model.addAttribute("vKeyProjectCode", vKeyProjectName);

      return "/com/kpm.content";
   }

   /**
    * 차수 과제 목록 조회 팝업
    */
   @RequestMapping(value = "/com/spm/popup", method = RequestMethod.GET)
   public String getCommonProjectPopup(Locale locale, Model model, @RequestParam(value = "vProjectCode", required = false) String vProjectCode,
         @RequestParam(value = "vKeyProjectName", required = false) String vKeyProjectName, @RequestParam(value = "vEstiStep", required = false) String vEstiStep) {
      logger.debug("차수 과제 목록 조회 팝업");
      model.addAttribute("vProjectCode", vProjectCode);
      model.addAttribute("vKeyProjectName", vKeyProjectName);
      model.addAttribute("vEstiStep", vEstiStep);

      return "/com/spm.content";
   }

   /**
    * 거래처 목록 조회 팝업
    */
   @RequestMapping(value = "/com/cus/popup", method = RequestMethod.GET)
   public String getCommonCustomerPopup(Locale locale, Model model, @RequestParam(value = "vCusResidentNo", required = false) String vcusresidentno, @RequestParam(value = "vCusName", required = false) String vcusname,
         @RequestParam(value = "vCusTel", required = false) String vcustel) {
      logger.debug("거래처 목록 조회 팝업");
      model.addAttribute("vCusResidentNo", vcusresidentno);
      model.addAttribute("vCusName", vcusname);
      model.addAttribute("vCusTel", vcustel);

      return "/com/cus.content";
   }

   /**
    * 은행 조회 팝업
    */
   @RequestMapping(value = "/com/bnk/popup", method = RequestMethod.GET)
   public String getCommonBankPopup(Locale locale, Model model, @RequestParam(value = "vBankCode", required = false) String vbankcode, @RequestParam(value = "vBankName", required = false) String vbankname) {
      logger.debug("은행 조회 팝업");
      model.addAttribute("vBankCode", vbankcode);
      model.addAttribute("vBankName", vbankname);

      return "/com/bnk.content";
   }

   /**
    * 예산코드 조회 팝업
    */
   @RequestMapping(value = "/com/bud/popup", method = RequestMethod.GET)
   public String getCommonBudgetPopup(Locale locale, Model model, @RequestParam(value = "vBudgetCode", required = false) String vbudgetcode, @RequestParam(value = "vBudgetName", required = false) String vbudgetname,
         @RequestParam(value = "vProjectCode", required = false) String vProjectCode) {
      logger.debug("예산코드 목록 조회 팝업");
      model.addAttribute("vBudgetCode", vbudgetcode);
      model.addAttribute("vBudgetName", vbudgetname);
      model.addAttribute("vProjectCode", vProjectCode);

      return "/com/bud.content";
   }

   /**
    * 예산코드 조회 팝업(그리드 1개)
    */
   @RequestMapping(value = "/com/btb/popup", method = RequestMethod.GET)
   public String getCommonBudgetTypeBPopup(Locale locale, Model model, @RequestParam(value = "vProjectCode", required = false) String vProjectCode,
         @RequestParam(value = "vBudgetCode", required = false) String vBudgetCode, @RequestParam(value = "vBudgetName", required = false) String vBudgetName) {
      logger.debug("사원 목록 조회 팝업");
      model.addAttribute("vProjectCode", vProjectCode);
      model.addAttribute("vBudgetCode", vBudgetCode);
      model.addAttribute("vBudgetName", vBudgetName);

      return "/com/btb.content";
   }

   /**
    * 파일업로드 팝업
    */
   @RequestMapping(value = "/com/fup/popup", method = RequestMethod.GET)
   public String getCommonFileUploadPopup(Locale locale, Model model, @RequestParam(value = "multipleFiles", required = false, defaultValue = "true") String multipleFiles,
         @RequestParam(value = "vFileType", required = true) String vFileType, @RequestParam(value = "vEmplNo", required = true) String vEmplNo) {
      logger.debug("파일업로드 팝업");
      model.addAttribute("vFileType", vFileType);
      model.addAttribute("vEmplNo", vEmplNo);
      model.addAttribute("multipleFiles", multipleFiles);

      return "/com/fup.content";
   }

   /**
    * 파일업로드 팝업
    */
   @RequestMapping(value = "/com/pho/popup", method = RequestMethod.GET)
   public String getCommonPhotoUploadPopup(Locale locale, Model model, @RequestParam(value = "vEmplNo", required = true) String vEmplNo) {
      logger.debug("사진업로드 팝업");
      model.addAttribute("vEmplNo", vEmplNo);

      return "/com/pho.content";
   }

   /**
    * 파일업로드 팝업 - 엑셀 업로드
    */
   @RequestMapping(value = "/com/xls/popup", method = RequestMethod.GET)
   public String getCommonExcelUploadPopup(Locale locale, Model model, @RequestParam(value = "biztype", required = true) String biztype) {
      logger.debug("사진업로드 팝업");
      model.addAttribute("biztype", biztype);

      return "/com/xls.content";
   }

   /**
    * 텍스트 입력 팝업
    */
   @RequestMapping(value = "/com/txt/popup", method = RequestMethod.GET)
   public String getCommonTextInputPopup(Locale locale, Model model) {
      logger.debug("단순 텍스트 입력 팝업");

      return "/com/txt.content";
   }

   /**
    * 연계과제 조회 팝업
    */
   @RequestMapping(value = "/com/lnk/popup", method = RequestMethod.GET)
   public String getCommonLinkProjectPopup(Locale locale, Model model) {
      logger.debug("연계과제 조회 팝업");

      return "/com/lnk.content";
   }

   /**
    * 계정과목 조회 팝업
    */
   @RequestMapping(value = "/com/acc/popup", method = RequestMethod.GET)
   public String getCommonAccountPopup(Locale locale, Model model, @RequestParam(value = "accountBalance", required = false) String accountBalance) {
      logger.debug("계정과목 조회 팝업");
      logger.debug("accountBalance : " + accountBalance);
      model.addAttribute("accountBalance", accountBalance);

      return "/com/acc.content";
   }

   /**
    * 상계전표 조회 팝업
    */
   @RequestMapping(value = "/com/opp/popup", method = RequestMethod.GET)
   public String getCommonOppVouPopup(Locale locale, Model model, @RequestParam(value = "aOppAccount", required = false) String aOppAccount, @RequestParam(value = "aOppVno", required = false) String aOppVno,
         @RequestParam(value = "aOppCustNm", required = false) String aOppCustNm) {
      logger.debug("상계전표 조회 팝업");
      logger.debug("aOppAccount : " + aOppAccount);
      logger.debug("aOppVno : " + aOppVno);
      logger.debug("aOppCustNm : " + aOppCustNm);
      model.addAttribute("aOppAccount", aOppAccount);
      model.addAttribute("aOppVno", aOppVno);
      model.addAttribute("aOppCustNm", aOppCustNm);

      return "/com/opp.content";
   }

   /**
    * 급여코드 조회 팝업
    */
   @RequestMapping(value = "/com/pay/popup", method = RequestMethod.GET)
   public String getCommonPayCodePopup(Locale locale, Model model, @RequestParam(value = "vYear", required = false) String vYear) {
      logger.debug("급여코드 조회 팝업");
      logger.debug("vYear : " + vYear);
      model.addAttribute("vYear", vYear);

      return "/com/pay.content";
   }

}

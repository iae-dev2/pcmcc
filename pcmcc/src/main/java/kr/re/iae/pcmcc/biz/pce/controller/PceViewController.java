package kr.re.iae.pcmcc.biz.pce.controller;

import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import kr.re.iae.pcmcc.biz.pcb.controller.PcbViewController;

@Controller
public class PceViewController {

private static final Logger logger = LoggerFactory.getLogger(PcbViewController.class);

   @RequestMapping(value = "/pce", method = RequestMethod.GET)
   public String getPcePage(HttpServletRequest request, Locale locale, Model model) {
      logger.debug("Welcome home! 관리자 > 게시판관리");

      //loginUser
      @SuppressWarnings("unchecked")
      Map<String, String> loginMap = (Map<String, String>) request.getSession().getAttribute("login");
      model.addAttribute("loginUser", loginMap.get("vEmplNo"));
      model.addAttribute("loginName", loginMap.get("vName"));
      model.addAttribute("mode", "pce");

      //게시판 - 팀코드로 통제   2025-03-27
      //원장실 공통(AB990), 연구지원본부 공통(EA100), 이정승 본부장(EZ100)
      //연구관리센터 공통(EC990), 기획팀(EC110), 연구관리팀(EC120)
      //경영지원센터 공통(ED990), 지원팀(ED110), 정보기술팀(ED130)
      //접근 가능
      if ("AB990".equals(loginMap.get("vTeamCode")) || "EA100".equals(loginMap.get("vTeamCode")) || "EZ100".equals(loginMap.get("vTeamCode")) ||
          "EC990".equals(loginMap.get("vTeamCode")) || "EC110".equals(loginMap.get("vTeamCode")) || "EC120".equals(loginMap.get("vTeamCode")) ||
          "ED990".equals(loginMap.get("vTeamCode")) || "ED110".equals(loginMap.get("vTeamCode")) || "ED130".equals(loginMap.get("vTeamCode"))) {
         return "pce/pcf.page";
      }
      else {
         request.getSession().invalidate();
         return "redirect:/loginError";
      }

   }

   //코드관리 > 평가코드관리
   @RequestMapping(value = "/pce/pcg/pga/content", method = RequestMethod.GET)
   public String getPgaContent(Locale locale, Model model) {
      return "pce/pcg/pga.content";
   }

   //코드관리 > 과제코드관리
   @RequestMapping(value = "/pce/pcg/pgb/content", method = RequestMethod.GET)
   public String getPgbContent(Locale locale, Model model) {
      return "pce/pcg/pgb.content";
   }

   //코드관리 > 인원정보관리
   @RequestMapping(value = "/pce/pcg/pgc/content", method = RequestMethod.GET)
   public String getPgcContent(Locale locale, Model model) {
      return "pce/pcg/pgc.content";
   }

   //기여율 평가 > 과제별 기여율
   @RequestMapping(value = "/pce/pch/pha/content", method = RequestMethod.GET)
   public String getPhaContent(Locale locale, Model model) {
      return "pce/pch/pha.content";
   }

   //기여율 평가 > 개인별 기여율
   @RequestMapping(value = "/pce/pch/phb/content", method = RequestMethod.GET)
   public String getPhbContent(Locale locale, Model model) {
      return "pce/pch/phb.content";
   }

   //기여율 평가 > 과제별 인원관리
   @RequestMapping(value = "/pce/pch/phc/content", method = RequestMethod.GET)
   public String getPhcContent(Locale locale, Model model) {
      return "pce/pch/phc.content";
   }

   //인건비 확보 > 내부인건비/간접비관리
   @RequestMapping(value = "/pce/pci/pia/content", method = RequestMethod.GET)
   public String getPiaContent(Locale locale, Model model) {
      return "pce/pci/pia.content";
   }

   //인건비 확보 > 개인별인건비관리
   @RequestMapping(value = "/pce/pci/pib/content", method = RequestMethod.GET)
   public String getPibContent(Locale locale, Model model) {
      return "pce/pci/pib.content";
   }

   //인건비 확보 > 인건비확보율관리
   @RequestMapping(value = "/pce/pci/pic/content", method = RequestMethod.GET)
   public String getPicContent(Locale locale, Model model) {
      return "pce/pci/pic.content";
   }

   //인건비 확보 > 반기인건비확보율
   @RequestMapping(value = "/pce/pci/pid/content", method = RequestMethod.GET)
   public String getPidContent(Locale locale, Model model) {
      return "pce/pci/pid.content";
   }

   //인건비 확보 > 연간인건비확보율
   @RequestMapping(value = "/pce/pci/pie/content", method = RequestMethod.GET)
   public String getPieContent(Locale locale, Model model) {
      return "pce/pci/pie.content";
   }

   //인건비 확보 > 인건비 조정
   @RequestMapping(value = "/pce/pci/pif/content", method = RequestMethod.GET)
   public String getPifContent(Locale locale, Model model) {
      return "pce/pci/pif.content";
   }

}

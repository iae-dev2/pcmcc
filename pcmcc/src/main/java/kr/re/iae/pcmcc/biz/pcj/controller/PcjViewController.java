package kr.re.iae.pcmcc.biz.pcj.controller;

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
public class PcjViewController {

private static final Logger logger = LoggerFactory.getLogger(PcbViewController.class);
   
   @RequestMapping(value = "/pcj", method = RequestMethod.GET)
   public String getPcjPage(HttpServletRequest request, Locale locale, Model model) {
      logger.debug("Welcome home! 기여도 확인(본부장)");

      //loginUser
      @SuppressWarnings("unchecked")
      Map<String, String> loginMap = (Map<String, String>) request.getSession().getAttribute("login");
      model.addAttribute("loginUser", loginMap.get("vEmplNo"));
      model.addAttribute("loginUserDept", loginMap.get("vDeptCode"));
      model.addAttribute("loginUserTeam", loginMap.get("vTeamCode"));

      //화면id
      /*String appId = request.getParameter("appId");
      if("".equals(appId) || appId == null) {
         model.addAttribute("tabcode", "_hra_haa");
      }
      else {
         model.addAttribute("tabcode", appId);
      }*/

      return "pcj/pja.page";
   }

   //직위코드
   @RequestMapping(value = "/pcj/pja/content", method = RequestMethod.GET)
   public String getPdaContent(HttpServletRequest request, Locale locale, Model model) {
      logger.debug("Welcome home! 기여도 확인(본부장)");

      //loginUser
      @SuppressWarnings("unchecked")
      Map<String, String> loginMap = (Map<String, String>) request.getSession().getAttribute("login");
      model.addAttribute("loginUser", loginMap.get("vEmplNo"));

      return "pcj/pja.content";
   }

}

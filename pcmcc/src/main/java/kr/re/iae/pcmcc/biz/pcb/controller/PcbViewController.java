package kr.re.iae.pcmcc.biz.pcb.controller;

import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PcbViewController {

   private static final Logger logger = LoggerFactory.getLogger(PcbViewController.class);

   @RequestMapping(value = "/pcb", method = RequestMethod.GET)
   public String getPcbPage(HttpServletRequest request, Locale locale, Model model) {
      logger.debug("Welcome home! 개인 기여도 > 개인 기여도");

      //loginUser
      @SuppressWarnings("unchecked")
      Map<String, String> loginMap = (Map<String, String>) request.getSession().getAttribute("login");
      model.addAttribute("loginUser", loginMap.get("vEmplNo"));

      return "pcb/pba.page";
   }

   //개인 기여도
   @RequestMapping(value = "/pcb/pba/content", method = RequestMethod.GET)
   public String getPbaContent(Locale locale, Model model) {
      return "pcb/pba.content";
   }

   //개인 인건비 확보율
   @RequestMapping(value = "/pcb/pbb/content", method = RequestMethod.GET)
   public String getPbbContent(HttpServletRequest request, Locale locale, Model model) {
      //loginUser
      @SuppressWarnings("unchecked")
      Map<String, String> loginMap = (Map<String, String>) request.getSession().getAttribute("login");
      model.addAttribute("loginUser", loginMap.get("vEmplNo"));

      return "pcb/pbb.content";
   }

}

package kr.re.iae.pcmcc.biz.pca.controller;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PcaViewController {

   private static final Logger logger = LoggerFactory.getLogger(PcaViewController.class);

   @RequestMapping(value = "/pca", method = RequestMethod.GET)
   public String getPcbPage(HttpServletRequest request, Locale locale, Model model) {
      logger.debug("Welcome home! 게시판관리 > 게시판관리(메인 화면)");

      //화면id
      /*String appId = request.getParameter("appId");
      if("".equals(appId) || appId == null) {
         model.addAttribute("tabcode", "_hra_haa");
      }
      else {
         model.addAttribute("tabcode", appId);
      }*/

      return "pce/pcf.page";
   }

}

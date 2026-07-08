package kr.re.iae.pcmcc.biz.com.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class MenuHelperInterceptor extends HandlerInterceptorAdapter {

private static final Logger logger = LoggerFactory.getLogger(MenuHelperInterceptor.class);

   // preHandle() : 컨트롤러보다 먼저 수행되는 메서드
   @Override
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
         throws Exception {
      return true;
   }

   /**
    * A : 관리자 - 개인 기여도, 기여도 평가, 기여도 확인, 관리자
    * B : PM      - 개인 기여도, 기여도 평가
    * C : 평가자 - 개인 기여도, 기여도 평가, 기여도 확인
    * E : 피평가자 - 개인 기여도
    * F : 본부장 - 개인 기여도, 기여도 평가, 기여도 확인, 기여도 확인(본부장)
    * */

   private String checkMenuGrade(String param) {
      if (param.indexOf("A") > -1) {
         return "A";
      }
      else if (param.indexOf("C") > -1) {
         return "C";
      }
      else if (param.indexOf("B") > -1) {
         return "B";
      }
      else if (param.indexOf("E") > -1) {
         return "E";
      }
      else if (param.indexOf("X") > -1) {
         return "X";   //권한이 없는 인원   2020-06-16
      }
      else {
         return param;
      }
   }

   // 컨트롤러가 수행되고 화면이 보여지기 직전에 수행되는 메서드
   @Override
   public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
         ModelAndView modelAndView) throws Exception {
      String currentUri = request.getRequestURI();
      String currentEmplNo = "";
      String currentTeamCode = "";
      String currentMenuGrade = "";

      @SuppressWarnings("unchecked")
      Map<String, String> loginMap = (Map<String, String>) request.getSession().getAttribute("login");

      if (loginMap != null) {
         if (loginMap.get("vEmplNo") != null) {
            currentEmplNo = loginMap.get("vEmplNo");
            currentTeamCode = loginMap.get("vTeamCode");
            // 유영돈(9413421) 본부장, 강석환(0910157) 본부장, 이찬기(1110119) 본부장
            if (currentEmplNo.equals("9413421") || currentEmplNo.equals("0910157") || currentEmplNo.equals("1110119")) {
               currentMenuGrade = "F";
            } else {
               currentMenuGrade = checkMenuGrade(loginMap.get("vMenuGrade"));
            }
         }
      }

      logger.info(currentUri);

      //jsessionid 제거 2019-07-08
      if (currentUri.length() > 4) {
         currentUri = currentUri.substring(0, 4);
      }

      if ("/pca".equals(currentUri)) {
         modelAndView.addObject("pageTitle", "고등기술연구원(IAE) :: 기여도평가시스템");

         //초기 메뉴 설정값
         modelAndView.addObject("menucode", "pca");
         modelAndView.addObject("vemplno", currentEmplNo);
         modelAndView.addObject("vteamcode", currentTeamCode);
         modelAndView.addObject("vmenugrade", currentMenuGrade);

         //초기 탭 설정 값
         modelAndView.addObject("tabcode", "_pca_paa");
         modelAndView.addObject("tabpanel", "panel_pca_paa");
         modelAndView.addObject("tabtitle", "게시판");
      }
      else if ("/pcb".equals(currentUri)) {
         modelAndView.addObject("pageTitle", "고등기술연구원(IAE) :: 기여도평가시스템");

         //초기 메뉴 설정값
         modelAndView.addObject("menucode", "pcb");
         modelAndView.addObject("vemplno", currentEmplNo);
         modelAndView.addObject("vteamcode", currentTeamCode);
         modelAndView.addObject("vmenugrade", currentMenuGrade);

         //초기 탭 설정 값
         modelAndView.addObject("tabcode", "_pcb_pba");
         modelAndView.addObject("tabpanel", "panel_pcb_pba");
         modelAndView.addObject("tabtitle", "개인 기여도");
      }
      else if ("/pcc".equals(currentUri)) {
         modelAndView.addObject("pageTitle", "고등기술연구원(IAE) :: 기여도평가시스템");

         //초기 메뉴 설정값
         modelAndView.addObject("menucode", "pcc");
         modelAndView.addObject("vemplno", currentEmplNo);
         modelAndView.addObject("vteamcode", currentTeamCode);
         modelAndView.addObject("vmenugrade", currentMenuGrade);

         //초기 탭 설정 값
         modelAndView.addObject("tabcode", "_pcc_pca");
         modelAndView.addObject("tabpanel", "panel_pcc_pca");
         modelAndView.addObject("tabtitle", "기여도 평가");
      }
      else if ("/pcd".equals(currentUri)) {
         modelAndView.addObject("pageTitle", "고등기술연구원(IAE) :: 기여도평가시스템");

         //초기 메뉴 설정값
         modelAndView.addObject("menucode", "pcd");
         modelAndView.addObject("vemplno", currentEmplNo);
         modelAndView.addObject("vteamcode", currentTeamCode);
         modelAndView.addObject("vmenugrade", currentMenuGrade);

         //초기 탭 설정 값
         modelAndView.addObject("tabcode", "_pcd_pda");
         modelAndView.addObject("tabpanel", "panel_pcd_pda");
         modelAndView.addObject("tabtitle", "기여도 확인");
      }
      else if ("/pcj".equals(currentUri)) {
         modelAndView.addObject("pageTitle", "고등기술연구원(IAE) :: 기여도평가시스템");
         
         //초기 메뉴 설정값
         modelAndView.addObject("menucode", "pcj");
         modelAndView.addObject("vemplno", currentEmplNo);
         modelAndView.addObject("vteamcode", currentTeamCode);
         modelAndView.addObject("vmenugrade", currentMenuGrade);
         
         //초기 탭 설정 값
         modelAndView.addObject("tabcode", "_pcj_pja");
         modelAndView.addObject("tabpanel", "panel_pcj_pja");
         modelAndView.addObject("tabtitle", "기여도 확인(본부장)");
      }
      else if ("/pce".equals(currentUri)) {
         modelAndView.addObject("pageTitle", "고등기술연구원(IAE) :: 기여도평가시스템");

         //초기 메뉴 설정값
         modelAndView.addObject("menucode", "pce");
         modelAndView.addObject("vemplno", currentEmplNo);
         modelAndView.addObject("vteamcode", currentTeamCode);
         modelAndView.addObject("vmenugrade", currentMenuGrade);

         //초기 탭 설정 값
         modelAndView.addObject("tabcode", "_pce_pcf");
         modelAndView.addObject("tabpanel", "panel_pce_pcf");
         modelAndView.addObject("tabtitle", "게시판관리");
      }
      else {
         modelAndView.addObject("pageTitle", "고등기술연구원(IAE) :: 기여도평가시스템");
      }

      super.postHandle(request, response, handler, modelAndView);
   }

   @Override
   public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
      super.afterCompletion(request, response, handler, ex);
   }

}

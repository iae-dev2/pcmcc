package kr.re.iae.pcmcc.biz.com.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.re.iae.pcmcc.biz.com.service.CommonService;

public class AuthenticationInterceptor extends HandlerInterceptorAdapter {

//   private static final Logger logger = LoggerFactory.getLogger(AuthenticationInterceptor.class);

   @Autowired
   private CommonService commonService;

   public static String encrypt(String decryptString) {
      try {
         return AESHelper.encrypt("naonsoft_ngw_key".getBytes(), decryptString);
      } catch (Exception e) {
         return null;
      }
   }

   public static String decrypt(String decryptString) {
      try {
         return AESHelper.decrypt("naonsoft_ngw_key".getBytes(), decryptString);
      }
      catch (Exception e) {
         return null;
      }
   }

   // preHandle(): 컨트롤러보다 먼저 수행되는 메서드
   @Override
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//      logger.debug("dispatcher 이후 : controller 요청 전");

      // session 객체를 가져옴
      HttpSession session = request.getSession();
      // login처리를 담당하는 사용자 정보를 담고 있는 객체를 가져옴
      Object obj = session.getAttribute("login");
      String requestUri = request.getRequestURI();
      String decryptEmplno = "";
      String emplno = "";

      if (requestUri.equals("/loginError")) {
         return true;
      }

      if (obj != null) {
         // 세션이 있는 경우
         @SuppressWarnings("unchecked")
         Map<String, String> map = (Map<String, String>)session.getAttribute("login");
         if (map.size() > 7) {
            emplno = request.getParameter("emplno");
            if (map.get("vEmplNo").length() == 7) {
               if (emplno != null) {
                  if (map.get("vEmplNo").equals(emplno)) {
                     return true;
                  }
                  else {
                     decryptEmplno = decrypt(emplno);
                     if (decryptEmplno != null) {
                        decryptEmplno = decryptEmplno.trim();

                        Map<String, Object> paramMap = new HashMap<String, Object>();
                        paramMap.put("vEmplNo", decryptEmplno);
                        paramMap.put("vEmpLen", 7);

                        @SuppressWarnings("unchecked")
                        List<Map<String, String>> list = commonService.selectHrInfo(paramMap);
                        List<Map<String, String>> refineList;   // 개인정보 제거 리스트   2021-06-21

                        if (list.size() == 1) {
                           refineList = new ArrayList<Map<String, String>>();
                           Map<String, String> refineMap = new HashMap<String, String>();
                           refineMap.put("vEmplNo"  , list.get(0).get("vEmplNo"));
                           refineMap.put("vName"    , list.get(0).get("vName"));
                           refineMap.put("vDeptCode", list.get(0).get("vDeptCode"));
                           refineMap.put("vDutyCode", list.get(0).get("vDutyCode"));
                           refineMap.put("vDeptName", list.get(0).get("vDeptName"));
                           refineMap.put("vTeamCode", list.get(0).get("vTeamCode"));
                           refineMap.put("vTeamName", list.get(0).get("vTeamName"));
                           refineMap.put("vPosCode" , list.get(0).get("vPosCode"));
                           refineMap.put("vPosName" , list.get(0).get("vPosName"));
                           refineMap.put("vMenuGrade" , list.get(0).get("vMenuGrade"));
                           refineList.add(refineMap);
                           session.setAttribute("login", refineList.get(0));
                           return true;
                        }
                        else {
                           session.invalidate();   // 사원 테이블에서 조회 결과가 없는 경우 세션 삭제   2020-07-06
                           return true;
                        }

                     }
                     else {
                        response.sendRedirect("/loginError");
                        return false;
                     }
                  }
               }
               else {
                  return true;
               }
            }
         }
         else {
            return false;
         }
      }
      else {
         // 세션이 없는 경우
         emplno = request.getParameter("emplno");

         if (emplno != null) {
            decryptEmplno = decrypt(emplno);
            if (decryptEmplno != null) {
               decryptEmplno = decryptEmplno.trim();

               Map<String, Object> paramMap = new HashMap<String, Object>();
               paramMap.put("vEmplNo", decryptEmplno);
               paramMap.put("vEmpLen", decryptEmplno.length());

               @SuppressWarnings("unchecked")
               List<Map<String, String>> list = commonService.selectHrInfo(paramMap);
               List<Map<String, String>> refineList;   // 개인정보 제거 리스트   2021-06-21

               if (list.size() == 1) {
                  refineList = new ArrayList<Map<String, String>>();
                  Map<String, String> refineMap = new HashMap<String, String>();
                  refineMap.put("vEmplNo"  , list.get(0).get("vEmplNo"));
                  refineMap.put("vName"    , list.get(0).get("vName"));
                  refineMap.put("vDeptCode", list.get(0).get("vDeptCode"));
                  refineMap.put("vDutyCode", list.get(0).get("vDutyCode"));
                  refineMap.put("vDeptName", list.get(0).get("vDeptName"));
                  refineMap.put("vTeamCode", list.get(0).get("vTeamCode"));
                  refineMap.put("vTeamName", list.get(0).get("vTeamName"));
                  refineMap.put("vPosCode" , list.get(0).get("vPosCode"));
                  refineMap.put("vPosName" , list.get(0).get("vPosName"));
                  refineMap.put("vMenuGrade" , list.get(0).get("vMenuGrade"));
                  refineList.add(refineMap);
                  session.setAttribute("login", refineList.get(0));
                  return true;
               }
            }
            else {
               response.sendRedirect("/loginError");
               return false;
            }
         }
         else {
            response.sendRedirect("/loginError");
            return false;
         }
      }

      // 로그인이 안되어 있는 상태임으로 로그인 폼으로 다시 돌려보냄(redirect)
      // response.sendRedirect("/login");
      // return false;   //더이상 컨트롤러 요청으로 가지 않도록 false로 반환함
      // preHandle의 return은 컨트롤러 요청 uri로 가도 되냐 안되냐를 허가하는 의미임
      // 따라서 true로하면 컨트롤러 uri로 가게 됨.
      // return true;

      if (requestUri.contains("/resources")) {
         return true;
      }
      if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
         return true;
      }
      if (requestUri.equals("/")) {
         return true;
      }
      if (requestUri.equals("/login")) {
         return true;
      }
      if (requestUri.contains("/fileDownload")) {
         return true;
      }
      if (requestUri.contains("/fileUpload")) {
         return true;
      }
      if (obj == null) {
         response.sendRedirect("/loginError");
         return false;
      }

      return false;
   }

   // 컨트롤러가 수행되고 화면이 보여지기 직전에 수행되는 메서드
   @Override
   public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
         ModelAndView modelAndView) throws Exception {
//      logger.debug("dispatcher 이후 : controller 요청 후");
//      @SuppressWarnings("unchecked")
//      Map<String, String> loginMap = (Map<String, String>) request.getSession().getAttribute("login");
   /**
    * 2018-08-14
    * loginMap.get("vEmplNo") != null 경우
    * URL에 resources를 포함하지 않은 경우
    * aJax 호출이 아닌경우(X-Requested-With)
    * content-type 이 null인 경우
    * 위 4가지 조건을 만족하는 경우에만 model and view에 addObject한다
    */
   /*String requestUri = request.getRequestURI();

   if(loginMap != null 
         && loginMap.get("vEmplNo") != null 
         && !requestUri.contains("/resources") 
         && !"XMLHttpRequest".equals(request.getHeader("X-Requested-With"))
         && request.getHeader("content-type") == null) {
//      modelAndView.addObject("vEmplNo", loginMap.get("vEmplNo"));
      modelAndView.addObject("vTeamCode", loginMap.get("vTeamCode"));
      
      modelAndView.addObject("vName", loginMap.get("vName"));
      modelAndView.addObject("vPosName", loginMap.get("vPosName"));
   }*/

      super.postHandle(request, response, handler, modelAndView);
   }

   @Override
   public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
   throws Exception {
      //logger.debug("dispatcher 이후 : controller 요청 후 : 모든 요청 완료");
      super.afterCompletion(request, response, handler, ex);
   }

}

package kr.re.iae.pcmcc.biz.pce.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.View;

import kr.re.iae.pcmcc.biz.pce.pch.service.PchService;
import kr.re.iae.pcmcc.biz.pce.pch.util.PchEmpExcelView;
import kr.re.iae.pcmcc.biz.pce.pch.util.PchExcelView;
import kr.re.iae.pcmcc.biz.pce.pch.util.PchPrjExcelView;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchContVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchEmpVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchExcelVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchPrjVo;

@RestController
public class PchRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PchRestApiController.class);

   @Autowired
   private PchService pchService;

   @RequestMapping(value = "/pch/pha/getPrjCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PchPrjVo> getPcfList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 과제별 기여율관리 > 과제코드 목록 조회");

      List<PchPrjVo> list = pchService.selectProjectCodeList(paramMap);

      return list;
   }

   @RequestMapping(value = "/pch/pha/getPrjContList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PchContVo> getPrjContList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 과제별 기여율관리 > 과제별 기여율 목록 조회");

      List<PchContVo> list = pchService.selectProjectContributeList(paramMap);

      return list;
   }

   @RequestMapping(value = "/pch/pha/savePrjContList", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int savePrjContList(@RequestBody List<PchContVo> contvolist) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 과제별 기여율관리 > 과제별 기여율 저장");

      try {
         pchService.savePrjContList(contvolist);
      }
      catch (Exception e) {
         e.printStackTrace();

         return -1;
      }

      return 0;
   }

   // 엑셀 다운로드
   @RequestMapping(value = "/pch/pha/exportExcel", produces = "html/text;charset=UTF-8", method = RequestMethod.GET)
   public View exportExcel(Model model, HttpServletRequest request, @RequestParam Map<String, String> paramMap) throws UnsupportedEncodingException {
      logger.debug("Welcome rest apo, 관리자 > 기여율평가 > 과제별 기여율관리 > 과제 기여율합 엑셀저장");

      List<PchPrjVo> list = pchService.selectProjectCodeList(paramMap);
      model.addAttribute("list", list);

      return new PchExcelView();
   }

   // 엑셀 다운로드
   @RequestMapping(value = "/pch/pha/exportProjectExcel", produces = "html/text;charset=UTF-8", method = RequestMethod.GET)
   public View exportProjectExcel(Model model, HttpServletRequest request, @RequestParam Map<String, String> paramMap) throws UnsupportedEncodingException {
      logger.debug("Welcome rest apo, 관리자 > 기여율평가 > 과제별 기여율관리 > 엑셀저장");

      List<PchExcelVo> list = pchService.selectProjectExcelList(paramMap);
      model.addAttribute("list", list);

      return new PchPrjExcelView();
   }

   @RequestMapping(value = "/pch/phb/getEmplNoList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PchEmpVo> getEmplNoList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 개인별 기여율관리 > 참여연구원 목록 조회");

      List<PchEmpVo> list = pchService.selectEmplNoList(paramMap);

      return list;
   }

   @RequestMapping(value = "/pch/phb/getEmpContList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PchContVo> getEmpContList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 개인별 기여율관리 > 개인별 기여율 목록 조회");

      List<PchContVo> list = pchService.selectEmplNoContributeList(paramMap);

      return list;
   }

   @RequestMapping(value = "/pch/phb/saveEmpContList", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int saveEmpContList(@RequestBody List<PchContVo> contvolist) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 개인별 기여율관리 > 개인별 기여율 저장");

      try {
         pchService.savePrjContList(contvolist); // 과제별과 동일
      }
      catch (Exception e) {
         e.printStackTrace();

         return -1;
      }

      return 0;
   }

   // 엑셀 다운로드
   @RequestMapping(value = "/pch/phb/exportExcel", produces = "html/text;charset=UTF-8", method = RequestMethod.GET)
   public View exportEmpExcel(Model model, HttpServletRequest request, @RequestParam Map<String, String> paramMap) throws UnsupportedEncodingException {
      logger.debug("Welcome rest apo, 관리자 > 기여율평가 > 개인별 기여율관리 > 엑셀저장");

      List<PchExcelVo> list = pchService.selectEmplNoExcelList(paramMap);
      model.addAttribute("list", list);

      return new PchEmpExcelView();
   }

   @RequestMapping(value = "/pce/phc/getPhcProjectCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PchPrjVo> getPhcProjectCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 과제별 인원관리 > 과제코드 목록 조회");

      List<PchPrjVo> list = pchService.selectPhcProjectCodeList(paramMap);

      return list;
   }

   @RequestMapping(value = "/pce/phc/getPhcEmpList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PchEmpVo> getPhcEmpList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 과제별 인원관리 > 과제 참여연구원 목록 조회");

      List<PchEmpVo> list = pchService.selectPhcEmpList(paramMap);

      return list;
   }

   @RequestMapping(value = "/pce/phc/savePhcEmpList", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int savePhcEmpList(@RequestBody List<PchEmpVo> empvolist) {
      logger.debug("Welcome rest api. 관리자 > 기여율평가 > 과제별 인원관리 > 과제 참여연구원 저장");

      try {
         pchService.savePhcEmpList(empvolist);
      }
      catch (Exception e) {
         e.printStackTrace();

         return -1;
      }

      return 0;
   }

}

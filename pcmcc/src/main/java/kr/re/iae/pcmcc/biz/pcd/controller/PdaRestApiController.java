package kr.re.iae.pcmcc.biz.pcd.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.re.iae.pcmcc.biz.pcb.controller.PbaRestApiController;
import kr.re.iae.pcmcc.biz.pcd.pda.service.impl.PdaServiceImpl;
import kr.re.iae.pcmcc.biz.pcd.pda.vo.EmpVo;

@RestController
public class PdaRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PbaRestApiController.class);

   @Autowired
   private PdaServiceImpl pdaService;

   @RequestMapping(value = "/pcd/pda/getPrjEmpList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<EmpVo> getPrjEmpList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 참여연구원 기여율 목록 조회");

      List<EmpVo> list = pdaService.selectProjectEmpList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcd/pda/getReview", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public String getReview(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가의견 조회");

      return pdaService.selectReview(paramMap);
   }

   /*@RequestMapping(value = "/pcd/pda/saveReview", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int saveReview(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가의견 저장");

      return pdaService.insertReview(paramMap);
   }*/

   @RequestMapping(value = "/pcd/pda/setConfirm", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int setConfirm(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가의견 승인");

      return pdaService.updateEstiStep4(paramMap);
   }

   @RequestMapping(value = "/pcd/pda/setReject", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int setReject(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가의견 반려");

      return pdaService.updateEstiStep3(paramMap);
   }

}

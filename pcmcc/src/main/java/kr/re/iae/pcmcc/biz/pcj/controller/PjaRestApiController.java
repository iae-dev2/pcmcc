package kr.re.iae.pcmcc.biz.pcj.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.re.iae.pcmcc.biz.pcj.pja.service.impl.PjaServiceImpl;
import kr.re.iae.pcmcc.biz.pcj.pja.vo.EmpVo;

@RestController
public class PjaRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PjaRestApiController.class);

   @Autowired
   private PjaServiceImpl pjaService;

   @RequestMapping(value = "/pcj/pja/getProjectCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public List getProjectCodeList(@RequestBody Map<String, Object> paramMap) {
      logger.debug("Welcome rest api. 평가코드 조회(본부장)");
      List list = pjaService.selectProjectCodeList(paramMap);

      return list;
   }

   @RequestMapping(value = "/pcj/pja/getPrjEmpList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<EmpVo> getPrjEmpList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 참여연구원 기여율 목록 조회");

      List<EmpVo> list = pjaService.selectProjectEmpList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcj/pja/getReview", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public String getReview(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가의견 조회");

      return pjaService.selectReview(paramMap);
   }

}

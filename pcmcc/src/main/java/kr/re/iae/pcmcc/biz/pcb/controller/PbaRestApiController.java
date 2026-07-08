package kr.re.iae.pcmcc.biz.pcb.controller;

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

import kr.re.iae.pcmcc.biz.pcb.pba.service.impl.PbaServiceImpl;
import kr.re.iae.pcmcc.biz.pcb.pba.vo.AddVo;
import kr.re.iae.pcmcc.biz.pcb.pba.vo.PrjCodeVo;

@RestController
public class PbaRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PbaRestApiController.class);

   @Autowired
   private PbaServiceImpl pbaService;

   @RequestMapping(value = "/pcb/pba/getPrjCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PrjCodeVo> getPrjCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 과제코드/기여도율 조회");

      List<PrjCodeVo> list = pbaService.selectPrjCodeList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcb/pba/getAverageCont", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public float getSumCont(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 과제 기여율 평균 조회");

      return pbaService.selectAverageCont(paramMap);
   }

   @RequestMapping(value = "/pcb/pba/getAddPrjList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<AddVo> getAddPrjList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 참여과제 조회");

      List<AddVo> list = pbaService.selectAdditionalPrjList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcb/pba/savePrjCode", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int savePrjCode(@RequestBody PrjCodeVo vo) {
      logger.debug("Welcome rest api. 과제코드 추가");

      try {
         pbaService.savePrjCode(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcb/pba/deletePrjCode", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int deletePrjCode(@RequestBody PrjCodeVo vo) {
      logger.debug("Welcome rest api. 과제코드 삭제");

      try {
         pbaService.deletePrjCode(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcb/pba/saveWork", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int saveWork(@RequestBody PrjCodeVo vo) {
      logger.debug("Welcome rest api. 과제 수행업무 저장");

      try {
         pbaService.saveWork(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcb/pba/saveFinish", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int saveFinish(@RequestBody PrjCodeVo vo) {
      logger.debug("Welcome rest api. 과제 수행업무 입력완료");

      try {
         pbaService.updateFinish(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcb/pba/saveConfirm", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int saveConfirm(@RequestBody PrjCodeVo vo) {
      logger.debug("Welcome rest api. PM 평가의견 확인");

      try {
         pbaService.updateConfirm(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

}

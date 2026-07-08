package kr.re.iae.pcmcc.biz.pcb.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.re.iae.pcmcc.biz.pce.pci.service.PciService;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PicVo;

@RestController
public class PbbRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PbbRestApiController.class);

   @Autowired
   private PciService pciService;

   @RequestMapping(value = "/pcb/pbb/getPbbGrid3List", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PicVo> getPicGrid3List(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 개인 기여도 >인건비 확보율 목록 조회");

      List<PicVo> list = pciService.selectPicGrid3List(paramMap);

      return list;
   }

}

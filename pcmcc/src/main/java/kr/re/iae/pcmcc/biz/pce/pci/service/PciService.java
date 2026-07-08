package kr.re.iae.pcmcc.biz.pce.pci.service;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaHalfYearVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PibVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PicVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PidVo;

public interface PciService {

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비관리 */
   public List<PiaVo> selectPiaList(Map<String, String> paramMap);

   public List<Map<String, String>> checkPiaProject(Map<String, String> param);

   public int calculateMonthly(Map<String, String> paramMap) throws Exception;

   public int savePiaList(List<PiaVo> piavolist) throws Exception;

   public int batchInsertPia(List<PiaVo> list) throws Exception;

   /** 관리자 - 인건비 확보 - 반기별 내부인건비/간접비관리 */
   public List<PiaHalfYearVo> selectPiaHalfYearList(Map<String, String> paramMap);

   public int calculateHalfYear(Map<String, String> paramMap) throws Exception;

   public int savePiaHalfYearList(List<PiaHalfYearVo> piavolist) throws Exception;

   /** 관리자 - 인건비 확보 - 개인별인건비 */
   public List<PibVo> selectPibList(Map<String, String> paramMap);

   public int savePibList(List<PibVo> pibvolist) throws Exception;

   public int batchInsertPib(List<PibVo> list) throws Exception;

   /** 관리자 - 인건비 확보 - 인건비확보율 관리 */
   public List<PicVo> selectPicGrid2List(Map<String, String> paramMap);

   public List<PicVo> selectPicGrid3List(Map<String, String> paramMap);

   public int calculatePic(Map<String, String> paramMap) throws Exception;

   public List<PidVo> selectPidList(Map<String, String> paramMap);

   public List<PidVo> selectPieList(Map<String, String> paramMap);

   public List<PicVo> selectPifEntrustList(Map<String, String> paramMap);

   public int updateEntrust(Map<String, Object> paramMap) throws Exception;
}

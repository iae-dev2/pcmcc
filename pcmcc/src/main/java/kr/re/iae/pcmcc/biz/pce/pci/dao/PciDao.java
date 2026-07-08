package kr.re.iae.pcmcc.biz.pce.pci.dao;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaHalfYearVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PibVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PicVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PidVo;

public interface PciDao {

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비관리 */
   public List<PiaVo> selectPiaList(Map<String, String> paramMap);

   public List<Map<String, String>> checkPiaProject(Map param);

   public int insertPia(PiaVo piaVo);

   public int updatePia(PiaVo piaVo);

   public int deletePia(Map<String, String> param);

   public int deletePiaAll(Map<String, String> param);

   public int insertPiaMonthlyAuto(Map<String, String> param);

   /** 관리자 - 인건비 확보 - 반기별 내부인건비/간접비관리 */
   public List<PiaHalfYearVo> selectPiaHalfYearList(Map<String, String> paramMap);

   public int insertPiaHalfYear(PiaHalfYearVo piaVo);

   public int updatePiaHalfYear(PiaHalfYearVo piaVo);

   public int insertPiaHalfYearHist(Map<String, String> param);

   public int insertPiaHalfYearAuto(Map<String, String> param);

   public int deletePiaHalfYear(Map<String, String> param);

   /** 관리자 - 인건비 확보 - 개인별인건비 */
   public List<PibVo> selectPibList(Map<String, String> paramMap);

   public int insertPib(PibVo pibVo);

   public int updatePib(PibVo pibVo);

   public int deletePib(Map<String, String> param);

   public int deletePibAll(Map<String, String> param);

   /** 관리자 - 인건비 확보 - 인건비확보율관리 */
   public List<PicVo> selectPicGrid2List(Map<String, String> paramMap);

   public List<PicVo> selectPicGrid3List(Map<String, String> paramMap);

   public int deletePic(Map<String, String> param);

   public int insertPic(Map<String, String> param);

   public int insertPicHist(Map<String, String> param);

   public List<PidVo> selectPidList(Map<String, String> paramMap);

   public List<PidVo> selectPieList(Map<String, String> paramMap);

   public List<PicVo> selectPifEntrustList(Map<String, String> paramMap);

   public int updateEntrust(Map<String, Object> param);
}
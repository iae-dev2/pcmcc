package kr.re.iae.pcmcc.biz.pce.pci.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.re.iae.pcmcc.biz.pce.pci.dao.PciDao;
import kr.re.iae.pcmcc.biz.pce.pci.service.PciService;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaHalfYearVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PibVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PicVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PidVo;

@Service
public class PciServiceImpl implements PciService {

   @Autowired
   private PciDao pciDao;

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비관리 */
   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#selectPiaList(java.util.Map)
    */
   @Override
   public List<PiaVo> selectPiaList(Map<String, String> paramMap) {
      try {
         return pciDao.selectPiaList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PiaVo>();
      }
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#checkPiaProject(java.util.Map)
    */
   @Override
   public List<Map<String, String>> checkPiaProject(Map<String, String> param) {
      try {
         return pciDao.checkPiaProject(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<Map<String, String>>();
      }
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#calculateMonthly(java.util.Map)
    */
   @Override
   @Transactional
   public int calculateMonthly(Map<String, String> paramMap) throws Exception {
      try {
         // 월별 직접비/간접비 금액 입력
         pciDao.insertPiaMonthlyAuto(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }

      return 0;
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#savePiaList(java.util.List)
    */
   @Override
   @Transactional
   public int savePiaList(List<PiaVo> piavolist) throws Exception {
      try {
         int cntPiaVoList = piavolist.size();
         if (cntPiaVoList > 0) {
            for (int i = 0; i < cntPiaVoList; i++) {
               PiaVo vo = piavolist.get(i);
               if ("new".equals(vo.getEditFlag())) {
                  pciDao.insertPia(vo);
               }
               else if ("mod".equals(vo.getEditFlag())) {
                  pciDao.updatePia(vo);
               }
               else if ("del".equals(vo.getEditFlag())) {
                  Map<String, String> param = new HashMap<String, String>();
                  param.put("vProjectCode", vo.getvProjectCode());
                  param.put("vYear", vo.getvYear());
                  param.put("vClass", vo.getvClass());
                  pciDao.deletePia(param);
               }
            }
         }
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#batchInsertPia(java.util.List)
    */
   @Override
   @Transactional
   public int batchInsertPia(List<PiaVo> list) throws Exception {
      try {
         int result = 0;
         Map<String, String> param = new HashMap<String, String>();

         // 과제연도로 전체 삭제
         if (list.size() > 0) {
            param.put("vYear", list.get(0).getvYear());
            pciDao.deletePiaAll(param);
         }

         for (PiaVo piaVo : list) {
            if (piaVo.getvProjectCode() != null && !"".equals(piaVo.getvProjectCode()) &&
                piaVo.getvYear() != null && !"".equals(piaVo.getvYear()) &&
                piaVo.getvClass() != null && !"".equals(piaVo.getvClass())) {
               result += pciDao.insertPia(piaVo);
            }
         }
         return result;
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   /** 관리자 - 인건비 확보 - 내부인건비/간접비관리(반기별/분기별) */
   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#selectPiaHalfYearList(java.util.Map)
    */
   @Override
   public List<PiaHalfYearVo> selectPiaHalfYearList(Map<String, String> paramMap) {
      try {
         return pciDao.selectPiaHalfYearList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PiaHalfYearVo>();
      }
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#calculateHalfYear(java.util.Map)
    */
   @Override
   @Transactional
   public int calculateHalfYear(Map<String, String> paramMap) throws Exception {
      try {
         // 직접비/간접비 금액 이력 저장(분기별/반기별)
         pciDao.insertPiaHalfYearHist(paramMap);

         // 직접비/간접비 금액 삭제(분기별/반기별)
         pciDao.deletePiaHalfYear(paramMap);

         // 직접비/간접비 금액 입력(분기별/반기별)
         pciDao.insertPiaHalfYearAuto(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }

      return 0;
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#savePiaHalfYearList(java.util.List)
    */
   @Override
   @Transactional
   public int savePiaHalfYearList(List<PiaHalfYearVo> piavolist) throws Exception {
      try {
         int cntPiaVoList = piavolist.size();
         if (cntPiaVoList > 0) {
            for (int i = 0; i < cntPiaVoList; i++) {
               PiaHalfYearVo vo = piavolist.get(i);
               if ("new".equals(vo.getEditFlag())) {
                  pciDao.insertPiaHalfYear(vo);
               }
               else if ("mod".equals(vo.getEditFlag())) {
                  pciDao.updatePiaHalfYear(vo);
               }
               else if ("del".equals(vo.getEditFlag())) {
                  Map<String, String> param = new HashMap<String, String>();
                  param.put("vEstiCode", vo.getvEstiCode());
                  param.put("vProjectCode", vo.getvProjectCode());
                  pciDao.deletePiaHalfYear(param);
               }
            }
         }
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

   /** 관리자 - 인건비 확보 - 개인별인건비 */
   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#selectPibList(java.util.Map)
    */
   @Override
   public List<PibVo> selectPibList(Map<String, String> paramMap) {
      try {
         return pciDao.selectPibList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PibVo>();
      }
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#savePibList(java.util.List)
    */
   @Override
   @Transactional
   public int savePibList(List<PibVo> pibvolist) throws Exception {
      try {
         int cntPibVoList = pibvolist.size();
         if (cntPibVoList > 0) {
            for (int i = 0; i < cntPibVoList; i++) {
               PibVo vo = pibvolist.get(i);
               if ("new".equals(vo.getEditFlag())) {
                  pciDao.insertPib(vo);
               }
               else if ("mod".equals(vo.getEditFlag())) {
                  pciDao.updatePib(vo);
               }
               else if ("del".equals(vo.getEditFlag())) {
                  Map<String, String> param = new HashMap<String, String>();
                  param.put("vEstiCode", vo.getvEstiCode());
                  param.put("vEmplNo", vo.getvEmplNo());
                  pciDao.deletePib(param);
               }
            }
         }
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#batchInsertPib(java.util.List)
    */
   @Override
   @Transactional
   public int batchInsertPib(List<PibVo> list) throws Exception {
      try {
         int result = 0;
         Map<String, String> param = new HashMap<String, String>();

         // 평가연도로 전체 삭제
         if (list.size() > 0) {
            param.put("vEstiCode", list.get(0).getvEstiCode());
            pciDao.deletePibAll(param);
         }

         for (PibVo pibVo : list) {
            if (pibVo.getvEstiCode() != null && !"".equals(pibVo.getvEstiCode()) && pibVo.getvEmplNo() != null && !"".equals(pibVo.getvEmplNo())) {
               result += pciDao.insertPib(pibVo);
            }
         }
         return result;
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   /** 관리자 - 인건비 확보 - 인건비확보율관리 */
   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#selectPicGrid2List(java.util.Map)
    */
   @Override
   public List<PicVo> selectPicGrid2List(Map<String, String> paramMap) {
      try {
         return pciDao.selectPicGrid2List(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PicVo>();
      }
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#selectPicGrid3List(java.util.Map)
    */
   @Override
   public List<PicVo> selectPicGrid3List(Map<String, String> paramMap) {
      try {
         return pciDao.selectPicGrid3List(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PicVo>();
      }
   }

   /* (non-Javadoc)
    * @see kr.re.iae.pcmcc.biz.pce.pci.service.PciService#calculatePic(java.util.Map)
    */
   @Override
   @Transactional
   public int calculatePic(Map<String, String> paramMap) throws Exception {
      List<PiaHalfYearVo> piaVoList = null;
      Map<String, String> param = null;
      String sEstiCode = "";

      try {
         sEstiCode = paramMap.get("vEstiCode").toString();

         // 인건비 확보액 이력 저장
         pciDao.insertPicHist(paramMap);

         // 인건비 확보액 삭제
         pciDao.deletePic(paramMap);

         // 직접비 간접비 목록 조회
         piaVoList = pciDao.selectPiaHalfYearList(paramMap);

         for (PiaHalfYearVo piaVo : piaVoList) {
            param = new HashMap<String, String>();
            param.put("vEstiCode", sEstiCode);
            param.put("vProjectCode", piaVo.getvProjectCode());
            param.put("nAmount", Double.toString(piaVo.getnAmount()));

            pciDao.insertPic(param);
         }
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }

      return 0;
   }

   @Override
   public List<PidVo> selectPidList(Map<String, String> paramMap) {
      try {
         return pciDao.selectPidList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PidVo>();
      }
   }

   @Override
   public List<PidVo> selectPieList(Map<String, String> paramMap) {
      try {
         return pciDao.selectPieList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PidVo>();
      }
   }

   @Override
   public List<PicVo> selectPifEntrustList(Map<String, String> paramMap) {
      try {
         return pciDao.selectPifEntrustList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PicVo>();
      }
   }

   @Override
   public int updateEntrust(Map<String, Object> paramMap) throws Exception {
      try {
         pciDao.updateEntrust(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }

      return 0;
   }
}

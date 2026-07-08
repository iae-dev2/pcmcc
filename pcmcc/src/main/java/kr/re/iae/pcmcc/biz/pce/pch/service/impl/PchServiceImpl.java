package kr.re.iae.pcmcc.biz.pce.pch.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.re.iae.pcmcc.biz.pcc.pca.dao.PcaDao;
import kr.re.iae.pcmcc.biz.pce.pch.dao.PchDao;
import kr.re.iae.pcmcc.biz.pce.pch.service.PchService;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchContVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchEmpVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchExcelVo;
import kr.re.iae.pcmcc.biz.pce.pch.vo.PchPrjVo;

@Service
public class PchServiceImpl implements PchService {

   @Autowired
   private PchDao pchDao;

   @Autowired
   private PcaDao pcaDao;

   /** 관리자 - 기여율평가 - 과제별 기여율관리 */
   @Override
   public List<PchPrjVo> selectProjectCodeList(Map<String, String> paramMap) {
      try {
         return pchDao.selectProjectCodeList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();

         return new ArrayList<PchPrjVo>();
      }
   }

   @Override
   public List<PchContVo> selectProjectContributeList(Map<String, String> paramMap) {
      try {
         return pchDao.selectProjectContributeList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();

         return new ArrayList<PchContVo>();
      }
   }

   @Override
   @Transactional
   public int savePrjContList(List<PchContVo> pchvolist) throws Exception {
      try {
         int cntPchVoList = pchvolist.size();
         if (cntPchVoList > 0) {
            for (int i = 0; i < cntPchVoList; i++) {
               PchContVo vo = pchvolist.get(i);
               if ("mod".equals(vo.getEditFlag())) {
                  pchDao.updateContribution(vo);
               }
               else if ("del".equals(vo.getEditFlag())) {
                  Map<String, String> param = new HashMap<String, String>();
                  param.put("vEstiCode", vo.getvEstiCode());
                  param.put("vProjectCode", vo.getvProjectCode());
                  param.put("vEmplNo", vo.getvEmplNo());
                  pcaDao.deleteEstiEmplNo(param);
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

   @Override
   public List<PchExcelVo> selectProjectExcelList(Map<String, String> paramMap) {
      try {
         return pchDao.selectProjectExcelList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();

         return new ArrayList<PchExcelVo>();
      }
   }

   /** 관리자 - 기여율평가 - 개인별 기여율관리 */

   @Override
   public List<PchEmpVo> selectEmplNoList(Map<String, String> paramMap) {
      try {
         return pchDao.selectEmplNoList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();

         return new ArrayList<PchEmpVo>();
      }
   }

   @Override
   public List<PchContVo> selectEmplNoContributeList(Map<String, String> paramMap) {
      try {
         return pchDao.selectEmplNoContributeList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();

         return new ArrayList<PchContVo>();
      }
   }

   @Override
   public List<PchExcelVo> selectEmplNoExcelList(Map<String, String> paramMap) {
      try {
         return pchDao.selectEmplNoExcelList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();

         return new ArrayList<PchExcelVo>();
      }
   }

   /** 관리자 - 기여율평가 - 과제별 인원관리 */
   @Override
   public List<PchPrjVo> selectPhcProjectCodeList(Map<String, String> paramMap) {
      try {
         return pchDao.selectPhcProjectCodeList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();

         return new ArrayList<PchPrjVo>();
      }
   }

   @Override
   public List<PchEmpVo> selectPhcEmpList(Map<String, String> paramMap) {
      try {
         return pchDao.selectPhcEmpList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();

         return new ArrayList<PchEmpVo>();
      }
   }

   @Override
   @Transactional
   public int savePhcEmpList(List<PchEmpVo> empvolist) throws Exception {
      try {
         int cntEmpVoList = empvolist.size();

         if (cntEmpVoList > 0) {
            for (int i = 0; i < cntEmpVoList; i++) {
               PchEmpVo vo = empvolist.get(i);

               if ("new".equals(vo.getEditFlag())) {
                  Map<String, String> empParam = new HashMap<String, String>();
                  empParam.put("vEstiCode", vo.getvEstiCode());
                  empParam.put("vProjectCode", vo.getvProjectCode());
                  empParam.put("vEmplNo", vo.getvEmplNo());
                  pcaDao.insertEstiEmplNo(empParam);
               }

               if ("del".equals(vo.getEditFlag())) {
                  Map<String, String> param = new HashMap<String, String>();
                  param.put("vEstiCode", vo.getvEstiCode());
                  param.put("vProjectCode", vo.getvProjectCode());
                  param.put("vEmplNo", vo.getvEmplNo());
                  pchDao.deletePhcEmplNo(param);
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

}

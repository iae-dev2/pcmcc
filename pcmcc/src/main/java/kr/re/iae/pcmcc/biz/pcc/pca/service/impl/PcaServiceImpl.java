package kr.re.iae.pcmcc.biz.pcc.pca.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.re.iae.pcmcc.biz.pcc.pca.dao.PcaDao;
import kr.re.iae.pcmcc.biz.pcc.pca.service.PcaService;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.EmpVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.PcaVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.PrjVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekFileVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekVo;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.FileVo;

@Service
public class PcaServiceImpl implements PcaService {

   @Autowired
   private PcaDao pcaDao;

   @Override
   public List<PrjVo> selectPrjGoal(Map<String, String> paramMap) {
      try {
         return pcaDao.selectPrjGoal(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PrjVo>();
      }
   }

   @Override
   public List<PrjVo> selectOldGoal(Map<String, String> paramMap) {
      try {
         return pcaDao.selectOldGoal(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PrjVo>();
      }
   }

   @Override
   public int updateProjectGoal(PrjVo vo) {
      try {
         return pcaDao.updateProjectGoal(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @Override
   public List<EmpVo> selectContributionList(Map<String, String> paramMap) {
      try {
         return pcaDao.selectContributionList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<EmpVo>();
      }
   }

   @Override
   public float selectContributionSum(Map<String, String> paramMap) {
      try {
         return pcaDao.selectContributionSum(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @Override
   public List<WeekFileVo> selectFileInfo(WeekFileVo vo) {
      try {
         return pcaDao.selectFileInfo(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<WeekFileVo>();
      }
   }

   @Override
   @Transactional
   public int updateWeekFile(WeekFileVo filevo) throws Exception {
      try {
         pcaDao.updateWeekFile(filevo);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }

      return 0;
   }

   @Override
   public List<WeekVo> selectWrmDataList(Map<String, String> paramMap) {
      try {
         return pcaDao.selectWrmDataList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<WeekVo>();
      }
   }

   @Override
   public List<Map<String, String>> selectDeptNameList(Map<String, String> paramMap) {
      try {
         return pcaDao.selectDeptNameList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<Map<String, String>>();
      }
   }

   @Override
   public List<EmpVo> selectAdditionalEmplNoList(Map<String, String> paramMap) {
      try {
         return pcaDao.selectAdditionalEmplNoList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<EmpVo>();
      }
   }

   @Override
   public int insertEstiEmplNo(Map<String, String> paramMap) {
      try {
         return pcaDao.insertEstiEmplNo(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @Override
   public int deleteEstiEmplNo(Map<String, String> paramMap) {
      try {
         return pcaDao.deleteEstiEmplNo(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @Override
   @Transactional
   public int updateContribution(List<EmpVo> empvolist) throws Exception {
      try {
         int cntEmpVoList = empvolist.size();
         if (cntEmpVoList > 0) {
            for (int i=0; i<cntEmpVoList; i++) {
               EmpVo vo = empvolist.get(i);
               if ("mod".equals(vo.getEditFlag())) {
                  pcaDao.updateContribution(vo);
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

   @Transactional
   @Override
   public int updateEstiStep2(PcaVo pcavo) {
      try {
         List<EmpVo> empList = pcavo.getEmpInfo();
         int empListSize = empList.size();
         if (empListSize > 0) {
            for (int i=0; i<empListSize; i++) {
               EmpVo vo = empList.get(i);
               if ("mod".equals(vo.getEditFlag())) {
                  pcaDao.updateContribution(vo);   //기여율 입력
               }
            }
         }
         Map<String, String> paramMap = new HashMap<String, String>();
         paramMap.put("vEstiCode", pcavo.getvEstiCode());
         paramMap.put("vProjectCode", pcavo.getvProjectCode());
         paramMap.put("vProjectPm", pcavo.getvProjectPm());
         int num = pcaDao.updateEstiStep2(paramMap);   //완료
         pcaDao.updateEstiStep2CheckRetire(paramMap);
         return num;
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @Override
   public String selectReview(Map<String, String> paramMap) {
      try {
         return pcaDao.selectReview(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return "error";
      }
   }

   @Override
   public int updateEstiStep5(Map<String, String> paramMap) {
      try {
         return pcaDao.updateEstiStep5(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

}

package kr.re.iae.pcmcc.biz.pcd.pda.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.re.iae.pcmcc.biz.pcd.pda.dao.PdaDao;
import kr.re.iae.pcmcc.biz.pcd.pda.service.PdaService;
import kr.re.iae.pcmcc.biz.pcd.pda.vo.EmpVo;

@Service
public class PdaServiceImpl implements PdaService {

   @Autowired
   private PdaDao pdaDao;

   @Override
   public List<EmpVo> selectProjectEmpList(Map<String, String> paramMap) {
      try {
         return pdaDao.selectProjectEmpList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<EmpVo>();
      }
   }

   @Override
   public String selectReview(Map<String, String> paramMap) {
      try {
         return pdaDao.selectReview(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return "error";
      }
   }

   /*@Override
   public int insertReview(Map<String, String> paramMap) {
      try {
         return pdaDao.insertReview(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }*/

   /* 승인 */
   @Transactional
   @Override
   public int updateEstiStep4(Map<String, String> paramMap) {
      int result = 0;
      try {
         result += pdaDao.insertReview(paramMap);
         result += pdaDao.updateEstiStep4(paramMap);
         return result;
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   /* 반려 */
   @Transactional
   @Override
   public int updateEstiStep3(Map<String, String> paramMap) {
      int result = 0;
      try {
         result += pdaDao.insertReview(paramMap);
         result += pdaDao.updateEstiStep3(paramMap);
         return result;
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }



}

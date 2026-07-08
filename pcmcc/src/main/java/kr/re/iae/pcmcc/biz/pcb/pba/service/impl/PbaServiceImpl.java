package kr.re.iae.pcmcc.biz.pcb.pba.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.re.iae.pcmcc.biz.pcb.pba.dao.PbaDao;
import kr.re.iae.pcmcc.biz.pcb.pba.service.PbaService;
import kr.re.iae.pcmcc.biz.pcb.pba.vo.AddVo;
import kr.re.iae.pcmcc.biz.pcb.pba.vo.PrjCodeVo;

@Service
public class PbaServiceImpl implements PbaService {

   @Autowired
   private PbaDao pbaDao;

   @Override
   public List<PrjCodeVo> selectPrjCodeList(Map<String, String> paramMap) {
      try {
         return pbaDao.selectPrjCodeList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PrjCodeVo>();
      }
   }

   @Override
   public float selectAverageCont(Map<String, String> paramMap) {
      try {
         return pbaDao.selectAverageCont(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @Override
   public List<AddVo> selectAdditionalPrjList(Map<String, String> paramMap) {
      try {
         return pbaDao.selectAdditionalPrjList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<AddVo>();
      }
   }

   @Override
   public int savePrjCode(PrjCodeVo vo) throws Exception {
      try {
         pbaDao.insertPrjCode(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

   @Override
   public int deletePrjCode(PrjCodeVo vo) throws Exception {
      try {
         pbaDao.deletePrjCode(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

   @Override
   public int saveWork(PrjCodeVo vo) throws Exception {
      try {
         pbaDao.updateWork(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

   @Transactional
   @Override
   public int updateFinish(PrjCodeVo vo) throws Exception {
      try {
         pbaDao.updateWork(vo);   //저장
         pbaDao.updateFinish(vo);   //입력완료
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

   @Override
   public int updateConfirm(PrjCodeVo vo) throws Exception {
      try {
         pbaDao.updateConfirm(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

}

package kr.re.iae.pcmcc.biz.pcj.pja.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.re.iae.pcmcc.biz.pcj.pja.dao.PjaDao;
import kr.re.iae.pcmcc.biz.pcj.pja.service.PjaService;
import kr.re.iae.pcmcc.biz.pcj.pja.vo.EmpVo;

@Service
public class PjaServiceImpl implements PjaService {

   @Autowired
   private PjaDao pjaDao;

   @Override
   public List selectProjectCodeList(Map<String, Object> paramMap) {
      try {
         return pjaDao.selectProjectCodeList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<>();
      }
   }

   @Override
   public List<EmpVo> selectProjectEmpList(Map<String, String> paramMap) {
      try {
         return pjaDao.selectProjectEmpList(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<EmpVo>();
      }
   }

   @Override
   public String selectReview(Map<String, String> paramMap) {
      try {
         return pjaDao.selectReview(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return "error";
      }
   }

}

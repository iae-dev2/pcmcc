package kr.re.iae.pcmcc.biz.pce.pcg.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.re.iae.pcmcc.biz.pce.pcg.dao.PcgDao;
import kr.re.iae.pcmcc.biz.pce.pcg.service.PcgService;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgaVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgbVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgcVo;

@Service
public class PcgServiceImpl implements PcgService {

   @Autowired
   private PcgDao pcgDao;

   @Override
   public List<PgaVo> selectEstiCode(Map param) {
      try {
         return pcgDao.selectEstiCode(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PgaVo>();
      }
   }

   @Override
   @Transactional
   public int saveEstiCode(List<PgaVo> pgavolist) throws Exception {
      try {
         int cntPgaVoList = pgavolist.size();
         if (cntPgaVoList > 0) {
            for (int i = 0; i < cntPgaVoList; i++) {
               PgaVo vo = pgavolist.get(i);
               if ("new".equals(vo.getEditFlag())) {
                  pcgDao.insertEstiCode(vo);
               }
               else if ("mod".equals(vo.getEditFlag())) {
                  pcgDao.updateEstiCode(vo);
               }
               else if ("del".equals(vo.getEditFlag())) {
                  Map<String, String> param = new HashMap<String, String>();
                  param.put("vEstiCode", vo.getvEstiCode());
                  pcgDao.deleteEstiCode(param);
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
   public List<PgbVo> checkProject(Map param) {
      try {
         return pcgDao.checkProject(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PgbVo>();
      }
   }

   @Override
   public List<PgbVo> selectProjectCodeList(Map param) {
      try {
         return pcgDao.selectProjectCodeList(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PgbVo>();
      }
   }

   @Override
   @Transactional
   public int saveProjectCode(List<PgbVo> pgbvolist) throws Exception {
      try {
         int cntPgbVoList = pgbvolist.size();
         if (cntPgbVoList > 0) {
            for (int i = 0; i < cntPgbVoList; i++) {
               PgbVo vo = pgbvolist.get(i);
               if ("new".equals(vo.getEditFlag())) {
                  pcgDao.insertProjectCode(vo);
               }
               else if ("mod".equals(vo.getEditFlag())) {
                  pcgDao.updateProjectCode(vo);
               }
               else if ("del".equals(vo.getEditFlag())) {
                  Map<String, String> param = new HashMap<String, String>();
                  param.put("vEstiCode", vo.getvEstiCode());
                  param.put("vProjectCode", vo.getvProjectCode());
                  pcgDao.deleteProjectCode(param);
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
   @Transactional
   public int batchInsertPgb(List<PgbVo> list) throws Exception {
      try {
         int result = 0;
         Map<String, String> param = new HashMap<String, String>();

         // 삭제를 개별로 할 경우 수정해서 사용
         /*
          * for (PgcVo pgcVo: list) { if (pgcVo.getvEstiCode() != null &&
          * !"".equals(pgcVo.getvEstiCode())) { param.put("copyEstiCode",
          * pgcVo.getvEstiCode());
          *
          * pcgDao.deleteAll(param); //변경해서 } }
          */

         // 삭제를 전체로 하는 경우
         if (list.size() > 0) {
            param.put("vEstiCode", list.get(0).getvEstiCode());
            pcgDao.deleteProjectCodeAll(param);
         }

         for (PgbVo pgbVo : list) {
            if (pgbVo.getvEstiCode() != null && !"".equals(pgbVo.getvEstiCode()) &&
                pgbVo.getvProjectCode() != null && !"".equals(pgbVo.getvProjectCode()) &&
                pgbVo.getvGovName() != null && !"".equals(pgbVo.getvGovName()) && pgbVo.getvProjectDivision() != null &&
                !"".equals(pgbVo.getvProjectDivision()) && pgbVo.getvEstiStep() != null &&
                !"".equals(pgbVo.getvEstiStep())) {
               result += pcgDao.insertProjectCode(pgbVo);
            }
         }
         return result;
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @Override
   public List<PgbVo> selectProjectCodeExcelList(Map<String, String> param) {
      try {
         return pcgDao.selectProjectCodeExcelList(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PgbVo>();
      }
   }

   @Override
   public List<PgcVo> selectEmplNoList(Map param) {
      try {
         return pcgDao.selectEmplNoList(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<PgcVo>();
      }
   }

   @Override
   @Transactional
   public int saveEmplNoList(List<PgcVo> pgcvolist) throws Exception {
      try {
         int cntPgcVoList = pgcvolist.size();
         if (cntPgcVoList > 0) {
            for (int i = 0; i < cntPgcVoList; i++) {
               PgcVo vo = pgcvolist.get(i);
               if ("new".equals(vo.getEditFlag())) {
                  pcgDao.insertEmplNo(vo);
               }
               else if ("mod".equals(vo.getEditFlag())) {
                  pcgDao.updateEmplNo(vo);
               }
               else if ("del".equals(vo.getEditFlag())) {
                  Map<String, String> param = new HashMap<String, String>();
                  param.put("vEstiCode", vo.getvEstiCode());
                  param.put("vEmplNo", vo.getvEmplNo());
                  pcgDao.deleteEmplNo(param);
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
   public int copyPgc(Map<String, String> param) {
      pcgDao.deleteAll(param);
      return pcgDao.copyPgc(param);
   }

   @Override
   @Transactional
   public int batchInsertPgc(List<PgcVo> list) throws Exception {
      try {
         int result = 0;
         Map<String, String> param = new HashMap<String, String>();

         // 삭제를 개별로 할 경우 사용
         /*
          * for (PgcVo pgcVo: list) { if (pgcVo.getvEstiCode() != null &&
          * !"".equals(pgcVo.getvEstiCode())) { param.put("copyEstiCode",
          * pgcVo.getvEstiCode());
          *
          * pcgDao.deleteAll(param); //변경해서 } }
          */

         // 삭제를 전체로 하는 경우
         if (list.size() > 0) {
            param.put("copyEstiCode", list.get(0).getvEstiCode());
            pcgDao.deleteAll(param);
         }

         for (PgcVo pgcVo : list) {
            if (pgcVo.getvEstiCode() != null && !"".equals(pgcVo.getvEstiCode()) && pgcVo.getvEmplNo() != null &&
                !"".equals(pgcVo.getvEmplNo()) && pgcVo.getvName() != null && !"".equals(pgcVo.getvName()) &&
                pgcVo.getvPassword() != null && !"".equals(pgcVo.getvPassword()) && pgcVo.getvEstiYn() != null &&
                !"".equals(pgcVo.getvEstiYn())) {
               result += pcgDao.insertEmplNo(pgcVo);
            }
         }
         return result;
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

}

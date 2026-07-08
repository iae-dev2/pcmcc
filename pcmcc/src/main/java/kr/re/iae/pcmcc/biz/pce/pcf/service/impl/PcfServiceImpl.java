package kr.re.iae.pcmcc.biz.pce.pcf.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.re.iae.pcmcc.biz.pce.pcf.dao.PcfDao;
import kr.re.iae.pcmcc.biz.pce.pcf.service.PcfService;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.BoardVo;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.FileVo;

@Service
public class PcfServiceImpl implements PcfService {

   @Autowired
   private PcfDao pcfDao;

   @Override
   public List<BoardVo> selectBoard() {
      try {
         return pcfDao.selectBoard();
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<BoardVo>();
      }
   }

   @Override
   public String selectBoardSeq() {
      try {
         return pcfDao.selectBoardSeq();
      }
      catch (Exception e) {
         e.printStackTrace();
         return new String();
      }
   }

   @Override
   public int deleteBoard(Map param) throws Exception {
      try {
         pcfDao.deleteBoard(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }

      return 0;
   }

   @Override
   public int saveBoard(BoardVo vo) throws Exception {
      try {
         if ("new".equals(vo.getEditFlag())) {
            int nSeqNo = pcfDao.insertBoard(vo);
            List<FileVo> fileList = vo.getFileList();
            int cntFileList = fileList.size();

            if (cntFileList > 0) {
               for (int i = 0; i < cntFileList; i++) {
                  FileVo filevo = fileList.get(i);
                  filevo.setnSeqNo(nSeqNo);

                  if ("new".equals(filevo.getEditFlag())) {
                     pcfDao.insertBoardFile(filevo);
                  }
               }
            }
         }
         else if ("mod".equals(vo.getEditFlag())) {
            pcfDao.updateBoard(vo);

            List<FileVo> fileList = vo.getFileList();
            int cntFileList = fileList.size();

            if (cntFileList > 0) {
               for (int i = 0; i < cntFileList; i++) {
                  FileVo filevo = fileList.get(i);

                  if ("new".equals(filevo.getEditFlag())) {
                     pcfDao.insertBoardFile(filevo);
                  }
                  else if ("del".equals(filevo.getEditFlag())) {
                     pcfDao.deleteBoardFile(filevo);
                  }
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
   public List<FileVo> selectBoardFile(FileVo vo) {
      try {
         return pcfDao.selectBoardFile(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return new ArrayList<FileVo>();
      }
   }

   @Override
   @Transactional
   public int updateBoardFile(FileVo filevo) throws Exception {
      try {
         pcfDao.updateBoardFile(filevo);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }

      return 0;
   }


   @Override
   public int updateHitCount(Map param) throws Exception {
      try {
         pcfDao.updateHitCount(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         throw e;
      }
      return 0;
   }

}

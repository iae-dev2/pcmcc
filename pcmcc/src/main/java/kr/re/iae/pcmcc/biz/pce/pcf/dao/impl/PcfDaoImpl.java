package kr.re.iae.pcmcc.biz.pce.pcf.dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import kr.re.iae.pcmcc.biz.pce.pcf.dao.PcfDao;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.BoardVo;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.FileVo;

@Repository
public class PcfDaoImpl implements PcfDao {

   @Autowired
   @Resource(name = "sqlSession")
   private SqlSessionTemplate sqlsession;

   @Override
   public List<BoardVo> selectBoard() {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pcf.selectBoard");
   }

   @Override
   public int insertBoard(BoardVo vo) {
      int count = sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pcf.insertBoard", vo);

      if (count > 0) {
         return vo.getnSeqNo();
      }
      else {
         return -1;
      }
   }

   @Override
   public int updateBoard(BoardVo vo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcf.updateBoard", vo);
   }

   @Override
   public int deleteBoard(Map param) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pce.pcf.deleteBoard", param);
   }

   @Override
   public List<FileVo> selectBoardFile(FileVo vo) {
      return sqlsession.selectList("kr.re.iae.pcmcc.biz.pce.pcf.selectBoardFile", vo);
   }

   @Override
   public String selectBoardSeq() {
      return sqlsession.selectOne("kr.re.iae.pcmcc.biz.pce.pcf.selectBoardSeq");
   }

   @Override
   public int insertBoardFile(FileVo vo) {
      return sqlsession.insert("kr.re.iae.pcmcc.biz.pce.pcf.insertBoardFile", vo);
   }

   @Override
   public int deleteBoardFile(FileVo vo) {
      return sqlsession.delete("kr.re.iae.pcmcc.biz.pce.pcf.deleteBoardFile", vo);
   }

   @Override
   public int updateBoardFile(FileVo vo) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcf.updateBoardFile", vo);
   }

   @Override
   public int updateHitCount(Map param) {
      return sqlsession.update("kr.re.iae.pcmcc.biz.pce.pcf.updateHitCount", param);
   }

}

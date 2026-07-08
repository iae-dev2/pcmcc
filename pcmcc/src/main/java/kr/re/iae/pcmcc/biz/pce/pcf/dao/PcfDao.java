package kr.re.iae.pcmcc.biz.pce.pcf.dao;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pce.pcf.vo.BoardVo;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.FileVo;

public interface PcfDao {

   public List<BoardVo> selectBoard();

   public int insertBoard(BoardVo vo);

   public int updateBoard(BoardVo vo);

   public int deleteBoard(Map param);

   public List<FileVo> selectBoardFile(FileVo vo);

   public String selectBoardSeq();

   public int insertBoardFile(FileVo vo);

   public int deleteBoardFile(FileVo vo);

   public int updateBoardFile(FileVo vo);

   public int updateHitCount(Map param);

}

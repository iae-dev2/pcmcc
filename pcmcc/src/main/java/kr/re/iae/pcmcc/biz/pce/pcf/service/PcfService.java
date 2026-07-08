package kr.re.iae.pcmcc.biz.pce.pcf.service;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pce.pcf.vo.BoardVo;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.FileVo;

public interface PcfService {

   public List<BoardVo> selectBoard();

   public String selectBoardSeq();

   public int deleteBoard(Map param) throws Exception;

   public int saveBoard(BoardVo vo) throws Exception;

   public List<FileVo> selectBoardFile(FileVo vo);

   public int updateBoardFile(FileVo vo) throws Exception;

   public int updateHitCount(Map param) throws Exception;

}

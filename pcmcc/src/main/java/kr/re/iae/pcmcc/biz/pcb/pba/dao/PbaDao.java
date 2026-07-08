package kr.re.iae.pcmcc.biz.pcb.pba.dao;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pcb.pba.vo.AddVo;
import kr.re.iae.pcmcc.biz.pcb.pba.vo.PrjCodeVo;

public interface PbaDao {

   public List<PrjCodeVo> selectPrjCodeList(Map<String, String> paramMap);

   public float selectAverageCont(Map<String, String> paramMap);

   public List<AddVo> selectAdditionalPrjList(Map<String, String> paramMap);

   public int insertPrjCode(PrjCodeVo vo);

   public int deletePrjCode(PrjCodeVo vo);

   public int updateWork(PrjCodeVo vo);

   public int updateFinish(PrjCodeVo vo);

   public int updateConfirm(PrjCodeVo vo);

}

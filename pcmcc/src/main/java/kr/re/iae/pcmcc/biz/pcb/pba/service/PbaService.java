package kr.re.iae.pcmcc.biz.pcb.pba.service;

import java.util.List;
import java.util.Map;

import kr.re.iae.pcmcc.biz.pcb.pba.vo.AddVo;
import kr.re.iae.pcmcc.biz.pcb.pba.vo.PrjCodeVo;

public interface PbaService {

   public List<PrjCodeVo> selectPrjCodeList(Map<String, String> paramMap);

   public float selectAverageCont(Map<String, String> paramMap);

   public List<AddVo> selectAdditionalPrjList(Map<String, String> paramMap);

   public int savePrjCode(PrjCodeVo vo) throws Exception;

   public int deletePrjCode(PrjCodeVo vo) throws Exception;

   public int saveWork(PrjCodeVo vo) throws Exception;

   public int updateFinish(PrjCodeVo vo) throws Exception;

   public int updateConfirm(PrjCodeVo vo) throws Exception;

}

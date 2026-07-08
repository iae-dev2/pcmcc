package kr.re.iae.pcmcc.biz.pcc.pca.vo;

import java.util.ArrayList;
import java.util.List;

public class PcaVo {

   private String vEstiCode;    // 평가코드
   private String vProjectCode; // 과제코드
   private String vProjectPm;   // 과제PM

   private List<EmpVo> empInfo = new ArrayList<EmpVo>(); // 참여연구원 기여율 목록

   public String getvEstiCode() {
      return vEstiCode;
   }

   public void setvEstiCode(String vEstiCode) {
      this.vEstiCode = vEstiCode;
   }

   public String getvProjectCode() {
      return vProjectCode;
   }

   public void setvProjectCode(String vProjectCode) {
      this.vProjectCode = vProjectCode;
   }

   public String getvProjectPm() {
      return vProjectPm;
   }

   public void setvProjectPm(String vProjectPm) {
      this.vProjectPm = vProjectPm;
   }

   public List<EmpVo> getEmpInfo() {
      return empInfo;
   }

   public void setEmpInfo(List<EmpVo> empInfo) {
      this.empInfo = empInfo;
   }

   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("PcaVo [vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
      builder.append(", vProjectPm=");
      builder.append(vProjectPm);
      builder.append(", empInfo=");
      builder.append(empInfo);
      builder.append("]");
      return builder.toString();
   }

}

package kr.re.iae.pcmcc.biz.pce.pch.vo;

public class PchPrjVo {

   private String vEstiCode;       /* 평가코드 */
   private String vProjectCode;    /* 과제코드 */
   private String vProjectName;    /* 과제명 */
   private String vProjectPm;      /* 과제 PM 사번 */
   private String vProjectPmName;  /* 과제 PM명 */
   private String vProjectEva;     /* 과제 평가자 사번 */
   private String vProjectEvaName; /* 과제 평가자명 */
   private float  vProjectSum;     /* 기여율합 */
   private String vEstiStep;       /* 진행단계 */
   private String vConfirm;        /* 확인여부 */
   private String vFinish;         /* 완료여부 */

   /**
    * @return the vEstiCode
    */
   public String getvEstiCode() {
      return vEstiCode;
   }

   /**
    * @param vEstiCode
    *           the vEstiCode to set
    */
   public void setvEstiCode(String vEstiCode) {
      this.vEstiCode = vEstiCode;
   }

   /**
    * @return the vProjectCode
    */
   public String getvProjectCode() {
      return vProjectCode;
   }

   /**
    * @param vProjectCode
    *           the vProjectCode to set
    */
   public void setvProjectCode(String vProjectCode) {
      this.vProjectCode = vProjectCode;
   }

   /**
    * @return the vProjectName
    */
   public String getvProjectName() {
      return vProjectName;
   }

   /**
    * @param vProjectName
    *           the vProjectName to set
    */
   public void setvProjectName(String vProjectName) {
      this.vProjectName = vProjectName;
   }

   /**
    * @return the vProjectPm
    */
   public String getvProjectPm() {
      return vProjectPm;
   }

   /**
    * @param vProjectPm
    *           the vProjectPm to set
    */
   public void setvProjectPm(String vProjectPm) {
      this.vProjectPm = vProjectPm;
   }

   /**
    * @return the vProjectPmName
    */
   public String getvProjectPmName() {
      return vProjectPmName;
   }

   /**
    * @param vProjectPmName
    *           the vProjectPmName to set
    */
   public void setvProjectPmName(String vProjectPmName) {
      this.vProjectPmName = vProjectPmName;
   }

   /**
    * @return the vProjectEva
    */
   public String getvProjectEva() {
      return vProjectEva;
   }

   /**
    * @param vProjectEva
    *           the vProjectEva to set
    */
   public void setvProjectEva(String vProjectEva) {
      this.vProjectEva = vProjectEva;
   }

   /**
    * @return the vProjectEvaName
    */
   public String getvProjectEvaName() {
      return vProjectEvaName;
   }

   /**
    * @param vProjectEvaName
    *           the vProjectEvaName to set
    */
   public void setvProjectEvaName(String vProjectEvaName) {
      this.vProjectEvaName = vProjectEvaName;
   }

   /**
    * @return the vProjectSum
    */
   public float getvProjectSum() {
      return vProjectSum;
   }

   /**
    * @param vProjectSum
    *           the vProjectSum to set
    */
   public void setvProjectSum(float vProjectSum) {
      this.vProjectSum = vProjectSum;
   }

   /**
    * @return the vEstiStep
    */
   public String getvEstiStep() {
      return vEstiStep;
   }

   /**
    * @param vEstiStep
    *           the vEstiStep to set
    */
   public void setvEstiStep(String vEstiStep) {
      this.vEstiStep = vEstiStep;
   }

   /**
    * @return the vConfirm
    */
   public String getvConfirm() {
      return vConfirm;
   }

   /**
    * @param vConfirm
    *           the vConfirm to set
    */
   public void setvConfirm(String vConfirm) {
      this.vConfirm = vConfirm;
   }

   /**
    * @return the vFinish
    */
   public String getvFinish() {
      return vFinish;
   }

   /**
    * @param vFinish
    *           the vFinish to set
    */
   public void setvFinish(String vFinish) {
      this.vFinish = vFinish;
   }

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("PchPrjVo [vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
      builder.append(", vProjectName=");
      builder.append(vProjectName);
      builder.append(", vProjectPm=");
      builder.append(vProjectPm);
      builder.append(", vProjectPmName=");
      builder.append(vProjectPmName);
      builder.append(", vProjectEva=");
      builder.append(vProjectEva);
      builder.append(", vProjectEvaName=");
      builder.append(vProjectEvaName);
      builder.append(", vProjectSum=");
      builder.append(vProjectSum);
      builder.append(", vEstiStep=");
      builder.append(vEstiStep);
      builder.append(", vConfirm=");
      builder.append(vConfirm);
      builder.append(", vFinish=");
      builder.append(vFinish);
      builder.append("]");
      return builder.toString();
   }

}

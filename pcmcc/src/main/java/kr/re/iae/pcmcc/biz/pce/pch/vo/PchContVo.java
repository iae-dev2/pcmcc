package kr.re.iae.pcmcc.biz.pce.pch.vo;

public class PchContVo {

   private String editFlag;
   private String vEstiCode;      /* 평가코드 */
   private String vProjectCode;   /* 과제코드 */
   private String vProjectName;   /* 과제명 */
   private String vProjectPm;     /* 과제PM */
   private String vProjectPmName; /* 과제PM명 */
   private String vEmplNo;        /* 사번 */
   private String vName;          /* 성명 */
   private String vPosName;       /* 직위명 */
   private String vWork;          /* 업무 */
   private float  nContribution;  /* 기여율 */
   private String vContent;       /* 평가의견 */
   private String vConfirm;       /* 확인여부 */
   private String vFinish;        /* 완룔여부 */

   /**
    * @return the editFlag
    */
   public String getEditFlag() {
      return editFlag;
   }

   /**
    * @param editFlag
    *           the editFlag to set
    */
   public void setEditFlag(String editFlag) {
      this.editFlag = editFlag;
   }

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
    * @return the vProjectPm
    */
   public String getvProjectPm() {
      return vProjectPm;
   }

   /**
    * @param vProjectPmName
    *           the vProjectPmName to set
    */
   public void setvProjectPm(String vProjectPmName) {
      this.vProjectPmName = vProjectPmName;
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
    * @return the vEmplNo
    */
   public String getvEmplNo() {
      return vEmplNo;
   }

   /**
    * @param vEmplNo
    *           the vEmplNo to set
    */
   public void setvEmplNo(String vEmplNo) {
      this.vEmplNo = vEmplNo;
   }

   /**
    * @return the vName
    */
   public String getvName() {
      return vName;
   }

   /**
    * @param vName
    *           the vName to set
    */
   public void setvName(String vName) {
      this.vName = vName;
   }

   /**
    * @return the vPosName
    */
   public String getvPosName() {
      return vPosName;
   }

   /**
    * @param vPosName
    *           the vPosName to set
    */
   public void setvPosName(String vPosName) {
      this.vPosName = vPosName;
   }

   /**
    * @return the vWork
    */
   public String getvWork() {
      return vWork;
   }

   /**
    * @param vWork
    *           the vWork to set
    */
   public void setvWork(String vWork) {
      this.vWork = vWork;
   }

   /**
    * @return the nContribution
    */
   public float getnContribution() {
      return nContribution;
   }

   /**
    * @param nContribution
    *           the nContribution to set
    */
   public void setnContribution(float nContribution) {
      this.nContribution = nContribution;
   }

   /**
    * @return the vContent
    */
   public String getvContent() {
      return vContent;
   }

   /**
    * @param vContent
    *           the vContent to set
    */
   public void setvContent(String vContent) {
      this.vContent = vContent;
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
      builder.append("PchContVo [editFlag=");
      builder.append(editFlag);
      builder.append(", vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
      builder.append(", vProjectName=");
      builder.append(vProjectName);
      builder.append(", vEmplNo=");
      builder.append(vEmplNo);
      builder.append(", vName=");
      builder.append(vName);
      builder.append(", vPosName=");
      builder.append(vPosName);
      builder.append(", vWork=");
      builder.append(vWork);
      builder.append(", nContribution=");
      builder.append(nContribution);
      builder.append(", vContent=");
      builder.append(vContent);
      builder.append(", vConfirm=");
      builder.append(vConfirm);
      builder.append(", vFinish=");
      builder.append(vFinish);
      builder.append("]");
      return builder.toString();
   }

}

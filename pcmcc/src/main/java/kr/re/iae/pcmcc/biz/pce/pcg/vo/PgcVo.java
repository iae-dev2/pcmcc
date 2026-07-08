package kr.re.iae.pcmcc.biz.pce.pcg.vo;

public class PgcVo {

   private String editFlag;
   private String vEstiCode;  /* 01_평가코드 */
   private String vEmplNo;    /* 02_사번 */
   private String vName;      /* 03_성명 */
   private String vDeptName;  /* 04_센터명 */
   private String vTeamName;  /* 05_팀명 */
   private String vPosName;   /* 06_직위명 */
   private String vPassword;  /* 07_암호 */
   private String vGrade;     /* 08_등급 */
   private String vGradeName; /* 09_등급명 */
   private String vEstiYn;    /* 10_평가대상 여부 */
   private String vRetireYn;  /* 11_퇴사여부 */

   public String getEditFlag() {
      return editFlag;
   }

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
    * @return the vDeptName
    */
   public String getvDeptName() {
      return vDeptName;
   }

   /**
    * @param vDeptName
    *           the vDeptName to set
    */
   public void setvDeptName(String vDeptName) {
      this.vDeptName = vDeptName;
   }

   /**
    * @return the vTeamName
    */
   public String getvTeamName() {
      return vTeamName;
   }

   /**
    * @param vTeamName
    *           the vTeamName to set
    */
   public void setvTeamName(String vTeamName) {
      this.vTeamName = vTeamName;
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
    * @return the vPassword
    */
   public String getvPassword() {
      return vPassword;
   }

   /**
    * @param vPassword
    *           the vPassword to set
    */
   public void setvPassword(String vPassword) {
      this.vPassword = vPassword;
   }

   /**
    * @return the vGrade
    */
   public String getvGrade() {
      return vGrade;
   }

   /**
    * @param vGrade
    *           the vGrade to set
    */
   public void setvGrade(String vGrade) {
      this.vGrade = vGrade;
   }

   /**
    * @return the vGradeName
    */
   public String getvGradeName() {
      return vGradeName;
   }

   /**
    * @param vGradeName
    *           the vGradeName to set
    */
   public void setvGradeName(String vGradeName) {
      this.vGradeName = vGradeName;
   }

   /**
    * @return the vEstiYn
    */
   public String getvEstiYn() {
      return vEstiYn;
   }

   /**
    * @param vEstiYn
    *           the vEstiYn to set
    */
   public void setvEstiYn(String vEstiYn) {
      this.vEstiYn = vEstiYn;
   }

   public String getvRetireYn() {
      return vRetireYn;
   }

   public void setvRetireYn(String vRetireYn) {
      this.vRetireYn = vRetireYn;
   }

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("PgcVo [vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vEmplNo=");
      builder.append(vEmplNo);
      builder.append(", vName=");
      builder.append(vName);
      builder.append(", vDeptName=");
      builder.append(vDeptName);
      builder.append(", vTeamName=");
      builder.append(vTeamName);
      builder.append(", vPosName=");
      builder.append(vPosName);
      builder.append(", vPassword=");
      builder.append(vPassword);
      builder.append(", vGrade=");
      builder.append(vGrade);
      builder.append(", vGradeName=");
      builder.append(vGradeName);
      builder.append(", vEstiYn=");
      builder.append(vEstiYn);
      builder.append(", vRetireYn=");
      builder.append(vRetireYn);
      builder.append("]");

      return builder.toString();
   }

}
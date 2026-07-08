package kr.re.iae.pcmcc.biz.pce.pch.vo;

public class PchEmpVo {

   private String editFlag;
   private String vEstiCode;     /* 평가코드 */
   private String vProjectCode;  /* 과제코드 */
   private String vEmplNo;       /* 사번 */
   private String vName;         /* 성명 */
   private String vDeptName;     /* 부서명 */
   private String vTeamName;     /* 팀명 */
   private String vPosName;      /* 직위명 */
   private String nContribution; /* 기여율 */

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
    * @return the nContribution
    */
   public String getnContribution() {
      return nContribution;
   }

   /**
    * @param nContribution the nContribution to set
    */
   public void setnContribution(String nContribution) {
      this.nContribution = nContribution;
   }

   /* (non-Javadoc)
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("PchEmpVo [editFlag=");
      builder.append(editFlag);
      builder.append(", vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
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
      builder.append(", nContribution=");
      builder.append(nContribution);
      builder.append("]");
      return builder.toString();
   }

}

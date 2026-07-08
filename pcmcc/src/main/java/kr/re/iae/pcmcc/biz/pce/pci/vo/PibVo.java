package kr.re.iae.pcmcc.biz.pce.pci.vo;

public class PibVo {

   private String editFlag;
   private String vEstiCode; /* 01_평가코드 */
   private String vEmplNo;   /* 02_사번 */
   private String vName;     /* 03_성명 */
   private String vPosName;  /* 04_직위명 */
   private String vDeptName; /* 05_부서명 */
   private String vTeamName; /* 06_팀명 */
   private double nAmount;   /* 07_인건비 */

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
    * @return the nAamount
    */
   public double getnAmount() {
      return nAmount;
   }

   /**
    * @param nAamount
    *           the nAamount to set
    */
   public void setnAmount(double nAmount) {
      this.nAmount = nAmount;
   }

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("PivVo [editFlag=");
      builder.append(editFlag);
      builder.append(", vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vEmplNo=");
      builder.append(vEmplNo);
      builder.append(", vName=");
      builder.append(vName);
      builder.append(", vPosName=");
      builder.append(vPosName);
      builder.append(", vDeptName=");
      builder.append(vDeptName);
      builder.append(", vTeamName=");
      builder.append(vTeamName);
      builder.append(", nAamount=");
      builder.append(nAmount);
      builder.append("]");
      return builder.toString();
   }
}

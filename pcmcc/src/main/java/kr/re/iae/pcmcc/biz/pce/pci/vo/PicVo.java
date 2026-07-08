package kr.re.iae.pcmcc.biz.pce.pci.vo;

public class PicVo {

   private String vEstiCode;     /* 01_평가코드 */
   private String vProjectCode;  /* 02_과제코드 */
   private String vProjectName;  /* 03_과제명 */
   private String vEmplNo;       /* 04_사번 */
   private String vName;         /* 05_성명 */
   private String vDeptCode;     /* 06_부서코드 */
   private String vDeptName;     /* 07_부서명 */
   private String vTeamCode;     /* 08_팀코드 */
   private String vTeamName;     /* 09_팀명 */
   private String vPosName;      /* 10_직위명 */
   private int    nProjectCnt;   /* 11_과제건수 */
   private double nContribution; /* 12_참여율 */
   private double nLaborCost;    /* 13_인건비 */
   private double nAmount;       /* 14_연봉 */
   private double nSecureRate;   /* 15_확보율 */

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
    * @return the vDeptCode
    */
   public String getvDeptCode() {
      return vDeptCode;
   }

   /**
    * @param vDeptCode
    *           the vDeptCode to set
    */
   public void setvDeptCode(String vDeptCode) {
      this.vDeptCode = vDeptCode;
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
    * @return the vTeamCode
    */
   public String getvTeamCode() {
      return vTeamCode;
   }

   /**
    * @param vTeamCode
    *           the vTeamCode to set
    */
   public void setvTeamCode(String vTeamCode) {
      this.vTeamCode = vTeamCode;
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
    * @return the nProjectCnt
    */
   public int getnProjectCnt() {
      return nProjectCnt;
   }

   /**
    * @param nProjectCnt
    *           the nProjectCnt to set
    */
   public void setnProjectCnt(int nProjectCnt) {
      this.nProjectCnt = nProjectCnt;
   }

   /**
    * @return the nContribution
    */
   public double getnContribution() {
      return nContribution;
   }

   /**
    * @param nContribution
    *           the nContribution to set
    */
   public void setnContribution(double nContribution) {
      this.nContribution = nContribution;
   }

   /**
    * @return the nLaborCost
    */
   public double getnLaborCost() {
      return nLaborCost;
   }

   /**
    * @param nLaborCost
    *           the nLaborCost to set
    */
   public void setnLaborCost(double nLaborCost) {
      this.nLaborCost = nLaborCost;
   }

   /**
    * @return the nAmount
    */
   public double getnAmount() {
      return nAmount;
   }

   /**
    * @param nAmount
    *           the nAmount to set
    */
   public void setnAmount(double nAmount) {
      this.nAmount = nAmount;
   }

   /**
    * @return the nSecureRate
    */
   public double getnSecureRate() {
      return nSecureRate;
   }

   /**
    * @param nSecureRate
    *           the nSecureRate to set
    */
   public void setnSecureRate(double nSecureRate) {
      this.nSecureRate = nSecureRate;
   }

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("PicVo [vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
      builder.append(", vProjectName=");
      builder.append(vProjectName);
      builder.append(", vEmplNo=");
      builder.append(vEmplNo);
      builder.append(", vName=");
      builder.append(vName);
      builder.append(", vDeptCode=");
      builder.append(vDeptCode);
      builder.append(", vDeptName=");
      builder.append(vDeptName);
      builder.append(", vTeamCode=");
      builder.append(vTeamCode);
      builder.append(", vTeamName=");
      builder.append(vTeamName);
      builder.append(", vPosName=");
      builder.append(vPosName);
      builder.append(", nProjectCnt=");
      builder.append(nProjectCnt);
      builder.append(", nContribution=");
      builder.append(nContribution);
      builder.append(", nLaborCost=");
      builder.append(nLaborCost);
      builder.append(", nAmount=");
      builder.append(nAmount);
      builder.append(", nSecureRate=");
      builder.append(nSecureRate);
      builder.append("]");
      return builder.toString();
   }

}
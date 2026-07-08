package kr.re.iae.pcmcc.biz.pce.pci.vo;

public class PidVo {

   private String vEmplNo;       /* 사번 */
   private String vName;         /* 성명 */
   private String vPosName;      /* 직위명 */
   private String vDeptCode;     /* 부서코드 */
   private String vDeptName;     /* 부서명 */
   private String vTeamCode;     /* 팀코드 */
   private String vTeamName;     /* 팀명 */
   private int    E1_nProjectCnt;   /* E1_과제건수 */
   private double E1_nContribution; /* E1_참여율 */
   private double E1_nLaborCost;    /* E1_인건비 */
   private double E1_nAmount;       /* E1_연봉 */
   private int    E2_nProjectCnt;   /* E2_과제건수 */
   private double E2_nContribution; /* E2_참여율 */
   private double E2_nLaborCost;    /* E2_인건비 */
   private double E2_nAmount;       /* E2_연봉 */
//   private double nSecureRate;   /* 확보율 */
   public String getvEmplNo() {
      return vEmplNo;
   }
   public void setvEmplNo(String vEmplNo) {
      this.vEmplNo = vEmplNo;
   }
   public String getvName() {
      return vName;
   }
   public void setvName(String vName) {
      this.vName = vName;
   }
   public String getvPosName() {
      return vPosName;
   }
   public void setvPosName(String vPosName) {
      this.vPosName = vPosName;
   }
   public String getvDeptCode() {
      return vDeptCode;
   }
   public void setvDeptCode(String vDeptCode) {
      this.vDeptCode = vDeptCode;
   }
   public String getvDeptName() {
      return vDeptName;
   }
   public void setvDeptName(String vDeptName) {
      this.vDeptName = vDeptName;
   }
   public String getvTeamCode() {
      return vTeamCode;
   }
   public void setvTeamCode(String vTeamCode) {
      this.vTeamCode = vTeamCode;
   }
   public String getvTeamName() {
      return vTeamName;
   }
   public void setvTeamName(String vTeamName) {
      this.vTeamName = vTeamName;
   }
   public int getE1_nProjectCnt() {
      return E1_nProjectCnt;
   }
   public void setE1_nProjectCnt(int e1_nProjectCnt) {
      E1_nProjectCnt = e1_nProjectCnt;
   }
   public double getE1_nContribution() {
      return E1_nContribution;
   }
   public void setE1_nContribution(double e1_nContribution) {
      E1_nContribution = e1_nContribution;
   }
   public double getE1_nLaborCost() {
      return E1_nLaborCost;
   }
   public void setE1_nLaborCost(double e1_nLaborCost) {
      E1_nLaborCost = e1_nLaborCost;
   }
   public double getE1_nAmount() {
      return E1_nAmount;
   }
   public void setE1_nAmount(double e1_nAmount) {
      E1_nAmount = e1_nAmount;
   }
   public int getE2_nProjectCnt() {
      return E2_nProjectCnt;
   }
   public void setE2_nProjectCnt(int e2_nProjectCnt) {
      E2_nProjectCnt = e2_nProjectCnt;
   }
   public double getE2_nContribution() {
      return E2_nContribution;
   }
   public void setE2_nContribution(double e2_nContribution) {
      E2_nContribution = e2_nContribution;
   }
   public double getE2_nLaborCost() {
      return E2_nLaborCost;
   }
   public void setE2_nLaborCost(double e2_nLaborCost) {
      E2_nLaborCost = e2_nLaborCost;
   }
   public double getE2_nAmount() {
      return E2_nAmount;
   }
   public void setE2_nAmount(double e2_nAmount) {
      E2_nAmount = e2_nAmount;
   }

   /**

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("PivVo [vEmplNo=");
      builder.append(vEmplNo);
      builder.append(", vName=");
      builder.append(vName);
      builder.append(", vPosName=");
      builder.append(vPosName);
      builder.append(", vDeptName=");
      builder.append(vDeptName);
      builder.append(", vTeamName=");
      builder.append(vTeamName);
      builder.append(", E1_nProjectCnt=");
      builder.append(E1_nProjectCnt);
      builder.append(", E1_nContribution=");
      builder.append(E1_nContribution);
      builder.append(", E1_nLaborCost=");
      builder.append(E1_nLaborCost);
      builder.append(", E1_nAmount=");
      builder.append(E1_nAmount);
      builder.append(", E2_nProjectCnt=");
      builder.append(E2_nProjectCnt);
      builder.append(", E2_nContribution=");
      builder.append(E2_nContribution);
      builder.append(", E2_nLaborCost=");
      builder.append(E2_nLaborCost);
      builder.append(", E2_nAmount=");
      builder.append(E2_nAmount);
      builder.append("]");
      return builder.toString();
   }
}

package kr.re.iae.pcmcc.biz.pce.pcg.vo;

public class PgbVo {

   private String editFlag;
   private String vEstiCode;         /* 01_평가코드 */
   private String vProjectCode;      /* 02_과제코드 */
   private String vProjectName;      /* 03_과제명 */
   private String vDeptName;         /* 04_센터명 */
   private String vGovName;          /* 05_부처명 */
   private String vProjectDivision;  /* 06_사업명 */
   private String vTotStartDate;     /* 07_총과제시작일 */
   private String vTotEndDate;       /* 08_총과제종료일 */
   private String vStartDate;        /* 09_과제시작일 */
   private String vEndDate;          /* 10_과제종료일 */
   private String vProjectPm;        /* 11_과제 PM */
   private String vProjectPmName;    /* _과제 PM 성명 */
   private String vProjectEva;       /* 12_과제 평가자 */
   private String vProjectEvaName;   /* _과제 평가자 성명 */
   private String vProjectGoal;      /* 13_과제 목표 */
   private String vProjectMilestone; /* 14_평가 기간내 Milestone */
   private String vEstiStep;         /* 15_과제 진행단계 */
   private String vDueDate1;         /* 05_연구원 입력 종료일자 */
   private String vDueDate2;         /* 06_PM 기여도 평가 종료일자 */
   private String vDueDate3;         /* 07_연구원 평가확인 종료일자 */
   private String vDueDate4;         /* 08_센터장 기여도 확인 종료일자 */
   private String vDueDate5;         /* 09_PM 최종확인 종료일자 */

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
    * @return the vGovName
    */
   public String getvGovName() {
      return vGovName;
   }

   /**
    * @param vGovName
    *           the vGovName to set
    */
   public void setvGovName(String vGovName) {
      this.vGovName = vGovName;
   }

   /**
    * @return the vProjectDivision
    */
   public String getvProjectDivision() {
      return vProjectDivision;
   }

   /**
    * @param vProjectDivision
    *           the vProjectDivision to set
    */
   public void setvProjectDivision(String vProjectDivision) {
      this.vProjectDivision = vProjectDivision;
   }

   /**
    * @return the vTotStartDate
    */
   public String getvTotStartDate() {
      return vTotStartDate;
   }

   /**
    * @param vTotStartDate
    *           the vTotStartDate to set
    */
   public void setvTotStartDate(String vTotStartDate) {
      this.vTotStartDate = vTotStartDate;
   }

   /**
    * @return the vTotEndDate
    */
   public String getvTotEndDate() {
      return vTotEndDate;
   }

   /**
    * @param vTotEndDate
    *           the vTotEndDate to set
    */
   public void setvTotEndDate(String vTotEndDate) {
      this.vTotEndDate = vTotEndDate;
   }

   /**
    * @return the vStartDate
    */
   public String getvStartDate() {
      return vStartDate;
   }

   /**
    * @param vStartDate
    *           the vStartDate to set
    */
   public void setvStartDate(String vStartDate) {
      this.vStartDate = vStartDate;
   }

   /**
    * @return the vEndDate
    */
   public String getvEndDate() {
      return vEndDate;
   }

   /**
    * @param vEndDate
    *           the vEndDate to set
    */
   public void setvEndDate(String vEndDate) {
      this.vEndDate = vEndDate;
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

   public String getvProjectPmName() {
      return vProjectPmName;
   }

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

   public String getvProjectEvaName() {
      return vProjectEvaName;
   }

   public void setvProjectEvaName(String vProjectEvaName) {
      this.vProjectEvaName = vProjectEvaName;
   }

   /**
    * @return the vProjectGoal
    */
   public String getvProjectGoal() {
      return vProjectGoal;
   }

   /**
    * @param vProjectGoal
    *           the vProjectGoal to set
    */
   public void setvProjectGoal(String vProjectGoal) {
      this.vProjectGoal = vProjectGoal;
   }

   /**
    * @return the vProjectMilestone
    */
   public String getvProjectMilestone() {
      return vProjectMilestone;
   }

   /**
    * @param vProjectMilestone
    *           the vProjectMilestone to set
    */
   public void setvProjectMilestone(String vProjectMilestone) {
      this.vProjectMilestone = vProjectMilestone;
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
    * @return the vDueDate1
    */
   public String getvDueDate1() {
      return vDueDate1;
   }

   /**
    * @param vDueDate1
    *           the vDueDate1 to set
    */
   public void setvDueDate1(String vDueDate1) {
      this.vDueDate1 = vDueDate1;
   }

   /**
    * @return the vDueDate2
    */
   public String getvDueDate2() {
      return vDueDate2;
   }

   /**
    * @param vDueDate2
    *           the vDueDate2 to set
    */
   public void setvDueDate2(String vDueDate2) {
      this.vDueDate2 = vDueDate2;
   }

   /**
    * @return the vDueDate3
    */
   public String getvDueDate3() {
      return vDueDate3;
   }

   /**
    * @param vDueDate3
    *           the vDueDate3 to set
    */
   public void setvDueDate3(String vDueDate3) {
      this.vDueDate3 = vDueDate3;
   }

   /**
    * @return the vDueDate4
    */
   public String getvDueDate4() {
      return vDueDate4;
   }

   /**
    * @param vDueDate4
    *           the vDueDate4 to set
    */
   public void setvDueDate4(String vDueDate4) {
      this.vDueDate4 = vDueDate4;
   }

   /**
    * @return the vDueDate5
    */
   public String getvDueDate5() {
      return vDueDate5;
   }

   /**
    * @param vDueDate5
    *           the vDueDate5 to set
    */
   public void setvDueDate5(String vDueDate5) {
      this.vDueDate5 = vDueDate5;
   }

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("PgbVo [vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
      builder.append(", vProjectName=");
      builder.append(vProjectName);
      builder.append(", vDeptName=");
      builder.append(vDeptName);
      builder.append(", vGovName=");
      builder.append(vGovName);
      builder.append(", vProjectDivision=");
      builder.append(vProjectDivision);
      builder.append(", vTotStartDate=");
      builder.append(vTotStartDate);
      builder.append(", vTotEndDate=");
      builder.append(vTotEndDate);
      builder.append(", vStartDate=");
      builder.append(vStartDate);
      builder.append(", vEndDate=");
      builder.append(vEndDate);
      builder.append(", vProjectPm=");
      builder.append(vProjectPm);
      builder.append(", vProjectEva=");
      builder.append(vProjectEva);
      builder.append(", vProjectGoal=");
      builder.append(vProjectGoal);
      builder.append(", vProjectMilestone=");
      builder.append(vProjectMilestone);
      builder.append(", vEstiStep=");
      builder.append(vEstiStep);
      builder.append(", vDueDate1=");
      builder.append(vDueDate1);
      builder.append(", vDueDate2=");
      builder.append(vDueDate2);
      builder.append(", vDueDate3=");
      builder.append(vDueDate3);
      builder.append(", vDueDate4=");
      builder.append(vDueDate4);
      builder.append(", vDueDate5=");
      builder.append(vDueDate5);
      builder.append("]");

      return builder.toString();
   }

}

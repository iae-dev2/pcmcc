package kr.re.iae.pcmcc.biz.pcb.pba.vo;

public class AddVo {

   private String vEstiCode;      /* 평가코드 */
   private String vDeptName;      /* 센터명 */
   private String vProjectPm;     /* 과제PM */
   private String vProjectPmName; /* 과제PM명 */
   private String vProjectCode;   /* 과제코드 */
   private String vProjectName;   /* 과제명 */

   public String getvEstiCode() {
      return vEstiCode;
   }

   public void setvEstiCode(String vEstiCode) {
      this.vEstiCode = vEstiCode;
   }

   public String getvDeptName() {
      return vDeptName;
   }

   public void setvDeptName(String vDeptName) {
      this.vDeptName = vDeptName;
   }

   public String getvProjectPm() {
      return vProjectPm;
   }

   public void setvProjectPm(String vProjectPm) {
      this.vProjectPm = vProjectPm;
   }

   public String getvProjectPmName() {
      return vProjectPmName;
   }

   public void setvProjectPmName(String vProjectPmName) {
      this.vProjectPmName = vProjectPmName;
   }

   public String getvProjectCode() {
      return vProjectCode;
   }

   public void setvProjectCode(String vProjectCode) {
      this.vProjectCode = vProjectCode;
   }

   public String getvProjectName() {
      return vProjectName;
   }

   public void setvProjectName(String vProjectName) {
      this.vProjectName = vProjectName;
   }

}

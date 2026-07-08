package kr.re.iae.pcmcc.biz.pcc.pca.vo;

public class PrjVo {

   private String vEstiCode;         /* 평가코드 */
   private String vProejctCode;      /* 과제코드 */
   private String vProjectGoal;      /* 과제목표 */
   private String vProjectMilestone; /* 평가 기간내 Milestone */

   public String getvEstiCode() {
      return vEstiCode;
   }

   public void setvEstiCode(String vEstiCode) {
      this.vEstiCode = vEstiCode;
   }

   public String getvProejctCode() {
      return vProejctCode;
   }

   public void setvProejctCode(String vProejctCode) {
      this.vProejctCode = vProejctCode;
   }

   public String getvProjectGoal() {
      return vProjectGoal;
   }

   public void setvProjectGoal(String vProjectGoal) {
      this.vProjectGoal = vProjectGoal;
   }

   public String getvProjectMilestone() {
      return vProjectMilestone;
   }

   public void setvProjectMilestone(String vProjectMilestone) {
      this.vProjectMilestone = vProjectMilestone;
   }

}

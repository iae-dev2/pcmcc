package kr.re.iae.pcmcc.biz.pcj.pja.vo;

public class EmpVo {

   private String vEstiCode;     /* 평가코드 */
   private String vProjectCode;  /* 과제코드 */
   private String vEmplNo;       /* 사번 */
   private String vName;         /* 성명 */
   private String vDeptName;     /* 센터명 */
   private String vTeamName;     /* 팀명 */
   private String vPosName;      /* 직위명 */
   private String vWork;         /* 업무 */
   private float  nContribution; /* 기여율 */
   private String vContent;      /* 평가의견 */
   private String vConfirm;      /* 확인 여부 */
   private String vFinish;       /* 완료 여부 */

   public String getvEstiCode() {
      return vEstiCode;
   }

   public void setvEstiCode(String vEstiCode) {
      this.vEstiCode = vEstiCode;
   }

   public String getvProjectCode() {
      return vProjectCode;
   }

   public void setvProjectCode(String vProjectCode) {
      this.vProjectCode = vProjectCode;
   }

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

   public String getvDeptName() {
      return vDeptName;
   }

   public void setvDeptName(String vDeptName) {
      this.vDeptName = vDeptName;
   }

   public String getvTeamName() {
      return vTeamName;
   }

   public void setvTeamName(String vTeamName) {
      this.vTeamName = vTeamName;
   }

   public String getvPosName() {
      return vPosName;
   }

   public void setvPosName(String vPosName) {
      this.vPosName = vPosName;
   }

   public String getvWork() {
      return vWork;
   }

   public void setvWork(String vWork) {
      this.vWork = vWork;
   }

   public float getnContribution() {
      return nContribution;
   }

   public void setnContribution(float nContribution) {
      this.nContribution = nContribution;
   }

   public String getvContent() {
      return vContent;
   }

   public void setvContent(String vContent) {
      this.vContent = vContent;
   }

   public String getvConfirm() {
      return vConfirm;
   }

   public void setvConfirm(String vConfirm) {
      this.vConfirm = vConfirm;
   }

   public String getvFinish() {
      return vFinish;
   }

   public void setvFinish(String vFinish) {
      this.vFinish = vFinish;
   }

}

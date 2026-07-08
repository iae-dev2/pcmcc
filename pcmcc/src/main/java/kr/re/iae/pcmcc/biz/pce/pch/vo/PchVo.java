package kr.re.iae.pcmcc.biz.pce.pch.vo;

public class PchVo {

   private String vEstiCode;     /* 01_평가코드 */
   private String vProjectCode;  /* 02_과제코드 */
   private String vEmplNo;       /* 03_사번 */
   private String vWork;         /* 04_업무 */
   private float  nContribution; /* 05_기여율 */
   private String vContent;      /* 06_평가의견 */
   private String vFinish;       /* 07_완료 여부 */

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
      builder.append("PchVo [vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
      builder.append(", vEmplNo=");
      builder.append(vEmplNo);
      builder.append(", vWork=");
      builder.append(vWork);
      builder.append(", nContribution=");
      builder.append(nContribution);
      builder.append(", vContent=");
      builder.append(vContent);
      builder.append(", vFinish=");
      builder.append(vFinish);
      builder.append("]");

      return builder.toString();
   }

}

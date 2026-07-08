package kr.re.iae.pcmcc.biz.pce.pci.vo;

public class PiaHalfYearVo {

   private String editFlag;
   private String vEstiCode;       /* 01_과제연도 */
   private String vProjectCode;    /* 02_과제코드 */
   private double nDirectAmount;   /* 03_직접비금액 */
   private double nIndirectAmount; /* 04_간접비금액 */
   private double nAmount;         /* 05_합계금액 */

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
    * @return the nDirectAmount
    */
   public double getnDirectAmount() {
      return nDirectAmount;
   }

   /**
    * @param nDirectAmount the nDirectAmount to set
    */
   public void setnDirectAmount(double nDirectAmount) {
      this.nDirectAmount = nDirectAmount;
   }

   /**
    * @return the nIndirectAmount
    */
   public double getnIndirectAmount() {
      return nIndirectAmount;
   }

   /**
    * @param nIndirectAmount the nIndirectAmount to set
    */
   public void setnIndirectAmount(double nIndirectAmount) {
      this.nIndirectAmount = nIndirectAmount;
   }

   /**
    * @return the nAmount
    */
   public double getnAmount() {
      return nAmount;
   }

   /**
    * @param nAmount the nAmount to set
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
      builder.append("PiaVo [editFlag=");
      builder.append(editFlag);
      builder.append(", vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
      builder.append(", nDirectAmount=");
      builder.append(nDirectAmount);
      builder.append(", nIndirectAmount=");
      builder.append(nIndirectAmount);
      builder.append(", nAmount=");
      builder.append(nAmount);
      builder.append("]");
      return builder.toString();
   }

}

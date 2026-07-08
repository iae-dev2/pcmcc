package kr.re.iae.pcmcc.biz.pce.pci.vo;

public class PiaVo {

   private String editFlag;
   private String vProjectCode; /* 01_과제코드 */
   private String vYear;        /* 02_과제연도 */
   private String vClass;       /* 03_구분 */
   private double n1MonAmount;   /* 04_1월금액 */
   private double n2MonAmount;   /* 05_2월금액 */
   private double n3MonAmount;   /* 06_3월금액 */
   private double n4MonAmount;   /* 07_4월금액 */
   private double n5MonAmount;   /* 08_5월금액 */
   private double n6MonAmount;   /* 09_6월금액 */
   private double n7MonAmount;   /* 010_7월금액 */
   private double n8MonAmount;   /* 011_8월금액 */
   private double n9MonAmount;   /* 012_9월금액 */
   private double n10MonAmount;  /* 013_10월금액 */
   private double n11MonAmount;  /* 014_11월금액 */
   private double n12MonAmount;  /* 015_12월금액 */

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
    * @return the vYear
    */
   public String getvYear() {
      return vYear;
   }

   /**
    * @param vYear
    *           the vYear to set
    */
   public void setvYear(String vYear) {
      this.vYear = vYear;
   }

   /**
    * @return the vClass
    */
   public String getvClass() {
      return vClass;
   }

   /**
    * @param vClass
    *           the vClass to set
    */
   public void setvClass(String vClass) {
      this.vClass = vClass;
   }

   /**
    * @return the n1MonAmount
    */
   public double getn1MonAmount() {
      return n1MonAmount;
   }

   /**
    * @param n1MonAmount the n1MonAmount to set
    */
   public void setn1MonAmount(double n1MonAmount) {
      this.n1MonAmount = n1MonAmount;
   }

   /**
    * @return the n2MonAmount
    */
   public double getn2MonAmount() {
      return n2MonAmount;
   }

   /**
    * @param n2MonAmount the n2MonAmount to set
    */
   public void setn2MonAmount(double n2MonAmount) {
      this.n2MonAmount = n2MonAmount;
   }

   /**
    * @return the n3MonAmount
    */
   public double getn3MonAmount() {
      return n3MonAmount;
   }

   /**
    * @param n3MonAmount the n3MonAmount to set
    */
   public void setn3MonAmount(double n3MonAmount) {
      this.n3MonAmount = n3MonAmount;
   }

   /**
    * @return the n4MonAmount
    */
   public double getn4MonAmount() {
      return n4MonAmount;
   }

   /**
    * @param n4MonAmount the n4MonAmount to set
    */
   public void setn4MonAmount(double n4MonAmount) {
      this.n4MonAmount = n4MonAmount;
   }

   /**
    * @return the n5MonAmount
    */
   public double getn5MonAmount() {
      return n5MonAmount;
   }

   /**
    * @param n5MonAmount the n5MonAmount to set
    */
   public void setn5MonAmount(double n5MonAmount) {
      this.n5MonAmount = n5MonAmount;
   }

   /**
    * @return the n6MonAmount
    */
   public double getn6MonAmount() {
      return n6MonAmount;
   }

   /**
    * @param n6MonAmount the n6MonAmount to set
    */
   public void setn6MonAmount(double n6MonAmount) {
      this.n6MonAmount = n6MonAmount;
   }

   /**
    * @return the n7MonAmount
    */
   public double getn7MonAmount() {
      return n7MonAmount;
   }

   /**
    * @param n7MonAmount the n7MonAmount to set
    */
   public void setn7MonAmount(double n7MonAmount) {
      this.n7MonAmount = n7MonAmount;
   }

   /**
    * @return the n8MonAmount
    */
   public double getn8MonAmount() {
      return n8MonAmount;
   }

   /**
    * @param n8MonAmount the n8MonAmount to set
    */
   public void setn8MonAmount(double n8MonAmount) {
      this.n8MonAmount = n8MonAmount;
   }

   /**
    * @return the n9MonAmount
    */
   public double getn9MonAmount() {
      return n9MonAmount;
   }

   /**
    * @param n9MonAmount the n9MonAmount to set
    */
   public void setn9MonAmount(double n9MonAmount) {
      this.n9MonAmount = n9MonAmount;
   }

   /**
    * @return the n10MonAmount
    */
   public double getn10MonAmount() {
      return n10MonAmount;
   }

   /**
    * @param n10MonAmount the n10MonAmount to set
    */
   public void setn10MonAmount(double n10MonAmount) {
      this.n10MonAmount = n10MonAmount;
   }

   /**
    * @return the n11MonAmount
    */
   public double getn11MonAmount() {
      return n11MonAmount;
   }

   /**
    * @param n11MonAmount the n11MonAmount to set
    */
   public void setn11MonAmount(double n11MonAmount) {
      this.n11MonAmount = n11MonAmount;
   }

   /**
    * @return the n12MonAmount
    */
   public double getn12MonAmount() {
      return n12MonAmount;
   }

   /**
    * @param n12MonAmount the n12MonAmount to set
    */
   public void setn12MonAmount(double n12MonAmount) {
      this.n12MonAmount = n12MonAmount;
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
      builder.append(", vProjectCode=");
      builder.append(vProjectCode);
      builder.append(", vYear=");
      builder.append(vYear);
      builder.append(", vClass=");
      builder.append(vClass);
      builder.append(", n1MonAmount=");
      builder.append(n1MonAmount);
      builder.append(", n2MonAmount=");
      builder.append(n2MonAmount);
      builder.append(", n3MonAmount=");
      builder.append(n3MonAmount);
      builder.append(", n4MonAmount=");
      builder.append(n4MonAmount);
      builder.append(", n5MonAmount=");
      builder.append(n5MonAmount);
      builder.append(", n6MonAmount=");
      builder.append(n6MonAmount);
      builder.append(", n7MonAmount=");
      builder.append(n7MonAmount);
      builder.append(", n8MonAmount=");
      builder.append(n8MonAmount);
      builder.append(", n9MonAmount=");
      builder.append(n9MonAmount);
      builder.append(", n10MonAmount=");
      builder.append(n10MonAmount);
      builder.append(", n11MonAmount=");
      builder.append(n11MonAmount);
      builder.append(", n12MonAmount=");
      builder.append(n12MonAmount);
      builder.append("]");
      return builder.toString();
   }

}

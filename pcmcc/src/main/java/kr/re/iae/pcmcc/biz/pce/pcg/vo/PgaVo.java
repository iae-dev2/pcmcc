/**
 *
 */
package kr.re.iae.pcmcc.biz.pce.pcg.vo;

/**
 * @author dev12
 *
 */
public class PgaVo {

   private String editFlag;
   private String vEstiCode;       /* 01_평가코드 */
   private String vEstiCodeName;   /* 02_설명 */
   private String vEstiCodeView;   /* 03_평가코드 View */
   private String vEstiCodeUpdate; /* 04_평가코드 갱신 */

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
    * @return the vEstiCodeName
    */
   public String getvEstiCodeName() {
      return vEstiCodeName;
   }

   /**
    * @param vEstiCodeName
    *           the vEstiCodeName to set
    */
   public void setvEstiCodeName(String vEstiCodeName) {
      this.vEstiCodeName = vEstiCodeName;
   }

   /**
    * @return the vEstiCodeView
    */
   public String getvEstiCodeView() {
      return vEstiCodeView;
   }

   /**
    * @param vEstiCodeView
    *           the vEstiCodeView to set
    */
   public void setvEstiCodeView(String vEstiCodeView) {
      this.vEstiCodeView = vEstiCodeView;
   }

   /**
    * @return the vEstiCodeUpdate
    */
   public String getvEstiCodeUpdate() {
      return vEstiCodeUpdate;
   }

   /**
    * @param vEstiCodeUpdate
    *           the vEstiCodeUpdate to set
    */
   public void setvEstiCodeUpdate(String vEstiCodeUpdate) {
      this.vEstiCodeUpdate = vEstiCodeUpdate;
   }

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("EstiCodeVo [vEstiCode=");
      builder.append(vEstiCode);
      builder.append(", vEstiCodeName=");
      builder.append(vEstiCodeName);
      builder.append(", vEstiCodeView=");
      builder.append(vEstiCodeView);
      builder.append(", vEstiCodeUpdate=");
      builder.append(vEstiCodeUpdate);
      builder.append("]");

      return builder.toString();
   }

}

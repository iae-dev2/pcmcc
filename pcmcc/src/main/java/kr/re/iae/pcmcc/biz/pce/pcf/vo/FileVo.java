package kr.re.iae.pcmcc.biz.pce.pcf.vo;

public class FileVo {

   private String editFlag;
   private int    nSeqNo;         /* 03_일련번호 */
   private int    nFileSeqNo;     /* 01_파일일련번호 */
   private String vFileName;      /* 02_파일명 */
   private String vTempFileName;  /* 03_임시파일명 */
   private String vFilePath;      /* 04_파일저장경로 */
   private String vFileExtension; /* 05_파일확장자 */
   private String vPdfFileName;   /* 06_PDF파일명 */
   private String vPdfCreateDate; /* 07_PDF파일생성일자 */

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
    * @return the nSeqNo
    */
   public int getnSeqNo() {
      return nSeqNo;
   }

   /**
    * @param nSeqNo
    *           the nSeqNo to set
    */
   public void setnSeqNo(int nSeqNo) {
      this.nSeqNo = nSeqNo;
   }

   /**
    * @return the nFileSeqNo
    */
   public int getnFileSeqNo() {
      return nFileSeqNo;
   }

   /**
    * @param nFileSeqNo
    *           the nFileSeqNo to set
    */
   public void setnFileSeqNo(int nFileSeqNo) {
      this.nFileSeqNo = nFileSeqNo;
   }

   /**
    * @return the vFileName
    */
   public String getvFileName() {
      return vFileName;
   }

   /**
    * @param vFileName
    *           the vFileName to set
    */
   public void setvFileName(String vFileName) {
      this.vFileName = vFileName;
   }

   /**
    * @return the vTempFileName
    */
   public String getvTempFileName() {
      return vTempFileName;
   }

   /**
    * @param vTempFileName
    *           the vTempFileName to set
    */
   public void setvTempFileName(String vTempFileName) {
      this.vTempFileName = vTempFileName;
   }

   /**
    * @return the vFilePath
    */
   public String getvFilePath() {
      return vFilePath;
   }

   /**
    * @param vFilePath
    *           the vFilePath to set
    */
   public void setvFilePath(String vFilePath) {
      this.vFilePath = vFilePath;
   }

   /**
    * @return the vFileExtension
    */
   public String getvFileExtension() {
      return vFileExtension;
   }

   /**
    * @param vFileExtension
    *           the vFileExtension to set
    */
   public void setvFileExtension(String vFileExtension) {
      this.vFileExtension = vFileExtension;
   }

   /**
    * @return the vPdfFileName
    */
   public String getvPdfFileName() {
      return vPdfFileName;
   }

   /**
    * @param vPdfFileName
    *           the vPdfFileName to set
    */
   public void setvPdfFileName(String vPdfFileName) {
      this.vPdfFileName = vPdfFileName;
   }

   /**
    * @return the vPdfCreateDate
    */
   public String getvPdfCreateDate() {
      return vPdfCreateDate;
   }

   /**
    * @param vPdfCreateDate
    *           the vPdfCreateDate to set
    */
   public void setvPdfCreateDate(String vPdfCreateDate) {
      this.vPdfCreateDate = vPdfCreateDate;
   }

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("FileVo [editFlag=");
      builder.append(editFlag);
      builder.append(", nSeqNo=");
      builder.append(nSeqNo);
      builder.append(", nFileSeqNo=");
      builder.append(nFileSeqNo);
      builder.append(", vFileName=");
      builder.append(vFileName);
      builder.append(", vTempFileName=");
      builder.append(vTempFileName);
      builder.append(", vFilePath=");
      builder.append(vFilePath);
      builder.append(", vFileExtension=");
      builder.append(vFileExtension);
      builder.append(", vPdfFileName=");
      builder.append(vPdfFileName);
      builder.append(", vPdfCreateDate=");
      builder.append(vPdfCreateDate);
      builder.append("]");
      return builder.toString();
   }

}

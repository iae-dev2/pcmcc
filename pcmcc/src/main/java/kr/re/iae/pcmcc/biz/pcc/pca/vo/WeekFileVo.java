package kr.re.iae.pcmcc.biz.pcc.pca.vo;

public class WeekFileVo {

   private String vWeek;
   private String vEmplNo;
   private int    nSeqNo;
   private int    nFileSeqNo;
   private String vFileName;
   private String vTempFileName;
   private String vFilePath;
   private String vFileExtension;
   private String vPdfFileName;
   private String vPdfCreateDate;

   public String getvWeek() {
      return vWeek;
   }
   public void setvWeek(String vWeek) {
      this.vWeek = vWeek;
   }
   public String getvEmplNo() {
      return vEmplNo;
   }
   public void setvEmplNo(String vEmplNo) {
      this.vEmplNo = vEmplNo;
   }
   public int getnSeqNo() {
      return nSeqNo;
   }
   public void setnSeqNo(int nSeqNo) {
      this.nSeqNo = nSeqNo;
   }
   public int getnFileSeqNo() {
      return nFileSeqNo;
   }
   public void setnFileSeqNo(int nFileSeqNo) {
      this.nFileSeqNo = nFileSeqNo;
   }
   public String getvFileName() {
      return vFileName;
   }
   public void setvFileName(String vFileName) {
      this.vFileName = vFileName;
   }
   public String getvTempFileName() {
      return vTempFileName;
   }
   public void setvTempFileName(String vTempFileName) {
      this.vTempFileName = vTempFileName;
   }
   public String getvFilePath() {
      return vFilePath;
   }
   public void setvFilePath(String vFilePath) {
      this.vFilePath = vFilePath;
   }
   public String getvFileExtension() {
      return vFileExtension;
   }
   public void setvFileExtension(String vFileExtension) {
      this.vFileExtension = vFileExtension;
   }
   public String getvPdfFileName() {
      return vPdfFileName;
   }
   public void setvPdfFileName(String vPdfFileName) {
      this.vPdfFileName = vPdfFileName;
   }
   public String getvPdfCreateDate() {
      return vPdfCreateDate;
   }
   public void setvPdfCreateDate(String vPdfCreateDate) {
      this.vPdfCreateDate = vPdfCreateDate;
   }

   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("WeekFileVo [vWeek=");
      builder.append(vWeek);
      builder.append(", vEmplNo=");
      builder.append(vEmplNo);
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

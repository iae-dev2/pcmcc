package kr.re.iae.pcmcc.biz.pcc.pca.vo;

public class WeekVo {

   private String vWeek;
   private String vProjectCode;
   private String vEmplNo;
   private int    nSeqNo;
   private String vWorkContent;
   private String vFileNames;

   public String getvWeek() {
      return vWeek;
   }
   public void setvWeek(String vWeek) {
      this.vWeek = vWeek;
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
   public int getnSeqNo() {
      return nSeqNo;
   }
   public void setnSeqNo(int nSeqNo) {
      this.nSeqNo = nSeqNo;
   }
   public String getvWorkContent() {
      return vWorkContent;
   }
   public void setvWorkContent(String vWorkContent) {
      this.vWorkContent = vWorkContent;
   }
   public String getvFileNames() {
      return vFileNames;
   }
   public void setvFileNames(String vFileNames) {
      this.vFileNames = vFileNames;
   }

}

/**
 *
 */
package kr.re.iae.pcmcc.biz.pce.pcf.vo;

import java.util.List;

/**
 * @author dev12
 *
 */
public class BoardVo {

   private String editFlag;
   private int    nSeqNo;    /* 01_일련번호 */
   private String vEmplNo;   /* 02_작성자 사번 */
   private String vName;     /* 03_작성자명 */
   private String vSubject;  /* 04_제목 */
   private String vContent;  /* 05_내용 */
   private String vPassword; /* 06_비밀번호 */
   private int    nHit;      /* 07_조회수 */
   private String vYyyymmdd; /* 08_작성일자 */
   private String vHhmmss;   /* 09_ 작성일시 */
   private int    nRef;      /* 10_ */
   private int    nStep;     /* 11_ */
   private int    nLev;      /* 12_ */
   private int    nPseqNo;   /* 13_ */
   private int    nReply;    /* 14_ */

   private int    nFileSeqNo;
   private String vFileName;

   private List<FileVo> fileList; /* 첨부 파일 목록 */

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
    * @return the vName
    */
   public String getvName() {
      return vName;
   }

   /**
    * @param vName
    *           the vName to set
    */
   public void setvName(String vName) {
      this.vName = vName;
   }

   /**
    * @return the vSubject
    */
   public String getvSubject() {
      return vSubject;
   }

   /**
    * @param vSubject
    *           the vSubject to set
    */
   public void setvSubject(String vSubject) {
      this.vSubject = vSubject;
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
    * @return the vPassword
    */
   public String getvPassword() {
      return vPassword;
   }

   /**
    * @param vPassword
    *           the vPassword to set
    */
   public void setvPassword(String vPassword) {
      this.vPassword = vPassword;
   }

   /**
    * @return the nHit
    */
   public int getnHit() {
      return nHit;
   }

   /**
    * @param nHit
    *           the nHit to set
    */
   public void setnHit(int nHit) {
      this.nHit = nHit;
   }

   /**
    * @return the vYyyymmdd
    */
   public String getvYyyymmdd() {
      return vYyyymmdd;
   }

   /**
    * @param vYyyymmdd
    *           the vYyyymmdd to set
    */
   public void setvYyyymmdd(String vYyyymmdd) {
      this.vYyyymmdd = vYyyymmdd;
   }

   /**
    * @return the vHhmmss
    */
   public String getvHhmmss() {
      return vHhmmss;
   }

   /**
    * @param vHhmmss
    *           the vHhmmss to set
    */
   public void setvHhmmss(String vHhmmss) {
      this.vHhmmss = vHhmmss;
   }

   /**
    * @return the nRef
    */
   public int getnRef() {
      return nRef;
   }

   /**
    * @param nRef
    *           the nRef to set
    */
   public void setnRef(int nRef) {
      this.nRef = nRef;
   }

   /**
    * @return the nStep
    */
   public int getnStep() {
      return nStep;
   }

   /**
    * @param nStep
    *           the nStep to set
    */
   public void setnStep(int nStep) {
      this.nStep = nStep;
   }

   /**
    * @return the nLev
    */
   public int getnLev() {
      return nLev;
   }

   /**
    * @param nLev
    *           the nLev to set
    */
   public void setnLev(int nLev) {
      this.nLev = nLev;
   }

   /**
    * @return the nPseqNo
    */
   public int getnPseqNo() {
      return nPseqNo;
   }

   /**
    * @param nPseqNo
    *           the nPseqNo to set
    */
   public void setnPseqNo(int nPseqNo) {
      this.nPseqNo = nPseqNo;
   }

   /**
    * @return the nReply
    */
   public int getnReply() {
      return nReply;
   }

   /**
    * @param nReply
    *           the nReply to set
    */
   public void setnReply(int nReply) {
      this.nReply = nReply;
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
    * @return the fileList
    */
   public List<FileVo> getFileList() {
      return fileList;
   }

   /**
    * @param fileList
    *           the fileList to set
    */
   public void setFileList(List<FileVo> fileList) {
      this.fileList = fileList;
   }

   /*
    * (non-Javadoc)
    *
    * @see java.lang.Object#toString()
    */
   @Override
   public String toString() {
      StringBuilder builder = new StringBuilder();
      builder.append("BoardVo [editFlag=");
      builder.append(editFlag);
      builder.append(", nSeqNo=");
      builder.append(nSeqNo);
      builder.append(", vEmplNo=");
      builder.append(vEmplNo);
      builder.append(", vName=");
      builder.append(vName);
      builder.append(", vSubject=");
      builder.append(vSubject);
      builder.append(", vContent=");
      builder.append(vContent);
      builder.append(", vPassword=");
      builder.append(vPassword);
      builder.append(", nHit=");
      builder.append(nHit);
      builder.append(", vYyyymmdd=");
      builder.append(vYyyymmdd);
      builder.append(", vHhmmss=");
      builder.append(vHhmmss);
      builder.append(", nRef=");
      builder.append(nRef);
      builder.append(", nStep=");
      builder.append(nStep);
      builder.append(", nLev=");
      builder.append(nLev);
      builder.append(", nPseqNo=");
      builder.append(nPseqNo);
      builder.append(", nReply=");
      builder.append(nReply);
      builder.append(", nFileSeqNo=");
      builder.append(nFileSeqNo);
      builder.append(", vFileName=");
      builder.append(vFileName);
      builder.append(", fileList=");
      builder.append(fileList);
      builder.append("]");
      return builder.toString();
   }

}

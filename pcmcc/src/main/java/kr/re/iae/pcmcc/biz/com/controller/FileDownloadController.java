package kr.re.iae.pcmcc.biz.com.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.re.iae.pcmcc.biz.pcc.pca.service.PcaService;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekFileVo;
import kr.re.iae.pcmcc.biz.pce.pcf.service.PcfService;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.FileVo;

@Controller
public class FileDownloadController {

   private static final Logger logger = LoggerFactory.getLogger(FileDownloadController.class);

   //file.properties 에서 filepath를 가져와 사용
   //root-context.xml에 설정파일 정의
   @Value("#{file['save.filepath']}")
   private String filePath;

   @Autowired
   private PcfService pcfService;

   @Autowired
   private PcaService pcaService;

   @RequestMapping("/fileDownload")
   public ModelAndView download(@RequestParam Map<String, String> paramMap, HttpServletRequest request) throws Exception {

      logger.debug("fileDownload request");
      logger.debug("fileDownload request : ", filePath);
      logger.debug("fileDownload request : ", request.getParameter("fileId"));

      String fullPath = "C:/Temp/20180612/20180530_1122.zip";
      String originalFileName = "20180530_1122.zip";

      String vFileType = request.getParameter("vFileType");
      String param1 = request.getParameter("param1");   //emplno
      String param2 = request.getParameter("param2");   //nSeqNo
      String param3 = request.getParameter("param3");   //fileSeqNo
      String param4 = request.getParameter("param4");

      logger.debug("vFileType : " + vFileType);

      if ("pcf".equals(vFileType)) {
         logger.debug("param 2 : " + param2);
         logger.debug("param 3 : " + param3);

         FileVo filevo = new FileVo();

         filevo.setnSeqNo(Integer.parseInt(param2));
         filevo.setnFileSeqNo(Integer.parseInt(param3));

         List<FileVo> fileVoInfo = pcfService.selectBoardFile(filevo);

         fullPath = fileVoInfo.get(0).getvFilePath();
         fullPath += "/";
         fullPath += fileVoInfo.get(0).getvTempFileName();

         originalFileName = fileVoInfo.get(0).getvFileName();

         logger.debug(fullPath);
      }
      else if ("pca".equals(vFileType)) {
         //기여도 평가 > 기여도 평가 : 주간업무보고 산출물 다운로드
         logger.debug("param 1 : " + param1);   //WEEK
         logger.debug("param 2 : " + param2);   //사번
         logger.debug("param 3 : " + param3);   //SEQNO
         logger.debug("param 4 : " + param4);   //FILESEQNO

         WeekFileVo vo = new WeekFileVo();
         vo.setvWeek(param1);
         vo.setvEmplNo(param2);
         vo.setnSeqNo(Integer.parseInt(param3));
         vo.setnFileSeqNo(Integer.parseInt(param4));
         List<WeekFileVo> fileInfo = pcaService.selectFileInfo(vo);

         fullPath = fileInfo.get(0).getvFilePath();           //파일경로
         fullPath += "/";
         fullPath += fileInfo.get(0).getvTempFileName();      //임시파일명

         originalFileName = fileInfo.get(0).getvFileName();   //파일명

         logger.debug(fullPath);
      }
      else if ("pgb".equals(vFileType)) {
         //관리자 > 코드관리 > 과제코드관리 : 과제정보 업로드 샘플 다운로드
         fullPath = filePath;
         originalFileName = "과제정보_업로드.xlsx";
         fullPath += "/sample/" + originalFileName;
      }
      else if ("pgc".equals(vFileType)) {
         //관리자 > 코드관리 > 인원관리 : 인원정보 업로드 샘플 다운로드
         fullPath = filePath;
         originalFileName = "인원정보_업로드.xlsx";
         fullPath += "/sample/" + originalFileName;
      }
      else if ("pia".equals(vFileType)) {
         //관리자 > 인건비 확보 > 내부인건비/간접비관리 : 내부인건비/간접비 업로드 샘플 다운로드
         fullPath = filePath;
         originalFileName = "내부인건비_간접비_업로드.xlsx";
         fullPath += "/sample/" + originalFileName;
      }
      else if ("pib".equals(vFileType)) {
         //관리자 > 인건비 확보 > 개인별인건비 : 개인별인건비 업로드 샘플 다운로드
         fullPath = filePath;
         originalFileName = "개인별인건비_업로드.xlsx";
         fullPath += "/sample/" + originalFileName;
      }
      else if ("spm".equals(vFileType)) {
         // //Map 활용방식
         //
         // logger.debug("param 1 : " + param1); //과제코드
         // logger.debug("param 2 : " + param2); //일련번호
         // logger.debug("param 3 : " + param3); //파일일련번호
         //
         // Map<String, Object> param = new HashMap<String, Object>();
         // param.put("vProjectCode", param1);
         // param.put("nSeqNo", Integer.parseInt(param2));
         // param.put("nFileSeqNo", Integer.parseInt(param3));
         //
         // SpmReportFileVo spmReportFileVo =
         // spmService.selectReportFileInfo(param);
         //
         // fullPath = spmReportFileVo.getvFilePath();
         // fullPath += "/";
         // fullPath += spmReportFileVo.getvTempFileName();
         //
         // originalFileName = spmReportFileVo.getvFileName();
         //
         // logger.debug(fullPath);
      }
      else if ("".equals(vFileType)) {
         //파일 다운로드 정보 조회
         //추가해서 사용하세요~
         //이부분은 수정/삭제하지 마세요(검색용도)
      }

      File renameFile;   //다운로드를 받기위한 파일 객체

      try {
         renameFile = new File(fullPath);
         logger.warn(fullPath.toString());
      }
      catch (Exception e) {
         e.printStackTrace();
         logger.warn("파일 이름 변경 실패!!");
         throw e;
      }

      ModelAndView mav = new ModelAndView("downloadView");
      mav.addObject("downloadFile", renameFile);             //서버에 저장된 파일 경로
      mav.addObject("originalFileName", originalFileName);   //사용자가 저장한 원본 파일명

      return mav;   //바이트로 보내준다
   }

   @RequestMapping("/photo/{emplno}")
   public ResponseEntity<byte[]> testphoto(@PathVariable String emplno) throws IOException {

      final HttpHeaders headers = new HttpHeaders();
      InputStream in = null;

      try {
         File photo;

         String fullPath = filePath + "/photos/" + emplno + ".jpg";
         photo = new File(fullPath);
         in = new FileInputStream(photo);
         headers.setContentType(MediaType.IMAGE_JPEG);

      }
      catch (Exception e) {
         e.printStackTrace();
         logger.warn("파일 이름 변경 실패!!");
      }

      return new ResponseEntity<byte[]>(IOUtils.toByteArray(in), headers, HttpStatus.CREATED);
   }

}

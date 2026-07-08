package kr.re.iae.pcmcc.biz.pce.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epapyrus.pdf.sd.client.StreamdocsDapRegistrator;

import kr.re.iae.pcmcc.biz.com.util.DocsUtil;
import kr.re.iae.pcmcc.biz.pce.pcf.service.impl.PcfServiceImpl;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.BoardVo;
import kr.re.iae.pcmcc.biz.pce.pcf.vo.FileVo;

@RestController
public class PcfRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PcfRestApiController.class);

   @Value("#{docs['streamdocs.uri']}")
   private String streamdocs_uri;

   @Value("#{docs['pdfgateway.build.uri']}")
   private String pdfgateway_build_uri;

   @Value("#{docs['pdfgateway.status.uri']}")
   private String pdfgateway_status_uri;

   @Value("#{docs['sftp.alias']}")
   private String sftp_alias;

   @Autowired
   private PcfServiceImpl pcfService;

   @RequestMapping(value = "/pce/pcf/getPcfList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<BoardVo> getPcfList() {
      logger.debug("Welcome rest api. 게시글 조회");

      List<BoardVo> list = pcfService.selectBoard();

      return list;
   }

   @RequestMapping(value = "/pce/pcf/getPcfFileList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<FileVo> getPcfFileList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 첨부파일 조회");

      FileVo vo = new FileVo();
      vo.setnSeqNo(Integer.parseInt(paramMap.get("nSeqNo")));
      List<FileVo> list = pcfService.selectBoardFile(vo);

      return list;
   }

   @RequestMapping(value = "/pce/pcf/deletePcf", method = RequestMethod.GET)
   public int deletePcf(@RequestParam Map<String, String> paramMap, HttpServletRequest request) {
      logger.debug("Welcome rest api. 게시글 삭제");

      try {
         pcfService.deleteBoard(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }

      return 0;
   }

   @RequestMapping(value = "/pce/pcf/savePcf", method = RequestMethod.POST)
   public int savePcf(@RequestBody BoardVo vo, HttpServletRequest request) {
      logger.debug("Welcome rest api. 게시글 저장");
      logger.debug(vo.toString());

      try {
         pcfService.saveBoard(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }

      return 0;
   }

   @RequestMapping(value = "/pce/pcf/addHit", method = RequestMethod.GET)
   public int addHit(@RequestParam Map<String, String> paramMap, HttpServletRequest request) {
      logger.debug("Welcome rest api. 조회수 증가");

      try {
         pcfService.updateHitCount(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }

      return 0;
   }

   @RequestMapping(value = "/pef/peg/registerWithDap", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public Map<String, Object> registerWithDap(@RequestBody List<FileVo> filevolist, HttpServletRequest request) {
      logger.debug("rest api. 첨부 파일 미리보기");
      logger.debug(filevolist.toString());

      Path path;
      FileTime lastModifiedTime;
      SimpleDateFormat simpleDateFormat;
      File tempFile = null;
      List<File> files = new ArrayList<File>();
      Map<String, Object> response = new HashMap<String, Object>();

      String inputFileName = "";
      String outputFileName = "";
      String inputUri = "";
      String outputUri = "";
      String oid = "";
      String taskName = "";
      String status = "";
      String formattedTime = "";
      int i = 1;

      try {
         if (filevolist.size() > 0) {
            for (FileVo filevo : filevolist) { //pdf 파일이면
               if (".pdf".equals(filevo.getvFileExtension())) {
                  inputFileName = filevo.getvFilePath() + "/" + filevo.getvTempFileName();

                  path = Paths.get(inputFileName);
                  //파일 유무 확인
                  if (!Files.exists(path)) {
                     System.out.println("File " + inputFileName + " not found");

                     break;
                  }
                  else {
                     tempFile = new File(inputFileName);

                     files.add(tempFile);
                  }
               }
               else { //pdf 파일이 아니면
                  inputFileName = filevo.getvFilePath() + "/" + filevo.getvTempFileName();
                  outputFileName = filevo.getvFilePath() + "/" + filevo.getvTempFileName() + ".pdf";
                  taskName = filevo.getvTempFileName() + "_conversion-task";

                  path = Paths.get(inputFileName);
                  //파일 유무 확인
                  if (!Files.exists(path)) {
                     System.out.println("File " + inputFileName + " not found");

                     break;
                  }
                  else {
                     //생성일자 비교
                     lastModifiedTime = (FileTime) Files.getAttribute(path, "lastModifiedTime");
                     simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                     formattedTime = simpleDateFormat.format(new Date(lastModifiedTime.toMillis()));

                     if (filevo.getvPdfCreateDate() != null && filevo.getvPdfCreateDate().compareTo(formattedTime) > 0) {
                        tempFile = new File(outputFileName);

                        files.add(tempFile);
                     }
                     else {
                        tempFile = new File(inputFileName);
                        FileUtils.copyFile(tempFile, new File(inputFileName + filevo.getvFileExtension()));

                        inputUri  = sftp_alias + inputFileName + filevo.getvFileExtension();
                        outputUri = sftp_alias + outputFileName;
                        //System.out.println("inputUri==>" + inputUri);
                        //System.out.println("outputUri==>" + outputUri);

                        // Task 요청
                        oid = DocsUtil.requestCommand(pdfgateway_build_uri, taskName, inputUri, outputUri);
                        System.out.println("Object ID of the request operation => " + oid);

                        while (i <= 120) {
                           status = DocsUtil.statusCheck(pdfgateway_status_uri, oid);
                           //System.out.println("##### statusCheck => " + status);

                           if ("SUCCESS".equals(status) || "FAILURE".equals(status)) {
                              if ("SUCCESS".equals(status)) {
                                 //첨부파일 테이블 갱신nSeq nFileSeqNo
                                 filevo.setvPdfFileName(filevo.getvTempFileName() + ".pdf");
                                 pcfService.updateBoardFile(filevo);

                                 tempFile = new File(outputFileName);

                                 files.add(tempFile);
                              }

                              break;
                           }

                           try {
                              Thread.sleep(500);
                           }
                           catch (InterruptedException e) {
                              e.printStackTrace();
                           }
                        } //while (i <= 120)
                     }
                  }
               }
            } //for (FileVo filevo : filevolist)

            if (files != null && files.size() > 0) {
               StreamdocsDapRegistrator registrator = new StreamdocsDapRegistrator(streamdocs_uri);

               registrator.files(files);
               response = registrator.register(null);
               //System.out.println("response ==>" + response);
            }
         }

         return response;
      }
      catch (Exception e) {
         e.printStackTrace();

         return null;
      }
   }

}

package kr.re.iae.pcmcc.biz.com.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.re.iae.pcmcc.biz.com.service.CommonService;
import kr.re.iae.pcmcc.biz.pce.pcf.service.PcfService;


@Controller
public class FileUploadController {
   private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

   // file.properties 에서 filepath를 가져와 사용
   // root-context.xml에 설정파일 정의
   @Value("#{file['save.filepath']}")
   private String filePath;

   @Autowired
   private CommonService commonService;
   
   @Autowired
   private PcfService pcfService;

   @RequestMapping(value = "/fileUpload/{filetype}/{emplno}", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   @ResponseBody
   public String fileUpload(@PathVariable String filetype, @PathVariable String emplno, HttpServletRequest request, HttpServletResponse response) {
      String json="";

      //파일이 저장될 path 설정
      SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
      Calendar calendar = Calendar.getInstance();
      String strToday = sdf.format(calendar.getTime());

      //관리자 > 게시판관리에서 파일 저장 시 사번 대신 nSeq로 대체 2020-04-28
      if ("pcf".equals(filetype)) {
         emplno = pcfService.selectBoardSeq();
      }

      String savePath = filePath + "/" + filetype + "/" + emplno;

      logger.debug(savePath);

      List<Map<String, Object>> returnObject = new ArrayList<Map<String,Object>>();
      try {
         // request에서 MultipartHttpServletRequest 생성 
         MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;

         //파일이름 목록
         Iterator<String> iter = multipartHttpServletRequest.getFileNames();
         MultipartFile multipartFile = null;
         String itemFileName = "";

         // 디레토리가 없다면 생성 
         File directory = new File(savePath);
         if (!directory.isDirectory()) {
            directory.mkdirs();
         }

         // request의 Iterator를 돌면서 처리
         while (iter.hasNext()) {

            int fileseq = commonService.selectFileSeq();

            itemFileName = (String)iter.next();
            // 내용을 가져와서 
            multipartFile = multipartHttpServletRequest.getFile(itemFileName);
            String originalFileName = new String(multipartFile.getOriginalFilename().getBytes("8859_1"), "UTF-8"); //한글꺠짐 방지 

            // 파일명이 없다면 다음처리로
            if ("".equals(originalFileName)) {
               continue;
            }
            // 파일 확장자 
            String oridianlFileExt = originalFileName.substring(originalFileName.lastIndexOf('.'));

            // 저장할 파일명 (파일 명명 규칙에 맞게 변경) 
            String savedFileName =  filetype+"_"+ emplno +"_"+ strToday+"_"+fileseq;

            // 설정한 path를 사용한 file 객체 생성
            File savedFile = new File(savePath + File.separator + savedFileName);
            // multipart로 수신한 파일을 savedFile 객체에 복사
            multipartFile.transferTo(savedFile);

            //DB에서 사용하는 컬럼명을 사용해서 return 값 설정
            Map<String, Object> fileHandleResult = new HashMap<String, Object>();
            fileHandleResult.put("nFileSeqNo", fileseq);
            fileHandleResult.put("vFileName", originalFileName);
            fileHandleResult.put("vFileExtension", oridianlFileExt);
            fileHandleResult.put("vTempFileName", savedFileName);
            fileHandleResult.put("vFilePath", savePath);
            returnObject.add(fileHandleResult);
         }
         json = new ObjectMapper().writeValueAsString(returnObject);
      }
      catch (UnsupportedEncodingException e) {
         e.printStackTrace();
      }
      catch (IllegalStateException e) {
         e.printStackTrace();
      }
      catch (IOException e) {
         e.printStackTrace();
      }
      return json;
   }

   @RequestMapping(value = "/photoUpload/{emplno}", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public @ResponseBody Map<String, String> pictureUpload(@PathVariable String emplno, HttpServletRequest request, HttpServletResponse response) {

      String savePath = filePath + "/photos/";

      logger.debug(savePath);

      Map<String, String> returnObject = new HashMap<String,String>();
      try {
         // request에서 MultipartHttpServletRequest 생성 
         MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest)request;

         //파일이름 목록
         Iterator<String> iter = multipartHttpServletRequest.getFileNames();
         MultipartFile multipartFile = null;
         String itemFileName = "";

         // 디레토리가 없다면 생성 
         File directory = new File(savePath);
         if (!directory.isDirectory()) {
            directory.mkdirs();
         }

         // request의 Iterator를 돌면서 처리
         while (iter.hasNext()) {

            itemFileName = (String)iter.next();
            // 내용을 가져와서 
            multipartFile = multipartHttpServletRequest.getFile(itemFileName);
            String originalFileName = new String(multipartFile.getOriginalFilename().getBytes("8859_1"), "UTF-8"); //한글꺠짐 방지 

            // 파일명이 없다면 다음처리로
            if ("".equals(originalFileName)) {
               continue;
            }
            // 파일 확장자 
            String oridianlFileExt = originalFileName.substring(originalFileName.lastIndexOf('.'));

            // 저장할 파일명 (파일 명명 규칙에 맞게 변경) 
            String savedFileName = emplno+oridianlFileExt;

            // 설정한 path를 사용한 file 객체 생성
            File savedFile = new File(savePath + File.separator + savedFileName);
            // multipart로 수신한 파일을 savedFile 객체에 복사
            multipartFile.transferTo(savedFile);

            //브라우저에서 접근가능한 URL 사용해서 return 값 설정
            returnObject.put("photoUrl", "/photo/"+emplno);
         }

      }
      catch (UnsupportedEncodingException e) {
         e.printStackTrace();
      }
      catch (IllegalStateException e) {
         e.printStackTrace();
      }
      catch (IOException e) {
         e.printStackTrace();
      }
      return returnObject;
   }

   //uuid생성 
   public static String getUuid() {
      return UUID.randomUUID().toString().replaceAll("-", "");
   }

}

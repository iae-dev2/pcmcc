package kr.re.iae.pcmcc.biz.pcc.controller;

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
import kr.re.iae.pcmcc.biz.pcc.pca.service.impl.PcaServiceImpl;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.EmpVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.PcaVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.PrjVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekFileVo;
import kr.re.iae.pcmcc.biz.pcc.pca.vo.WeekVo;

@RestController
public class PcaRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PcaRestApiController.class);

   @Value("#{docs['streamdocs.uri']}")
   private String streamdocs_uri;

   @Value("#{docs['pdfgateway.build.uri']}")
   private String pdfgateway_build_uri;

   @Value("#{docs['pdfgateway.status.uri']}")
   private String pdfgateway_status_uri;

   @Value("#{docs['sftp.alias']}")
   private String sftp_alias;

   @Autowired
   private PcaServiceImpl pcaService;

   @RequestMapping(value = "/pcc/pca/getPrjGoal", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PrjVo> getPrjGoal(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 전분기 과제목표 조회");
      
      List<PrjVo> list = pcaService.selectPrjGoal(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcc/pca/getOldGoal", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PrjVo> getOldGoal(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 전분기 과제목표 조회");

      List<PrjVo> list = pcaService.selectOldGoal(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcc/pca/savePrjGoal", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int savePrjGoal(@RequestBody PrjVo vo, HttpServletRequest request) {
      logger.debug("Welcome rest api. 과제목표 저장");

      try {
         pcaService.updateProjectGoal(vo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcc/pca/getEmpContList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<EmpVo> getEmpContList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 참여연구원 기여율 목록 조회");

      List<EmpVo> list = pcaService.selectContributionList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcc/pca/getContSum", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public float getContSum(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 참여연구원 기여율 합계 조회");

      return pcaService.selectContributionSum(paramMap);
   }

   @RequestMapping(value = "/pcc/pca/getWrmDataList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<WeekVo> getWrmDataList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 주간업무보고 입력 실적 조회");

      return pcaService.selectWrmDataList(paramMap);
   }

   @RequestMapping(value = "/pcc/pca/getDeptNameList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<Map<String, String>> getDeptNameList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 부서명 조회");

      List<Map<String, String>> list = pcaService.selectDeptNameList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcc/pca/getAddEmpList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<EmpVo> getAddEmpList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 추가 참여 연구원 목록 조회");

      List<EmpVo> list = pcaService.selectAdditionalEmplNoList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcc/pca/addEmp", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int addEmp(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 참여연구원 추가");

      return pcaService.insertEstiEmplNo(paramMap);
   }

   @RequestMapping(value = "/pcc/pca/removeEmp", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int removeEmp(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 참여연구원 삭제");

      return pcaService.deleteEstiEmplNo(paramMap);
   }

   @RequestMapping(value = "/pcc/pca/saveCont", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int saveCont(@RequestBody List<EmpVo> empvolist) {
      logger.debug("Welcome rest api. 참여연구원 기여율 입력");

      try {
         pcaService.updateContribution(empvolist);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcc/pca/finishCont", method = RequestMethod.POST)
   public int finishCont(@RequestBody PcaVo pcavo, HttpServletRequest request) {
      logger.debug("Welcome rest api. 과제 기여율입력 완료");
      try {
         return pcaService.updateEstiStep2(pcavo);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @RequestMapping(value = "/pcc/pca/getReview", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public String getReview(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가의견 조회");

      return pcaService.selectReview(paramMap);
   }

   @RequestMapping(value = "/pcc/pca/doneCont", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int doneCont(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 최종확인");

      return pcaService.updateEstiStep5(paramMap);
   }

   @RequestMapping(value = "/pcc/pca/registerWithDap", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public Map<String, Object> registerWithDap(@RequestBody List<WeekFileVo> paramvolist, HttpServletRequest request) {
      logger.debug("rest api. 첨부 파일 미리보기");
      logger.debug(paramvolist.toString());

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

      List<WeekFileVo> filevolist = new ArrayList<WeekFileVo>();

      filevolist.addAll(pcaService.selectFileInfo(paramvolist.get(0)));

      try {
         if (filevolist.size() > 0) {
            for (WeekFileVo filevo : filevolist) { //pdf 파일이면
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

                                 pcaService.updateWeekFile(filevo);

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

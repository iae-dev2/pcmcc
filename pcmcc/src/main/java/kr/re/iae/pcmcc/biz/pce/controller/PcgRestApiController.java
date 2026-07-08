package kr.re.iae.pcmcc.biz.pce.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.View;

import kr.re.iae.pcmcc.biz.pce.pcg.service.PcgService;
import kr.re.iae.pcmcc.biz.pce.pcg.util.PgbExcelView;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgaVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgbVo;
import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgcVo;

@RestController
public class PcgRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PcgRestApiController.class);

   @Autowired
   private PcgService pcgService;

   @RequestMapping(value = "/pcg/pga/getEstiCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PgaVo> getPcfList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 평가코드 조회");

      List<PgaVo> list = pcgService.selectEstiCode(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcg/pga/saveEstiCode", method = RequestMethod.POST)
   public int saveEstiCode(@RequestBody List<PgaVo> pgavolist, HttpServletRequest request) {
      try {
         logger.debug("rest api. 평가코드 저장");
         logger.debug(pgavolist.toString());

         pcgService.saveEstiCode(pgavolist);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcg/pgb/checkProject", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PgbVo> checkProject(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 과제코드 조회");

      List<PgbVo> list = pcgService.checkProject(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcg/pgb/getProjctCodeList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PgbVo> getProjectCodeList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 과제코드 조회");

      List<PgbVo> list = pcgService.selectProjectCodeList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcg/pgb/saveProjectCode", method = RequestMethod.POST)
   public int saveProjectCode(@RequestBody List<PgbVo> pgbvolist, HttpServletRequest request) {
      try {
         logger.debug("rest api. 과제코드 저장");
         logger.debug(pgbvolist.toString());

         pcgService.saveProjectCode(pgbvolist);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcg/pgb/excelUpload", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public @ResponseBody int pgbUpload(HttpServletRequest request, HttpServletResponse response) {
      logger.debug("rest api. 과제코드 업로드");
      int result = 0;

      try {
         // request에서 MultipartHttpServletRequest 생성
         MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;

         // 파일이름 목록
         Iterator<String> iter = multipartHttpServletRequest.getFileNames();
         MultipartFile multipartFile = null;
         String itemFileName = "";

         // request의 Iterator를 돌면서 처리
         while (iter.hasNext()) {
            itemFileName = iter.next();

            // 내용을 가져와서
            multipartFile = multipartHttpServletRequest.getFile(itemFileName);
         }

         OPCPackage opcPackage = OPCPackage.open(multipartFile.getInputStream());
         XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);

         // 첫번째 시트 불러오기 (PgbVo)
         List<PgbVo> pgbvo_list = new ArrayList<PgbVo>();
         XSSFSheet sheet = workbook.getSheetAt(0);

         for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
            PgbVo pgbvo = new PgbVo();
            XSSFRow row = sheet.getRow(i);

            // 행이 존재하기 않으면 패스
            if (null == row) {
               continue;
            }
            logger.debug("row ===>" + row);
            // 행의 1열 01_평가코드
            XSSFCell cell = row.getCell(0);
            if (null != cell) {
               pgbvo.setvEstiCode(cell.getStringCellValue().toString());
            }
            // 행의 2열 02_과제코드
            cell = row.getCell(1);
            if (null != cell) {
               pgbvo.setvProjectCode(cell.getStringCellValue().toString());
            }
            // 행의 3열 03_과제명
            cell = row.getCell(2);
            if (null != cell) {
               pgbvo.setvProjectName(cell.getStringCellValue().toString());
            }
            // 행의 4열 04_센터명
            cell = row.getCell(3);
            if (null != cell) {
               pgbvo.setvDeptName(cell.getStringCellValue().toString());
            }
            // 행의 5열 05_부처명
            cell = row.getCell(4);
            if (null != cell) {
               pgbvo.setvGovName(cell.getStringCellValue().toString());
            }
            // 행의 6열 06_사업명
            cell = row.getCell(5);
            if (null != cell) {
               pgbvo.setvProjectDivision(cell.getStringCellValue().toString());
            }
            // 행의 7열 07_총과제시작일
            cell = row.getCell(6);
            if (null != cell) {
               pgbvo.setvTotStartDate(cell.getStringCellValue().toString());
            }
            // 행의 8열 08_총과제종료일
            cell = row.getCell(7);
            if (null != cell) {
               pgbvo.setvTotEndDate(cell.getStringCellValue().toString());
            }
            // 행의 9열 09_과제시작일
            cell = row.getCell(8);
            if (null != cell) {
               pgbvo.setvStartDate(cell.getStringCellValue().toString());
            }
            // 행의 10열 10_과제종료일
            cell = row.getCell(9);
            if (null != cell) {
               pgbvo.setvEndDate(cell.getStringCellValue().toString());
            }
            // 행의 11열 11_과제 PM
            cell = row.getCell(10);
            if (null != cell) {
               pgbvo.setvProjectPm(cell.getStringCellValue().toString());
            }

            // 과제 PM명 패스

            // 행의 12열 12_과제 평가자
            cell = row.getCell(12);
            if (null != cell) {
               pgbvo.setvProjectEva(cell.getStringCellValue().toString());
            }

            // 과제 평가자명 패스

            // 행의 13열 13_과제 목표
            cell = row.getCell(14);
            if (null != cell) {
               pgbvo.setvProjectGoal(cell.getStringCellValue().toString());
            }
            // 행의 14열 14_평가 기간내 Milestone
            cell = row.getCell(15);
            if (null != cell) {
               pgbvo.setvProjectMilestone(cell.getStringCellValue().toString());
            }
            // 행의 15열 15_과제 진행단계
            cell = row.getCell(16);
            if (null != cell) {
               pgbvo.setvEstiStep(cell.getStringCellValue().toString());
            }
            // 행의 16열 16_연구원 입력 종료일자
            cell = row.getCell(17);
            if (null != cell) {
               pgbvo.setvDueDate1(cell.getStringCellValue().toString());
            }
            // 행의 17열 17_PM 기여도 평가 종료일자
            cell = row.getCell(18);
            if (null != cell) {
               pgbvo.setvDueDate2(cell.getStringCellValue().toString());
            }
            // 행의 18열 18_연구원 평가확인 종료일자
            cell = row.getCell(19);
            if (null != cell) {
               pgbvo.setvDueDate3(cell.getStringCellValue().toString());
            }
            // 행의 19열 19_센터장 기여도 확인 종료일자
            cell = row.getCell(20);
            if (null != cell) {
               pgbvo.setvDueDate4(cell.getStringCellValue().toString());
            }
            // 행의 20열 20_PM 최종확인 종료일자
            cell = row.getCell(21);
            if (null != cell) {
               pgbvo.setvDueDate5(cell.getStringCellValue().toString());
            }

            pgbvo_list.add(pgbvo);
         }

         result = pcgService.batchInsertPgb(pgbvo_list);

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
      catch (Exception e) {
         e.printStackTrace();
      }

      return result;
   }

   //엑셀 다운로드
   @RequestMapping(value = "/pcg/pgb/exportExcel", produces = "html/text;charset=UTF-8", method = RequestMethod.GET)
   public View exportPrjExcel(Model model, HttpServletRequest request,
         @RequestParam Map<String, String> paramMap) throws UnsupportedEncodingException {
      logger.debug("Welcome rest apo, 코드관리 > 과제코드관리 > 엑셀저장");

      List<PgbVo> list = pcgService.selectProjectCodeExcelList(paramMap);
      model.addAttribute("list", list);
      return new PgbExcelView();
   }

   @RequestMapping(value = "/pcg/pgc/getEmplNoList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PgcVo> getEmplNoList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인원정보 조회");

      List<PgcVo> list = pcgService.selectEmplNoList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pcg/pgc/saveEmplNo", method = RequestMethod.POST)
   public int saveEmplNo(@RequestBody List<PgcVo> pgcvolist, HttpServletRequest request) {
      try {
         logger.debug("rest api. 인원정보 저장");
         logger.debug(pgcvolist.toString());

         pcgService.saveEmplNoList(pgcvolist);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   @RequestMapping(value = "/pcg/pgc/copyPgc", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int copyPgc(@RequestParam("searchEstiCode") String searchEstiCode, @RequestParam("copyEstiCode") String copyEstiCode) {
      try {
         logger.debug("rest api. 인원정보 저장");

         Map<String, String> param = new HashMap<String, String>();
         param.put("searchEstiCode", searchEstiCode);
         param.put("copyEstiCode", copyEstiCode);

         return pcgService.copyPgc(param);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
   }

   @RequestMapping(value = "/pcg/pgc/excelUpload", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public @ResponseBody int pgcUpload(HttpServletRequest request, HttpServletResponse response) {
      logger.debug("rest api. 인원정보 업로드");
      int result = 0;

      try {
         // request에서 MultipartHttpServletRequest 생성
         MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;

         // 파일이름 목록
         Iterator<String> iter = multipartHttpServletRequest.getFileNames();
         MultipartFile multipartFile = null;
         String itemFileName = "";

         // request의 Iterator를 돌면서 처리
         while (iter.hasNext()) {
            itemFileName = iter.next();

            // 내용을 가져와서
            multipartFile = multipartHttpServletRequest.getFile(itemFileName);
         }

         OPCPackage opcPackage = OPCPackage.open(multipartFile.getInputStream());
         XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);

         // 첫번째 시트 불러오기 (PgcVo)
         List<PgcVo> pgcvo_list = new ArrayList<PgcVo>();
         XSSFSheet sheet = workbook.getSheetAt(0);

         for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
            PgcVo pgcvo = new PgcVo();
            XSSFRow row = sheet.getRow(i);

            // 행이 존재하기 않으면 패스
            if (null == row) {
               continue;
            }
            logger.debug("row ===>" + row);
            // 행의 1열 01_평가코드
            XSSFCell cell = row.getCell(0);
            if (null != cell) {
               pgcvo.setvEstiCode(cell.getStringCellValue().toString());
            }
            // 행의 2열 02_사번
            cell = row.getCell(1);
            if (null != cell) {
               pgcvo.setvEmplNo(cell.getStringCellValue().toString());
            }
            // 행의 3열 03_성명
            cell = row.getCell(2);
            if (null != cell) {
               pgcvo.setvName(cell.getStringCellValue().toString());
            }
            // 행의 4열 04_센터명
            cell = row.getCell(3);
            if (null != cell) {
               pgcvo.setvDeptName(cell.getStringCellValue().toString());
            }
            // 행의 5열 05_팀명
            cell = row.getCell(4);
            if (null != cell) {
               pgcvo.setvTeamName(cell.getStringCellValue().toString());
            }
            // 행의 6열 06_직위명
            cell = row.getCell(5);
            if (null != cell) {
               pgcvo.setvPosName(cell.getStringCellValue().toString());
            }
            // 행의 7열 07_암호
            cell = row.getCell(6);
            if (null != cell) {
               pgcvo.setvPassword(cell.getStringCellValue().toString());
            }
            // 행의 8열 08_등급, 아래 숫자 8 주의
            cell = row.getCell(8);
            if (null != cell) {
               pgcvo.setvGrade(cell.getStringCellValue().toString());
            }
            // 행의 9열 09_평가대상 여부, 아래 숫자 7 주의
            cell = row.getCell(7);
            if (null != cell) {
               pgcvo.setvEstiYn(cell.getStringCellValue().toString());
            }

            pgcvo_list.add(pgcvo);
         }

         result = pcgService.batchInsertPgc(pgcvo_list);

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
      catch (Exception e) {
         e.printStackTrace();
      }

      return result;
   }

}

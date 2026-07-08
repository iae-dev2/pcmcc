package kr.re.iae.pcmcc.biz.pce.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
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

import kr.re.iae.pcmcc.biz.pce.pci.service.PciService;
import kr.re.iae.pcmcc.biz.pce.pci.util.PiaExcelView;
import kr.re.iae.pcmcc.biz.pce.pci.util.PiaHalfYearExcelView;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaHalfYearVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PibVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PicVo;
import kr.re.iae.pcmcc.biz.pce.pci.vo.PidVo;

@RestController
public class PciRestApiController {

   private static final Logger logger = LoggerFactory.getLogger(PciRestApiController.class);

   @Autowired
   private PciService pciService;

   /** 관리자 - 인건비 확보 - 내부인건비/간접비관리 =============================================== START */
   @RequestMapping(value = "/pci/pia/checkPiaProject", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<Map<String, String>> checkPiaProject(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 내부인건비/간접비관리 > 과제코드 체크");

      return pciService.checkPiaProject(paramMap);
   }

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비 관리 조회 */
   @RequestMapping(value = "/pci/pia/getPiaList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PiaVo> getPiaList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 월별 내부인건비/간접비관리 > 직접비/간접비 목록 조회");

      List<PiaVo> list = pciService.selectPiaList(paramMap);
      return list;
   }

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비 관리 저장 */
   @RequestMapping(value = "/pci/pia/savePiaList", method = RequestMethod.POST)
   public int savePiaList(@RequestBody List<PiaVo> piavolist, HttpServletRequest request) {
      try {
         logger.debug("Welcome rest api. 인건비 확보 > 월별 내부인건비/간접비관리 > 직접비/간접비 목록 저장");
         logger.debug(piavolist.toString());

         pciService.savePiaList(piavolist);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비 게산 */
   @RequestMapping(value = "/pci/pia/calculateMonthly", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int calculateMonthly(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 인건비확보율관리 > 분기별 내부인건비/간접비 게산");
      logger.debug(paramMap.toString());

      try {
         pciService.calculateMonthly(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }

      return 0;
   }

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비 관리 엑셀저장 */
   @RequestMapping(value = "/pci/pia/exportExcel", produces = "html/text;charset=UTF-8", method = RequestMethod.GET)
   public View exportExcel(Model model, HttpServletRequest request, @RequestParam Map<String, String> param) throws UnsupportedEncodingException {
      logger.debug("Welcome rest apo, jqxGrid Export Controller - Excel");

      List<PiaVo> list = pciService.selectPiaList(param);
      model.addAttribute("list", list);
      model.addAttribute("vYear", param.get("vYear"));
      return new PiaExcelView();
   }

   /** 관리자 - 인건비 확보 - 월별 내부인건비/간접비 관리 업로드 */
   @RequestMapping(value = "/pci/pia/excelUpload", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public @ResponseBody int piaUpload(HttpServletRequest request, HttpServletResponse response) {
      logger.debug("rest api. 직접비 간접비 목록 업로드");
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

         // 첫번째 시트 불러오기 (PiaVo)
         List<PiaVo> piavo_list = new ArrayList<PiaVo>();
         XSSFSheet sheet = workbook.getSheetAt(0);

         for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
            PiaVo piavo = new PiaVo();
            XSSFRow row = sheet.getRow(i);

            // 행이 존재하기 않으면 패스
            if (null == row) {
               continue;
            }
            logger.debug("row ===>" + row);

            // 행의 1열 01_과제코드
            XSSFCell cell = row.getCell(0);
            if (null != cell) {
               piavo.setvProjectCode(cell.getStringCellValue().toString());
            }

            // 행의 2열 02_과제연도
            cell = row.getCell(1);
            if (null != cell) {
               piavo.setvYear(Integer.toString((int) cell.getNumericCellValue()));
            }

            // 행의 3열 03_구분
            cell = row.getCell(2);
            if (null != cell) {
               piavo.setvClass("인건비".equals(cell.getStringCellValue()) ? "01" : "02");
            }

            // 행의 4열 04_1월
            cell = row.getCell(3);
            if (null != cell) {
               piavo.setn1MonAmount(cell.getNumericCellValue());
            }
            // 행의 5열 05_2월
            cell = row.getCell(4);
            if (null != cell) {
               piavo.setn2MonAmount(cell.getNumericCellValue());
            }

            // 행의 6열 06_3월
            cell = row.getCell(5);
            if (null != cell) {
               piavo.setn3MonAmount(cell.getNumericCellValue());
            }

            // 행의 7열 07_4월
            cell = row.getCell(6);
            if (null != cell) {
               piavo.setn4MonAmount(cell.getNumericCellValue());
            }

            // 행의 8열 08_5월
            cell = row.getCell(7);
            if (null != cell) {
               piavo.setn5MonAmount(cell.getNumericCellValue());
            }

            // 행의 9열 09_6월
            cell = row.getCell(8);
            if (null != cell) {
               piavo.setn6MonAmount(cell.getNumericCellValue());
            }

            // 행의 9열 10_7월
            cell = row.getCell(9);
            if (null != cell) {
               piavo.setn7MonAmount(cell.getNumericCellValue());
            }

            // 행의 9열 11_8월
            cell = row.getCell(10);
            if (null != cell) {
               piavo.setn8MonAmount(cell.getNumericCellValue());
            }

            // 행의 9열 12_9월
            cell = row.getCell(11);
            if (null != cell) {
               piavo.setn9MonAmount(cell.getNumericCellValue());
            }

            // 행의 9열 13_10월
            cell = row.getCell(12);
            if (null != cell) {
               piavo.setn10MonAmount(cell.getNumericCellValue());
            }

            // 행의 9열 14_11월
            cell = row.getCell(13);
            if (null != cell) {
               piavo.setn11MonAmount(cell.getNumericCellValue());
            }

            // 행의 9열 15_12월
            cell = row.getCell(14);
            if (null != cell) {
               piavo.setn12MonAmount(cell.getNumericCellValue());
            }

            piavo_list.add(piavo);
         }

         result = pciService.batchInsertPia(piavo_list);

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

   /** 관리자 - 인건비 확보 - 분기별 내부인건비/간접비 관리 조회 */
   @RequestMapping(value = "/pci/pia/getPiaHalfYearList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PiaHalfYearVo> getPiaHalfYearList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 분기별 내부인건비/간접비관리 > 내부인건비/간접비 목록 조회");

      List<PiaHalfYearVo> list = pciService.selectPiaHalfYearList(paramMap);
      return list;
   }

   /** 관리자 - 인건비 확보 - 분기별 내부인건비/간접비 관리 저장 */
   @RequestMapping(value = "/pci/pia/savePiaHalfYearList", method = RequestMethod.POST)
   public int savePiaHalfYearList(@RequestBody List<PiaHalfYearVo> piavolist, HttpServletRequest request) {
      try {
         logger.debug("Welcome rest api. 인건비 확보 > 분기별 내부인건비/간접비관리 > 내부인건비/간접비 목록 저장");
         logger.debug(piavolist.toString());

         pciService.savePiaHalfYearList(piavolist);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   /** 관리자 - 인건비 확보 - 분기별 내부인건비/간접비 게산 */
   @RequestMapping(value = "/pci/pia/calculateHalfYear", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int calculateHalfYear(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 인건비확보율관리 > 분기별 내부인건비/간접비 게산");
      logger.debug(paramMap.toString());

      try {
         pciService.calculateHalfYear(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }

      return 0;
   }

   /** 관리자 - 인건비 확보 - 분기별 내부인건비/간접비 관리 엑셀저장 */
   @RequestMapping(value = "/pci/pia/exportHalfYearExcel", produces = "html/text;charset=UTF-8", method = RequestMethod.GET)
   public View exportHalfYearExcel(Model model, HttpServletRequest request, @RequestParam Map<String, String> param) throws UnsupportedEncodingException {
      logger.debug("Welcome rest apo, jqxGrid Export Controller - Excel");

      List<PiaHalfYearVo> list = pciService.selectPiaHalfYearList(param);
      model.addAttribute("list", list);
      model.addAttribute("vEstiCode", param.get("vEstiCode"));
      return new PiaHalfYearExcelView();
   }
   /** 관리자 - 인건비 확보 - 내부인건비/간접비관리 ========================================= END */

   /** 관리자 - 인건비 확보 - 개인별인건비 =============================================== START */
   /** 관리자 - 인건비 확보 - 개인별인건비 조회 */
   @RequestMapping(value = "/pci/pib/getPibList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PibVo> getPibList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 개인별 인건비관리 > 개인별 인건비 목록 조회");

      List<PibVo> list = pciService.selectPibList(paramMap);
      return list;
   }

   /** 관리자 - 인건비 확보 - 분기별 내부인건비/간접비 관리 저장 */
   @RequestMapping(value = "/pci/pib/savePibList", method = RequestMethod.POST)
   public int savePibList(@RequestBody List<PibVo> pibvolist, HttpServletRequest request) {
      try {
         logger.debug("Welcome rest api. 인건비 확보 > 개인별 인건비관리 > 개인별 인건비관리 저장");
         logger.debug(pibvolist.toString());

         pciService.savePibList(pibvolist);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }
      return 0;
   }

   /** 관리자 - 인건비 확보 - 개인별인건비 - 인건비 업로드 */
   @RequestMapping(value = "/pci/pib/excelUpload", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public @ResponseBody int pibUpload(HttpServletRequest request, HttpServletResponse response) {
      logger.debug("rest api. 개인별 인건비 목록 업로드");
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

         // 첫번째 시트 불러오기 (PibVo)
         List<PibVo> pibvo_list = new ArrayList<PibVo>();
         XSSFSheet sheet = workbook.getSheetAt(0);

         for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
            PibVo pibvo = new PibVo();
            XSSFRow row = sheet.getRow(i);

            // 행이 존재하기 않으면 패스
            if (null == row) {
               continue;
            }
            logger.debug("row ===>" + row);

            // 행의 평간코드
            XSSFCell cell = row.getCell(0);
            if (null != cell) {
               pibvo.setvEstiCode(cell.getStringCellValue().toString());
            }

            // 행의 사번
            cell = row.getCell(1);
            if (null != cell) {
               pibvo.setvEmplNo(cell.getStringCellValue().toString());
            }

            // 행의 인건비
            cell = row.getCell(2);
            if (null != cell) {
               pibvo.setnAmount(cell.getNumericCellValue());
            }

            pibvo_list.add(pibvo);
         }

         result = pciService.batchInsertPib(pibvo_list);

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
   /** 관리자 - 인건비 확보 - 개인별인건비 ================================================ END */

   /** 관리자 - 인건비 확보 - 인건비확보율관리 ================================================ START */
   /** 관리자 - 인건비 확보 - 인건비확보율 관리 - 직접비/간접비 목록 조회 */
   @RequestMapping(value = "/pci/pic/getPicGrid2List", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PicVo> getPicGrid2List(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 인건비확보율 관리 > 참여율 목록 조회");

      List<PicVo> list = pciService.selectPicGrid2List(paramMap);
      return list;
   }

   @RequestMapping(value = "/pci/pic/getPicGrid3List", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PicVo> getPicGrid3List(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 인건비확보율관리 > 인건비 확보율 목록 조회");

      List<PicVo> list = pciService.selectPicGrid3List(paramMap);
      return list;
   }

   @RequestMapping(value = "/pci/pic/calculatePic", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public int calculatePic(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 인건비확보율관리 > 인건비 확보율 계산");
      logger.debug(paramMap.toString());

      try {
         pciService.calculatePic(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }

      return 0;
   }

   @RequestMapping(value = "/pci/pid/getPidList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PidVo> getPidList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 반기인건비확보율");

      List<PidVo> list = pciService.selectPidList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pci/pie/getPieList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PidVo> getPieList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 연간인건비확보율");

      List<PidVo> list = pciService.selectPieList(paramMap);
      return list;
   }

   @RequestMapping(value = "/pci/pif/getPifEntrustList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
   public List<PicVo> getPifEntrustList(@RequestParam Map<String, String> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 인건비 조정 > 내부위탁과제");

      List<PicVo> list = pciService.selectPifEntrustList(paramMap);
      return list;
   }
   
   @RequestMapping(value = "/pci/pif/updateEntrust", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
   public int updateEntrust(@RequestBody Map<String, Object> paramMap) {
      logger.debug("Welcome rest api. 인건비 확보 > 인건비 조정 > 내부위탁과제 인건비 업데이트");
      logger.debug(paramMap.toString());

      try {
         pciService.updateEntrust(paramMap);
      }
      catch (Exception e) {
         e.printStackTrace();
         return -1;
      }

      return 0;
   }
//   @RequestMapping(value = "/pci/pia/getPiaHalfYearList", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
//   public List<PiaHalfYearVo> getPiaHalfYearList(@RequestParam Map<String, String> paramMap) {
//      logger.debug("Welcome rest api. 인건비 확보 > 인건비 조정 > 시험분석센터인원");
//
//      List<PiaHalfYearVo> list = pciService.selectPiaHalfYearList(paramMap);
//      return list;
//   }
   /** 관리자 - 인건비 확보 - 인건비확보율관리 ================================================ END */
}

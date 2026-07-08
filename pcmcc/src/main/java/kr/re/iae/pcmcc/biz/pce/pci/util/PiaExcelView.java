package kr.re.iae.pcmcc.biz.pce.pci.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsxView;

import kr.re.iae.pcmcc.biz.pce.pci.vo.PiaVo;

public class PiaExcelView extends AbstractXlsxView {

   @SuppressWarnings("unchecked")
   @Override
   protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook, HttpServletRequest request,
         HttpServletResponse response) throws Exception {
      String sCurTime = null;
      sCurTime = new SimpleDateFormat("yyyyMMdd", Locale.KOREA).format(new Date());

      String vParamYear = (String) modelMap.get("vYear");

      String excelName = vParamYear + "년_직접비_간접비_목록_" + sCurTime + ".xlsx";

      Sheet worksheet = null;
      Row row = null;
      CellStyle head_style = workbook.createCellStyle();
      CellStyle center_style = workbook.createCellStyle(); // 셀 스타일을 위한 변수
      CellStyle left_style = workbook.createCellStyle(); // 셀 스타일을 위한 변수
      CellStyle right_style = workbook.createCellStyle(); // 셀 스타일을 위한 변수

      Font font = workbook.createFont(); // 폰트
      font.setColor(IndexedColors.WHITE.getIndex());

      head_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.CENTER); // 글위치를 중앙으로 설정
      head_style.setVerticalAlignment(org.apache.poi.ss.usermodel.VerticalAlignment.CENTER); // 상하 위치 중앙 설정
      head_style.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
      head_style.setFillPattern(FillPatternType.SOLID_FOREGROUND); // 배경색 변경
      head_style.setFont(font); // 글자 색상

      head_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.CENTER); // 글위치를 중앙으로 설정
      head_style.setVerticalAlignment(org.apache.poi.ss.usermodel.VerticalAlignment.CENTER); // 상하 위치 중앙 설정
      head_style.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
      head_style.setFillPattern(FillPatternType.SOLID_FOREGROUND); // 배경색 변경
      head_style.setFont(font); // 글자 색상
      head_style.setBorderTop(BorderStyle.THIN);
      head_style.setBorderBottom(BorderStyle.THIN);
      head_style.setBorderLeft(BorderStyle.THIN);
      head_style.setBorderRight(BorderStyle.THIN);

      center_style.setFillForegroundColor(IndexedColors.WHITE.getIndex());
      center_style.setFillPattern(FillPatternType.SOLID_FOREGROUND); // 배경색 설정
      center_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.CENTER); // 글위치를 중앙으로 설정
      center_style.setBorderTop(BorderStyle.THIN);
      center_style.setBorderBottom(BorderStyle.THIN);
      center_style.setBorderLeft(BorderStyle.THIN);
      center_style.setBorderRight(BorderStyle.THIN);

      left_style.setFillForegroundColor(IndexedColors.WHITE.getIndex());
      left_style.setFillPattern(FillPatternType.SOLID_FOREGROUND); // 배경색 설정
      left_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.LEFT); // 글위치를 중앙으로 설정
      left_style.setBorderTop(BorderStyle.THIN);
      left_style.setBorderBottom(BorderStyle.THIN);
      left_style.setBorderLeft(BorderStyle.THIN);
      left_style.setBorderRight(BorderStyle.THIN);

      right_style.setFillForegroundColor(IndexedColors.WHITE.getIndex());
      right_style.setFillPattern(FillPatternType.SOLID_FOREGROUND); // 배경색 설정
      right_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.RIGHT); // 글위치를 중앙으로 설정
      right_style.setBorderTop(BorderStyle.THIN);
      right_style.setBorderBottom(BorderStyle.THIN);
      right_style.setBorderLeft(BorderStyle.THIN);
      right_style.setBorderRight(BorderStyle.THIN);

      List<PiaVo> listExcel = (List<PiaVo>) modelMap.get("list");

      // 새로운 sheet를 생성한다.
      worksheet = workbook.createSheet();

      // 가장 첫번째 줄에 제목을 만든다.
      row = worksheet.createRow(0);

      // 칼럼 길이 설정
      worksheet.setColumnWidth(0, 3000);
      worksheet.setColumnWidth(1, 2700);
      worksheet.setColumnWidth(2, 2700);
      worksheet.setColumnWidth(3, 4000);
      worksheet.setColumnWidth(4, 4000);
      worksheet.setColumnWidth(5, 4000);
      worksheet.setColumnWidth(6, 4000);
      worksheet.setColumnWidth(7, 4000);
      worksheet.setColumnWidth(8, 4000);
      worksheet.setColumnWidth(9, 4000);
      worksheet.setColumnWidth(10, 4000);
      worksheet.setColumnWidth(11, 4000);
      worksheet.setColumnWidth(12, 4000);
      worksheet.setColumnWidth(13, 4000);
      worksheet.setColumnWidth(14, 4000);
      worksheet.setColumnWidth(15, 4000);

      row = worksheet.createRow(0);
      row.createCell(0).setCellValue("과제코드");
      row.createCell(1).setCellValue("과제연도");
      row.createCell(2).setCellValue("구분");
      row.createCell(3).setCellValue("1월");
      row.createCell(4).setCellValue("2월");
      row.createCell(5).setCellValue("3월");
      row.createCell(6).setCellValue("4월");
      row.createCell(7).setCellValue("5월");
      row.createCell(8).setCellValue("6월");
      row.createCell(9).setCellValue("7월");
      row.createCell(10).setCellValue("8월");
      row.createCell(11).setCellValue("9월");
      row.createCell(12).setCellValue("10월");
      row.createCell(13).setCellValue("11월");
      row.createCell(14).setCellValue("12월");
      row.createCell(15).setCellValue("합계");

      row.getCell(0).setCellStyle(head_style);
      row.getCell(1).setCellStyle(head_style);
      row.getCell(2).setCellStyle(head_style);
      row.getCell(3).setCellStyle(head_style);
      row.getCell(4).setCellStyle(head_style);
      row.getCell(5).setCellStyle(head_style);
      row.getCell(6).setCellStyle(head_style);
      row.getCell(7).setCellStyle(head_style);
      row.getCell(8).setCellStyle(head_style);
      row.getCell(9).setCellStyle(head_style);
      row.getCell(10).setCellStyle(head_style);
      row.getCell(11).setCellStyle(head_style);
      row.getCell(12).setCellStyle(head_style);
      row.getCell(13).setCellStyle(head_style);
      row.getCell(14).setCellStyle(head_style);
      row.getCell(15).setCellStyle(head_style);

      int rowIndex = 1;

      for (PiaVo item : listExcel) {
         row = worksheet.createRow(rowIndex);
         row.createCell(0).setCellValue(item.getvProjectCode());   //과제코드
         row.createCell(1).setCellValue(item.getvYear());   //과제연도
         row.createCell(2).setCellValue(("01".equals(item.getvClass()) ? "인건비" : "간접비"));   //구분
         row.createCell(3).setCellValue(item.getn1MonAmount());
         row.createCell(4).setCellValue(item.getn2MonAmount());
         row.createCell(5).setCellValue(item.getn3MonAmount());
         row.createCell(6).setCellValue(item.getn4MonAmount());
         row.createCell(7).setCellValue(item.getn5MonAmount());
         row.createCell(8).setCellValue(item.getn6MonAmount());
         row.createCell(9).setCellValue(item.getn7MonAmount());
         row.createCell(10).setCellValue(item.getn8MonAmount());
         row.createCell(11).setCellValue(item.getn9MonAmount());
         row.createCell(12).setCellValue(item.getn10MonAmount());
         row.createCell(13).setCellValue(item.getn11MonAmount());
         row.createCell(14).setCellValue(item.getn12MonAmount());
         row.createCell(15).setCellValue(item.getn1MonAmount()  + item.getn2MonAmount()  + item.getn3MonAmount() +
                                         item.getn4MonAmount()  + item.getn5MonAmount()  + item.getn6MonAmount() +
                                         item.getn7MonAmount()  + item.getn8MonAmount()  + item.getn9MonAmount() +
                                         item.getn10MonAmount() + item.getn11MonAmount() + item.getn12MonAmount());   //합계

         // 스타일 적용
         row.getCell(0).setCellStyle(center_style);
         row.getCell(1).setCellStyle(center_style);
         row.getCell(2).setCellStyle(center_style);
         row.getCell(3).setCellStyle(right_style);
         row.getCell(4).setCellStyle(right_style);
         row.getCell(5).setCellStyle(right_style);
         row.getCell(6).setCellStyle(right_style);
         row.getCell(7).setCellStyle(right_style);
         row.getCell(8).setCellStyle(right_style);
         row.getCell(9).setCellStyle(right_style);
         row.getCell(10).setCellStyle(right_style);
         row.getCell(11).setCellStyle(right_style);
         row.getCell(12).setCellStyle(right_style);
         row.getCell(13).setCellStyle(right_style);
         row.getCell(14).setCellStyle(right_style);
         row.getCell(15).setCellStyle(right_style);

         rowIndex++;
      }

      try {
         response.setHeader("Content-Disposition",
               "attachement; filename=\"" + java.net.URLEncoder.encode(excelName, "UTF-8") + "\";charset=\"UTF-8\"");
      }
      catch (Exception e) {
         e.printStackTrace();
      }

   }

}

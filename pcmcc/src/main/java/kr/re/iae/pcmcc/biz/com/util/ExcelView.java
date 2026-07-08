package kr.re.iae.pcmcc.biz.com.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
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

public class ExcelView extends AbstractXlsxView {

   // 숫자 여부 판별
   private boolean checkDigit(String param) {
      boolean result = true;
      char tmp;

      for (int i = 0; i < param.length(); i++) {
         tmp = param.charAt(i);

         if (Character.isDigit(tmp) == false) {
            result = false;
         }
      }

      return result;
   }

   @SuppressWarnings("unchecked")
   @Override
   protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook, HttpServletRequest request, HttpServletResponse response) throws Exception {
      String sCurTime = null;
      sCurTime = new SimpleDateFormat("yyyyMMdd", Locale.KOREA).format(new Date());

      String title = (String) modelMap.get("title");
      String excelName = sCurTime + "_" + title + ".xlsx";
      Map<String, Object> columns = (LinkedHashMap<String, Object>) modelMap.get("columns");
      int columnLength = columns.size();
      List<Map<String, Object>> datalist = (List<Map<String, Object>>) modelMap.get("datalist");

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

      int rowIndex = 1; // row index
      int columnIndex = 0; // 컬럼 길이

      // 새로운 sheet를 생성한다.
      worksheet = workbook.createSheet(title);

      // 헤더 설정
      row = worksheet.createRow(0);
      Iterator keyData = columns.keySet().iterator();
      String key;
      Map innermap;

      while (keyData.hasNext()) {
         key = (String) keyData.next();
         innermap = (Map) columns.get(key);

         if ("false".equals(innermap.get("hidden").toString())) {
            //String str_width = innermap.get("width").toString() == "auto" ? "0" : innermap.get("width").toString().replaceAll("\\D", "");
            //int tmp_width = Integer.parseInt(str_width) * 40;
            int str_width = innermap.get("width").toString() == "auto" ? 0 : (int)Float.parseFloat(innermap.get("width").toString());
            int tmp_width = str_width * 40;
            String tmp_text = innermap.get("text").toString();

            worksheet.setColumnWidth(columnIndex, tmp_width);
            row.createCell(columnIndex).setCellValue(tmp_text);
            row.getCell(columnIndex).setCellStyle(head_style);

            columnIndex++;
         }
      } // while

      for (Map datamap : datalist) {
         row = worksheet.createRow(rowIndex);
         keyData = columns.keySet().iterator();

         columnIndex = 0;
         while (keyData.hasNext()) {

            key = (String) keyData.next();
            innermap = (Map) columns.get(key);

            if ("false".equals(innermap.get("hidden").toString())) {
               String tmp_align = innermap.get("cellsalign").toString();
               String cell_value = datamap.get(key) == null ? " " : datamap.get(key).toString();
               Double cell_doubleValue = 0.0;

               // 숫자 여부 판별 2020-02-06
               /**
                * 엑셀 공통 문자를 숫자로 변경 시 예외처리 항목 vEmplNo: 사번 vBankCode: 은행 vDepoNo:
                * 계좌번호 vRemarks: 비고 vPosCode: 직급 vResiNo: 주민번호
                */
               // 아래 IF ELSE 내부 IF ELSE 위치를 변경하게 되면 속도가 매우 느려짐(주의)
               if ("vEmplNo".equals(key) || "vBankCode".equals(key) || "vDepoNo".equals(key) || "vRemarks".equals(key) || "vPosCode".equals(key) || "vResiNo".equals(key)) {
                  row.createCell(columnIndex).setCellValue(cell_value);
               }
               else {
                  if (checkDigit(cell_value)) {
                     cell_doubleValue = Double.parseDouble(cell_value);
                     row.createCell(columnIndex).setCellValue(cell_doubleValue);
                  }
                  else {
                     row.createCell(columnIndex).setCellValue(cell_value);
                  }
               }

               /* row.createCell(columnIndex).setCellValue(cell_value); */
               if ("center".equals(tmp_align)) {
                  row.getCell(columnIndex).setCellStyle(center_style);
               }
               else if ("left".equals(tmp_align)) {
                  row.getCell(columnIndex).setCellStyle(left_style);
               }
               else if ("right".equals(tmp_align)) {
                  row.getCell(columnIndex).setCellStyle(right_style);
               }

               columnIndex++;
            }
         } // while

         rowIndex++;
      }

      try {
         response.setHeader("Content-Disposition", "attachement; filename=\"" + java.net.URLEncoder.encode(excelName, "UTF-8") + "\";charset=\"UTF-8\"");
      }
      catch (Exception e) {
         e.printStackTrace();
      }

   }

}

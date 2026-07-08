package kr.re.iae.pcmcc.biz.pce.pch.util;

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

import kr.re.iae.pcmcc.biz.pce.pch.vo.PchPrjVo;

public class PchExcelView extends AbstractXlsxView {

   @Override
   protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook, HttpServletRequest request,
           HttpServletResponse response) throws Exception {
      String sCurTime = "";
      String sStepName = "";
      String excelName = "";
      Sheet worksheet = null;
      Row row = null;

      sCurTime = new SimpleDateFormat("yyyyMMdd", Locale.KOREA).format(new Date());
      excelName = sCurTime + "_과제_기여율합.xlsx";

      CellStyle head_style = workbook.createCellStyle();
      CellStyle center_style = workbook.createCellStyle();   //셀 스타일을 위한 변수
      CellStyle left_style = workbook.createCellStyle();   //셀 스타일을 위한 변수
      CellStyle right_style = workbook.createCellStyle();   //셀 스타일을 위한 변수

      Font font = workbook.createFont();   //폰트
      font.setColor(IndexedColors.WHITE.getIndex());

      head_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.CENTER);   //글위치를 중앙으로 설정
      head_style.setVerticalAlignment(org.apache.poi.ss.usermodel.VerticalAlignment.CENTER);   //상하 위치 중앙 설정
      head_style.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
      head_style.setFillPattern(FillPatternType.SOLID_FOREGROUND);   //배경색 변경
      head_style.setFont(font);   //글자 색상

      head_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.CENTER);   //글위치를 중앙으로 설정
      head_style.setVerticalAlignment(org.apache.poi.ss.usermodel.VerticalAlignment.CENTER);   //상하 위치 중앙 설정
      head_style.setFillForegroundColor(IndexedColors.BLUE_GREY.getIndex());
      head_style.setFillPattern(FillPatternType.SOLID_FOREGROUND);   //배경색 변경
      head_style.setFont(font);   //글자 색상
      head_style.setBorderTop(BorderStyle.THIN);
      head_style.setBorderBottom(BorderStyle.THIN);
      head_style.setBorderLeft(BorderStyle.THIN);
      head_style.setBorderRight(BorderStyle.THIN);

      center_style.setFillForegroundColor(IndexedColors.WHITE.getIndex());
      center_style.setFillPattern(FillPatternType.SOLID_FOREGROUND);   //배경색 설정
      center_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.CENTER);   //글위치를 중앙으로 설정
      center_style.setBorderTop(BorderStyle.THIN);
      center_style.setBorderBottom(BorderStyle.THIN);
      center_style.setBorderLeft(BorderStyle.THIN);
      center_style.setBorderRight(BorderStyle.THIN);

      left_style.setFillForegroundColor(IndexedColors.WHITE.getIndex());
      left_style.setFillPattern(FillPatternType.SOLID_FOREGROUND);   //배경색 설정
      left_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.LEFT);   //글위치를 중앙으로 설정
      left_style.setBorderTop(BorderStyle.THIN);
      left_style.setBorderBottom(BorderStyle.THIN);
      left_style.setBorderLeft(BorderStyle.THIN);
      left_style.setBorderRight(BorderStyle.THIN);

      right_style.setFillForegroundColor(IndexedColors.WHITE.getIndex());
      right_style.setFillPattern(FillPatternType.SOLID_FOREGROUND);   //배경색 설정
      right_style.setAlignment(org.apache.poi.ss.usermodel.HorizontalAlignment.RIGHT);   //글위치를 중앙으로 설정
      right_style.setBorderTop(BorderStyle.THIN);
      right_style.setBorderBottom(BorderStyle.THIN);
      right_style.setBorderLeft(BorderStyle.THIN);
      right_style.setBorderRight(BorderStyle.THIN);

      @SuppressWarnings("unchecked")
      List<PchPrjVo> listExcel = (List<PchPrjVo>)modelMap.get("list");

      //새로운 sheet를 생성한다.
      worksheet = workbook.createSheet("과제 기여율합");

      //가장 첫번째 줄에 제목을 만든다.
      row = worksheet.createRow(0);

      row.createCell(0).setCellValue("과제코드");
      row.createCell(1).setCellValue("과제명");
      row.createCell(2).setCellValue("과제책임자");
      row.createCell(3).setCellValue("과제책임자명");
      row.createCell(4).setCellValue("기여율합");
      row.createCell(5).setCellValue("진행단계");

      row.getCell(0).setCellStyle(head_style);
      row.getCell(1).setCellStyle(head_style);
      row.getCell(2).setCellStyle(head_style);
      row.getCell(3).setCellStyle(head_style);
      row.getCell(4).setCellStyle(head_style);
      row.getCell(5).setCellStyle(head_style);

      //칼럼 길이 설정
      worksheet.setColumnWidth(0, 3000);    //과제코드
      worksheet.setColumnWidth(1, 15000);   //과제명
      worksheet.setColumnWidth(2, 3000);    //과제책임자
      worksheet.setColumnWidth(3, 3200);    //과제책임자명
      worksheet.setColumnWidth(4, 3200);    //개인 기여율합
      worksheet.setColumnWidth(5, 5000);    //진행단계

      int rowIndex = 1;

      for (PchPrjVo item : listExcel) {
         row = worksheet.createRow(rowIndex);
         row.createCell(0).setCellValue(item.getvProjectCode());    //과제코드
         row.createCell(1).setCellValue(item.getvProjectName());    //과제명
         row.createCell(2).setCellValue(item.getvProjectPm());      //과제책임자
         row.createCell(3).setCellValue(item.getvProjectPmName());  //과제책임자명
         row.createCell(4).setCellValue(item.getvProjectSum());     //기여율합

         if ("1".equals(item.getvEstiStep())) {
            if ("Y".equals(item.getvFinish())) {
               sStepName = "PM 평가중";
            }
            else {
               sStepName = "연구원 입력중";
            }
         }
         else if ("2".equals(item.getvEstiStep())) {
            if ("Y".equals(item.getvConfirm())) {
               sStepName = "센터장 확인중";
            }
            else {
               sStepName = "연구원 확인중";
            }
         }
         else if ("3".equals(item.getvEstiStep())) {
            sStepName = "센터장 반려";
         }
         else if ("4".equals(item.getvEstiStep())) {
            sStepName = "PM 최종 확인 중";
         }
         else if ("5".equals(item.getvEstiStep())) {
            sStepName = "최종 평가완료";
         }

         row.createCell(5).setCellValue(sStepName);            //진행단계

         //스타일 적용
         row.getCell(0).setCellStyle(center_style);    //과제코드
         row.getCell(1).setCellStyle(left_style);      //과제명
         row.getCell(2).setCellStyle(center_style);    //과제책임자
         row.getCell(3).setCellStyle(center_style);    //과제책임자명
         row.getCell(4).setCellStyle(center_style);    //기여율합
         row.getCell(5).setCellStyle(center_style);    //진행단계

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

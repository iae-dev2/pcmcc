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

import kr.re.iae.pcmcc.biz.pce.pch.vo.PchExcelVo;

public class PchEmpExcelView extends AbstractXlsxView {

   @Override
   protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook, HttpServletRequest request,
           HttpServletResponse response) throws Exception {
      String sCurTime = null;
      sCurTime = new SimpleDateFormat("yyyyMMdd", Locale.KOREA).format(new Date());
      String excelName = sCurTime + "_개인별_기여율.xlsx";

      Sheet worksheet = null;
      Row row = null;
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
      List<PchExcelVo> listExcel = (List<PchExcelVo>)modelMap.get("list");

      //새로운 sheet를 생성한다.
      worksheet = workbook.createSheet("개인별 기여율");

      //가장 첫번째 줄에 제목을 만든다.
      row = worksheet.createRow(0);

      row.createCell(0).setCellValue("과제코드");
      row.createCell(1).setCellValue("과제명");
      row.createCell(2).setCellValue("과제책임자");
      row.createCell(3).setCellValue("과제책임자명");
      row.createCell(4).setCellValue("직위");
      row.createCell(5).setCellValue("부서명");
      row.createCell(6).setCellValue("팀명");
      row.createCell(7).setCellValue("참여연구원");
      row.createCell(8).setCellValue("참여연구원 성명");
      row.createCell(9).setCellValue("업무");
      row.createCell(10).setCellValue("개인 기여율");
      row.createCell(11).setCellValue("개인 기여율합");
      row.createCell(12).setCellValue("평가의견");
      row.createCell(13).setCellValue("완료여부");
      row.createCell(14).setCellValue("확인여부");

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

      //칼럼 길이 설정
      worksheet.setColumnWidth(0, 3000);    //과제코드
      worksheet.setColumnWidth(1, 10000);   //과제명
      worksheet.setColumnWidth(2, 3000);    //과제책임자
      worksheet.setColumnWidth(3, 3200);    //과제책임자명
      worksheet.setColumnWidth(4, 3600);    //직위
      worksheet.setColumnWidth(5, 8000);    //부서명
      worksheet.setColumnWidth(6, 8000);    //팀명
      worksheet.setColumnWidth(7, 3000);    //참여연구원
      worksheet.setColumnWidth(8, 3400);    //참여연구원 성명
      worksheet.setColumnWidth(9, 8000);    //업무
      worksheet.setColumnWidth(10, 3000);   //개인 기여율
      worksheet.setColumnWidth(11, 3200);   //개인 기여율합
      worksheet.setColumnWidth(12, 8000);   //평가의견
      worksheet.setColumnWidth(13, 3000);   //완료여부
      worksheet.setColumnWidth(14, 3000);   //확인여부

      int rowIndex = 1;

      for (PchExcelVo item : listExcel) {
         row = worksheet.createRow(rowIndex);
         row.createCell(0).setCellValue(item.getvProjectCode());         //과제코드
         row.createCell(1).setCellValue(item.getvProjectName());         //과제명
         row.createCell(2).setCellValue(item.getvProjectPm());           //과제책임자
         row.createCell(3).setCellValue(item.getvProjectPmName());       //과제책임자명
         row.createCell(4).setCellValue(item.getvProjectPmPosName());    //직위
         row.createCell(5).setCellValue(item.getvProjectPmDeptName());   //부서명
         row.createCell(6).setCellValue(item.getvProjectPmTeamName());   //팀명
         row.createCell(7).setCellValue(item.getvEmplNo());              //참여연구원
         row.createCell(8).setCellValue(item.getvName());                //참여연구원 성명
         row.createCell(9).setCellValue(item.getvWork());                //업무
         row.createCell(10).setCellValue(item.getnContribution());       //개인 기여율
         row.createCell(11).setCellValue(item.getnSumContribution());    //개인 기여율합
         row.createCell(12).setCellValue(item.getvContent());            //평가의견
         row.createCell(13).setCellValue(item.getvConfirm());            //완료여부
         row.createCell(14).setCellValue(item.getvFinish());             //확인여부

         //스타일 적용
         row.getCell(0).setCellStyle(center_style);    //과제코드
         row.getCell(1).setCellStyle(left_style);      //과제명
         row.getCell(2).setCellStyle(center_style);    //과제책임자
         row.getCell(3).setCellStyle(center_style);    //과제책임자명
         row.getCell(4).setCellStyle(center_style);    //직위
         row.getCell(5).setCellStyle(center_style);    //부서명
         row.getCell(6).setCellStyle(center_style);    //팀명
         row.getCell(7).setCellStyle(center_style);    //참여연구원
         row.getCell(8).setCellStyle(center_style);    //참여연구원 성명
         row.getCell(9).setCellStyle(left_style);      //업무
         row.getCell(10).setCellStyle(center_style);   //개인 기여율
         row.getCell(11).setCellStyle(center_style);   //개인 기여율합
         row.getCell(12).setCellStyle(left_style);     //평가의견
         row.getCell(13).setCellStyle(center_style);   //완료여부
         row.getCell(14).setCellStyle(center_style);   //확인여부

         rowIndex++;
      }

      try {
         response.setHeader("Content-Disposition",
             "attachement; filename=\"" + java.net.URLEncoder.encode(excelName, "UTF-8") + "\";charset=\"UTF-8\"");
      } catch (Exception e) {
         e.printStackTrace();
      }

   }

}

package kr.re.iae.pcmcc.biz.pce.pcg.util;

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

import kr.re.iae.pcmcc.biz.pce.pcg.vo.PgbVo;

public class PgbExcelView extends AbstractXlsxView {

   @Override
   protected void buildExcelDocument(Map<String, Object> modelMap, Workbook workbook, HttpServletRequest request,
           HttpServletResponse response) throws Exception {
      String sCurTime = null;
      sCurTime = new SimpleDateFormat("yyyyMMdd", Locale.KOREA).format(new Date());
      String excelName = sCurTime + "_과제코드관리.xlsx";

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
      List<PgbVo> listExcel = (List<PgbVo>)modelMap.get("list");

      //새로운 sheet를 생성한다.
      worksheet = workbook.createSheet("감면정보");

      //가장 첫번째 줄에 제목을 만든다.
      row = worksheet.createRow(0);

      row.createCell(0).setCellValue("과제코드");
      row.createCell(1).setCellValue("과제명");
      row.createCell(2).setCellValue("센터명");
      row.createCell(3).setCellValue("부처명");
      row.createCell(4).setCellValue("사업명");
      row.createCell(5).setCellValue("진행 단계");
      row.createCell(6).setCellValue("총과제 시작일");
      row.createCell(7).setCellValue("총과제 종료일");
      row.createCell(8).setCellValue("과제 시작일");
      row.createCell(9).setCellValue("과제 종료일");
      row.createCell(10).setCellValue("과제 PM");
      row.createCell(11).setCellValue("과제 PM명");
      row.createCell(12).setCellValue("과제 평가자");
      row.createCell(13).setCellValue("과제 평가자명");
      row.createCell(14).setCellValue("과제 목표");
      row.createCell(15).setCellValue("평가 기간내 Milestone");
      row.createCell(16).setCellValue("연구원 입력 종료 일자");
      row.createCell(17).setCellValue("기여도 평가 종료 일자");
      row.createCell(18).setCellValue("평가확인 종료 일자");
      row.createCell(19).setCellValue("기여도 확인 종료 일자");
      row.createCell(20).setCellValue("최종 확인 종료 일자");

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
      row.getCell(16).setCellStyle(head_style);
      row.getCell(17).setCellStyle(head_style);
      row.getCell(18).setCellStyle(head_style);
      row.getCell(19).setCellStyle(head_style);
      row.getCell(20).setCellStyle(head_style);

      //칼럼 길이 설정
      worksheet.setColumnWidth(0, 2800);    //과제코드
      worksheet.setColumnWidth(1, 10000);   //과제명
      worksheet.setColumnWidth(2, 4200);    //센터명
      worksheet.setColumnWidth(3, 3800);    //부처명
      worksheet.setColumnWidth(4, 6000);    //사업명
      worksheet.setColumnWidth(5, 6000);    //진행 단계
      worksheet.setColumnWidth(6, 3200);    //총과제 시작일
      worksheet.setColumnWidth(7, 3200);    //총과제 종료일
      worksheet.setColumnWidth(8, 3200);    //과제 시작일
      worksheet.setColumnWidth(9, 3200);    //과제 종료일
      worksheet.setColumnWidth(10, 3000);   //과제 PM
      worksheet.setColumnWidth(11, 3200);   //과제 PM명
      worksheet.setColumnWidth(12, 3000);   //과제 평가자
      worksheet.setColumnWidth(13, 3200);   //과제 평가자명
      worksheet.setColumnWidth(14, 8000);   //과제 목표
      worksheet.setColumnWidth(15, 8000);   //평가 기간내 Milestone
      worksheet.setColumnWidth(16, 5000);   //연구원 입력 종료 일자
      worksheet.setColumnWidth(17, 5000);   //연구원 평가 종료 일자
      worksheet.setColumnWidth(18, 5000);   //평가확인 종료 일자
      worksheet.setColumnWidth(19, 5000);   //기여도 확인 종료 일자
      worksheet.setColumnWidth(20, 5000);   //최종 확인 종료 일자

      int rowIndex = 1;

      for (PgbVo item : listExcel) {
         row = worksheet.createRow(rowIndex);
         row.createCell(0).setCellValue(item.getvProjectCode());         //과제코드
         row.createCell(1).setCellValue(item.getvProjectName());         //과제명
         row.createCell(2).setCellValue(item.getvDeptName());            //센터명
         row.createCell(3).setCellValue(item.getvGovName());             //부처명
         row.createCell(4).setCellValue(item.getvProjectDivision());     //사업명
         row.createCell(5).setCellValue(item.getvEstiStep());            //진행 단계
         row.createCell(6).setCellValue(item.getvTotStartDate());        //총과제 시작일
         row.createCell(7).setCellValue(item.getvTotEndDate());          //총과제 종료일
         row.createCell(8).setCellValue(item.getvStartDate());           //과제 시작일
         row.createCell(9).setCellValue(item.getvEndDate());             //과제 종료일
         row.createCell(10).setCellValue(item.getvProjectPm());          //과제 PM
         row.createCell(11).setCellValue(item.getvProjectPmName());      //과제 PM명
         row.createCell(12).setCellValue(item.getvProjectEva());         //과제 평가자
         row.createCell(13).setCellValue(item.getvProjectEvaName());     //과제 평가자명
         row.createCell(14).setCellValue(item.getvProjectGoal());        //과제 목표
         row.createCell(15).setCellValue(item.getvProjectMilestone());   //평가 기간내 Milestone
         row.createCell(16).setCellValue(item.getvDueDate1());           //연구원 입력 종료 일자
         row.createCell(17).setCellValue(item.getvDueDate2());           //기여도 평가 종료 일자
         row.createCell(18).setCellValue(item.getvDueDate3());           //평가확인 종료 일자
         row.createCell(19).setCellValue(item.getvDueDate4());           //기여도 확인 종료 일자
         row.createCell(20).setCellValue(item.getvDueDate5());           //최종 확인 종료 일자

         //스타일 적용
         row.getCell(0).setCellStyle(center_style);    //과제코드
         row.getCell(1).setCellStyle(left_style);      //과제명
         row.getCell(2).setCellStyle(center_style);    //센터명
         row.getCell(3).setCellStyle(center_style);    //부처명
         row.getCell(4).setCellStyle(left_style);      //사업명
         row.getCell(5).setCellStyle(center_style);    //진행 단계
         row.getCell(6).setCellStyle(center_style);    //총과제 시작일
         row.getCell(7).setCellStyle(center_style);    //총과제 종료일
         row.getCell(8).setCellStyle(center_style);    //과제 시작일
         row.getCell(9).setCellStyle(center_style);    //과제 종료일
         row.getCell(10).setCellStyle(center_style);   //과제 PM
         row.getCell(11).setCellStyle(center_style);   //과제 PM명
         row.getCell(12).setCellStyle(center_style);   //과제 평가자
         row.getCell(13).setCellStyle(center_style);   //과제 평가자명
         row.getCell(14).setCellStyle(left_style);     //과제 목표
         row.getCell(15).setCellStyle(left_style);     //평가 기간내 Milestone
         row.getCell(16).setCellStyle(center_style);   //연구원 입력 종료 일자
         row.getCell(17).setCellStyle(center_style);   //기여도 평가 종료 일자
         row.getCell(18).setCellStyle(center_style);   //평가확인 종료 일자
         row.getCell(19).setCellStyle(center_style);   //기여도 확인 종료 일자
         row.getCell(20).setCellStyle(center_style);   //최종 확인 종료 일자

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

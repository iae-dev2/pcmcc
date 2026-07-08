<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 인건비 확보 - 내부인건비/간접비관리 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pia_code"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pia_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>

<div style="float:left; width:62%;">
   <div class="dv-table1">
      <h2 class="fl">월별 내부인건비&#47;간접비 목록</h2>
      <div id="pia_mainGrid"></div>
   </div>
   <div class="cf" style="margin-top:5px;">
      <button id="pia_BtnExcel" class="fr btn-frame btn-green" style="margin-top:5px; margin-left:5px;">엑셀저장</button>
      <button id="pia_BtnMonthlyCal" class="fr btn-frame btn-blue" style="margin-top:5px; margin-left:5px;">월별 내부인건비&#47;간접비 계산</button>
      <button id="pia_BtnSample" class="fr" style="height:32px; margin-top:6px; margin-left:2px; border: 1px solid #667ebc; padding:2px 4px;color:#ffffff; background-color:#667ebc;">?</button>
      <button id="pia_BtnUpload" class="fr btn-frame btn-blue" style="margin-top:5px;">내부인건비&#47;간접비 업로드</button>
   </div>
</div>

<div style="float:right; width:37%;">
   <div class="dv-table1">
      <h2 class="fl">분기별 내부인건비&#47;간접비 목록</h2>
      <div id="pia_halfYearGrid"></div>
   </div>
   <div class="cf" style="margin-top:5px;">
      <button id="pia_BtnHalfYearExcel" class="fr btn-frame btn-green" style="margin-top:5px; margin-left:5px;">엑셀저장</button>
      <button id="pia_BtnHalfYearCal" class="fr btn-frame btn-blue" style="margin-top:5px;">분기별 내부인건비&#47;간접비 계산</button>
   </div>
</div>

<div class="f_clear"></div>

<div id="pia_jqxLoader"></div>

<!-- s:업로드 알림 윈도우 -->
<div id="pia_WinHelp">
   <div style="height:30px;padding-top:14px;">업로드 알림</div>
   <div style="margin-top:10px;">
      <div>
         <div style="font-size:16px; margin-top:10px;">1. 과제연도는 모두 동일해야 합니다.</div>
         <div style="font-size:16px;">2. 과제코드, 과제연도, 구분은 반드시 값이 있어야 합니다. </div>
         <div style="font-size:16px;">3. 과제코드, 과제연도, 구분은 텍스트, 1월 ~ 12월 금액은 숫자입니다. </div>
         <div style="font-size:16px;">4. 구분은 한글로 '인건비', '간접비'만 가능합니다.</div>
         <div style="font-size:16px;">5. 합계는 사용자 편의상 있어도 되나 시스템에서 자동 계산됩니다.</div>
      </div>
      <div style="margin-top: 20px;text-align:center;">
         <input type="button" id="pia_BtnOk" value="확인" style="cursor:pointer;" />
      </div>
   </div>
</div>
<!-- e:업로드 알림 윈도우 -->

<script type="text/javascript" src="/resources/js/pce/pci/pia/piaTransaction.js?ver=202108311034"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pia/piaModel.js?ver=202108311034"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pia/piaViewHandler.js?ver=202108311034"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pia/piaApp.js?ver=202108311034"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var piaApp = new PiaApp();
   piaApp.initApp();
</script>

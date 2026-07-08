<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 인건비 확보 - 인건비 조정 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pif_code"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pif_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>

<div style="float:left; width:48%;">
   <div class="dv-table1">
      <h2 class="fl">내부위탁과제 목록</h2>
      <div id="pif_entrustGrid"></div>
   </div>
   <div class="cf" style="margin-top:5px;">
<!--       <button id="pif_BtnExcel" class="fr btn-frame btn-green" style="margin-top:5px; margin-left:5px;">엑셀저장</button> -->
      <button id="pif_entrustAdjust" class="fr btn-frame btn-blue" style="margin-top:5px; margin-left:5px;">과제별 인건비 조정</button>
   </div>
</div>

<div style="float:right; width:48%;">
   <div class="dv-table1">
      <h2 class="fl">시험분석센터인원 목록</h2>
      <div id="pif_testGrid"></div>
   </div>
   <div class="cf" style="margin-top:5px;">
<!--       <button id="pif_BtnHalfYearExcel" class="fr btn-frame btn-green" style="margin-top:5px; margin-left:5px;">엑셀저장</button> -->
<!--       <button id="pif_testAdjust" class="fr btn-frame btn-blue" style="margin-top:5px; margin-left:5px;">개인별 인건비 조정</button> -->
<!--       <button id="pif_BtnSample" class="fr" style="height:32px; margin-top:6px; margin-left:5px; border: 1px solid #667ebc; padding:2px 4px;color:#ffffff; background-color:#667ebc;">?</button> -->
<!--       <button id="pif_BtnUpload" class="fr btn-frame btn-blue" style="margin-top:5px;">내부인건비&#47;간접비 업로드</button> -->
   </div>
</div>

<div class="f_clear"></div>
<script type="text/javascript" src="/resources/js/pce/pci/pif/pifTransaction.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pif/pifModel.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pif/pifViewHandler.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pif/pifApp.js?ver=202601191945"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pifApp = new PifApp();
   pifApp.initApp();
</script>

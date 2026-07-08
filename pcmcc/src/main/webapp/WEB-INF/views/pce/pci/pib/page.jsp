<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 인건비 확보 - 개인별인건비 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pib_code"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pib_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">개인별 인건비 목록</h2>
   <div id="pib_mainGrid"></div>
</div>

<div class="cf" style="margin-top:5px;">
   <button id="pib_BtnExcel" class="fr btn-frame btn-green" style="margin-top:5px;">엑셀저장</button>
   <button id="pib_BtnSample" class="fr" style="height:32px; margin-top:6px; margin-right:5px; border: 1px solid #667ebc; padding:2px 4px;color:#ffffff; background-color:#667ebc;">?</button>
   <button id="pib_BtnUpload" class="fr btn-frame btn-blue" style="margin-top:5px; margin-right: 5px;">인건비 업로드</button>
</div>

<script type="text/javascript" src="/resources/js/pce/pci/pib/pibTransaction.js?ver=202108311035"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pib/pibModel.js?ver=202108311035"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pib/pibViewHandler.js?ver=202108311035"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pib/pibApp.js?ver=202108311035"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pibApp = new PibApp();
   pibApp.initApp();
</script>

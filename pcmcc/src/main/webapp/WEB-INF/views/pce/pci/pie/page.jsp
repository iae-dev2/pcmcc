<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 인건비 확보 - 연간인건비확보율 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>연도</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pie_year"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pie_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">연간인건비확보율</h2>
   <div id="pie_mainGrid"></div>
</div>

<div class="cf" style="margin-top:5px;">
   <button id="pie_BtnExcel" class="fr btn-frame btn-green" style="margin-top:5px;">엑셀저장</button>
</div>

<script type="text/javascript" src="/resources/js/pce/pci/pie/pieTransaction.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pie/pieModel.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pie/pieViewHandler.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pie/pieApp.js?ver=202601191945"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pieApp = new PieApp();
   pieApp.initApp();
</script>

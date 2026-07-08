<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 인건비 확보 - 반기인건비확보율 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pid_code1"></div>
         </div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pid_code2"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pid_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">반기인건비확보율</h2>
   <div id="pid_mainGrid"></div>
</div>

<div class="cf" style="margin-top:5px;">
   <button id="pid_BtnExcel" class="fr btn-frame btn-green" style="margin-top:5px;">엑셀저장</button>
</div>

<script type="text/javascript" src="/resources/js/pce/pci/pid/pidTransaction.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pid/pidModel.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pid/pidViewHandler.js?ver=202601191945"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pid/pidApp.js?ver=202601191945"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pidApp = new PidApp();
   pidApp.initApp();
</script>

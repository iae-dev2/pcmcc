<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 인건비 확보 - 인건비확보율관리 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pic_code"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pic_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>

<div style="float:left; width:38%;">
   <div class="dv-table1">
      <h2 class="fl">직접비&#47;간접비 목록</h2>
      <div id="pic_grid1"></div>
   </div>
</div>

<div style="float:right; width:60%;">
   <div class="dv-table1">
      <h2 class="fl">참여율 목록</h2>
      <div id="pic_grid2"></div>
   </div>
</div>

<div class="box-list">
   <h2 class="fl">인건비 확보율 목록</h2>
      <div class="box-button cf" style="margin-top:27px;">
         <button id="pic_BtnCal" class="fr btn-frame btn-blue" style="margin-top:5px; margin-right: 5px;">인건비 확보율 계산</button>
      </div>
   <div id="pic_grid3"></div>
</div>

<div class="cf" style="margin-top:5px;">
   <button id="pic_BtnExcel" class="fr btn-frame btn-green" style="margin-top:5px;">엑셀저장</button>
   <button id="pic_BtnSecureSearch" class="fr btn-frame btn-blue" style="margin-top:5px; margin-right: 5px;">인건비 확보율 조회</button>
</div>

<div id="jqxLoader"></div>

<script type="text/javascript" src="/resources/js/pce/pci/pic/picTransaction.js?ver=202108311038"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pic/picModel.js?ver=202108311038"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pic/picViewHandler.js?ver=202108311038"></script>
<script type="text/javascript" src="/resources/js/pce/pci/pic/picApp.js?ver=202108311038"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var picApp = new PicApp();
   picApp.initApp();
</script>

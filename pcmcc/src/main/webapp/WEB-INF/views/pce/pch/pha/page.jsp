<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 기여율평가 - 과제별 기여율관리 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pha_searchCode"></div>
         </div>
         <div class="fl" style="margin-top:7px; padding-left:60px;">
            <strong>진행단계</strong>
         </div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pha_searchStep"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pha_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">과제코드 목록</h2>
   <div>
      <h2 class="fl">(<span id="pha_count">0</span>건)</h2>
   </div>
   <div class="box-line cf">
      <div class="box-bottom cf">
         <button id="pha_BtnExcel" class="fr btn-frame btn-green" style="margin-top:27px;">엑셀저장</button>
      </div>
   </div>
   <div id="pha_prjGrid"></div>
</div>

<div class="box-list">
   <h2 class="fl">과제별 기여율</h2>
   <input id="pha_StoredEstiCode" type="hidden">
   <input id="pha_StoredProjectCode" type="hidden">
   <div class="box-line cf">
      <div class="box-bottom cf">
         <button id="pha_BtnProjectExcel" class="fr btn-frame btn-green" style="margin-top:27px;">엑셀저장</button>
      </div>
   </div>
   <div id="pha_contGrid"></div>
</div>

<script type="text/javascript" src="/resources/js/pce/pch/pha/phaTransaction.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/pha/phaModel.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/pha/phaViewHandler.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/pha/phaApp.js?ver=202509291655"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var phaApp = new PhaApp();
   phaApp.initApp();
</script>

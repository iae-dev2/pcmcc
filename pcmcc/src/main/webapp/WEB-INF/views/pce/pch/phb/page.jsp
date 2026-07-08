<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 기여율평가 - 개인별 기여율관리 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left: 30px;">
            <div id="phb_code"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="phb_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">참여연구원 목록</h2>
   <div>
      <h2 class="fl">(<span id="phb_count">0</span>건)</h2>
   </div>
   <div class="box-line cf">
      <div class="box-bottom cf">
         <button id="phb_BtnExcel" class="fr btn-frame btn-green" style="margin-top:27px;">엑셀저장</button>
      </div>
   </div>
   <div id="phb_empGrid"></div>
</div>

<div class="box-list">
   <h2 class="fl">개인별 기여율</h2>
   <input id="phb_StoredEstiCode" type="hidden">
   <input id="phb_StoredEmplNo" type="hidden">
   <div id="phb_contGrid"></div>
</div>

<script type="text/javascript" src="/resources/js/pce/pch/phb/phbTransaction.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/phb/phbModel.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/phb/phbViewHandler.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/phb/phbApp.js?ver=202509291655"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var phbApp = new PhbApp();
   phbApp.initApp();
</script>

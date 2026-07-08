<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 기여율평가 - 과제별 인원관리 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="phc_code"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="phc_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">과제코드 목록</h2>
   <div>
      <h2 class="fl">(<span id="phc_count">0</span>건)</h2>
   </div>
   <div id="phc_prjGrid"></div>
</div>

<div class="box-list">
   <h2 class="fl">과제 참여연구원</h2>
   <input id="phc_StoredEstiCode" type="hidden">
   <input id="phc_StoredProjectCode" type="hidden">
   <div id="phc_empGrid"></div>
</div>

<script type="text/javascript" src="/resources/js/pce/pch/phc/phcTransaction.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/phc/phcModel.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/phc/phcViewHandler.js?ver=202509291655"></script>
<script type="text/javascript" src="/resources/js/pce/pch/phc/phcApp.js?ver=202509291655"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var phcApp = new PhcApp();
   phcApp.initApp();
</script>

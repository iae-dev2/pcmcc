<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 코드관리 - 평가코드관리 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가연도</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;"><div id="pga_year"></div></div>
      </div>
   </div>
   <div class="fr">
      <button id="pga_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">평가코드 목록</h2>
   <div id="pga_grid"></div>
</div>

<script type="text/javascript" src="/resources/js/pce/pcg/pga/pgaTransaction.js?ver=202105181150"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pga/pgaModel.js?ver=202105181150"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pga/pgaViewHandler.js?ver=202105181150"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pga/pgaApp.js?ver=202105181150"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pgaApp = new PgaApp();
   pgaApp.initApp();
</script>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 개인 기여도 - 인건비 확보율 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl">
            <strong>평가코드</strong>
         </div>
         <div class="fl" style="padding-left: 30px;">
            <div id="pbb_code"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pbb_BtnSearch" class="btn-frame btn-default" style="padding: 7px 25px;">조회</button>
   </div>
</div>

<div class="box-list">
   <h2 class="fl">인건비 확보율 목록</h2>
   <div id="pbb_grid3"></div>
</div>

<div id="jqxLoader"></div>

<script type="text/javascript" src="/resources/js/pcb/pbb/pbbTransaction.js?ver=202109101330"></script>
<script type="text/javascript" src="/resources/js/pcb/pbb/pbbModel.js?ver=202109101330"></script>
<script type="text/javascript" src="/resources/js/pcb/pbb/pbbViewHandler.js?ver=202109101330"></script>
<script type="text/javascript" src="/resources/js/pcb/pbb/pbbApp.js?ver=202109101330"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pbbApp = new PbbApp();
   pbbApp.initApp();
</script>

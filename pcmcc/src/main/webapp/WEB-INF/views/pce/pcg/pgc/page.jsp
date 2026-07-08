<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 코드관리 - 인원관리 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl">
            <strong>평가코드</strong>
         </div>
         <div class="fl" style="padding-left: 30px;">
            <div id="pgc_searchCode"></div>
         </div>
         <div class="fl" style="padding-left: 60px;">
            <strong>평<span style="margin-right:9px; margin-left:9px;">가</span>등<span style="margin-left:9px;">급</span></strong>
         </div>
         <div class="fl" style="padding-left: 30px;">
            <div id="pgc_searchGrade"></div>
         </div>
      </div>
      <div class="cf" style="margin-top:15px;">
         <div class="fl">
            <strong>센<span style="margin-right:6px; margin-left:6px;">터</span>명</strong>
         </div>
         <div class="fl" style="padding-left: 30px;">
            <div id="pgc_searchDept"></div>
         </div>
         <div class="fl" style="padding-left: 60px;">
            <strong>평가 대상여부</strong>
         </div>
         <div class="fl" style="padding-left: 30px;">
            <div id="pgc_searchYn"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pgc_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">인원정보 목록</h2>
   <div>
      <h2 class="fl">(<span id="pgc_count">0</span>건)</h2>
   </div>
   <div id="pgc_grid"></div>
</div>

<div class="cf" style="margin-top:5px;">
   <button id="pgc_BtnSample" class="fr" style="height:32px; margin-top:1px; border: 1px solid #667ebc; padding:2px 4px;color:#ffffff; background-color:#667ebc;">?</button>
   <button id="pgc_BtnUpload" class="fr btn-frame btn-green" style="margin-right: 4px;">인원정보 업로드</button>
   <button id="pgc_BtnCopy" class="fr btn-frame btn-red" style="margin-right: 10px;">데이터 복사</button>
   <input id="pgc_copy" type="text" class="fr" style="margin-right: 10px;" autocomplete="off">
</div>

<!-- s:업로드 알림 윈도우 -->
<div id="pgc_WinHelp">
   <div style="height:30px;padding-top:14px;">업로드 알림</div>
   <div style="margin-top:10px;">
      <div>
         <div style="font-size:16px; margin-top:10px;">1. 평가코드는 모두 동일해야 합니다.</div>
         <br/>
         <div style="font-size:16px;">2. 평가코드, 사번, 성명, 비밀번호, 평가대상 여부는 반드시 값이 있어야 합니다. </div>
         <br/>
         <div style="font-size:16px;">3. 모든 셀은 [셀 서식] - [텍스트]입니다. 특히 사번, 숫자로만 된 비밀번호는 </div>
         <div style="font-size:16px;">&nbsp;&nbsp;&nbsp;&nbsp;좌측 상단 녹색 삼각형인지 확인합니다.</div>
      </div>
      <div style="margin-top: 20px;text-align:center;">
         <input type="button" id="pgc_BtnOk" value="확인" style="cursor:pointer;" />
      </div>
   </div>
</div>
<!-- e:업로드 알림 윈도우 -->

<script type="text/javascript" src="/resources/js/pce/pcg/pgc/pgcTransaction.js?ver=202506261545"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pgc/pgcModel.js?ver=202506261545"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pgc/pgcViewHandler.js?ver=202506261545"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pgc/pgcApp.js?ver=202506261545"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pgcApp = new PgcApp();
   pgcApp.initApp();
</script>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 코드관리 - 과제코드관리 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left: 30px;">
            <div id="pgb_searchCode"></div>
         </div>
         <div class="fl" style="margin-top:7px; padding-left:60px;">
            <strong>진행단계</strong>
         </div>
         <div class="fl" style="margin-top:5px; padding-left:30px;">
            <div id="pgb_searchStep"></div>
         </div>
      </div>
   </div>
   <div class="fr">
      <button id="pgb_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">과제코드 목록</h2>
   <div>
      <h2 class="fl">(<span id="pgb_count">0</span>건)</h2>
   </div>
   <div id="pgb_grid"></div>
</div>

<div class="cf" style="margin-top:5px;">
   <button id="pgb_BtnSample" class="fr" style="height:32px; margin-top:1px; border: 1px solid #667ebc; padding:2px 4px;color:#ffffff; background-color:#667ebc;">?</button>
   <button id="pgb_BtnUpload" class="fr btn-frame btn-green" style="margin-right: 4px;">과제정보 업로드</button>
   <button id="pgb_BtnExcel" class="fr btn-frame btn-green" style="margin-right: 4px;">엑셀저장</button>
</div>

<!-- s:업로드 알림 윈도우 -->
<div id="pgb_WinHelp">
   <div style="height:30px;padding-top:14px;">업로드 알림</div>
   <div style="margin-top:10px;">
      <div>
         <div style="font-size:16px; margin-top:10px;">1. 평가코드는 모두 동일해야 합니다.</div>
         <br/>
         <div style="font-size:16px;">2. 평가코드, 과제코드, 과제명, 센터명, 부처명, 사업명, 진행 단계는 반드시 값이 </div>
         <div style="font-size:16px;">&nbsp;&nbsp;&nbsp;&nbsp;있어야 합니다.</div>
         <br/>
         <div style="font-size:16px;">3. 모든 셀은 [셀 서식] - [텍스트]입니다. 특히 사번, 진행단계는 좌측 상단 녹색 </div>
         <div style="font-size:16px;">&nbsp;&nbsp;&nbsp;&nbsp;삼각형인지 확인합니다.</div>
         <br/>
         <div style="font-size:16px;">4. 과제 PM명, 과제 평가자명은 사용자 편의를 위해 존재합니다. 공백이어도 </div>
         <div style="font-size:16px;">&nbsp;&nbsp;&nbsp;&nbsp;괜찮습니다.</div>
      </div>
      <div style="margin-top: 20px;text-align:center;">
         <input type="button" id="pgb_BtnOk" value="확인" style="cursor:pointer;" />
      </div>
   </div>
</div>
<!-- e:업로드 알림 윈도우 -->

<script type="text/javascript" src="/resources/js/pce/pcg/pgb/pgbTransaction.js?ver=202310060825"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pgb/pgbModel.js?ver=202310060825"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pgb/pgbViewHandler.js?ver=202310060825"></script>
<script type="text/javascript" src="/resources/js/pce/pcg/pgb/pgbApp.js?ver=202310060825"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pgbApp = new PgbApp();
   pgbApp.initApp();
</script>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<style type="text/css">
/* 금액 합계 부분 line 제거 2020-05-28 */
.jqx-grid-cell-pinned {
   border-left: none;
   border-right: none;
}

/* 로딩바가 윈도우 위에 나타나도록 수정   2022-04-08 */
.jqx-loader {
  z-index: 9999;
}
.jqx-loader-modal {
  z-index: 9998;
}
</style>
<!-- 기여도 확인 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;"><div id="pja_code"></div></div>
         <div class="fl" style="margin-top:7px; padding-left:30px;"><strong>센<span style="margin-right:6px; margin-left:6px;">터</span>명</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;"><div id="pja_searchDept"></div></div>
      </div>
   </div>
   <div class="fr">
      <button id="pja_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">과제 코드</h2>
   <div id="pja_prjGrid"></div>
</div>
<div class="box-detail">
   <h2 class="fl">과제 정보</h2>
   <table style="width: 1430px; border-collapse: collapse; table-layout: fixed">
      <colgroup>
         <col style="width:120px">
         <col style="width:130px">
         <col style="width:120px">
         <col style="width:130px">
         <col style="width:120px">
         <col style="width:130px">
         <col style="width:120px">
         <col style="width:130px">
      </colgroup>
      <tbody>
         <tr>
            <th>센터(본부명)</th>
            <td>
               <div>
                  <input id="pja_vDeptName">
               </div>
            </td>
            <th>PM</th>
            <td>
               <div>
                  <input id="pja_vProjectPm">
               </div>
            </td>
            <th>과제코드</th>
            <td>
               <div>
                  <input id="pja_vProjectCode">
               </div>
            </td>
            <th>부처명</th>
            <td>
               <div>
                  <input id="pja_vGovName">
               </div>
            </td>
         </tr>
         <tr>
            <th>과제명</th>
            <td colspan=3>
               <div>
                  <input id="pja_vProjectName">
               </div>
            </td>
            <th>사업명</th>
            <td colspan=3>
               <div>
                  <input id="pja_vProjectDivision">
               </div>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<div class="box-detail">
   <h2 class="fl">과제목표 &#38; Milestone</h2>
   <table style="width: 1430px; border-collapse: collapse; table-layout: fixed">
      <colgroup>
         <col style="width:715px">
         <col style="width:715px">
      </colgroup>
      <tbody>
         <tr>
            <th>과제목표</th>
            <th>평가 기간내 Milestone</th>
         </tr>
         <tr>
            <td style="padding-left:7px;"><textarea id="pja_vProjectGoal" readOnly></textarea></td>
            <td style="padding-left:7px;"><textarea id="pja_vProjectMilestone" readOnly></textarea></td>
         </tr>
      </tbody>
   </table>
</div>
<div style="float: left; width: 49%">
   <div class="box-detail">
      <h2 class="fl">참여연구원 기여율</h2>
      <div>
         <div id="pja_empGrid"></div>
      </div>
   </div>
   <div class="box-detail">
      <h2 class="fl">평가의견</h2>
      <input id="pja_StoredEstiCode" type="hidden">
      <input id="pja_StoredProjectCode" type="hidden">
      <table style="width: 703px; border-collapse: collapse; table-layout: fixed">
         <colgroup>
            <col style="width: 703px">
         </colgroup>
         <tbody>
            <tr>
               <td style="padding-left:7px;">
                  <div><textarea id="pja_vReviewContent" readOnly></textarea></div>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</div>

<div style="float: right; width: 49%; height: 814px;">
   <div id="pja_week_window" style="display: none; text-align: center;">
      <div style="height: 18px; background-color: #7d859a; font-weight: bold; color: #FFFFFF;">&nbsp;주간업무보고 실적</div>
      <div id="pja_week_table" style="width: 100%; display: inline-block;"></div>
   </div>
</div>
<div style="float: right; width: 49%;">
   <span id="pja_week_tip" style="left: 0; bottom: 0; color: #878787;">
      주간업무보고 실적 윈도우 모서리에 마우스를 드래그하여 창의 크기를 조절할 수 있습니다
   </span>
</div>

<div class="f_clear"></div>

<!-- 로딩바 -->
<div id="pja_jqxLoader"></div>

<script type="text/javascript" src="/resources/js/pcj/pja/pjaTransaction.js?ver=202507020855"></script>
<script type="text/javascript" src="/resources/js/pcj/pja/pjaModel.js?ver=202507020855"></script>
<script type="text/javascript" src="/resources/js/pcj/pja/pjaViewHandler.js?ver=202507020855"></script>
<script type="text/javascript" src="/resources/js/pcj/pja/pjaApp.js?ver=202507020855"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var _loginUserDept = "${loginUserDept}";
   var _vmenugrade = "${vmenugrade}";
   var pjaApp = new PjaApp();
   pjaApp.initApp();
</script>

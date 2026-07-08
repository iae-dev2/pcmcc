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
<!-- 기여도 평가 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;"><div id="pca_code"></div></div>
      </div>
   </div>
   <div class="fr">
      <button id="pca_BtnSearch" class="btn-frame btn-default">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">과제 코드</h2>
   <div id="pca_prjGrid"></div>
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
                  <input id="pca_vDeptName">
               </div>
            </td>
            <th>PM</th>
            <td>
               <div>
                  <input id="pca_vProjectPm">
               </div>
            </td>
            <th>과제코드</th>
            <td>
               <div>
                  <input id="pca_vProjectCode">
               </div>
            </td>
            <th>부처명</th>
            <td>
               <div>
                  <input id="pca_vGovName">
               </div>
            </td>
         </tr>
         <tr>
            <th>과제명</th>
            <td colspan=3>
               <div>
                  <input id="pca_vProjectName">
               </div>
            </td>
            <th>사업명</th>
            <td colspan=3>
               <div>
                  <input id="pca_vProjectDivision">
               </div>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<div class="box-detail">
   <h2 class="fl">과제목표 &#38; Milestone</h2>
   <div class="box-line cf">
      <div class="box-bottom cf">
         <button id="pca_BtnSave" class="fr btn-frame btn-blue" style="margin-top:27px;">과제목표 저장</button>
         <button id="pca_BtnLoad" class="fr btn-frame btn-red" style="margin-top:27px; margin-right: 5px;">전분기 과제목표 가져오기</button>
      </div>
   </div>
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
            <td style="padding-left: 7px;"><textarea id="pca_vProjectGoal"></textarea></td>
            <td style="padding-left: 7px;"><textarea id="pca_vProjectMilestone"></textarea></td>
         </tr>
      </tbody>
   </table>
</div>
<div style="float: left; width: 49%">
   <div class="box-detail">
      <h2 class="fl">참여연구원 기여율</h2>
      <div class="box-line cf">
         <div class="box-bottom cf">
            <button id="pca_BtnEmpDel" class="fr btn-frame btn-red" style="margin-top: 27px;">연구원 삭제</button>
            <button id="pca_BtnEmpAdd" class="fr btn-frame btn-blue" style="margin-top: 27px; margin-right: 5px;">연구원 추가</button>
         </div>
      </div>
      <div>
         <div id="pca_empGrid"></div>
      </div>
      <div class="box-line cf">
         <div class="box-bottom cf" >
            <button id="pca_BtnContFinish" class="fr btn-frame btn-blue" style="margin-top: 5px;">기여율입력 완료</button>
            <button id="pca_BtnContAdd" class="fr btn-frame btn-red" style="margin-top: 5px; margin-right: 5px;">기여율 임시저장</button>
         </div>
      </div>
   </div>

   <div class="box-detail">
      <h2 class="fl" style="margin-top: 5px;">평가의견</h2>
      <input id="pca_StoredEstiCode" type="hidden">
      <input id="pca_StoredProjectCode" type="hidden">
      <table style="width: 703px; border-collapse: collapse; table-layout: fixed">
         <colgroup>
            <col style="width:703px">
         </colgroup>
         <tbody>
            <tr>
               <td style="padding-left: 7px;">
                  <div><textarea id="pca_vReviewContent" readOnly></textarea></div>
               </td>
            </tr>
         </tbody>
      </table>
      <div class="box-line cf">
         <div class="box-bottom cf" >
            <button id="pca_BtnDone" class="fr btn-frame btn-blue" style="margin-top: 5px;">최종확인</button>
         </div>
      </div>
   </div>
</div>

<div style="float: right; width: 49%; height: 814px;">
   <div id="pca_week_window" style="display: none; text-align: center;">
      <div style="height: 18px; background-color: #7d859a; font-weight: bold; color: #FFFFFF;">&nbsp;주간업무보고 실적</div>
      <div id="pca_week_table" style="width: 100%; display: inline-block;"></div>
   </div>
</div>
<div style="float: right; width: 49%;">
   <span id="pca_week_tip" style="left: 0; bottom: 0; color: #878787;">
      주간업무보고 실적 윈도우 모서리에 마우스를 드래그하여 창의 크기를 조절할 수 있습니다
   </span>
</div>

<div class="f_clear"></div>

<!-- 연구원 추가 팝업 -->
<div id="pca_popup" style="display:none;">
   <div class="pop-header" style="height:30px;"></div>
   <div style="overflow:hidden !important">
      <div class="search-box cf">
         <div class="fl" style="padding-top: 5px;">
            <strong>부서명</strong>
         </div>
         <div class="fl" style="padding-left: 10px;">
            <div id="pca_pop_dept"></div>
         </div>
         <div class="fl" style="padding-top: 5px; padding-left: 30px;">
            <strong>이름</strong>
         </div>
         <div class="fl" style="padding-left: 10px;">
            <input id="pca_pop_name">
         </div>
         <div class="fr">
            <button id="pca_pop_search" class="btn-frame btn-default" style="padding: 7px 25px;">조회</button>
         </div>
      </div>
      <div>
         <h2>참여연구원</h2>
         <div id="pca_pop_grid" style="border: 1px solid #5d5d7;"></div>
      </div>
      <div style="margin: 15px 15px 15px 0px; float: right;">
         <input type="button" id="pca_pop_select" value="추가" style="margin-right: 10px" />
         <input type="button" id="pca_pop_close" value="닫기" />
      </div>
   </div>
</div>

<!-- 로딩바 -->
<div id="pca_jqxLoader"></div>

<script type="text/javascript" src="/resources/js/pcc/pca/pcaTransaction.js?ver=202601141550"></script>
<script type="text/javascript" src="/resources/js/pcc/pca/pcaModel.js?ver=202601141550"></script>
<script type="text/javascript" src="/resources/js/pcc/pca/pcaViewHandler.js?ver=202601141550"></script>
<script type="text/javascript" src="/resources/js/pcc/pca/pcaApp.js?ver=202601141550"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pcaApp = new PcaApp();
   pcaApp.initApp();
</script>

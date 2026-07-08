<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 개인 기여도 -->
<div class="search-box cf">
   <div class="fl">
      <div class="cf">
         <div class="fl" style="margin-top:7px;"><strong>평가코드</strong></div>
         <div class="fl" style="margin-top:5px; padding-left:30px;"><div id="pba_code"></div></div>
      </div>
   </div>
   <div class="fr">
      <button id="pba_BtnSearch" class="btn-frame btn-default" style="padding: 7px 25px;">조회</button>
   </div>
</div>
<div class="box-list">
   <h2 class="fl">과제 코드</h2>
   <div class="box-line cf">
      <div class="box-bottom cf">
         <button id="pba_BtnDel" class="fr btn-frame btn-red" style="margin-top:27px; margin-right: 5px;">과제삭제</button>
         <button id="pba_BtnNew" class="fr btn-frame btn-blue" style="margin-top:27px; margin-right: 5px;">과제추가</button>
         <input type="hidden" id="pba_insertEstiCode">
         <input type="hidden" id="pba_insertPrjCode">
      </div>
   </div>
   <div id="pba_prjGrid"></div>
</div>
<div class="box-detail">
   <h2 class="fl">과제 정보</h2>
   <table style="width: 100%; border-collapse: collapse; table-layout: fixed">
      <colgroup>
         <col style="width:100px">
         <col style="width:130px">
         <col style="width:100px">
         <col style="width:130px">
         <col style="width:100px">
         <col style="width:130px">
         <col style="width:100px">
         <col style="width:130px">
      </colgroup>
      <tbody>
         <tr>
            <th>센터(본부명)</th>
            <td>
               <div>
                  <input id="pba_vDeptName">
               </div>
            </td>
            <th>PM</th>
            <td>
               <div>
                  <input id="pba_vProjectPm">
               </div>
            </td>
            <th>과제코드</th>
            <td>
               <div>
                  <input id="pba_vProjectCode">
               </div>
            </td>
            <th>부처명</th>
            <td>
               <div>
                  <input id="pba_vGovName">
               </div>
            </td>
         </tr>
         <tr>
            <th>과제명</th>
            <td colspan=3>
               <div>
                  <input id="pba_vProjectName">
               </div>
            </td>
            <th>사업명</th>
            <td colspan=3>
               <div>
                  <input id="pba_vProjectDivision">
               </div>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<div class="box-list">
   <h2 class="fl">PM 평가의견</h2>
   <div class="box-line cf">
      <div class="box-bottom cf">
         <button id="pba_BtnOk" class="fr btn-frame btn-blue" style="margin-top:27px; margin-right: 5px;">확 인</button>
      </div>
   </div>
   <div id="pba_evalGrid"></div>
</div>

<!-- s:참여 연구원 추가 윈도우 -->
<div id="pba_window">
   <div style="height:30px;padding-top:14px;">과제조회</div>
   <div>
      <div class="box-list">
         <h2 class="fl">참여 과제</h2>
         <div id="pba_win_grid"></div>
      </div>
      <div style="margin-top: 20px;text-align:right;">
         <input type="button" id="pba_win_select" value="선택" />
         <input type="button" id="pba_win_close" value="닫기" />
      </div>
   </div>
</div>
<!-- e:참여 연구원 추가 윈도우 -->

<script type="text/javascript" src="/resources/js/pcb/pba/pbaTransaction.js?ver=202108311011"></script>
<script type="text/javascript" src="/resources/js/pcb/pba/pbaModel.js?ver=202108311011"></script>
<script type="text/javascript" src="/resources/js/pcb/pba/pbaViewHandler.js?ver=202108311011"></script>
<script type="text/javascript" src="/resources/js/pcb/pba/pbaApp.js?ver=202108311011"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var pbaApp = new PbaApp();
   pbaApp.initApp();
</script>

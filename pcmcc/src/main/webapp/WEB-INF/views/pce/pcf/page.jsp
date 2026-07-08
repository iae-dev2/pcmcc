<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 게시판관리 -->
<div class="box-list">
   <div id="pcf_bbsGrid"></div>
</div>

<div class="box-list">
   <div class="box-line cf">
      <div id="pcf_BtnArea" class="box-bottokm cf">
         <button id="pcf_BtnSave" class="fr btn-frame btn-default" style="margin-top:5px;">저장</button>
         <button id="pcf_BtnDel" class="fr btn-frame btn-red" style="margin-top:5px; margin-right: 5px;">삭제</button>
         <button id="pcf_BtnNew" class="fr btn-frame btn-blue" style="margin-top:5px; margin-right: 5px;">신규</button>
      </div>
   </div>
</div>

<div class="box-detail">
   <table id="pcf_table" style="width: 1250px; border-collapse: collapse; table-layout: fixed">
      <colgroup>
         <col style="width:120px">
         <col style="width:930px">
      </colgroup>
      <tbody>
         <tr>
            <th>작성자</th>
            <td>
               <input id="pcf_editFlag" type="hidden" />
               <input id="pcf_nSeqNo" type="hidden" />
               <input id="pcf_emplno" type="hidden" />
               <input id="pcf_name" />
            </td>
         </tr>
         <tr>
            <th>제목</th>
            <td>
               <input id="pcf_subject" />
            </td>
         </tr>
         <tr>
            <th>내용</th>
            <td>
               <textarea id="pcf_content"></textarea>
            </td>
         </tr>
         <tr>
            <th>첨부파일</th>
            <td>
               <div id="pcf_fileGrid"></div>
            </td>
         </tr>
      </tbody>
   </table>
</div>

<!-- 로딩바 -->
<div id="pcf_jqxLoader"></div>

<script type="text/javascript" src="/resources/js/pce/pcf/pcfTransaction.js?ver=202512311056"></script>
<script type="text/javascript" src="/resources/js/pce/pcf/pcfModel.js?ver=202512311056"></script>
<script type="text/javascript" src="/resources/js/pce/pcf/pcfViewHandler.js?ver=202512311056"></script>
<script type="text/javascript" src="/resources/js/pce/pcf/pcfApp.js?ver=202512311056"></script>
<script>
   'use strict';
   var _loginUser = "${loginUser}";
   var _loginName = "${loginName}";
   var _mode = "${mode}";

   if (_mode != 'pce') {
      $("#pcf_table").css('width', '1431');
      $("#pcf_BtnArea").hide();
   }

   var pcfApp = new PcfApp();
   pcfApp.initApp();
</script>

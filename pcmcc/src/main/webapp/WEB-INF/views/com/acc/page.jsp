<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!-- 계정과목 조회 : bnk -->
<div id="accGrid" style="border: 1px solid #d5d5d7;"></div>
<div style="margin: 15px 15px 15px 0px; float: right;">
   <input type="button" id="ok" value="선택" style="margin-right:10px; cursor:pointer;" />
   <input type="button" id="cancel" value="취소" style="cursor:pointer;" />
</div>
<script type="text/javascript" src="/resources/js/com/acc/handler.js?ver=202105171646"></script>
<script>
   var accountBalance = "${accountBalance}";
   var vAccountCode = "${vAccountCode}";
   var vAccountName = "${vAccountName}";
   /* var offSet = "${offSet}"; */
</script>

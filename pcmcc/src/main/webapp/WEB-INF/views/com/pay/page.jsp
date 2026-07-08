<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!-- 급여코드 조회 : pay -->
<div id="payGrid" style="border: 1px solid #d5d5d7;"></div>
<div style="margin: 15px 15px 15px 0px; float: right;">
   <input type="button" id="ok" value="선택" style="margin-right:10px; cursor:pointer;" />
   <input type="button" id="cancel" value="취소" style="cursor:pointer;" />
</div>
<script type="text/javascript" src="/resources/js/com/pay/handler.js?ver=202105171653"></script>
<script>
   <!-- 
   var accountBalance = "${accountBalance}";
   var vAccountCode = "${vAccountCode}";
   var vAccountName = "${vAccountName}";
   -->
   var vYear = "${vYear}";
</script>

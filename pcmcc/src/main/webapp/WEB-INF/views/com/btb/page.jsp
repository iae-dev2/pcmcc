<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!-- 예산코드 목록 조회 : btb -->

<div id="btbGrid" style="border: 1px solid #d5d5d7;"></div>
<div style="margin: 15px 15px 15px 0px; float: right;">
   <input type="button" id="ok" value="선택" style="margin-right:10px; cursor:pointer;" />
   <input type="button" id="cancel" value="취소" style="cursor:pointer;" />
</div>
<script type="text/javascript" src="/resources/js/com/btb/handler.js?ver=202105171647"></script>
<script>
   var vProjectCode = "${vProjectCode}";
   var vBudgetCode = "${vBudgetCode}";
   var vBudgetName = "${vBudgetName}";
</script>

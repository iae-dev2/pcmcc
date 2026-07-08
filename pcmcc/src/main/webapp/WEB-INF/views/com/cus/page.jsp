<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- 거래처 조회 : cus -->
<div id="cusGrid" style="border: 1px solid #d5d5d7;"></div>
<div style="margin-top: 15px; float: right;">
   <input type="button" id="ok" value="선택" style="margin-right:10px; cursor:pointer;" />
   <input type="button" id="cancel" value="취소" style="cursor:pointer;" />
</div>
<script type="text/javascript" src="/resources/js/com/cus/handler.js?ver=202105171649"></script>
<script>
   var vCusResidentNo = "${vCusResidentNo}";
   var vCusName = "${vCusName}";
   var vCusTel = "${vCusTel}";
</script>

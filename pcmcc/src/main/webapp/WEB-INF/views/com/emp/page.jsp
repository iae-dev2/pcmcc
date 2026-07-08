<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!-- 사원 목록 조회 : emp -->
<!-- TODO : 화면 사이즈 조정 필요 -->
<div id="empGrid" style="border: 1px solid #d5d5d7;"></div>
<div style="margin: 15px 15px 15px 0px; float: right;">
   <input type="button" id="ok" value="선택" style="margin-right:10px; cursor:pointer;" />
   <input type="button" id="cancel" value="취소" style="cursor:pointer;" />
</div>
<script type="text/javascript" src="/resources/js/com/emp/handler.js?ver=202105171649"></script>
<script>
   var vName = "${vName}";
   var vEmplNo = "${vEmplNo}";
   var vRetire = "${vRetire}";
</script>

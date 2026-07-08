<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!-- 예산 코드 조회: bud -->
<div style="height: 305px; overflow: hidden; float: left; border: solid 1px #d6d6d6;">
   <div id="masterGrid"></div>
</div>
<div style="height: 305px; overflow-y: hidden; float: right; border: solid 1px #d6d6d6;">
   <div id="detailGrid"></div>
</div>
<div style="margin: 15px 15px 15px 0px; float: right;">
   <input type="button" id="ok" value="선택" style="margin-right:10px; cursor:pointer;" />
   <input type="button" id="cancel" value="취소" style="cursor:pointer;" />
</div>
<script type="text/javascript" src="/resources/js/com/bud/handler.js?ver=202105171648"></script>

<script>
   var vProjectCode = "${vProjectCode}";
</script>

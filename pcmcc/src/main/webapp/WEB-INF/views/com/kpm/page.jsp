<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!-- 총괄 과제 목록 조회 : kpm : 2단그리드 -->
<style>
<!--
div#prjGrid div.jqx-grid-content>div>div:last-child .jqx-grid-cell {
   height: 48px !important;
}

div#prjGrid div.jqx-grid-content>div>div:last-child {
   height: 49px !important;
}
-->
</style>
<div style="height: 300px; border: solid 1px #d6d6d6;">
   <div id="prjGrid"></div>
</div>
<div style="margin: 15px 15px 15px 0px; float: right;">
   <input type="button" id="ok" value="선택" style="margin-right:10px; cursor:pointer;" />
   <input type="button" id="cancel" value="취소" style="cursor:pointer;" />
</div>
<script type="text/javascript" src="/resources/js/com/kpm/handler.js?ver=202105171651"></script>

<script>
   var vProjectCode = "${vProjectCode}";
   var vKeyProjectName = "${vKeyProjectName}";
</script>

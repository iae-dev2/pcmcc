<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!-- 사진 업로더 업로드 취소 버튼 숨기기 -->
<style type="text/css">
#jqxFileUploadUploadButton, #jqxFileUploadCancelButton {
   display: none;
}
</style>
<!-- 사진 업로더 : pho -->
<div id="photoUpload" style="-webkit-transition: none !impoertant; -moz-transition: none !impoertant; -o-transition: none !impoertant; transition: none !impoertant;"></div>
<div style="margin: 15px 15px 15px 0px; position:absolute; bottom:0; right:0;">
   <input type="button" id="ok" value="확인" style="margin-right:10px; cursor:pointer;" />
   <input type="button" id="cancel" value="취소" style="cursor:pointer;" />
</div>
<script type="text/javascript" src="/resources/js/com/pho/handler.js?ver=202105171654"></script>
<script>
   var vEmplNo = "${vEmplNo}";
   var uploadUrl = "/photoUpload/"+ vEmplNo;
   var multipleFiles = false;
</script>

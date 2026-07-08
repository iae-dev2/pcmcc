var PhaModel = function() {

   var setPha = function(row) {

      if (row != "" && row != undefined) {
         if (row.vEstiCode) { $("#pha_StoredEstiCode").val(row.vEstiCode); }   //평가의견 저장을 위한 hidden ESTICODE
         else { $("#pha_StoredEstiCode").val(""); }

         if (row.vProjectCode) { $("#pha_StoredProjectCode").val(row.vProjectCode); }   //평가의견 저장을 위한 hidden PROJECTCODE
         else { $("#pha_StoredProjectCode").val(""); }
      }
      else {
         $("#pha_StoredEstiCode").val("");
         $("#pha_StoredProjectCode").val("");
      }
   }

   var chkWorkVali = function() {
      var content_result = true;
      var cont_rows = $("#pha_contGrid").jqxGrid('getrows');
      for (var i=0; i<cont_rows.length; i++) {
         if (cont_rows[i].vWork != null && cont_rows[i].vWork != '') {
            if (cont_rows[i].vWork.length > 1000) {
               alert("과제별 기여율의 업무 항목은 1000글자를 넘을 수 없습니다\n입력 글자수 : " + cont_rows[i].vWork.length);
               content_result = false;
               break;
            }
         }
         if (cont_rows[i].vContent != null && cont_rows[i].vContent != '') {
            if (cont_rows[i].vContent.length > 1000) {
               alert("과제별 기여율의 평가의견 항목은 1000글자를 넘을 수 없습니다\n입력 글자수 : " + cont_rows[i].vContent.length);
               content_result = false;
               break;
            }
         }
      }
      return content_result;
   }

   return {
      setPha: setPha,
      chkWorkVali: chkWorkVali
   }

}

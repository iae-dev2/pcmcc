var PhbModel = function() {

   var setPhb = function(row) {

      if (row != "" && row != undefined) {
         if (row.vEstiCode) { $("#phb_StoredEstiCode").val(row.vEstiCode); }
         else { $("#phb_StoredEstiCode").val(""); }

         if (row.vEmplNo) { $("#phb_StoredEmplNo").val(row.vEmplNo); }
         else { $("#phb_StoredEmplNo").val(""); }
      }
      else {
         $("#phb_StoredEstiCode").val("");
         $("#phb_StoredEmplNo").val("");
      }
   }

   var chkPhbWorkVali = function() {
      var content_result = true;
      var cont_rows = $("#phb_contGrid").jqxGrid('getrows');
      for (var i=0; i<cont_rows.length; i++) {
         if (cont_rows[i].vWork != null && cont_rows[i].vWork != '') {
            if (cont_rows[i].vWork.length > 1000) {
               alert("개인별 기여율의 업무 항목은 1000글자를 넘을 수 없습니다\n입력 글자수 : " + cont_rows[i].vWork.length);
               content_result = false;
               break;
            }
         }
         if (cont_rows[i].vContent != null && cont_rows[i].vContent != '') {
            if (cont_rows[i].vContent.length > 1000) {
               alert("개인별 기여율의 평가의견 항목은 1000글자를 넘을 수 없습니다\n입력 글자수 : " + cont_rows[i].vContent.length);
               content_result = false;
               break;
            }
         }
      }
      return content_result;
   }

   return {
      setPhb: setPhb,
      chkPhbWorkVali: chkPhbWorkVali
   }

};

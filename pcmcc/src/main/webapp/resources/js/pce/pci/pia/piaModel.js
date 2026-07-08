var PiaModel = function() {

   var setPia = function(row) {

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

   return {
      setPia: setPia
   }

}

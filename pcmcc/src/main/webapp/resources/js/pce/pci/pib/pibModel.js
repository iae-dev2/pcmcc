var PibModel = function() {

   var setPib = function(row) {

      if (row != "" && row != undefined) {
         if (row.vEstiCode) { $("#pib_StoredEstiCode").val(row.vEstiCode); }   //평가의견 저장을 위한 hidden ESTICODE
         else { $("#pib_StoredEstiCode").val(""); }
      }
      else {
         $("#pib_StoredEstiCode").val("");
      }
   }

   return {
      setPib: setPib
   }

}

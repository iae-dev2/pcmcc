var PhcModel = function() {

   var setPhc = function(row) {

      if (row != "" && row != undefined) {
         if (row.vEstiCode) { $("#phc_StoredEstiCode").val(row.vEstiCode); }
         else { $("#phc_StoredEstiCode").val(""); }

         if (row.vProjectCode) { $("#phc_StoredProjectCode").val(row.vProjectCode); }
         else { $("#phc_StoredProjectCode").val(""); }
      }
      else {
         $("#phc_StoredEstiCode").val("");
         $("#phc_StoredProjectCode").val("");
      }
   }

   return {
      setPhc: setPhc
   }

};

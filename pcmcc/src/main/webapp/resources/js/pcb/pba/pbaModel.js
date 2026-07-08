var PbaModel = function() {

   var getPrjCode = function() {
      var _formdata = {
         "vEstiCode": $("#pba_insertEstiCode").val(),
         "vProjectCode": $("#pba_insertPrjCode").val(),
         "vEmplNo": _loginUser
      }

      return _formdata;
   };

   var getDelPrjCode = function() {
      var rowidx = $("#pba_prjGrid").jqxGrid("getselectedrowindex");
      var row = $("#pba_prjGrid").jqxGrid("getrowdata", rowidx);
      var _formdata = {
         "vEstiCode": row.vEstiCode,
         "vProjectCode": row.vProjectCode,
         "vEmplNo": row.vEmplNo
      }

      return _formdata;
   };

   var setPrjInfo = function(row) {
      if (row != "" && row != undefined) {
         //센터명
         $("#pba_vDeptName").jqxInput("val", row.vDeptName);

         //PM명
         $("#pba_vProjectPm").jqxInput("val", row.vProjectPmName);

         //과제코드
         $("#pba_vProjectCode").jqxInput("val", row.vProjectCode);

         //부처명
         if (row.vGovName != null) {
            $("#pba_vGovName").jqxInput("val", row.vGovName);
         }
         else {
            $("#pba_vGovName").jqxInput("val", "");
         }

         //과제명
         $("#pba_vProjectName").jqxInput("val", row.vProjectName);

         //사업명
         if (row.vProjectDivision != null) {
            $("#pba_vProjectDivision").jqxInput("val", row.vProjectDivision);
         }
         else {
            $("#pba_vProjectDivision").jqxInput("val", "");
         }
      }
      else {
         $("#pba_vDeptName").jqxInput("val", "");
         $("#pba_vProjectPm").jqxInput("val", "");
         $("#pba_vProjectCode").jqxInput("val", "");
         $("#pba_vGovName").jqxInput("val", "");
         $("#pba_vProjectName").jqxInput("val", "");
         $("#pba_vProjectDivision").jqxInput("val", "");
      }
   }

   var getWork = function() {
      var wrowidx = $("#pba_prjGrid").jqxGrid("getselectedrowindex");
      var wrow = $("#pba_prjGrid").jqxGrid("getrowdata", wrowidx);
      var _formdata = {
         "vEstiCode": wrow.vEstiCode,
         "vProjectCode": wrow.vProjectCode,
         "vEmplNo": wrow.vEmplNo
      }

      return _formdata;
   };

   return {
      getPrjCode: getPrjCode,
      getDelPrjCode: getDelPrjCode,
      setPrjInfo: setPrjInfo,
      getWork: getWork
   }

}

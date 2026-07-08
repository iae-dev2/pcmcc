var PhbApp = function() {

   var transaction = new PhbTransaction();
   var model = new PhbModel();
   var view = new PhbViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupEmpGrid();
      view.setupContGrid();
      view.setupActionButton();
   };

   var regEventHandler = function() {
      //조회
      $("#phb_BtnSearch").on('click', function() {
         $("#phb_empGrid").jqxGrid('clearselection');
         $("#phb_empGrid").jqxGrid({ source: transaction.getEmplNoList() });

         $("#phb_count").text($("#phb_empGrid").jqxGrid("getrows").length);
         $("#phb_contGrid").jqxGrid('clearselection');
         $("#phb_contGrid").jqxGrid('clear');

         model.setPhb();
      });

      //참여연구원 목록 그리드 select
      $("#phb_empGrid").on("rowselect", function(event) {
         var args = event.args;
         var rowBoundIndex = args.rowindex;
         var rowData = args.row;

         model.setPhb(rowData);

         $("#phb_contGrid").jqxGrid({ source: transaction.getEmplNoContributeList(rowData.vEstiCode, rowData.vEmplNo) });
      });

      //엑셀저장
      $("#phb_BtnExcel").on('click', function() {
         var vEsti = $("#phb_code").val();
         location.href = "/pch/phb/exportExcel?vEstiCode=" + vEsti;
      });

   };

   return {
      initApp: initApp
   }

};

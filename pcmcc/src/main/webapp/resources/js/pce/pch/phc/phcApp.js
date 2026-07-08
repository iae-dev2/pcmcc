var PhcApp = function() {

   var transaction = new PhcTransaction();
   var model = new PhcModel();
   var view = new PhcViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupPrjGrid();
      view.setupEmpGrid();
   };

   var regEventHandler = function() {
      //조회
      $("#phc_BtnSearch").on('click', function() {
         $("#phc_prjGrid").jqxGrid('clearselection');
         $("#phc_prjGrid").jqxGrid({ source: transaction.getPhcProjectCodeList() });

         $("#phc_count").text($("#phc_prjGrid").jqxGrid("getrows").length);
         $("#phc_empGrid").jqxGrid('clearselection');
         $("#phc_empGrid").jqxGrid('clear');

         model.setPhc();
      });

      //과제코드 목록 그리드 select
      $("#phc_prjGrid").on("rowselect", function(event) {
         var args = event.args;
         var rowBoundIndex = args.rowindex;
         var rowData = args.row;

         model.setPhc(rowData);

         $("#phc_empGrid").jqxGrid({ source: transaction.getPhcEmpList(rowData.vEstiCode, rowData.vProjectCode) });
      });

   };

   return {
      initApp: initApp
   }

};

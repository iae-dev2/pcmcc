var PieApp = function() {

   var transaction = new PieTransaction();
   var model = new PieModel();
   var view = new PieViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupMainGrid();
      view.setupActionButton();

   };

   var regEventHandler = function() {
      // 조회
      $("#pie_BtnSearch").on('click', function() {
         $("#pie_mainGrid").jqxGrid('clearselection');
         $("#pie_mainGrid").jqxGrid({ source: transaction.getPieList() });
      });

      // 엑셀저장
      $("#pie_BtnExcel").on('click', function() {
         jqxGridExport.typeExcel("#pie_mainGrid", $("#pie_year").val() + "_연간인건비확보율");
      });
   };

   return {
      initApp: initApp
   }

};

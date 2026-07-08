var PidApp = function() {

   var transaction = new PidTransaction();
   var model = new PidModel();
   var view = new PidViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupMainGrid();
      view.setupActionButton();

   };

   var regEventHandler = function() {
      // 조회
      $("#pid_BtnSearch").on('click', function() {
         $("#pid_mainGrid").jqxGrid('clearselection');
         $("#pid_mainGrid").jqxGrid({ source: transaction.getPidList() });
      });

      // 엑셀저장
      $("#pid_BtnExcel").on('click', function() {
         jqxGridExport.typeExcel("#pid_mainGrid", $("#pid_code1").val() + "~" + $("#pid_code2").val() + "_반기인건비확보율");
      });
   };

   return {
      initApp: initApp
   }

};

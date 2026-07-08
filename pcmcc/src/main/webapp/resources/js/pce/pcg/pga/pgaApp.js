var PgaApp = function() {

   var transaction = new PgaTransaction();
   var model = new PgaModel();
   var view = new PgaViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupPgaGrid();

   };

   var regEventHandler = function() {
      //조회
      $("#pga_BtnSearch").on('click', function() {
         $("#pga_grid").jqxGrid({ source: transaction.getEstiCodeList() });
      });
   };

   return {
      initApp: initApp
   }

};

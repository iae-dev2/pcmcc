var PbbApp = function() {

   var transaction = new PbbTransaction();
   var model = new PbbModel();
   var view = new PbbViewHandler(model, transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupMainGrid3();
   };

   var regEventHandler = function() {
      //조회
      $("#pbb_BtnSearch").on('click', function() {
         var param = {
            "vEstiCode": $("#pbb_code").jqxComboBox('val'),
            "vEmplNo": _loginUser
         }

         $("#pbb_grid3").jqxGrid('clearselection');
         $("#pbb_grid3").jqxGrid({ source: transaction.getPbbGrid3List(param) });
      });
   };

   //인건비 확보율 조회
   $("#pbb_BtnSecureSearch").on('click', function() {
      var param = {
         "vEstiCode": $("#pbb_code").jqxComboBox('val')
      }

      $("#pbb_grid3").jqxGrid('clearselection');
      $("#pbb_grid3").jqxGrid({ source: transaction.getPbbGrid3List(param) });
   });

   return {
      initApp: initApp
   }

};

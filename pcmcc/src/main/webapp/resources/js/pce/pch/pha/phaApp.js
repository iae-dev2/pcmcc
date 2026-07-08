var PhaApp = function() {

   var transaction = new PhaTransaction();
   var model = new PhaModel();
   var view = new PhaViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupPrjGrid();
      view.setupContGrid();
      view.setupActionButton();

   };

   var regEventHandler = function() {
      //조회
      $("#pha_BtnSearch").on('click', function() {
         $("#pha_prjGrid").jqxGrid('clearselection');
         $("#pha_prjGrid").jqxGrid({ source: transaction.getProjectCodeList() });

         $("#pha_count").text($("#pha_prjGrid").jqxGrid("getrows").length);
         $("#pha_contGrid").jqxGrid('clearselection');
         $("#pha_contGrid").jqxGrid('clear');

         model.setPha();
      });

      //과제코드 목록 그리드 select
      $("#pha_prjGrid").on("rowselect", function(event) {
         var args = event.args;
         var rowBoundIndex = args.rowindex;
         var rowData = args.row;
         model.setPha(rowData);

         $("#pha_contGrid").jqxGrid({ source: transaction.getProjectContributeList(rowData.vEstiCode, rowData.vProjectCode) });
      });
   };

   //과제 기여율합 엑셀저장
   $("#pha_BtnExcel").on('click', function() {
      //jqxGridExport.typeExcel("#pha_prjGrid", "과제코드 목록");
      var vEsti = $("#pha_searchCode").val();
      location.href = "/pch/pha/exportExcel?vEstiCode=" + vEsti;
   });

   //과제별 기여율 엑셀저장
   $("#pha_BtnProjectExcel").on('click', function() {
      var vEsti = $("#pha_searchCode").val();
      location.href = "/pch/pha/exportProjectExcel?vEstiCode=" + vEsti;
   });

   return {
      initApp: initApp
   }

};

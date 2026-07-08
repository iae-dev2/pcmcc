var PibApp = function() {

   var transaction = new PibTransaction();
   var model = new PibModel();
   var view = new PibViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupMainGrid();
      view.setupActionButton();

   };

   var regEventHandler = function() {
      //조회
      $("#pib_BtnSearch").on('click', function() {
         $("#pib_mainGrid").jqxGrid('clearselection');
         $("#pib_mainGrid").jqxGrid({ source: transaction.getPibList() });
      });

      //인건비 업로드
      $("#pib_BtnUpload").on('click', function() {
         var param = {
            "biztype": "/pci/pib"
         };
         commonDialog.open('xls', param, function() {
            var _data = commonDialog.returnData;
            if (_data < 0) {
               alert("오류가 발생하여 업로드에 실패하였습니다 !");
            }
            else {
               alert("업로드가 완료되었습니다.");
               $("#pib_mainGrid").jqxGrid({ disabled: false });
               $("#pib_mainGrid").jqxGrid({ source: transaction.getPibList() });
            }
         });
      });

      //인건비 업로드 샘플 다운로드
      $("#pib_BtnSample").on("click", function() {
         var pib_href = "/fileDownload?vFileType=pib";
         location.href = pib_href;
      });

      //엑셀저장
      $("#pib_BtnExcel").on('click', function() {
         var vEsti = $("#pib_code").val();
         jqxGridExport.typeExcel("#pib_mainGrid", vEsti + "_개인별_인건비관리");
      });
   };

   return {
      initApp: initApp
   }

};

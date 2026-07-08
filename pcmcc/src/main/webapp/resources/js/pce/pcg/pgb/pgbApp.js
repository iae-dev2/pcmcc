var PgbApp = function() {

   var transaction = new PgbTransaction();
   var model = new PgbModel();
   var view = new PgbViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupPgbGrid();
      view.setupActionButton();

      view.setupPgbHelp();   //업로드 알림 도우미
   };

   var regEventHandler = function() {
      //조회
      $("#pgb_BtnSearch").on('click', function() {
         $("#pgb_grid").jqxGrid({ disabled: false });
         $("#pgb_grid").jqxGrid({ source: transaction.getProjectCodeList() });
         
         $("#pgb_count").text($("#pgb_grid").jqxGrid("getrows").length);
      });

      //엑셀저장
      $("#pgb_BtnExcel").on('click', function() {
//         jqxGridExport.typeExcel("#pgb_grid", "과제코드목록");
         var pgb_esticode = $("#pgb_searchCode").val();
         var pgb_estistep = $("#pgb_searchStep").val();
         location.href = "/pcg/pgb/exportExcel?vEstiCode=" + pgb_esticode + "&vEstiStep=" + pgb_estistep;
      });

      //과제정보 업로드
      $("#pgb_BtnUpload").on('click', function() {
         var param = {
            "biztype": "/pcg/pgb"
         };
         commonDialog.open('xls', param, function() {
            var _data = commonDialog.returnData;
            if (_data < 0) {
               alert("오류가 발생하여 업로드에 실패하였습니다 !");
            }
            else {
               alert("업로드가 완료되었습니다.");
               $("#pgb_grid").jqxGrid({ disabled: false });
               $("#pgb_grid").jqxGrid({ source: transaction.getProjectCodeList() });
            }
         });
      });

      //과제정보 업로드 샘플 다운로드
      $("#pgb_BtnSample").on("click", function() {
         $("#pgb_WinHelp").jqxWindow('open');   //업로드 알림 도우미
         var pgb_href = "/fileDownload?vFileType=pgb";
         location.href = pgb_href;
      });
   };

   return {
      initApp: initApp
   }

};

var PgcApp = function() {

   var transaction = new PgcTransaction();
   var model = new PgcModel();
   var view = new PgcViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupPgcGrid();
      view.setupActionButton();

      view.setupPgcHelp();   //업로드 알림 도우미
   };

   var regEventHandler = function() {
      //조회
      $("#pgc_BtnSearch").on('click', function() {
         $("#pgc_grid").jqxGrid({ disabled: false });
         $("#pgc_copy").jqxInput({ disabled: false });
         $("#pgc_BtnCopy").jqxButton({ disabled: false });
         $("#pgc_grid").jqxGrid({ source: transaction.getEmplNoList() });
         
         $("#pgc_count").text($("#pgc_grid").jqxGrid("getrows").length);
      });

      //데이터 복사
      $("#pgc_BtnCopy").on('click', function() {
         var copyVali = model.getCopyVali();
         if (copyVali) {
            var param = {
               "searchEstiCode": $("#pgc_searchCode").val(),
               "copyEstiCode": $("#pgc_copy").val()
            };
            transaction.copyPgc(param).done(function(resultdata) {
               alert(resultdata + "건이 복사되었습니다.");
            }).fail(function() {
               alert("데이터복사에 실패하였습니다.");
            });
         }
      });

      //인원정보 업로드
      $("#pgc_BtnUpload").on('click', function() {
         var param = {
            "biztype": "/pcg/pgc"
         };
         commonDialog.open('xls', param, function() {
            var _data = commonDialog.returnData;
            if (_data < 0) {
               alert("오류가 발생하여 업로드에 실패하였습니다 !");
            }
            else {
               alert("업로드가 완료되었습니다.");

               $("#pgc_grid").jqxGrid({ disabled: false });
               $("#pgc_copy").jqxInput({ disabled: false });
               $("#pgc_BtnCopy").jqxButton({ disabled: false });
               $("#pgc_grid").jqxGrid({ source: transaction.getEmplNoList() });
            }
         });
      });

      //과제정보 업로드 샘플 다운로드
      $("#pgc_BtnSample").on("click", function() {
         $("#pgc_WinHelp").jqxWindow('open');   //업로드 알림 도우미
         var pgc_href = "/fileDownload?vFileType=pgc";
         location.href = pgc_href;
      });

   };

   return {
      initApp: initApp
   }

};

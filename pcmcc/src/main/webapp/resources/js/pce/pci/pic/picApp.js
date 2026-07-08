var PicApp = function() {

   var transaction = new PicTransaction();
   var model = new PicModel();
   var view = new PicViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupMainGrid1();
      view.setupMainGrid2();
      view.setupMainGrid3();
      view.setupActionButton();

   };

   var regEventHandler = function() {
      //조회
      $("#pic_BtnSearch").on('click', function() {
         var param = {
            "vEstiCode": $("#pic_code").jqxComboBox('val')
         }

         $("#pic_grid1").jqxGrid('clearselection');
         $("#pic_grid1").jqxGrid({ source: transaction.getPicGrid1List(param) });

         $("#pic_grid2").jqxGrid('clearselection');
         $("#pic_grid2").jqxGrid({ source: transaction.getPicGrid2List(param) });

         $("#pic_grid3").jqxGrid('clearselection');
         $("#pic_grid3").jqxGrid({ source: transaction.getPicGrid3List(param) });
      });
   };

   //인건비 확보율 계산
   $("#pic_BtnCal").on('click', function() {
      $('#jqxLoader').jqxLoader({'text':'인건비 확보율 계산중입니다...'});
      $('#jqxLoader').jqxLoader('open');
      $("#pic_BtnCal").jqxButton({ disabled:true });

      var param = {
         "vEstiCode": $("#pic_code").jqxComboBox('val')
      }

      transaction.calculatePic(param).then(function(resultdata) {

         if (resultdata == "-1") {
            alert("인건비 확보율 계산에 실패했습니다.");
         }
         else {
            alert("인건비 확보율 계산에 성공했습니다.");

            $("#pic_grid3").jqxGrid('clearselection');
            $("#pic_grid3").jqxGrid({ source: transaction.getPicGrid3List(param) });
         }

      });

      $("#pic_BtnCal").jqxButton({ disabled:false });
      $('#jqxLoader').jqxLoader('close');
   });

   //인건비 확보율 조회
   $("#pic_BtnSecureSearch").on('click', function() {
      var param = {
         "vEstiCode": $("#pic_code").jqxComboBox('val')
      }

      $("#pic_grid3").jqxGrid('clearselection');
      $("#pic_grid3").jqxGrid({ source: transaction.getPicGrid3List(param) });
   });

   //엑셀저장
   $("#pic_BtnExcel").on('click', function() {
      var vEstiCode = $("#pic_code").val();

      jqxGridExport.typeExcel("#pic_grid3", vEstiCode + "_인건비_확보율");
   });

   return {
      initApp: initApp
   }

};

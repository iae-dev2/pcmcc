var PcfApp = function() {

   var transaction = new PcfTransaction();
   var model = new PcfModel();
   var view = new PcfViewHandler(model,transaction);

   var initApp = function() {

      view.setupBbsGrid();

      if (_mode == 'pce') {
         //관리자 화면
         view.setupActionForm(false);
         view.setupBbsField(1065);
      }
      else {
         //메인 화면
         view.setupActionForm(true);
         view.setupBbsField(1225);
      }

      view.setupFileGrid();

      if (_mode != 'pce') {
         //메인 화면
         $("#pcf_filegrid_add").jqxButton({ disabled: true });
         $("#pcf_filegrid_del").jqxButton({ disabled: true });
      }

      regEventHandler();

      $("#pcf_bbsGrid").jqxGrid({ source: transaction.getPcfList() });

   };

   var regEventHandler = function() {

      //게시판 그리드 선택
      $("#pcf_bbsGrid").on('rowselect', function(event) {

         var args = event.args;
         var rowData = args.row;

         //작성자가 아닌경우 조회수 증가
         if (_loginUser != rowData.vEmplNo) {
            var cntParam = {
               "nSeqNo": rowData.nSeqNo
            }
            transaction.addHit(cntParam).done(function(resultdata) {

            });
         }

         $("#pcf_editFlag").val("mod");
         view.setActionButton("mod");
         view.setPcfFormDisabled(false);
         model.setPcfForm(rowData);
         $("#pcf_fileGrid").jqxGrid("clearselection");

         var fileparam = {
            "vEmplNo": rowData.vEmplNo,
            "vFileType": "pcf",
            "nSeqNo": rowData.nSeqNo
         };
         $("#pcf_fileGrid").jqxGrid({ source : transaction.getPcfFileList(fileparam) });
      });

      //파일추가, 파일삭제 마우스 오버 시 손모양 추가   2021-05-18
      $("#pcf_fileGrid").on("bindingcomplete", function() {
         if ($("#pcf_fileGrid").jqxGrid("disabled")) {
            $(".btn-line-add-img").css("cursor", "default");
            $(".btn-line-delete-img").css("cursor", "default");
         }
         else {
            $(".btn-line-add-img").css("cursor", "pointer");
            $(".btn-line-delete-img").css("cursor", "pointer");
         }
      });

      //신규
      $("#pcf_BtnNew").on('click', function() {
         $("#pcf_bbsGrid").jqxGrid("clearselection");
         $("#pcf_editFlag").val('new');
         view.setActionButton('new');
         view.setPcfFormDisabled(false);

         model.initPcfForm();

         $("#pcf_fileGrid").jqxGrid("clear");
      });

      //삭제
      $("#pcf_BtnDel").on('click', function() {
         if ($("#pcf_editFlag").val() == "new") {
            if (confirm("입력한 내용을 취소하시겠습니까?")) {
               view.setActionButton('init');
               view.setPcfFormDisabled(true);

               model.initPcfForm();
               $("#pcf_fileGrid").jqxGrid("clear");
            }
         }
         else {
            if (confirm('삭제하시겠습니까?')) {
               var param = {
                  "nSeqNo": $("#pcf_nSeqNo").val()
               };

               transaction.deletePcf(param).done(function(resultdata) {
                  $("#pcf_bbsGrid").jqxGrid('clearselection');
                  $("#pcf_bbsGrid").jqxGrid({ source: transaction.getPcfList() });

                  view.setActionButton('init');
                  view.setPcfFormDisabled(true);
                  model.initPcfForm();

                  $("#pcf_fileGrid").jqxGrid('clear');
               });
            }
         }

      });

      //저장
      $("#pcf_BtnSave").on('click', function() {
         var pcfvalidation = model.getPcfVali();
         var formdata = model.getPcfForm();
         if (pcfvalidation) {
            transaction.savePcf(formdata).done(function(resultdata) {
               if (resultdata == -1) {
                  alert("오류가 발생하여 저장에 실패하였습니다!");
                  return false;
               }

               // mainGrid 갱신
               $("#pcf_bbsGrid").jqxGrid({ source: transaction.getPcfList() });
               $("#pcf_bbsGrid").jqxGrid('clearselection');

               view.setActionButton('init');
               view.setPcfFormDisabled(true);
               model.initPcfForm();

               var fileparam = {
                  "vEmplNo": "",
                  "vFileType": "pcf",
                  "nSeqNo": 0
               };
               $("#pcf_fileGrid").jqxGrid({ source : transaction.getPcfFileList(fileparam) });
            });
         }
      });

   };

   return {
      initApp: initApp
   }

};

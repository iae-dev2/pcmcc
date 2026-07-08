var PiaApp = function() {

   var transaction = new PiaTransaction();
   var model = new PiaModel();
   var view = new PiaViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupMainGrid();
      view.setupHalfYearGrid();
      view.setupActionButton();

      view.setupPiaHelp();   //업로드 알림 도우미
      view.setupPiaLoader();
   };

   var regEventHandler = function() {
      //조회
      $("#pia_BtnSearch").on('click', function() {
         $("#pia_mainGrid").jqxGrid({ disabled: false });
         $("#pia_mainGrid").jqxGrid('clearselection');
         $("#pia_mainGrid").jqxGrid({ source: transaction.getPiaList() });

         $("#pia_halfYearGrid").jqxGrid({ disabled: false });
         $("#pia_halfYearGrid").jqxGrid('clearselection');
         $("#pia_halfYearGrid").jqxGrid({ source: transaction.getPiaHalfYearList() });

         $(".btn-s-save").css("cursor", "pointer");   //그리드 저장 버튼 마우스 오버 시 손모양 추가   2021-05-18
      });

      //내부인건비/간접비 업로드
      $("#pia_BtnUpload").on('click', function() {
         var param = {
            "biztype": "/pci/pia"
         };

         commonDialog.open('xls', param, function() {
            var _data = commonDialog.returnData;

            if (_data < 0) {
               alert("오류가 발생하여 업로드에 실패하였습니다 !");
            }
            else {
               alert("업로드가 완료되었습니다.");
               $("#pia_mainGrid").jqxGrid({ disabled: false });
               $("#pia_mainGrid").jqxGrid({ source: transaction.getPiaList() });
            }
         });
      });

      //업로드 샘플 다운로드
      $("#pia_BtnSample").on("click", function() {
         $("#pia_WinHelp").jqxWindow('open');   //업로드 알림 도우미
         var pia_href = "/fileDownload?vFileType=pia";

         location.href = pia_href;
      });

      //월별 내부인건비/간접비 계산
      $("#pia_BtnMonthlyCal").on('click', function() {
         $('#pia_jqxLoader').jqxLoader({'text':'월별 내부인건비/간접비를 계산중입니다...'});
         $('#pia_jqxLoader').jqxLoader('open');
         $("#pia_BtnMonthlyCal").jqxButton({ disabled:true });

         var param = {
            "vYyyy": $("#pia_code").jqxComboBox('val').substring(0, 4),
            "vGubun": $("#pia_code").jqxComboBox('val').substring(5, 7)
         }

         transaction.calculateMonthly(param).then(function(resultdata) {
            if (resultdata == "-1") {
               $('#pia_jqxLoader').jqxLoader('close');
               $("#pia_BtnMonthlyCal").jqxButton({ disabled:false });
               alert("월별 내부인건비/간접비계산에 실패했습니다.");
            }
            else {
               $('#pia_jqxLoader').jqxLoader('close');
               $("#pia_BtnMonthlyCal").jqxButton({ disabled:false });
               alert("월별 내부인건비/간접비 계산에 성공했습니다.");

               $("#pia_mainGrid").jqxGrid('clearselection');
               $("#pia_mainGrid").jqxGrid({ source: transaction.getPiaList() });
            }
         });

      });

      //월별 내부인건비/간접비 엑셀저장
      $("#pia_BtnExcel").on('click', function() {
         var vYear = $("#pia_code").jqxComboBox('val').substring(0, 4);

         location.href = "/pci/pia/exportExcel?vYear=" + vYear;
      });

      //분기별 내부인건비/간접비  계산
      $("#pia_BtnHalfYearCal").on('click', function() {
         $('#pia_jqxLoader').jqxLoader({'text':'분기별 내부인건비/간접비를 계산중입니다...'});
         $('#pia_jqxLoader').jqxLoader('open');
         $("#pia_BtnHalfYearCal").jqxButton({ disabled:true });

         var param = {
            "vEstiCode": $("#pia_code").jqxComboBox('val'),
            "vYyyy": $("#pia_code").jqxComboBox('val').substring(0, 4),
            "vGubun": $("#pia_code").jqxComboBox('val').substring(5, 7)
         }

         transaction.calculateHalfYear(param).then(function(resultdata) {
            if (resultdata == "-1") {
               $("#pia_BtnHalfYearCal").jqxButton({ disabled:false });
               $('#pia_jqxLoader').jqxLoader('close');
               alert("분기별 내부인건비/간접비계산에 실패했습니다.");
            }
            else {
               $("#pia_BtnHalfYearCal").jqxButton({ disabled:false });
               $('#pia_jqxLoader').jqxLoader('close');
               alert("분기별 내부인건비/간접비 계산에 성공했습니다.");

               $("#pia_halfYearGrid").jqxGrid('clearselection');
               $("#pia_halfYearGrid").jqxGrid({ source: transaction.getPiaHalfYearList() });
            }
         });

      });

      //분기별 내부인건비/간접비 엑셀저장
      $("#pia_BtnHalfYearExcel").on('click', function() {
         var vEstiCode = $("#pia_code").jqxComboBox('val');

         location.href = "/pci/pia/exportHalfYearExcel?vEstiCode=" + vEstiCode;
      });

   };

   return {
      initApp: initApp
   }

};

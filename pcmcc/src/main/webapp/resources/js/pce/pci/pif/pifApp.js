var PifApp = function() {

   var transaction = new PifTransaction();
   var model = new PifModel();
   var view = new PifViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupEntrustGrid();
      view.setupTestGrid();
      view.setupActionButton();
   };

   var regEventHandler = function() {
      // 조회
      $("#pif_BtnSearch").on('click', function() {
         $("#pif_entrustGrid").jqxGrid({ disabled: false });
         $("#pif_entrustGrid").jqxGrid('clearselection');
         $("#pif_entrustGrid").jqxGrid({ source: transaction.getPifList() });
         $("#pif_entrustAdjust").jqxButton({ disabled: false });

//         $("#pif_testGrid").jqxGrid({ disabled: false });
//         $("#pif_testGrid").jqxGrid('clearselection');
//         $("#pif_testGrid").jqxGrid({ source: transaction.getPifHalfYearList() });

         $(".btn-s-save").css("cursor", "pointer");   //그리드 저장 버튼 마우스 오버 시 손모양 추가   2021-05-18
      });

      $("#pif_entrustAdjust").on('click', function() {
         let vEstiCode = $("#pif_code").jqxComboBox('val');

         let selectedProjectCodeList = [];
         let selectedrowindexes = $('#pif_entrustGrid').jqxGrid('selectedrowindexes');
         selectedrowindexes.forEach((idx) => {
            selectedProjectCodeList.push($('#pif_entrustGrid').jqxGrid('getcellvalue', idx, "vProjectCode"));
         });
         if (!selectedProjectCodeList.length) {
            alert('선택된 목록이 존재하지 않습니다!');
            return -1;
         }
         if (confirm('내부위탁과제 인건비 업데이트를 진행하시겠습니까?')) {
            $("#pif_entrustAdjust").jqxButton({ disabled: true });
            let param = {
               "vEstiCode": vEstiCode,
               "projectCodeList": selectedProjectCodeList,
            }

            transaction.updateEntrust(param).then(function(result) {
               if (result < 0) {
                  alert("내부위탁과제 인건비 업데이트에 실패했습니다.");
               }
               else {
                  alert(`내부위탁과제 인건비 업데이트에 성공했습니다 (평가코드: ${vEstiCode})`);
                  $("#pif_entrustGrid").jqxGrid('clearselection');
                  $("#pif_entrustGrid").jqxGrid({ source: transaction.getPifList() });
               }
            });
         }
      });

      // 내부위탁과제 목록 엑셀저장
//      $("#pif_BtnExcel").on('click', function() {
//         var vYear = $("#pif_code").jqxComboBox('val').substring(0, 4);
//
//         location.href = "/pci/pif/exportExcel?vYear=" + vYear;
//      });

   };

   return {
      initApp: initApp
   }

};

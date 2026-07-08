var PbaApp = function() {

   var transaction = new PbaTransaction();
   var model = new PbaModel();
   var view = new PbaViewHandler(model,transaction);

   var initApp = function () {
      regEventHandler();

      view.setupSearchField();
      view.setupActionForm();
      view.setupPrjGrid();
      view.setupPrjForm();
      view.setupEvalGrid();
      view.setupPbaWin();

   };

   //버튼 (비)활성화 사용 함수
   var local_Btn_Setter = function(step, finish, confirm) {
      view.setViewState(step, finish, confirm);
   }

   var regEventHandler = function() {

      //조회
      $("#pba_BtnSearch").on('click', function(event) {
         if ($("#pba_code").jqxComboBox('getSelectedItem').originalItem) {
            if ($("#pba_code").jqxComboBox('getSelectedItem').originalItem.vEstiCodeUpdate == "Y") {
               local_Btn_Setter("0", "", "");
               $("#pba_prjGrid").jqxGrid('clearselection');
               model.setPrjInfo();
               $("#pba_prjGrid").jqxGrid({ source: transaction.getProjectCodeList() });
               $("#pba_evalGrid").jqxGrid('clear');

               if ($('#pba_BtnOk').jqxButton('disabled') == false) {
                  $('#pba_BtnOk').jqxButton({ disabled:true });   //확인
               }
            }
            else {
               //버튼 초기화 (평가코드 VESTICODEUPDATE 가 N인 경우 조회를 제외하고 모두 비활성화 2020-06-17
               local_Btn_Setter("999", "", "");
               $("#pba_prjGrid").jqxGrid('clearselection');
               model.setPrjInfo();
               $("#pba_prjGrid").jqxGrid({ source: transaction.getProjectCodeList() });
               $("#pba_evalGrid").jqxGrid('clear');
            }
         }
         else {
            alert("평가코드 조회에 실패하였습니다. 새로 고침 후에도 정상적으로 진행되지 않으면 시스템 관리자에게 문의해 주십시오");
         }
      });

      //과제추가 버튼 클릭
      $("#pba_BtnNew").on('click', function(event) {
         $("#pba_window").jqxWindow('open');   //과제추가 팝업
      });

      //과제추가 팝업 open 시
      $("#pba_window").on("open", function(event) {
         $("#pba_win_grid").jqxGrid('clearselection');
         $("#pba_win_grid").jqxGrid({ source: transaction.getAdditionalPrjList() });
      });

      //과제추가 윈도우 그리드 select
      $("#pba_win_grid").on("rowselect", function(event) {
         var args = event.args;
         var rowBoundIndex = args.rowindex;
         var rowData = args.row;
         if (rowData.vEstiCode) {
            $("#pba_insertEstiCode").val(rowData.vEstiCode);
         }
         if (rowData.vProjectCode) {
            $("#pba_insertPrjCode").val(rowData.vProjectCode);
         }
      });

      //과제추가 윈도우 선택 버튼
      $("#pba_win_select").on('click', function(event) {
         var formdata = model.getPrjCode();
         transaction.savePrjCode(formdata).done(function(result) {
            if (result > -1) {
               $("#pba_window").jqxWindow('close');
               $("#pba_prjGrid").jqxGrid({ source: transaction.getProjectCodeList() });
            }
            else {
               alert("과제추가에 실패하였습니다!");
            }
         });
      });

      //과제삭제
      $("#pba_BtnDel").on('click', function(event) {
         if (confirm("선택한 과제를 삭제하시겠습니까 ?")) {
            var deldata = model.getDelPrjCode();
            transaction.deletePrjCode(deldata).done(function(result) {
               if (result > -1) {
                  alert("삭제되었습니다");
                  $("#pba_prjGrid").jqxGrid({ source: transaction.getProjectCodeList() });
                  model.setPrjInfo();
                  $("#pba_evalGrid").jqxGrid('clear');
               }
               else {
                  alert("과제삭제에 실패하였습니다!");
               }
            });
         }
      });

      //과제 코드 그리드 select
      $("#pba_prjGrid").on('rowselect', function(event) {
         if ($("#pba_code").jqxComboBox('getSelectedItem').originalItem) {
            //버튼 초기화 (평가코드 VESTICODEUPDATE 가 N인 경우 조회를 제외하고 모두 비활성화 2020-06-17
            if ($("#pba_code").jqxComboBox('getSelectedItem').originalItem.vEstiCodeUpdate == "Y") {
               local_Btn_Setter(event.args.row.vEstiStep, event.args.row.vFinish, event.args.row.vConfirm);
            }
            else {
               local_Btn_Setter("999", "", "");   //모든 버튼 비활성화
            }
         }
         else {
            alert("평가코드 조회에 실패하였습니다. 새로 고침 후에도 정상적으로 진행되지 않으면 시스템 관리자에게 문의해 주십시오");
            return false;
         }
         model.setPrjInfo(event.args.row);

         if (event.args.row) {
            //과제평균 기여율 조회
            transaction.getAverageCont(event.args.row.vEstiCode, event.args.row.vProjectCode).done(function(avg_result) {
               if (avg_result > -1) {
                  $("#pba_evalGrid").jqxGrid({
                     source: transaction.getEvaluationList(event.args.row.nContribution, avg_result, event.args.row.vContent)
                  });
               }
               else {
                  alert("과제평균 기여율을 불러오는데 실패하였습니다 !");
                  $("#pba_evalGrid").jqxGrid('clear');
               }
            });
         }
         else {
            $("#pba_evalGrid").jqxGrid('clear');
         }
      });

      //확인
      $("#pba_BtnOk").on('click', function(event) {
         if (confirm("선택한 과제 확인을 완료하시겠습니까 ?")) {
            var fidata = model.getDelPrjCode();
            transaction.saveConfirm(fidata).done(function(result) {
               if (result > -1) {
                  $("#pba_prjGrid").jqxGrid({ source: transaction.getProjectCodeList() });
                  $("#pba_BtnOk").jqxButton({disabled:true});    //확인
                  alert("확인이 완료되었습니다");
               }
               else {
                  $("#pba_BtnOk").jqxButton({disabled:false});   //확인
                  $("#pba_BtnOk").css("cursor", "");   //마우스 오버 시 손모양 유지   2021-05-18
                  alert("오류가 발생하였습니다!");
               }
            });
         }
      });
   }

   return {
      initApp: initApp
   }

}

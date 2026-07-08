var PdaApp = function() {

   var transaction = new PdaTransaction();
   var model = new PdaModel();
   var view = new PdaViewHandler(model,transaction);

   var initApp = function() {

      regEventHandler();

      view.setupSearchField();
      view.setupPrjGrid();
      view.setupPrjForm();
      view.setupPurpose();
      view.setupContGrid();
      view.setupContForm();
      view.setupEstiActionForm();

      view.setupPdaWeekWindow();

   };

   //버튼 (비)활성화 사용 함수
   var local_Btn_Setter = function(step, state) {
      //Step이 2, CONFIRM이 Y인 경우 버튼 활성화
      var empGrid_getRows = $("#pda_empGrid").jqxGrid('getrows');
      var empGrid_vConfirm = true;
      if (empGrid_getRows.length > 0) {
         for (var i=0; i<empGrid_getRows.length; i++) {
            if (empGrid_getRows[i].vConfirm != 'Y') {
               empGrid_vConfirm = false;
            }
         }
         view.setViewState(step, empGrid_vConfirm, state);   //버튼 상태 설정
      }
      else {
         view.setViewState(step, false, state);
      }
   }

   var regEventHandler = function() {

      //조회
      $("#pda_BtnSearch").on('click', function(event) {
         $("#pda_prjGrid").jqxGrid('clearselection');
         model.setPdaInfo();
         $("#pda_prjGrid").jqxGrid({ source: transaction.getCommonProjectCodeList() });
         $("#pda_empGrid").jqxGrid('clear');

         if ($('#pda_BtnSave').jqxButton('disabled') == false) {
            $('#pda_BtnSave').jqxButton({ disabled:true });   //저장
         }
         if ($('#pda_BtnReject').jqxButton('disabled') == false) {
            $('#pda_BtnReject').jqxButton({ disabled:true });   //반려
         }
         if ($('#pda_BtnConfirm').jqxButton('disabled') == false) {
            $('#pda_BtnConfirm').jqxButton({ disabled:true });   //승인
         }

         $("#pda_week_window").jqxWindow("close");          //주간업무보고 실적 닫기
         $("#pda_vReviewContent").jqxTextArea("val", "");   //평가의견 초기화
      });

      //과제 코드 그리드 select
      $("#pda_prjGrid").on('rowselect', function(event) {
         var bIs_saveSate = false;   //저장 여부
         $("#pda_empGrid").jqxGrid('clearselection');
         model.setPdaInfo(event.args.row);

         if (event.args.row) {
            //참여연구원 기여율 조회
            $("#pda_empGrid").jqxGrid({ source: transaction.getEmpContributionList(event.args.row.vEstiCode, event.args.row.vProjectCode) });
            //평가의견 조회
            transaction.getReview(event.args.row.vEstiCode, event.args.row.vProjectCode).done(function(result) {
               if (result == "") {
                  bIs_saveSate = false;
               }
               else {
                  bIs_saveSate = true;
               }

               //버튼 초기화 (평가코드 VESTICODEUPDATE 가 N인 경우 조회를 제외하고 모두 비활성화   2020-06-17
               if ($("#pda_code").jqxComboBox('getSelectedItem').originalItem) {
                  if ($("#pda_code").jqxComboBox('getSelectedItem').originalItem.vEstiCodeUpdate == "Y") {
                     local_Btn_Setter(event.args.row.vEstiStep, bIs_saveSate);
                  }
                  else {
                     view.setViewState("0", "", "");
                  }
               }
               else {
                  alert("평가코드 조회에 실패하였습니다. 새로 고침 후에도 정상적으로 진행되지 않으면 시스템 관리자에게 문의해 주십시오");
               }

               //반려 후 재평가 시 평가의견을 지우는 번거로움을 없애기 위해서 평가단계가 1, 2인 경우는 평가의견 제거   2020-06-25
               if (event.args.row.vEstiStep == "3" || event.args.row.vEstiStep == "4" || event.args.row.vEstiStep == "5") {
                  $("#pda_vReviewContent").jqxTextArea("val", result);   //평가 의견
               }
               else {
                  $("#pda_vReviewContent").jqxTextArea("val", "");
               }

            });
         }
         else {
            $("#pda_empGrid").jqxGrid('clear');
            local_Btn_Setter(event.args.row.vEstiStep, bIs_saveSate);
            $("#pda_vReviewContent").jqxTextArea("val", "");
         }

         $("#pda_week_window").jqxWindow("close");   //주간업무보고 실적 닫기
      });

      //참여연구원 기여율 그리드 선택
      $("#pda_empGrid").on('rowselect', function(event) {
         var args = event.args;
         var rowBoundIndex = args.rowindex;
         var rowData = args.row;
         var table_html = "";

         $("#pda_week_table *").remove();   //초기화

         $("#pda_week_table").html("<div style='margin-top: 150px; margin-left: 430px;'>조회중 입니다...</div>");

         transaction.getWeekList(rowData.vProjectCode, rowData.vEmplNo, rowData.vEstiCode).done(function(result) {
            $("#pda_week_table *").remove();   //초기화

            table_html += "<table style='border-collapse: collapse; width: 100%;'>";
            table_html +=    "<colgroup>";
            table_html +=       "<col width='14%'/>";
            table_html +=       "<col width='62%'/>";
            table_html +=       "<col width='24%'/>";
            table_html +=    "</colgroup>";
            
            table_html +=    "<thead>";
            table_html +=       "<tr style='border: 1px solid; border-color: #cfcfcf; height: 27px;'>";//#dae2ed   //#f7f7f7
            table_html +=          "<th style='border: 1px solid; border-color: #cfcfcf; text-align: center; background-color: #dae2ed; font-size: 14px;'>일자</th>";
            table_html +=          "<th style='border: 1px solid; border-color: #cfcfcf; text-align: center; background-color: #dae2ed; font-size: 14px;'>수행업무실적</th>";
            table_html +=          "<th style='border: 1px solid; border-color: #cfcfcf; text-align: center; background-color: #dae2ed; font-size: 14px;'>산출물</th>";
            table_html +=       "</tr>";
            table_html +=    "</thead>";

            table_html +=    "<tbody>";
            result.forEach((el, idx, arr) => {
               table_html +=    "<tr style='border: 1px solid; border-color: #cfcfcf;'>";
               table_html +=       "<td style='border: 1px solid; border-color: #cfcfcf; text-align: center;'>" + el.vWeek + "</td>";
               table_html +=       "<td style='border: 1px solid; border-color: #cfcfcf;'><pre style='white-space: pre-wrap; word-break: break-all; overflow: auto;'>" + el.vWorkContent + "</pre></td>";
               table_html +=       "<td style='border: 1px solid; border-color: #cfcfcf; text-align: center;'>" + model.setFiles(el.vWeek, el.vEmplNo, el.nSeqNo, el.vFileNames) + "</td>";   //산출물
               table_html +=    "</tr>";
            });
            table_html +=    "</tbody>";

            table_html += "</table>";

            $("#pda_week_table").append(table_html);

            $("#pda_week_window").jqxWindow("open");

         });

      });

      //산출물 미리보기
      $(document).on("click", ".pdaPreview", function(event) {

         $("#pda_jqxLoader").jqxLoader({ 'text': '변환 중입니다...' });
         $("#pda_jqxLoader").jqxLoader('open');   //로딩바 열기

         var pre_parent = event.target.closest("a");
         var pre_week = pre_parent.children[1].value;
         var pre_emplno = pre_parent.children[2].value;
         var pre_seqno = pre_parent.children[3].value;
         var pre_fileseqno = pre_parent.children[4].value;
         var pre_extension = pre_parent.children[5].value;

         var rows = [];
         var row = {};
         var extArr = ['.ppt', '.pptx', '.pptm', '.pps', '.ppsx', '.xls', '.xlsx', '.xlsm', '.xlsb', '.doc', '.docx', '.docm', '.dotx', '.rtf', '.txt'];
         extArr.push('.odt', '.odp', '.ods', '.odg');
         extArr.push('.hwp', '.gul', '.pdf', '.dap');
         extArr.push('.dwg', '.dwf', '.dxf', '.dgn');
         extArr.push('.url', '.mht', '.mhtml', '.htm', '.html', '.hml', '.eml');
         extArr.push('.jpg', '.jpe', '.jpeg', '.tif', '.tiff', '.gif', '.png', '.bmp', '.j2k', '.psd');
         var vFileExtension = "";

         row = {};
         row.vWeek = pre_week;
         row.vEmplNo = pre_emplno;
         row.nSeqNo = pre_seqno;
         row.nFileSeqNo = pre_fileseqno;
         row.vFileExtension = pre_extension;

         for (var i = 0; i < extArr.length; i++) {
            if (extArr[i] == pre_extension) {
               rows.push(row);
            }
         }

         transaction.registerWithDap(rows).then(function(result) {
            if (result != null && result.alink != null) {
               window.open(result.alink);

               $("#pda_jqxLoader").jqxLoader('close');   //로딩바 닫기
            }
            else {
               alert("바로보기 실패 !");
               $("#pda_jqxLoader").jqxLoader('close');   //로딩바 닫기
            }
         }, function() {
            console.log("바로보기 실패 !");
            $("#pda_jqxLoader").jqxLoader('close');   //로딩바 닫기
         });

      });

      //승인
      $("#pda_BtnConfirm").on('click', function(event) {
         var save_vali = model.chkVali();
         if (save_vali) {
            if (confirm("승인 하시겠습니까 ?")) {
               transaction.setConfirm().done(function(result) {
                  if (result > -1) {
                     if (result == 1) {
                        alert("승인 권한이 없습니다 !");
                     }
                     else {
                        $("#pda_prjGrid").jqxGrid({ source: transaction.getCommonProjectCodeList() });
                        alert("승인되었습니다");
                        view.setViewState("a", false, false);   //버튼 전부 비활성
                     }
                  }
                  else {
                     alert("승인에 실패하였습니다 !");
                  }
               });
            }
         }
      });

      //반려
      $("#pda_BtnReject").on('click', function(event) {
         var save_vali = model.chkVali();
         if (save_vali) {
            transaction.setReject().done(function(result) {
               if (result > -1) {
                  if (result == 1) {
                     alert("반려 권한이 없습니다 !");
                  }
                  else {
                     $("#pda_prjGrid").jqxGrid({ source: transaction.getCommonProjectCodeList() });
                     alert("반려되었습니다");
                     view.setViewState("a", false, false);   //버튼 전부 비활성
                  }
               }
               else {
                  alert("반려에 실패하였습니다 !");
               }
            });
         }
      });

   };

   return {
      initApp: initApp
   }

}

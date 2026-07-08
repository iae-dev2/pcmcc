var PcaApp = function() {

   var transaction = new PcaTransaction();
   var model = new PcaModel();
   var view = new PcaViewHandler(model,transaction);

   var initApp = function() {
      regEventHandler();

      view.setupSearchField();
      view.setupActionForm();
      view.setupPrjGrid();
      view.setupPrjForm();
      view.setupPurpose();

      view.setupContActionForm();
      view.setupContGrid();
      view.setupContForm();

      view.setupWeekWindow();

   };

   //버튼 (비)활성화 사용 함수
   var local_Btn_Setter = function(step) {
      //Step이 2, CONFIRM이 Y인 경우 버튼 활성화
      var empGrid_getRows = $("#pca_empGrid").jqxGrid('getrows');
      var empGrid_vFinish = "Y";   //완료 항목
      var empGrid_vConfirm = "N";   //완료 항목
      if (empGrid_getRows.length > 0) {
         for (var i = 0; i < empGrid_getRows.length; i++) {
            if (empGrid_getRows[i].vFinish != 'Y') {
               empGrid_vFinish = "N";
            }
         }
         for (var j=0; j < empGrid_getRows.length; j++) {
            if (empGrid_getRows[j].vConfirm != 'Y') {
               empGrid_vConfirm = "Y";
            }
         }
         view.setViewState(step, empGrid_vFinish, empGrid_vConfirm);   //버튼 상태 설정
      }
      else {
         view.setViewState(step, "N", "N");
      }
   }

   var regEventHandler = function() {

      //조회
      $("#pca_BtnSearch").on('click', function(event) {
         local_Btn_Setter("0");   //조회시는 모든 버튼 비활성화
         $("#pca_prjGrid").jqxGrid('clearselection');
         model.setPrjInfo();
         $("#pca_prjGrid").jqxGrid({ source: transaction.getCommonProjectCodeList() });
         $("#pca_empGrid").jqxGrid('clear');

         $("#pca_week_window").jqxWindow("close");          //주간업무보고 실적 윈도우 닫기   2022-04-05
         $("#pca_vReviewContent").jqxTextArea("val", "");   //평가의견 초기화
      });

      //과제 코드 그리드 select
      $("#pca_prjGrid").on('rowselect', function(event) {
         $("#pca_empGrid").jqxGrid('clearselection');
         model.setPrjInfo(event.args.row);

         // 과제목표 & Milestone 가져오기
         transaction.getPrjGoal().done(function(result) {
            if (result.length > 0) {
               $("#pca_vProjectGoal").jqxTextArea("val", result[0].vProjectGoal || '');
               $("#pca_vProjectMilestone").jqxTextArea("val", result[0].vProjectMilestone || '');
            }
            else {
               alert("가져올 과제목표가 없습니다");
            }
         });

         //참여연구원 기여율 조회
         if (event.args.row) {
            $("#pca_empGrid").jqxGrid({ source: transaction.getEmpContributionList(event.args.row.vEstiCode, event.args.row.vProjectCode) });

            if ($("#pca_code").jqxComboBox('getSelectedItem').originalItem) {
               if ($("#pca_code").jqxComboBox('getSelectedItem').originalItem.vEstiCodeUpdate == "Y") {
                  local_Btn_Setter(event.args.row.vEstiStep);   //위치 주의
               }
               else {
                  view.setViewState('0', '', '');
               }
            }
            else {
               alert("평가코드 조회에 실패하였습니다. 새로 고침 후에도 정상적으로 진행되지 않으면 시스템 관리자에게 문의해 주십시오");
            }

            //평가의견 조회
            transaction.getReview(event.args.row.vEstiCode, event.args.row.vProjectCode).done(function(result) {
               $("#pca_vReviewContent").jqxTextArea("val", result);
            });
         }
         else {
            view.setViewState('0', '', '');

            $("#pca_empGrid").jqxGrid("clear");
            $("#pca_vReviewContent").jqxTextArea("val", "");
         }

         $("#pca_week_window").jqxWindow("close");          //주간업무보고 실적 윈도우 닫기
         $("#pca_vReviewContent").jqxTextArea("val", "");   //평가의견 초기화

      });

      //전분기 과제목표 가져오기
      $("#pca_BtnLoad").on('click', function(event) {
         if ($('#pca_prjGrid').jqxGrid('getselectedrowindex') == -1) {
            alert("과제를 선택해 주십시오");
            return false;
         }
         else {
            transaction.getOldGoal().done(function(old_result) {
               if (old_result.length > 0) {
                  if (old_result[0].vProjectGoal != null) {
                     alert(old_result[0].vEstiCode + " 과제목표를 가져옵니다");
                     $("#pca_vProjectGoal").jqxTextArea("val", old_result[0].vProjectGoal);
                     $("#pca_vProjectMilestone").jqxTextArea("val", old_result[0].vProjectMilestone);
                  }
                  else {
                     alert("가져올 과제목표가 없습니다");
                  }
               }
               else {
                  alert("가져올 과제목표가 없습니다");
               }
            });
         }
      });

      //과제목표 저장
      $("#pca_BtnSave").on('click', function(event) {
         if ($('#pca_prjGrid').jqxGrid('getselectedrowindex') == -1) {
            alert("과제를 선택해 주십시오");
            return false;
         }
         else {
            var goal_vali = model.chkGoalVali();
            if (goal_vali) {
               var prjdata = model.getPrjInfo();
               console.log(prjdata);
               transaction.savePrjGoal(prjdata).done(function(result) {
                  if (result > -1) {
                     alert("저장되었습니다");
                  }
                  else {
                     alert("오류가 발생하여 저장에 실패하였습니다!");
                  }
               });
            }
         }
      });

      //참여연구원 기여율 그리드 선택
      $("#pca_empGrid").on('rowselect', function(event) {
         var args = event.args;
         var rowBoundIndex = args.rowindex;
         var rowData = args.row;
         var table_html = "";

         $("#pca_week_table *").remove();   //초기화

         $("#pca_week_table").html("<div style='margin-top: 150px; margin-left: 430px;'>조회중 입니다...</div>");

         transaction.getWeekList(rowData.vProjectCode, rowData.vEmplNo, rowData.vEstiCode).done(function(result) {
            $("#pca_week_table *").remove();   //초기화

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

            $("#pca_week_table").append(table_html);

            $("#pca_week_window").jqxWindow("open");

         });

      });

      //연구원 추가
      $("#pca_BtnEmpAdd").on('click', function(event) {
         view.addEmpPopup();
      });

      //연구원 삭제
      $("#pca_BtnEmpDel").on('click', function(event) {
         if ($('#pca_empGrid').jqxGrid('getselectedrowindex') == -1) {
            alert("연구원을 선택해 주십시오");
            return false;
         }
         else {
            if (confirm("삭제 하시겠습니까 ?")) {
               var del_select_idx = $("#pca_empGrid").jqxGrid('getselectedrowindex');
               transaction.removeEmp($("#pca_empGrid").jqxGrid('getrowdata', del_select_idx).vEmplNo).done(function(result) {
                  if (result > -1) {
                     if (result == 0) {
                        alert("삭제 내역이 없습니다 !");
                     }
                     else {
                        $("#pca_empGrid").jqxGrid({ source: transaction.getEmpContributionList($("#pca_StoredEstiCode").val(), $("#pca_StoredProjectCode").val()) });
                        alert("삭제되었습니다");
                     }
                  }
                  else {
                     alert("삭제에 실패하였습니다 !");
                  }
               });
            }
         }
      });

      //참여연구원 기여율 임시저장
      $("#pca_BtnContAdd").on('click', function(event) {
         var content_vali = model.chkContentVali();
         if (content_vali) {
            var rows = $("#pca_empGrid").jqxGrid('getrows');
            transaction.saveCont(rows).done(function(result) {
               if (result > -1) {
                  $("#pca_empGrid").jqxGrid({ source: transaction.getEmpContributionList($("#pca_StoredEstiCode").val(), $("#pca_StoredProjectCode").val()) });
                  alert("기여율이 입력되었습니다");
               }
               else {
                  alert("기여율 입력에 실패하였습니다 !");
               }
            });
         }
      });

      //과제 기여율입력 완료
      $("#pca_BtnContFinish").on('click', function(event) {
         if ($("#pca_empGrid").jqxGrid("getrows").length > 0) {
            // 기여율 전체합계 check(100을 초과할 수 없음)
            var cont_sum = $("#cont_sum").text();
            if (cont_sum != 100) {
               alert("전체 합계는 100 미만 또는 초과할 수 없습니다.");
               return false;
            }

            var finish_vali = model.chkContentVali();
            if (finish_vali) {
               if (confirm("기여율입력을 완료 하시겠습니까 ?")) {
                  transaction.finishCont(model.getPcaAllValues()).done(function(result) {
                     if (result > -1) {
                        if (result == 0) {
                           alert("완료 권한이 없습니다 !");
                        }
                        else {
                           $("#pca_prjGrid").jqxGrid({ source: transaction.getCommonProjectCodeList() });
                           $("#pca_empGrid").jqxGrid({ source: transaction.getEmpContributionList($("#pca_StoredEstiCode").val(), $("#pca_StoredProjectCode").val()) });
                           alert("기여율입력이 완료되었습니다");
                           view.setViewState("2", "Y", "Y");
                        }
                     }
                     else {
                        alert("기여율입력 완료에 실패하였습니다 !");
                     }
                  });
               }
            }
         }
         else {
            alert("완료할 내역이 없습니다");
         }
      });

      //산출물 미리보기
      $(document).on("click", ".pcaPreview", function(event) {

         $("#pca_jqxLoader").jqxLoader({ 'text': '변환 중입니다...' });
         $("#pca_jqxLoader").jqxLoader('open');   //로딩바 열기

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

               $("#pca_jqxLoader").jqxLoader('close');   //로딩바 닫기
            }
            else {
               alert("바로보기 실패 !");
               $("#pca_jqxLoader").jqxLoader('close');   //로딩바 닫기
            }
         }, function() {
            console.log("바로보기 실패 !");
            $("#pca_jqxLoader").jqxLoader('close');   //로딩바 닫기
         });

      });

      //최종확인
      $("#pca_BtnDone").on('click', function(event) {
         if (confirm("최종확인 하시겠습니까 ?")) {
            transaction.doneCont().done(function(result) {
               if (result > -1) {
                  if (result == 0) {
                     alert("최종확인 권한이 없습니다 !");
                  }
                  else {
                     alert("최종확인 되었습니다");
                     view.setViewState("5", "Y", "Y");
                     $("#pca_prjGrid").jqxGrid({ source: transaction.getCommonProjectCodeList() });
                  }
               }
               else {
                  alert("최종확인 처리에 실패하였습니다 !");
               }
            });
         }
      });
   }

   return {
      initApp: initApp
   }

}

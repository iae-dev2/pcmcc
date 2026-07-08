var PdaViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setViewState = function(step, confirm, save) {
      if (step == "2" && confirm == true) {
         $("#pda_BtnSave").jqxButton({ disabled:false });

         $("#pda_BtnConfirm").jqxButton({ disabled:false });
         $("#pda_BtnReject").jqxButton({ disabled:false });

         $("#pda_BtnSave").css("cursor", "");   //마우스 오버 시 손모양 유지   2021-05-18
         $("#pda_BtnConfirm").css("cursor", "");
         $("#pda_BtnReject").css("cursor", "");
      }
      else {
         $("#pda_BtnConfirm").jqxButton({ disabled:true });
         $("#pda_BtnReject").jqxButton({ disabled:true });
         $("#pda_BtnSave").jqxButton({ disabled:true });
      }
   }

   var setupSearchField = function() {
      //평가코드
      $("#pda_code").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getCommonEstiCodeList(),
         displayMember: 'vEstiCodeName',
         valueMember: 'vEstiCode',
         width: '280px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });

      //조회 버튼
      $("#pda_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   //과제코드 그리드
   var setupPrjGrid = function() {
      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      $("#pda_prjGrid").jqxGrid({
         width: '100%',
         height: '210px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: true,
         enabletooltips: true,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: false,
         editmode: 'click',   //클릭 시 수정 가능
         columns: [{
            text: '과제코드',
            datafield: 'vProjectCode',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제명',
            datafield: 'vProjectName',
            align: 'center',
            cellsalign: 'left',
         }, {
            text: '과제책임자',
            datafield: 'vProjectPmName',
            width: '90px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '시작일',
            datafield: 'vStartDate',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '종료일',
            datafield: 'vEndDate',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '진행단계',
            datafield: 'vEstiStep',
            width: '150px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: function(row, column, value) {
               var prjdata = $('#pda_prjGrid').jqxGrid('getrowdata', row);
               var stepName = "";
               if (value == 1) {
                  if (prjdata.vFinish == "Y") {
                     stepName = "PM 평가중";
                  }
                  else {
                     stepName = "연구원 입력중";
                  }
               }
               else if (value == 2) {
                  if (prjdata.vConfirm == "Y") {
                     stepName = "센터장 확인중";
                  }
                  else {
                     stepName = "연구원 확인중";
                  }
               }
               else if (value == 3) {
                  stepName = "센터장 <span style='color:red;'>반려</span>";
               }
               else if (value == 4) {
                  stepName = "PM 최종 확인 중";
               }
               else if (value == 5) {
                  stepName = "최종 평가완료";
               }
               return '<div style="text-align: center; margin-top: 10px;"> ' + stepName + '</div>';
            }
         }]
      });
   };

   var setupPrjForm = function() {
      //센터(본부명)
      $("#pda_vDeptName").jqxInput({
         height: 30,
         width: 120,
         theme: 'custom',
         disabled: true
      });
      //PM
      $("#pda_vProjectPm").jqxInput({
         height: 30,
         width: 120,
         theme: 'custom',
         disabled: true
      });
      //과제코드
      $("#pda_vProjectCode").jqxInput({
         height: 30,
         width: 120,
         theme: 'custom',
         disabled: true
      });
      //부처명
      $("#pda_vGovName").jqxInput({
         height: 30,
         width: 120,
         theme: 'custom',
         disabled: true
      });
      //과제명
      $("#pda_vProjectName").jqxInput({
         height: 30,
         width: 477,
         theme: 'custom',
         disabled: true
      });
      //사업명
      $("#pda_vProjectDivision").jqxInput({
         height: 30,
         width: 477,
         theme: 'custom',
         disabled: true
      });
   };

   var setupPurpose = function() {
      //과제목표
      $("#pda_vProjectGoal").jqxTextArea({
         width: 697,
         height: 180,
         theme: 'custom',
         disabled: false
      });

      //평가 기간내 Milestone
      $("#pda_vProjectMilestone").jqxTextArea({
         width: 697,
         height: 180,
         theme: 'custom',
         disabled: false
      });
   };

   //참여연구원 기여율 그리드
   var setupContGrid = function() {
      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      var deptrenderer = function(row, column, value) {
         var dept_result = "";

         dept_result += "<div style='width:354px; height:70px; font-family:sans-serif; font-size:13px; padding-top:5px; padding-bottom:5px;'>";
         dept_result +=    "<span style='position:absolute; top:35%;'>";
         dept_result +=       value;
         dept_result +=    "</span>";
         dept_result +=    "<span style='position:absolute; top:65%;'>";
         dept_result +=       $('#pda_empGrid').jqxGrid('getrowdata', row).vTeamName;
         dept_result +=    "</span>";
         dept_result += "</div>";

         return dept_result;
      }

      var textrenderer = function(row, column, value) {
         return "<textarea style='width:98%; height:98%; font-family:sans-serif; font-size:13px; padding-top:1px; padding-bottom:1px;'>" + value + "</textarea>";
      }

      var editorElement1 = null;
      var editorElement2 = null;
      var currentContent1 = '';
      var currentContent2 = '';

      $("#pda_empGrid").jqxGrid({
         width: '100%',
         height: '475px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: true,
         enabletooltips: true,
         rowsheight: 120,
         selectionmode: 'singlerow',
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         showstatusbar: true,
         showaggregates: true,
         columns: [{
            text: '사번',
            datafield: 'vEmplNo',
            editable: false,
            width: '70px',
            align: 'center',
            cellsalign: 'center',
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:center; border:white;"></div>';
            }
         }, {
            text: '성명',
            datafield: 'vName',
            editable: false,
            width: '56px',
            align: 'center',
            cellsalign: 'center',
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:center; border:white;"></div>';
            }
         }, {
            text: '직위',
            datafield: 'vPosName',
            editable: false,
            /*width: '90px',*/
            align: 'center',
            cellsalign: 'center',
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:center; border:white;"></div>';
            }
         }, {
            text: '부서',
            datafield: 'vDeptName',
            editable: false,
            width: '120px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: deptrenderer,
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:center; border:white;"></div>';
            }
         }, {
            text: '팀',
            hidden: true,
            datafield: 'vTeamName',
            editable: false,
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '의견',
            datafield: 'vContent',
            editable: true,
            width: '300px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: textrenderer,
            columntype: 'template',
            createeditor: function(row, cellvalue, editor, celltext, cellwidth, cellheight) {
               editorElement2 = $('<textarea id="customTextArea2' + row + '" style="font-family:sans-serif; font-size:13px; padding-top:1px; padding-bottom:1px;" readOnly></textarea>').prependTo(editor);
               editorElement2.jqxTextArea({
                  width: '100%',
                  height: '98%'
               });
            },
            initeditor: function(row, cellvalue, editor) {
               currentContent2 = '';
               if (cellvalue != null) {
                  editorElement2.val(cellvalue);
               }
               else {
                  editorElement2.val("");
               }
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.find('textarea').val();
            },
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:right;">전체 합계&nbsp;&nbsp;</div>';
            }
         }, {
            text: '기여율',
            datafield: 'nContribution',
            editable: false,
            width: '70px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'F1',
            aggregates: ['sum'],
            aggregatesrenderer: function(aggregates) {
               var renderstring = '';
               $.each(aggregates, function(key, value) {
                  renderstring += '<div id="cont_sum" style="background-color: #f6f6f6; position: relative; padding: 9px 4px; overflow: hidden;">' + value + '</div>';
               });
               return renderstring;
            }
         } ]
      });
   };

   var setupContForm = function() {
      //평가의견
      $("#pda_vReviewContent").jqxTextArea({
         width: "688px",
         height: "150px",
         theme: 'custom',
         disabled: false
      });
   };

   var setupEstiActionForm = function() {
      //승인
      $("#pda_BtnConfirm").jqxButton({
         width: '90px',
         height: '35px',
         disabled: true
      });
      //반려
      $("#pda_BtnReject").jqxButton({
         width: '90px',
         height: '35px',
         disabled: true
      });
      //저장
      $("#pda_BtnSave").jqxButton({
         width: '90px',
         height: '35px',
         disabled: true
      });
   }

   //주간업무보고 실적 윈도우
   var setupPdaWeekWindow = function() {
      var workGrid = $("#pda_empGrid");
      var offset = workGrid.offset();
      $("#pda_week_window").jqxWindow({
         position: {
            x: offset.left + 720,
            y: offset.top
         },
         showCollapseButton: false,
         showCloseButton: false,
         draggable: false,
         maxWidth: 2000,
         maxHeight: 1200,
         minWidth: 400,
         minHeight: 200,
         width: 708,
         height: 728,
         initContent: function() {
            $('#pda_week_window').jqxWindow('focus');
         }
      });

      //로딩바
      $("#pda_jqxLoader").jqxLoader({
         isModal: true,
         width: 200,
         height: 80,
         imagePosition: 'center'
      });

   };

   return {
      setViewState: setViewState,
      setupSearchField: setupSearchField,
      setupPrjGrid: setupPrjGrid,
      setupPrjForm: setupPrjForm,
      setupPurpose: setupPurpose,
      setupContGrid: setupContGrid,
      setupContForm: setupContForm,
      setupEstiActionForm: setupEstiActionForm,
      setupPdaWeekWindow: setupPdaWeekWindow
   }

};

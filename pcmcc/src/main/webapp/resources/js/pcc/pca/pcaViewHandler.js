var PcaViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setViewState = function(step, finish, confirm) {
      $("#pca_BtnLoad").jqxButton({ disabled:false });               //전분기 과제목표 가져오기
      $("#pca_BtnSave").jqxButton({ disabled:false });               //과제목표 저장

      $("#pca_BtnLoad").css("cursor", "");                            //마우스 오버 시 손모양 유지   2021-05-18
      $("#pca_BtnSave").css("cursor", "");

      if (step == "1") {
         $("#pca_BtnEmpAdd").jqxButton({ disabled:false });          //연구원 추가
         $("#pca_BtnEmpDel").jqxButton({ disabled:false });          //연구원 삭제
         $("#pca_BtnContAdd").jqxButton({ disabled:false });         //기여율 입력

         $("#pca_BtnEmpAdd").css("cursor", "");
         $("#pca_BtnEmpDel").css("cursor", "");
         $("#pca_BtnContAdd").css("cursor", "");

         $("#pca_BtnDone").jqxButton({ disabled:true });             //최종확인
         if (finish == "Y") {
            $("#pca_BtnContFinish").jqxButton({ disabled:false });   //기여율 입력 완료
            $("#pca_BtnContFinish").css("cursor", "");
         }
         else {
            $("#pca_BtnContFinish").jqxButton({ disabled:true });    //기여율 입력 완료
         }
      }
      else if (step == "2") {
         $("#pca_BtnEmpAdd").jqxButton({ disabled:true });           //연구원 추가
         $("#pca_BtnEmpDel").jqxButton({ disabled:true });           //연구원 삭제
         if (confirm == "Y") {
            $("#pca_BtnContAdd").jqxButton({ disabled:false });      //기여율 입력
            $("#pca_BtnContAdd").css("cursor", "");
         }
         else {
            $("#pca_BtnContAdd").jqxButton({ disabled:true });       //기여율 입력
         }
         $("#pca_BtnContFinish").jqxButton({ disabled:true });       //기여율 입력 완료
         $("#pca_BtnDone").jqxButton({ disabled:true });             //최종확인
      }
      else if (step == "3") {   /* 반려 */
         $("#pca_BtnEmpAdd").jqxButton({ disabled:false });          //연구원 추가
         $("#pca_BtnEmpDel").jqxButton({ disabled:false });          //연구원 삭제
         $("#pca_BtnContAdd").jqxButton({ disabled:false });         //기여율 입력
         $("#pca_BtnContFinish").jqxButton({ disabled:false });      //기여율 입력 완료

         $("#pca_BtnEmpAdd").css("cursor", "");
         $("#pca_BtnEmpDel").css("cursor", "");
         $("#pca_BtnContAdd").css("cursor", "");
         $("#pca_BtnContFinish").css("cursor", "");

         $("#pca_BtnDone").jqxButton({ disabled:true });             //최종확인
      }
      else if (step == "4") {   /* 승인 */
         $("#pca_BtnEmpAdd").jqxButton({ disabled:true });           //연구원 추가
         $("#pca_BtnEmpDel").jqxButton({ disabled:true });           //연구원 삭제
         $("#pca_BtnContAdd").jqxButton({ disabled:true });          //기여율 입력
         $("#pca_BtnContFinish").jqxButton({ disabled:true });       //기여율 입력 완료
         $("#pca_BtnDone").jqxButton({ disabled:false });            //최종확인
         $("#pca_BtnDone").css("cursor", "");
      }
      else if (step == "5") {   /* 최종 평가완료 */
         $("#pca_BtnEmpAdd").jqxButton({ disabled:true });           //연구원 추가
         $("#pca_BtnEmpDel").jqxButton({ disabled:true });           //연구원 삭제
         $("#pca_BtnContAdd").jqxButton({ disabled:true });          //기여율 입력
         $("#pca_BtnContFinish").jqxButton({ disabled:true });       //기여율 입력 완료
         $("#pca_BtnDone").jqxButton({ disabled:true });             //최종확인
      }
      else {
         $("#pca_BtnLoad").jqxButton({ disabled:true });             //전분기 과제목표 가져오기
         $("#pca_BtnSave").jqxButton({ disabled:true });             //과제목표 저장
         $("#pca_BtnEmpAdd").jqxButton({ disabled:true });           //연구원 추가
         $("#pca_BtnEmpDel").jqxButton({ disabled:true });           //연구원 삭제
         $("#pca_BtnContAdd").jqxButton({ disabled:true });          //기여율 입력
         $("#pca_BtnContFinish").jqxButton({ disabled:true });       //기여율 입력 완료
         $("#pca_BtnDone").jqxButton({ disabled:true });             //최종확인
      }
   }

   var setupSearchField = function() {
      //평가코드
      $("#pca_code").jqxComboBox({
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
      $("#pca_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var setupActionForm = function() {
      //전분기 과제목표 가져오기
      $("#pca_BtnLoad").jqxButton({
         width: '200px',
         height: '35px',
         disabled: true
      });
      //과제목표 저장
      $("#pca_BtnSave").jqxButton({
         width: '140px',
         height: '35px',
         disabled: true
      });
   };

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다.",
      currencysymbol: " "
   };

   //과제코드 그리드
   var setupPrjGrid = function() {

      $("#pca_prjGrid").jqxGrid({
         width: '100%',
         height: '200px',
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
         sortable: true,
         showsortmenuitems: false,
         columns: [{
            text: '과제코드',
            datafield: 'vProjectCode',
            width: '80px',
            align: 'center',
            cellsalign: 'center',
            sortable: true
         }, {
            text: '과제명',
            datafield: 'vProjectName',
            align: 'center',
            cellsalign: 'left',
            sortable: false
         }, {
            text: '과제책임자',
            datafield: 'vProjectPmName',
            width: '90px',
            align: 'center',
            cellsalign: 'center',
            sortable: false
         }, {
            text: '시작일',
            datafield: 'vStartDate',
            width: '100px',
            align: 'center',
            cellsalign: 'center',
            sortable: false
         }, {
            text: '종료일',
            datafield: 'vEndDate',
            width: '100px',
            align: 'center',
            cellsalign: 'center',
            sortable: false
         }, {
            text: '진행단계',
            datafield: 'vEstiStep',
            width: '150px',
            align: 'center',
            cellsalign: 'center',
            sortable: false,
            cellsrenderer: function(row, column, value) {
               var prjdata = $('#pca_prjGrid').jqxGrid('getrowdata', row);
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
      $("#pca_vDeptName").jqxInput({
         height: '30px',
         width: '120px',
         theme: 'custom',
         disabled: true
      });
      //PM
      $("#pca_vProjectPm").jqxInput({
         height: '30px',
         width: '120px',
         theme: 'custom',
         disabled: true
      });
      //과제코드
      $("#pca_vProjectCode").jqxInput({
         height: '30px',
         width: '120px',
         theme: 'custom',
         disabled: true
      });
      //부처명
      $("#pca_vGovName").jqxInput({
         height: '30px',
         width: '120px',
         theme: 'custom',
         disabled: true
      });
      //과제명
      $("#pca_vProjectName").jqxInput({
         height: '30px',
         width: '477px',
         theme: 'custom',
         disabled: true
      });
      //사업명
      $("#pca_vProjectDivision").jqxInput({
         height: '30px',
         width: '477px',
         theme: 'custom',
         disabled: true
      });
   };

   var setupPurpose = function() {
      //과제목표
      $("#pca_vProjectGoal").jqxTextArea({
         width: '697px',
         height: '130px',
         theme: 'custom',
         disabled: false
      });

      //평가 기간내 Milestone
      $("#pca_vProjectMilestone").jqxTextArea({
         width: '697px',
         height: '130px',
         theme: 'custom',
         disabled: false
      });
   };

   var setupContActionForm = function() {
      //연구원 추가
      $("#pca_BtnEmpAdd").jqxButton({
         width: '120px',
         height: '35px',
         disabled: true
      });
      //연구원 삭제
      $("#pca_BtnEmpDel").jqxButton({
         width: '120px',
         height: '35px',
         disabled: true
      });
      //참여연구원 기여율 저장
      $("#pca_BtnContAdd").jqxButton({
         width: '190px',
         height: '35px',
         disabled: true
      });
      //과제 기여율입력 완료
      $("#pca_BtnContFinish").jqxButton({
         width: '170px',
         height: '35px',
         disabled: true
      });
      //최종확인
      $("#pca_BtnDone").jqxButton({
         width: '110px',
         height: '35px',
         disabled: true
      });
   };

   //연구원 추가 팝업
   function addEmpPopup() {
      var popupInfo = {
         title: '참여연구원 조회',
         width: '800px',
         height: '570px'
      };

      //팝업 위치 계산
      var top = Math.max(0, (($(window).height() - popupInfo.height) / 2)
              + $(document).scrollTop());
      var left = Math.max(0, (($(window).width() - popupInfo.width) / 2)
              + $(document).scrollLeft());

      //jqxWindow를 통한 팝업 객체 생성
      $("#pca_popup").jqxWindow({
         width: popupInfo.width,
         height: popupInfo.height,
         position: {
            x: left,
            y: top
         },
         autoOpen: false,
         isModal: true,
         modalOpacity: 0.3,
         showCloseButton: false,
         showCollapseButton: false,
         title: popupInfo.title,
         theme: 'custom',
         initContent: function() {
            $("#pca_pop_grid").jqxGrid({
               width: '100%',
               height: 300,
               theme: 'custom',
               localization: localizationobj,
               sortable: true,
               showsortmenuitems: false,
               columns: [{
                  text: '사번',
                  editable: false,
                  datafield: 'vEmplNo',
                  width: '80px',
                  cellsalign: 'center',
                  align: 'center'
               },
               {
                  text: '성명',
                  editable: false,
                  datafield: 'vName',
                  width: '80px',
                  cellsalign: 'center',
                  align: 'center'
               },
               {
                  text: '부서명',
                  editable: false,
                  datafield: 'vDeptName',
                  cellsalign: 'center',
                  align: 'center'
               },
               {
                  text: '팀명',
                  editable: false,
                  datafield: 'vTeamName',
                  width: '250px',
                  cellsalign: 'center',
                  align: 'center'
               },
               {
                  text: '직위명',
                  editable: false,
                  datafield: 'vPosName',
                  width: '100px',
                  cellsalign: 'center',
                  align: 'center'
               }]
            });

            //부서명
            $("#pca_pop_dept").jqxComboBox({
               selectedIndex: 0,
               source: transaction.getDeptNameList(),
               displayMember: 'vDeptName',
               valueMember: 'vDeptName',
               width: '220px',
               height: '25px',
               theme: 'custom',
               disabled: false,
               autoDropDownHeight: true
            });
            $("#pca_pop_dept").jqxComboBox('insertAt', { label: '전체', value: ''}, 0);

            //이름
            $("#pca_pop_name").jqxInput({
               height: 30,
               width: 100,
               theme: 'custom',
               disabled: false
            });

            //선택
            $("#pca_pop_select").jqxButton({
               width: '65px',
               template: "success"
            });

            //닫기
            $("#pca_pop_close").jqxButton({
               width: '65px',
               template: "warning"
            });

            //조회
            $("#pca_pop_search").on("click", function() {
               $("#pca_pop_grid").jqxGrid("clearselection");
               $("#pca_pop_grid").jqxGrid({ source: transaction.getAddEmpList() });
            });

            //조회 - 엔터키
            $("#pca_pop_name").keypress(function(e) {
               var key = e.which;
               if (key == 13) {
                  $("#pca_pop_grid").jqxGrid("clearselection");
                  $("#pca_pop_grid").jqxGrid({ source: transaction.getAddEmpList() });
               }
            });

            //추가
            $("#pca_pop_select").on('click', function() {
               var pop_select_idx = $("#pca_pop_grid").jqxGrid('getselectedrowindex');
               transaction.addEmp($("#pca_pop_grid").jqxGrid('getrowdata', pop_select_idx).vEmplNo).done(function(result) {
                  if (result > -1) {
                     alert("추가되었습니다");
                     $("#pca_pop_grid").jqxGrid("clearselection");
                     $("#pca_pop_grid").jqxGrid({ source: transaction.getAddEmpList() });
                  }
                  else {
                     alert("추가에 실패하였습니다 !");
                  }
               });
            });

            //닫기
            $("#pca_pop_close").on('click', function() {
               $("#pca_empGrid").jqxGrid("clearselection");
               $("#pca_empGrid").jqxGrid({ source: transaction.getEmpContributionList($("#pca_StoredEstiCode").val(), $("#pca_StoredProjectCode").val()) });
               $("#pca_popup").jqxWindow('close');
            });
         }
      });
      $("#pca_popup").jqxWindow('open');
   };

   //참여연구원 기여율 그리드
   var setupContGrid = function() {

      var imagerenderer = function(row, datafield, value) {
         if (value == 'new') {
            return '<img height="25" width="25" style="margin-top:49px;" src="/resources/images/blt_add.png"/>';
         }
         else if (value == 'mod') {
            return '<img height="25" width="25" style="margin-top:49px;" src="/resources/images/blt_edit.png"/>';
         }
         else if (value == 'del') {
            return '<img height="25" width="25" style="margin-top:49px;" src="/resources/images/blt_del.png"/>';
         }
         else {
            return '';
         }
      };

      var deptrenderer = function(row, column, value) {
         var dept_result = "";

         dept_result += "<div style='width:354px; height:70px; font-family:sans-serif; font-size:13px; padding-top:5px; padding-bottom:5px;'>";
         dept_result +=    "<span style='position:absolute; top:35%; left:50%; transform: translate(-50%, -50%);'>";
         dept_result +=       value;
         dept_result +=    "</span>";
         dept_result +=    "<span style='position:absolute; top:65%; left:50%; transform: translate(-50%, -50%);'>";
         dept_result +=       $('#pca_empGrid').jqxGrid('getrowdata', row).vTeamName;
         dept_result +=    "</span>";
         dept_result += "</div>";

         return dept_result;
      };

      var textrenderer = function(row, column, value) {
         return "<textarea style='width:98%; height:96%; font-family:sans-serif; font-size:13px; padding-top:5px; padding-bottom:5px;'>" + value + "</textarea>";
      };

      var contentrenderer = function(row, column, value) {
         var contentrowdata = $('#pca_empGrid').jqxGrid('getrowdata', row);
         if (contentrowdata.vFinish == "Y") {
            return "<textarea style='width:98%; height:100%; background-color:yellow; font-family:sans-serif; font-size:13px; padding-top:5px; padding-bottom:5px;'>" + value + "</textarea>";
         }
         else {
            return "<textarea style='width:98%; height:100%; font-family:sans-serif; font-size:13px; padding-top:5px; padding-bottom:5px;'>" + value + "</textarea>";
         }
      };

      var customrowclass = function(row, columnfield, value) {
         var data = $('#pca_empGrid').jqxGrid('getrowdata', row);
         if (data.vFinish == "Y") {
            return "grid-editable-cell-bg";
         }
      };

      var rowEdit = function(row) {
         var selectedrowidx = $("#pca_empGrid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#pca_empGrid").jqxGrid('getrowdata', row);
         if (selectedrowdata) {
            if (selectedrowdata.vFinish == "Y") {
               return true;
            }
            else {
               return false;
            }
         }
         return false;
      };

      var editorElement1 = null;
      var editorElement2 = null;
      var currentContent1 = '';
      var currentContent2 = '';

      $("#pca_empGrid").jqxGrid({
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
         showstatusbar: true,
         showaggregates: true,
         handlekeyboardnavigation: function(event) {
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;

            if (key == 13) {

               if (editorElement2 != null) {
                  var txtArea2 = editorElement2[0];
                  var txtValue2 = txtArea2.value;
                  var selectPos2 = txtArea2.selectionStart;
                  var beforeTxt2 = txtValue2.substring(0, selectPos2);
                  var afterTxt2 = txtValue2.substring(txtArea2.selectionEnd, txtValue2.length);

                  currentContent2 = beforeTxt2 + "\n" + afterTxt2;
                  editorElement2.val(currentContent2);

                  var pos2 = (selectPos2+1);
                  var obj2 = document.getElementById("customTextArea20TextArea");
               }

               if (obj2 != null) {
                  if (obj2.setSelectionRange) {
                     obj2.focus();
                     obj2.setSelectionRange(pos2, pos2);
                  }
                  else if (obj2.createTextRange) {
                     var c2 = obj2.crateTextRange();
                     c2.move("character", pos2);
                     c2.select();
                  }
               }

               return true;
            }
            else if (key == 27) {
               return true;
            }
         },
         columns: [{
            text: '',
            editable: false,
            datafield: 'editFlag',
            width: '25px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer,
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:center; border:white;"></div>';
            }
         }, {
            text: '사번',
            editable: false,
            datafield: 'vEmplNo',
            width: '70px',
            align: 'center',
            cellsalign: 'center',
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:center; border:white;"></div>';
            }
         }, {
            text: '성명',
            editable: false,
            datafield: 'vName',
            width: '62px',
            align: 'center',
            cellsalign: 'center',
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:center; border:white;"></div>';
            }
         }, {
            text: '직위',
            editable: false,
            datafield: 'vPosName',
            align: 'center',
            cellsalign: 'center',
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:center; border:white;"></div>';
            }
         }, {
            text: '부서',
            editable: false,
            hidden: true,
            datafield: 'vDeptName',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '팀',
            editable: false,   //hidden 이어도 수정 못하도록 설정 할 것
            hidden: true,
            datafield: 'vTeamName',
            width: '170px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '의견',
            editable: true,
            datafield: 'vContent',
            width: '300px',
            align: 'center',
            cellsalign: 'center',
            cellclassname: customrowclass,
            cellsrenderer: contentrenderer,
            columntype: 'template',
            createeditor: function(row, cellvalue, editor, celltext, cellwidth, cellheight) {
               editorElement2 = $('<textarea id="customTextArea2' + row + '" style="font-family:sans-serif; font-size:13px; padding-top:1px; padding-bottom:1px;"></textarea>').prependTo(editor);
               editorElement2.jqxTextArea({
                  width: '100%',
                  height: '100%'
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
               return '<div style="background-color:#f6f6f6; position:relative; padding-top:9.5px; height:100%; overflow:hidden; text-align:right; ">전체 합계&nbsp;&nbsp;</div>';
            }
         }, {
            text: '기여율',
            editable: true,
            datafield: 'nContribution',
            width: '60px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'F1',
            cellbeginedit: rowEdit,
            cellclassname: customrowclass,
            aggregates: ['sum'],
            aggregatesrenderer: function(aggregates) {
               var renderstring = '';
               $.each(aggregates, function(key, value) {
                  renderstring += '<div id="cont_sum" style="background-color: #f6f6f6; position: relative; padding: 9px 4px; overflow: hidden;">' + value + '</div>';
               });
               return renderstring;
            }
         }, {
            text: '완료',
            editable: false,
            datafield: 'vFinish',
            width: '50px',
            align: 'center',
            cellsalign: 'center',
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:right;"></div>';
            }
         }, {
            text: '확인',
            editable: false,
            datafield: 'vConfirm',
            width: '50px',
            align: 'center',
            cellsalign: 'center',
            aggregatesrenderer: function(aggregates) {
               return '<div style="background-color:#f6f6f6;position:relative;padding-top:9.5px;width:100%;height:100%;overflow: hidden;text-align:right;"></div>';
            }
         }]
      });

      //수정 시 이벤트
      $("#pca_empGrid").on('cellvaluechanged',function(event) {
         var args = event.args;

         if (args.datafield != "editFlag" && args.datafield != "vWork") {
            var selectedrowindex = args.rowindex;
            var editFlag = $("#pca_empGrid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");

            var newvalue = args.newvalue;
            if (typeof newvalue == "undefined" || newvalue == "undefined") {
               newvalue = "";
            }

            var oldvalue = args.oldvalue;
            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
               oldvalue = "";
            }

            if (editFlag != "new" && newvalue != oldvalue) {
               $("#pca_empGrid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
            }
         }
      });

   };

   var setupContForm = function() {
      //평가의견
      $("#pca_vReviewContent").jqxTextArea({
         width: '688px',
         height: '150px',
         theme: 'custom',
         disabled: false
      });
   };

   //주간업무보고 실적 윈도우
   var setupWeekWindow = function() {
      var workGrid = $("#pca_empGrid");
      var offset = workGrid.offset();
      $("#pca_week_window").jqxWindow({
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
            $('#pca_week_window').jqxWindow('focus');
         }
      });

      //로딩바
      $("#pca_jqxLoader").jqxLoader({
         isModal: true,
         width: 200,
         height: 80,
         imagePosition: 'center'
      });

   };

   return {
      setViewState: setViewState,
      setupSearchField: setupSearchField,
      setupActionForm: setupActionForm,
      setupPrjGrid: setupPrjGrid,
      setupPrjForm: setupPrjForm,
      setupPurpose: setupPurpose,
      setupContActionForm: setupContActionForm,
      addEmpPopup: addEmpPopup,
      setupContGrid: setupContGrid,
      setupContForm: setupContForm,
      setupWeekWindow: setupWeekWindow
   }

}

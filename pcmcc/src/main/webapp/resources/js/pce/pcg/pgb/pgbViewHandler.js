var PgbViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#pgb_searchCode").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getEstiCodeList(),
         displayMember: 'vEstiCodeName',
         valueMember: 'vEstiCode',
         width: '280px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });

      //진행단계
      $("#pgb_searchStep").jqxComboBox({
         selectedIndex: 0,
         source: transaction.getEstiStep(),
         displayMember: 'vItemName',
         valueMember: 'vItemCode',
         width: '240px',
         height: '25px',
         theme: 'custom',
         disabled: false,
         autoDropDownHeight: true
      });

      //조회 버튼
      $("#pgb_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var setupPgbGrid = function() {
      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      var imagerenderer = function(row, datafield, value) {
         if (value == 'new') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_add.png"/>';
         }
         else if (value == 'mod') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_edit.png"/>';
         }
         else if (value == 'del') {
            return '<img height="25" width="25" style="margin-top:4px;" src="/resources/images/blt_del.png"/>';
         }
         else {
            return '';
         }
      }

      var rowEdit = function(row) {
         var selectedrowindexrowedit = $("#pgb_grid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#pgb_grid").jqxGrid('getrowdata', selectedrowindexrowedit);
         if (selectedrowdata) {
            if (selectedrowdata.editFlag == "new") {
               return true;
            }
            else {
               return false;
            }
         }
         return false;
      }

      //과제코드 목록 그리드
      $("#pgb_grid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         disabled: false,
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         enabletooltips: true,
         showtoolbar: true,
         sortable: true,
         showsortmenuitems: false,
         filterable: true,
         showfilterrow: true,
         rendertoolbar: function (statusbar) {
            var container = $("<div style='overflow: hidden; position: relative; margin: 5px;'></div>");
            var addButton = $("<button class='btn-frame2 btn-line btn-line-add-img' style='margin-right:5px; float:right; backgroud-color:#fff; cursor:pointer;'>행추가</button>");
            var deleteButton = $("<button class='btn-frame2 btn-line btn-line-delete-img' style='margin-right:5px; float:right; backgroud-color:#fff; cursor:pointer;'>행삭제</button>");
            var saveButton = $("<button class='btn-frame btn-s-save' style='margin-right: 5px;float:right;'>저장</button>");
            container.append(saveButton);
            container.append(deleteButton);
            container.append(addButton);
            statusbar.append(container);
            addButton.jqxButton({
               width: 65,
               height: 25
            });
            deleteButton.jqxButton({
               width: 65,
               height: 25
            });
            saveButton.jqxButton({
               width: 65,
               height: 25
            });
            addButton.click(function(event) {
               if (!$("#pgb_grid").jqxGrid('disabled')) {
                  var row = {};
                  row["editFlag"] = "new";
                  row["vEstiCode"] = $("#pgb_searchCode").jqxComboBox('val');
                  row["vProjectCode"] = "";
                  row["vProjectName"] = "";
                  row["vDeptName"] = "";
                  row["vGovName"] = "";
                  row["vProjectDivision"] = "";
                  row["vTotStartDate"] = "";
                  row["vTotEndDate"] = "";
                  row["vStartDate"] = "";
                  row["vEndDate"] = "";
                  row["vProjectPm"] = "";
                  row["vProjectPmName"] = "";
                  row["vProjectEva"] = "";
                  row["vProjectEvaName"] = "";
                  row["vProjectGoal"] = "";
                  row["vProjectMilestone"] = "";
                  row["vEstiStep"] = "1";
                  row["dsp_vEstiStep"] = "PM 평가중";
                  row["vDueDate1"] = "";
                  row["vDueDate2"] = "";
                  row["vDueDate3"] = "";
                  row["vDueDate4"] = "";
                  row["vDueDate5"] = "";
                  $("#pgb_grid").jqxGrid('addrow', null, row, 'first');
               }
            });

            deleteButton.click(function(event) {
               if (!$("#pgb_grid").jqxGrid('disabled')) {
                  var selectedrowindex = $("#pgb_grid").jqxGrid('getselectedrowindex');
                  var id = $("#pgb_grid").jqxGrid('getrowid', selectedrowindex);
                  var editFlag = $("#pgb_grid").jqxGrid('getcellvalue',selectedrowindex, "editFlag");

                  if (editFlag == "new") {
                     $("#pgb_grid").jqxGrid('deleterow', id);
                  }
                  else {
                     $("#pgb_grid").jqxGrid('setcellvalue', selectedrowindex,"editFlag", "del");
                  }
               }
            });

            //save
            saveButton.click(function(event) {
               if (!$("#pgb_grid").jqxGrid('disabled')) {
                  var vali = model.getVali();
                  if (vali) {
                     var rows = $("#pgb_grid").jqxGrid('getrows');
                     transaction.saveProjectCode(rows).then(function(result) {
                        if (result > -1) {
                           $("#pgb_grid").jqxGrid('clearselection');
                           $("#pgb_grid").jqxGrid({ source: transaction.getProjectCodeList() });
                           
                           $("#pgb_count").text($("#pgb_grid").jqxGrid("getrows").length);
                           alert("과제코드가 저장되었습니다.");
                        }
                        else {
                           alert("저장에 실패하였습니다 !");
                        }
                     }, function() {
                        console.log("과제코드 저장 실패");
                     });
                  }
               }
            });
         },
         columns: [{
            text: '',
            editable: false,
            filterable: false,
            datafield: 'editFlag',
            width: '25px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer
         }, {
            text: 'vEstiCode',
            editable: false,
            datafield: 'vEstiCode',
            width: '25px',
            hidden: true
         }, {
            text: '과제코드',
            editable: true,
            datafield: 'vProjectCode',
            width: '90px',
            align: 'center',
            cellsalign: 'center',
            cellbeginedit: rowEdit,
            cellvaluechanging: function(rowindex, datafield, columntype, oldvalue, newvalue) {
               transaction.checkProject(newvalue).done(function(result) {
                  if (result.length == 1) {
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectName", result[0].vKeyProjectName);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vDeptName", result[0].vDeptName);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vGovName", result[0].vGovName);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectDivision", result[0].vProjectDivision);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vTotStartDate", result[0].vTotStartDate);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vTotEndDate", result[0].vTotEndDate);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vStartDate", result[0].vStartDate);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vEndDate", result[0].vEndDate);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPm", result[0].vProjectPm);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPmName", result[0].vProjectPmName);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectGoal", result[0].vProjectGoal);
                  }
                  else {
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectCode", "");
                     var spmParam = {
                        "vProjectCode": "",
                        "vProjectName": ""
                     };
                     var spmCallBack = function() {
                        var _data = commonDialog.returnData;
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectCode", _data.vProjectCode);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectName", _data.vKeyProjectName);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vDeptName", _data.vDeptName);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vGovName", _data.vGovName);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectDivision", _data.vProjectDivision);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vTotStartDate", _data.vTotStartDate);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vTotEndDate", _data.vTotEndDate);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vStartDate", _data.vStartDate);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vEndDate", _data.vEndDate);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPm", _data.vProjectPm);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPmName", _data.vProjectPmName);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectGoal", _data.vProjectGoal);
                     }
                     commonDialog.open('spm', spmParam, spmCallBack);
                  }
               });
            }
         }, {
            text: '과제명',
            editable: true,
            datafield: 'vProjectName',
            width: '200px',
            align: 'center',
            cellsalign: 'left'
         }, {
            text: '센터명',
            editable: true,
            datafield: 'vDeptName',
            width: '120px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '부처명',
            editable: true,
            datafield: 'vGovName',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '사업명',
            editable: true,
            datafield: 'vProjectDivision',
            width: '180px',
            align: 'center',
            cellsalign: 'left'
         }, {
            text: '진행 단계',
            editable: true,
            datafield: 'vEstiStep',
            displayfield: 'dsp_vEstiStep',
            width: '180px',
            align: 'center',
            cellsalign: 'center',
            columntype: 'dropdownlist',
            createeditor: function(row, value, editor) {
               editor.jqxDropDownList({
                  source: transaction.getEstiStep(),
                  displayMember: 'vItemName',
                  valueMember: 'vItemCode',
                  autoDropDownHeight: true
               });
            }
         }, {
            text: '총과제 시작일',
            editable: true,
            datafield: 'vTotStartDate',
            width: '120px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({titleFormat: ["Y", "yyyy'년'", "yyyy"]});
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }, {
            text: '총과제 종료일',
            editable: true,
            datafield: 'vTotEndDate',
            width: '120px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({titleFormat: ["Y", "yyyy'년'", "yyyy"]});
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }, {
            text: '과제 시작일',
            editable: true,
            datafield: 'vStartDate',
            width: '120px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({titleFormat: ["Y", "yyyy'년'", "yyyy"]});
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }, {
            text: '과제 종료일',
            editable: true,
            datafield: 'vEndDate',
            width: '120px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({ titleFormat: ["Y", "yyyy'년'", "yyyy"] });
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }, {
            text: '과제 PM',
            editable: true,
            datafield: 'vProjectPm',
            width: '80px',
            align: 'center',
            cellsalign: 'center',
            cellvaluechanging: function(rowindex, datafield, columntype, oldvalue, newvalue) {
               var vPmEmplNo = "";
               var vPmName = "";
               if ($.isNumeric(newvalue)) {
                  vPmEmplNo = newvalue;
               }
               else {
                  vPmName = newvalue;
               }
               transaction.getHrInfo(vPmEmplNo, vPmName, 'N').done(function(result) {
                  if (result.length == 1) {
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPm", result[0].vEmplNo);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPmName", result[0].vName);

                  }
                  else if (result.length == 0) {
                     alert("사번을 찾을 수 없습니다!");
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPm", "");
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPmName", "");
                  }
                  else {
                     //2명 이상 조회되는 경우
                     var empParam = {
                        "vEmplNo": vPmEmplNo,
                        "vName": vPmName,
                        "vRetire": "N"
                     }
                     commonDialog.open('emp',empParam,function() {
                        var _data = commonDialog.returnData;
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPm", _data.vEmplNo);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectPmName", _data.vName);
                     });
                  }
               });
            }
         }, {
            text: '과제 PM명',
            editable: false,
            datafield: 'vProjectPmName',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제 평가자',
            editable: true,
            datafield: 'vProjectEva',
            width: '80px',
            align: 'center',
            cellsalign: 'center',
            cellvaluechanging: function(rowindex, datafield, columntype, oldvalue, newvalue) {
               var vEvaEmplNo = "";
               var vEvaName = "";
               if ($.isNumeric(newvalue)) {
                  vEvaEmplNo = newvalue;
               }
               else {
                  vEvaName = newvalue;
               }
               transaction.getHrInfo(vEvaEmplNo, vEvaName, 'N').done(function(result) {
                  if (result.length == 1) {
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectEva", result[0].vEmplNo);
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectEvaName", result[0].vName);

                  }
                  else if (result.length == 0) {
                     alert("사번을 찾을 수 없습니다!");
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectEva", "");
                     $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectEvaName", "");
                  }
                  else {
                     //2명 이상 조회되는 경우
                     var empParam = {
                        "vEmplNo": vEvaEmplNo,
                        "vName": vEvaName,
                        "vRetire": "N"
                     }
                     commonDialog.open('emp',empParam,function() {
                        var _data = commonDialog.returnData;
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectEva", _data.vEmplNo);
                        $("#pgb_grid").jqxGrid('setcellvalue', rowindex, "vProjectEvaName", _data.vName);
                     });
                  }
               });
            }
         }, {
            text: '과제 평가자명',
            editable: false,
            datafield: 'vProjectEvaName',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제 목표',
            editable: true,
            datafield: 'vProjectGoal',
            width: '120px',
            align: 'center',
            cellsalign: 'left'
         }, {
            text: '평가 기간내 Milestone',
            editable: true,
            datafield: 'vProjectMilestone',
            width: '150px',
            align: 'center',
            cellsalign: 'left'
         }, {
            text: '연구원 입력 종료 일자',
            editable: true,
            datafield: 'vDueDate1',
            width: '150px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({ titleFormat: ["Y", "yyyy'년'", "yyyy"] });
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }, {
            text: '기여도 평가 종료 일자',
            editable: true,
            datafield: 'vDueDate2',
            width: '150px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({ titleFormat: ["Y", "yyyy'년'", "yyyy"] });
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }, {
            text: '평가확인 종료 일자',
            editable: true,
            datafield: 'vDueDate3',
            width: '150px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({titleFormat: ["Y", "yyyy'년'", "yyyy"]});
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }, {
            text: '기여도 확인 종료 일자',
            editable: true,
            datafield: 'vDueDate4',
            width: '150px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({titleFormat: ["Y", "yyyy'년'", "yyyy"]});
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }, {
            text: '최종 확인 종료 일자',
            editable: true,
            datafield: 'vDueDate5',
            width: '150px',
            align: 'center',
            cellsalign: 'center',
            cellsformat: 'yyyy-MM-dd',
            columntype: 'datetimeinput',
            initeditor: function(row, cellvalue, editor) {
               editor.jqxDateTimeInput({
                  theme: 'custom',
                  formatString: "yyyy-MM-dd",
                  culture: 'ko-KR'
               });
               $(".jqx-calendar").jqxCalendar({titleFormat: ["Y", "yyyy'년'", "yyyy"]});
               $(".jqx-datetimeinput input").css("height","18px");
            },
            geteditorvalue: function(row, cellvalue, editor) {
               return editor.val();
            }
         }]
      });

      //수정 시 이벤트
      $("#pgb_grid").on('cellvaluechanged',function(event) {
         var args = event.args;

         if (args.datafield != "editFlag") {
            var selectedrowindex = args.rowindex;
            var editFlag = $("#pgb_grid").jqxGrid('getcellvalue', selectedrowindex, "editFlag");

            var newvalue = args.newvalue;
            if (typeof newvalue == "undefined" || newvalue == "undefined") {
               newvalue = "";
            }

            var oldvalue = args.oldvalue;
            if (typeof oldvalue == "undefined" || oldvalue == "undefined") {
               oldvalue = "";
            }

            if (editFlag != "new" && newvalue != oldvalue) {
               $("#pgb_grid").jqxGrid('setcellvalue', selectedrowindex, "editFlag", "mod");
            }
         }
      });

      //휴지통 버튼 클릭
      $("#pgb_grid").on('cellclick',function(event) {
         var args = event.args;
         if (args.datafield == "editFlag" && args.value=="del") {
            $("#pgb_grid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
         }
      });

      $("#toolbarpgb_grid").removeClass("jqx-widget-header");
      $("#toolbarpgb_grid").removeClass("jqx-widget-header-custom");
   };

   var setupActionButton = function() {
      $("#pgb_BtnUpload").jqxButton({
         width: '140px',
         height: '35px'
      });

      $("#pgb_BtnExcel").jqxButton({
         width: '100px',
         height: '35px'
      });
   }

   var setupPgbHelp = function() {
      var pgb_x = ($(window).width() / 2) - 300;
      var pgb_y = $(window).height() - 600;

      $("#pgb_WinHelp").jqxWindow({
         width: 610,
         height: 335,
         resizable: false,
         position: {
            x: pgb_x,
            y: pgb_y
         },
         isModal: true,
         okButton: $("#pgb_BtnOk"),
         autoOpen: false,
         initContent: function() {
            $("#pgb_BtnOk").jqxButton({
               width: '65px',
               template: 'primary'
            });
            $("#pgb_BtnOk").focus();
         },
         theme: 'custom'
      });
   };

   return {
      setupSearchField: setupSearchField,
      setupPgbGrid: setupPgbGrid,
      setupActionButton: setupActionButton,
      setupPgbHelp: setupPgbHelp
   }

}

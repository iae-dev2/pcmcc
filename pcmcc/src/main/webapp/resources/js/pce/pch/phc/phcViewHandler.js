var PhcViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setupSearchField = function() {
      //평가코드
      $("#phc_code").jqxComboBox({
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

      //조회 버튼
      $("#phc_BtnSearch").jqxButton({
         width: '75px',
         height: '35px'
      });
   };

   var localizationobj = {
      emptydatastring: "검색 결과가 없습니다.",
      currencysymbol: " "
   };

   //과제코드 목록 그리드
   var setupPrjGrid = function() {

      $("#phc_prjGrid").jqxGrid({
         width: '100%',
         height: '350px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: true,
         enabletooltips: true,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: false,
         sortable: true,
         filterable: true,
         showfilterrow: true,
         showsortmenuitems: false,
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
            cellsalign: 'left'
         }, {
            text: '과제책임자',
            datafield: 'vProjectPmName',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '평가자',
            datafield: 'vProjectEvaName',
            width: '100px',
            align: 'center',
            cellsalign: 'center'
         }, {
            datafield: 'vEstiCode',
            hidden: true
         }]
      });
   };

   //과제 참여연구원 그리드
   var setupEmpGrid = function() {

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
         var selectedrowindex = $("#phc_empGrid").jqxGrid('getselectedrowindex');
         var selectedrowdata = $("#phc_empGrid").jqxGrid('getrowdata', selectedrowindex);
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

      $("#phc_empGrid").jqxGrid({
         width: '100%',
         height: '450px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         rowsheight: 35,
         selectionmode: 'singlerow',
         editable: true,
         editmode: 'click',   //클릭 시 수정 가능
         enabletooltips: false,
         showtoolbar: true,
         rendertoolbar: function(statusbar) {
            var container = $("<div style='overflow:hidden; position:relative; margin:5px;'></div>");
            var addButton = $("<button class='btn-frame2 btn-line btn-line-add-img' style='margin-right:5px; float:right; backgroud-color:#fff; cursor:pointer;'>행추가</button>");
            var deleteButton = $("<button class='btn-frame2 btn-line btn-line-delete-img' style='margin-right:5px; float:right; backgroud-color:#fff; cursor:pointer;'>행삭제</button>");
            var saveButton = $("<button class='btn-frame btn-s-save' style='margin-right:5px; float:right;'>저장</button>");
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
               if ($('#phc_prjGrid').jqxGrid('getselectedrowindex') < 0) {
                  alert("선택된 과제가 없습니다 !");
               }
               else {
                  var prjdata = $("#phc_prjGrid").jqxGrid("getrowdata", $('#phc_prjGrid').jqxGrid('getselectedrowindex'));
                  if (!$("#phc_empGrid").jqxGrid('disabled')) {
                     var row = {};
                     row["editFlag"] = "new";
                     row["vEmplNo"] = "";
                     row["vName"] = "";
                     row["vDeptName"] = "";
                     row["vPosName"] = "";
                     row["vTeamName"] = "";
                     row["vEstiCode"] = prjdata.vEstiCode;
                     row["vProjectCode"] = prjdata.vProjectCode;
                     $("#phc_empGrid").jqxGrid('addrow', null, row, 'first');
                  }
               }
            });

            deleteButton.click(function(event) {
               if ($("#phc_StoredEstiCode").val() != "" && $("#phc_StoredProjectCode").val() != "") {
                  var selectedrowindex = $("#phc_empGrid").jqxGrid('getselectedrowindex');
                  var id = $("#phc_empGrid").jqxGrid('getrowid', selectedrowindex);
                  var editFlag = $("#phc_empGrid").jqxGrid('getcellvalue',selectedrowindex, "editFlag");

                  if (editFlag == "new") {
                     $("#phc_empGrid").jqxGrid('deleterow', id);
                  }
                  else {
                     $("#phc_empGrid").jqxGrid('setcellvalue', selectedrowindex,"editFlag", "del");
                  }
               }
               else {
                  alert("과제코드 목록에 선택된 항목이 없습니다!");
               }
            });

            //save
            saveButton.click(function(event) {
               if ($("#phc_StoredEstiCode").val() != "" && $("#phc_StoredProjectCode").val() != "") {
                  var rows = $("#phc_empGrid").jqxGrid('getrows');
                  transaction.saveEmpGrid(rows).then(function(result) {

                     if (result > -1) {
                        $("#phc_empGrid").jqxGrid('clearselection');
                        $("#phc_empGrid").jqxGrid({
                           source: transaction.getPhcEmpList($("#phc_StoredEstiCode").val(), $("#phc_StoredProjectCode").val())
                        });
                        $("#phc_count").text($("#phc_prjGrid").jqxGrid("getrows").length);
                        alert("과제 참여연구원이 저장되었습니다.");
                     }
                     else {
                        alert("저장에 실패하였습니다 !");
                     }
                  }, function() {
                     console.log("과제 참여연구원 저장 실패");
                  });
               }
               else {
                  alert("과제코드 목록에 선택된 항목이 없습니다!");
               }
            });
         },
         columns: [{
            text: '',
            datafield: 'editFlag',
            width: '25px',
            editable: false,
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: imagerenderer
         }, {
            text: '사번',
            datafield: 'vEmplNo',
            width: '140px',
            editable: true,
            align: 'center',
            cellbeginedit: rowEdit,
            cellsalign: 'center',
            cellvaluechanging: function(rowindex, datafield, columntype, oldvalue, newvalue) {
               var vParamEmplNo = "";
               var vParamName = "";
               if ($.isNumeric(newvalue)) {
                  vParamEmplNo = newvalue;
               }
               else {
                  vParamName = newvalue;
               }
               transaction.getHrInfo(vParamEmplNo, vParamName, 'N').done(function(result) {
                  if (result.length == 1) {
                     $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vEmplNo", result[0].vEmplNo);
                     $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vName", result[0].vName);

                     if (result[0].vPosCode) {
                        $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vPosName", result[0].vPosName);
                     }
                     else {
                        $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vPosName", "");
                     }

                     if (result[0].vTeamCode) {
                        $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vTeamName", result[0].vTeamName);
                     }
                     else {
                        $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vTeamName", "");
                     }

                  }
                  else if (result.length == 0) {
                     alert("사번을 찾을 수 없습니다!");
                     $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vEmplNo", "");
                     $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vName", "");
                     $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vPosName", "");
                     $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vTeamName", "");
                  }
                  else {
                     //2명 이상 조회되는 경우
                     var empParam = {
                        "vEmplNo": vParamEmplNo,
                        "vName": vParamName,
                        "vRetire": "N"
                     }
                     commonDialog.open('emp',empParam,function() {
                        var _data = commonDialog.returnData;
                        $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vEmplNo", _data.vEmplNo);

                        $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vName", _data.vName);

                        if (_data.vPosCode) {
                           $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vPosName", _data.vPosName);
                        }
                        else {
                           $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vPosName", "");
                        }

                        if (_data.vTeamCode) {
                           $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vTeamName", _data.vTeamName);
                        }
                        else {
                           $("#phc_empGrid").jqxGrid('setcellvalue', rowindex, "vTeamName", "");
                        }

                     });
                  }
               });
            }
         }, {
            text: '성명',
            datafield: 'vName',
            width: '190px',
            editable: false,
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '직위',
            datafield: 'vPosName',
            width: '240px',
            editable: false,
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '팀명',
            datafield: 'vTeamName',
            align: 'center',
            editable: false,
            cellsalign: 'center'
         }, {
            datafield: 'vEstiCode',
            hidden: true,
            editable: false
         }, {
            datafield: 'vProjectCode',
            hidden: true,
            editable: false
         }]
      });

      //휴지통 버튼 클릭
      $("#phc_empGrid").on('cellclick',function(event) {
         var args = event.args;
         if (args.datafield == "editFlag" && args.value=="del") {
            $("#phc_empGrid").jqxGrid('setcellvalue', args.rowindex, "editFlag", "");
         }
      });

      $("#toolbarphc_empGrid").removeClass("jqx-widget-header");
      $("#toolbarphc_empGrid").removeClass("jqx-widget-header-custom");
   };

   return {
      setupSearchField: setupSearchField,
      setupPrjGrid: setupPrjGrid,
      setupEmpGrid: setupEmpGrid
   }

};

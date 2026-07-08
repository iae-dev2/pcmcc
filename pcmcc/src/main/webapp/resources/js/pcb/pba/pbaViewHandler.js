var PbaViewHandler = function(model, transaction) {

   var model = model;
   var transaction = transaction;

   var setViewState = function(step, finish, confirm) {
      if (step == "1") {
         if (finish == "Y") {   //PM 입력중
            $("#pba_BtnNew").jqxButton({ disabled:false });   //과제 추가
            $("#pba_BtnDel").jqxButton({ disabled:false });   //과제 삭제
            $("#pba_BtnOk").jqxButton({ disabled:true });     //확인

            $("#pba_BtnNew").css("cursor", "");               //마우스 오버 시 손모양 유지   2021-05-18
            $("#pba_BtnDel").css("cursor", "");
         }
         else {   //연구원 입력중
            $("#pba_BtnNew").jqxButton({ disabled:false });   //과제 추가
            $("#pba_BtnDel").jqxButton({ disabled:false });   //과제 삭제
            $("#pba_BtnOk").jqxButton({ disabled:false });    //확인

            $("#pba_BtnNew").css("cursor", "");                //마우스 오버 시 손모양 유지   2021-05-18
            $("#pba_BtnDel").css("cursor", "");
            $("#pba_BtnOk").css("cursor", "");
         }
         $("#pba_BtnOk").jqxButton({ disabled:true });        //확인
      }
      else if (step == "2") {
         $("#pba_BtnNew").jqxButton({ disabled:true });       //과제 추가
         $("#pba_BtnDel").jqxButton({ disabled:true });       //과제 삭제
         if (confirm == "Y") {   //센터장 확인중
            $("#pba_BtnOk").jqxButton({ disabled:true });     //확인
         }
         else {   //연구원 확인중
            $("#pba_BtnOk").jqxButton({ disabled:false });    //확인

            $("#pba_BtnOk").css("cursor", "");                 //마우스 오버 시 손모양 유지   2021-05-18
         }
      }
      else if (step == "3") {   //반려
         $("#pba_BtnNew").jqxButton({ disabled:true });       //과제 추가
         $("#pba_BtnDel").jqxButton({ disabled:true });       //과제 삭제
         $("#pba_BtnOk").jqxButton({ disabled:true });        //확인
      }
      else if (step == "4") {   //PM 최종확인중
         $("#pba_BtnNew").jqxButton({ disabled:true });       //과제 추가
         $("#pba_BtnDel").jqxButton({ disabled:true });       //과제 삭제
         $("#pba_BtnOk").jqxButton({ disabled:true });        //확인
      }
      else if (step == "5") {   //최종 평가완료
         $("#pba_BtnNew").jqxButton({ disabled:true });       //과제 추가
         $("#pba_BtnDel").jqxButton({ disabled:true });       //과제 삭제
         $("#pba_BtnOk").jqxButton({ disabled:true });        //확인
      }
      else {
         if (step == "999") {
            $("#pba_BtnNew").jqxButton({ disabled:true });    //과제 추가
         }
         else {
            $("#pba_BtnNew").jqxButton({ disabled:false });   //과제 추가
            $("#pba_BtnNew").css("cursor", "");                //마우스 오버 시 손모양 유지   2021-05-18
         }
         $("#pba_BtnDel").jqxButton({ disabled:true });       //과제 삭제
         $("#pba_BtnOk").jqxButton({ disabled:true });        //확인
      }
   }

   var setupSearchField = function() {
      //평가코드
      $("#pba_code").jqxComboBox({
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
   };

   var setupActionForm = function() {
      //과제추가
      $("#pba_BtnNew").jqxButton({
         width: '100px',
         height: '35px',
         disabled: false
      });
      //과제삭제
      $("#pba_BtnDel").jqxButton({
         width: '100px',
         height: '35px',
         disabled: true
      });
      //확인
      $("#pba_BtnOk").jqxButton({
         width: '100px',
         height: '35px',
         disabled: true
      });
   };

   //과제 코드 그리드
   var setupPrjGrid = function() {
      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      $("#pba_prjGrid").jqxGrid({
         width: '100%',
         height: '215px',
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
            cellsalign: 'left'
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
            text: '완료여부',
            datafield: 'vFinish',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '확인여부',
            datafield: 'vConfirm',
            width: '80px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '진행단계',
            datafield: 'vEstiStep',
            width: '150px',
            align: 'center',
            cellsalign: 'center',
            cellsrenderer: function(row, column, value) {
               var prjdata = $('#pba_prjGrid').jqxGrid('getrowdata', row);
               var stepName = "";
               if (value == 1) {
                  if (prjdata.vFinish == "Y") {
                     stepName = "PM 평가중";
                  }
                  else {
                     stepName = "연구원 입력중"
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
                  stepName = "PM 평가중"
               }
               else if (value == 4) {
                  stepName = "PM 최종 확인 중"
               }
               else if (value == 5) {
                  stepName = "최종 평가완료"
               }
               return '<div style="text-align: center; margin-top: 10px;"> ' + stepName + '</div>';
            }
         }]
      });
   };

   var setupPrjForm = function() {
      //센터(본부명)
      $("#pba_vDeptName").jqxInput({
         height: '30px',
         width: '120px',
         theme: 'custom',
         disabled: true
      });
      //PM
      $("#pba_vProjectPm").jqxInput({
         height: '30px',
         width: '120px',
         theme: 'custom',
         disabled: true
      });
      //과제코드
      $("#pba_vProjectCode").jqxInput({
         height: '30px',
         width: '120px',
         theme: 'custom',
         disabled: true
      });
      //부처명
      $("#pba_vGovName").jqxInput({
         height: '30px',
         width: '120px',
         theme: 'custom',
         disabled: true
      });
      //과제명
      $("#pba_vProjectName").jqxInput({
         height: '30px',
         width: '380px',
         theme: 'custom',
         disabled: true
      });
      //사업명
      $("#pba_vProjectDivision").jqxInput({
         height: '30px',
         width: '380px',
         theme: 'custom',
         disabled: true
      });
   };

   //PM 평가의견 그리드
   var setupEvalGrid = function() {
      var localizationobj = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      var textrenderer = function(row, column, value) {
         if (true) {   //크롬 브라우저
            return "<textarea readonly style='width:1138px; height:152px; font-family:sans-serif; font-size:13px; padding-top:5px; padding-bottom:5px;'>"+value+"</textarea>";
         }
         else {   //인터넷 익스플로러 브라우저
            return "<pre><textarea readonly style='width:258px; height:80px; font-family:sans-serif; font-size:13px; padding-top:5px; padding-bottom:5px; overflow:auto;'>"+
            removeHtml(value)+"</textarea></pre>";
         }
      }

      $("#pba_evalGrid").jqxGrid({
         width: '100%',
         height: '200px',
         localization: localizationobj,
         theme: 'custom',
         autoheight: false,
         columnsheight: 35,
         columnsresize: false,
         enabletooltips: false,
         rowsheight: 163,
         selectionmode: 'none',
         enablehover: false,
         editable: false,
         columns: [ {
            text: '본인 기여율(%)',
            datafield: 'nContribution',
            width: '140px',
            align: 'center',
            cellsalign: 'center'
         }, {
            text: '과제평균 기여율(%)',
            datafield: 'nUpperAmt',
            width: '140px',
            align: 'center',
            cellsalign: 'center',
         }, {
            text: 'PM평가의견',
            datafield: 'vContent',
            align: 'center',
            cellsalign: 'left',
            cellsrenderer: textrenderer,
         } ]
      });
   };

   //과제추가 윈도우
   var setupPbaWin = function() {
      var ssf_x = ($(window).width() / 2) - 500;
      var ssf_y = $(window).height() - 800;
      var pba_no_result = {
         emptydatastring: "검색 결과가 없습니다.",
         currencysymbol: " "
      };

      $('#pba_window').jqxWindow({
         width: 700,
         height: 500,
         resizable: false,
         position: {
            x: ssf_x,
            y: ssf_y
         },
         isModal: true,
         cancelButton: $('#pba_win_close'),
         autoOpen: false,
         theme: 'custom',
         initContent: function() {

            //참여 과제 그리드
            $("#pba_win_grid").jqxGrid({
               width: '100%',
               height: '300px',
               localization: pba_no_result,
               source: transaction.getAdditionalPrjList(),
               theme: 'custom',
               autoheight: false,
               columnsheight: 35,
               columnsresize: true,
               enabletooltips: true,
               rowsheight: 35,
               selectionmode: 'singlerow',
               editable: false,
               filterable: true,
               showfilterrow: true,
               sortable: true,
               showsortmenuitems: false,
               columns: [{
                  text: '부서명',
                  datafield: 'vDeptName',
                  width: '80px',
                  align: 'center',
                  cellsalign: 'center'
               }, {
                  text: 'PM',
                  datafield: 'vProjectPmName',
                  width: '70px',
                  align: 'center',
                  cellsalign: 'center',
               }, {
                  text: '과제코드',
                  datafield: 'vProjectCode',
                  width: '80px',
                  align: 'center',
                  cellsalign: 'center',
               }, {
                  text: '과제명',
                  datafield: 'vProjectName',
                  align: 'center',
                  cellsalign: 'left',
               }]
            });

            //선택
            $('#pba_win_select').jqxButton({
               width: '65px',
               template: 'success'
            });

            //닫기
            $('#pba_win_close').jqxButton({
               width: '65px',
               template: 'warning'
            });

            //더블클릭 이벤트
            $("#pba_win_grid").on('rowdoubleclick', function(event) {
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

         }
      });
   };

   return {
      setViewState: setViewState,
      setupSearchField: setupSearchField,
      setupActionForm: setupActionForm,
      setupPrjGrid: setupPrjGrid,
      setupPrjForm: setupPrjForm,
      setupEvalGrid: setupEvalGrid,
      setupPbaWin: setupPbaWin
   }

}

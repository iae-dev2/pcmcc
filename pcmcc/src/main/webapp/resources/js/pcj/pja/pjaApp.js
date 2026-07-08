var PjaApp = function() {

   var transaction = new PjaTransaction();
   var model = new PjaModel();
   var view = new PjaViewHandler(model,transaction);

   var initApp = function() {

      regEventHandler();

      view.setupSearchField();
      view.setupPrjGrid();
      view.setupPrjForm();
      view.setupPurpose();
      view.setupContGrid();
      view.setupContForm();

      view.setupPjaWeekWindow();

   };

   var regEventHandler = function() {

      //조회
      $("#pja_BtnSearch").on('click', function(event) {
         $("#pja_prjGrid").jqxGrid('clearselection');
         model.setPjaInfo();
         $("#pja_prjGrid").jqxGrid({ source: transaction.getCommonProjectCodeList() });
         $("#pja_empGrid").jqxGrid('clear');

         $("#pja_week_window").jqxWindow("close");          //주간업무보고 실적 닫기
         $("#pja_vReviewContent").jqxTextArea("val", "");   //평가의견 초기화
      });

      //과제 코드 그리드 select
      $("#pja_prjGrid").on('rowselect', function(event) {
         var bIs_saveSate = false;   //저장 여부
         $("#pja_empGrid").jqxGrid('clearselection');
         model.setPjaInfo(event.args.row);

         if (event.args.row) {
            //참여연구원 기여율 조회
            $("#pja_empGrid").jqxGrid({ source: transaction.getEmpContributionList(event.args.row.vEstiCode, event.args.row.vProjectCode) });
            //평가의견 조회
            transaction.getReview(event.args.row.vEstiCode, event.args.row.vProjectCode).done(function(result) {
               $("#pja_vReviewContent").jqxTextArea("val", result);   //평가 의견
            });
         }
         else {
            $("#pja_empGrid").jqxGrid('clear');
            $("#pja_vReviewContent").jqxTextArea("val", "");
         }

         $("#pja_week_window").jqxWindow("close");   //주간업무보고 실적 닫기
      });

      //참여연구원 기여율 그리드 선택
      $("#pja_empGrid").on('rowselect', function(event) {
         var args = event.args;
         var rowBoundIndex = args.rowindex;
         var rowData = args.row;
         var table_html = "";

         $("#pja_week_table *").remove();   //초기화

         $("#pja_week_table").html("<div style='margin-top: 150px; margin-left: 430px;'>조회중 입니다...</div>");

         transaction.getWeekList(rowData.vProjectCode, rowData.vEmplNo, rowData.vEstiCode).done(function(result) {
            $("#pja_week_table *").remove();   //초기화

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

            $("#pja_week_table").append(table_html);

            $("#pja_week_window").jqxWindow("open");

         });

      });

      //산출물 미리보기
      $(document).on("click", ".pjaPreview", function(event) {

         $("#pja_jqxLoader").jqxLoader({ 'text': '변환 중입니다...' });
         $("#pja_jqxLoader").jqxLoader('open');   //로딩바 열기

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

               $("#pja_jqxLoader").jqxLoader('close');   //로딩바 닫기
            }
            else {
               alert("바로보기 실패 !");
               $("#pja_jqxLoader").jqxLoader('close');   //로딩바 닫기
            }
         }, function() {
            console.log("바로보기 실패 !");
            $("#pja_jqxLoader").jqxLoader('close');   //로딩바 닫기
         });
      });
   };

   return {
      initApp: initApp
   }

}

var PcaTransaction = function() {

   //평가 코드 조회
   var getCommonEstiCodeList = function() {
      var source = {
         datatype: "json",
         type: "GET",
         datafields: [
            { name: 'vEstiCode'      , type: 'string' },
            { name: 'vEstiCodeName'  , type: 'string' },
            { name: 'vEstiCodeUpdate', type: 'string' }
         ],
         url: "/com/getEstiCodeList",
         async: false
      };
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });
      return dataAdapter;
   };

   //과제코드 조회
   var getCommonProjectCodeList = function() {
      var param = {
         "vEstiCode": $("#pca_code").jqxComboBox('val'),
         "vProjectPm": _loginUser
      }
      var source2 = {
         datatype: "json",
         type: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'        , type: 'string' },
            { name: 'vProjectCode'     , type: 'string' },
            { name: 'vProjectName'     , type: 'string' },
            { name: 'vDeptName'        , type: 'string' },
            { name: 'vGovName'         , type: 'string' },
            { name: 'vProjectDivision' , type: 'string' },
            { name: 'vProjectPm'       , type: 'string' },
            { name: 'vProjectPmName'   , type: 'string' },
            { name: 'vStartDate'       , type: 'string' },
            { name: 'vEndDate'         , type: 'string' },
            { name: 'vEstiStep'        , type: 'string' },
            { name: 'vConfirm'         , type: 'string' },
            { name: 'vFinish'          , type: 'string' }
         ],
         url: "/com/getProjectCodeList",
         async: false
      };
      var dataAdapter2 = new $.jqx.dataAdapter(source2);
      return dataAdapter2;
   };

   // 과제목표 & Milestone 가져오기
   var getPrjGoal = function() {
      var param = {
            "vProjectCode": $("#pca_StoredProjectCode").val(),
            "vEstiCode": $("#pca_StoredEstiCode").val()
      }
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/getPrjGoal',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: param,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("과제목표 & Milestone 가져오기 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //전분기 과제목표 가져오기
   var getOldGoal = function() {
      var old_param = {
         "vProjectCode": $("#pca_StoredProjectCode").val(),
         "vEstiCode": $("#pca_StoredEstiCode").val()
      }
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/getOldGoal',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: old_param,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("전분기 과제목표 가져오기 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //과제목표 저장
   var savePrjGoal = function(vo) {
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/savePrjGoal',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(vo),
            success: function(data) {
               deferred.resolve(data);
            }
         });
      } catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //참여연구원 기여율 조회
   var getEmpContributionList = function(esticode, prjcode) {
      var param3 = {
         "vEstiCode": esticode,
         "vProjectCode": prjcode
      }
      var source3 = {
         datatype: "json",
         type: "GET",
         data: param3,
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vProjectCode' , type: 'string' },
            { name: 'vEmplNo'      , type: 'string' },
            { name: 'vName'        , type: 'string' },
            { name: 'vDeptName'    , type: 'string' },
            { name: 'vTeamName'    , type: 'string' },
            { name: 'vPosName'     , type: 'string' },
            { name: 'vWork'        , type: 'string' },
            { name: 'nContribution', type: 'float'  },
            { name: 'vContent'     , type: 'string' },
            { name: 'vConfirm'     , type: 'string' },
            { name: 'vFinish'      , type: 'string' }
         ],
         url: "/pcc/pca/getEmpContList",
         async: false
      };
      var dataAdapter3 = new $.jqx.dataAdapter(source3);
      return dataAdapter3;
   };

   //참여연구원 기여율 합계 조회
   var getContSum = function(esticode, prjcode) {
      var review_param = {
         "vEstiCode": esticode,
         "vProjectCode": prjcode
      }
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/getContSum',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: review_param,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("참여연구원 기여율 합계 조회 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //주간업무입력 실적 조회
   var getWeekList = function(prjcode, emplno, week) {
      var week1 = week.substr(0, 5);
      var week2 = week1;
      var week3 = week1;

      if (week.substr(5, 2) == "01") {
         week1 += "01";
         week2 += "02";
         week3 += "03";
      }
      else if (week.substr(5, 2) == "02") {
         week1 += "04";
         week2 += "05";
         week3 += "06";
      }
      else if (week.substr(5, 2) == "03") {
         week1 += "07";
         week2 += "08";
         week3 += "09";
      }
      else if (week.substr(5, 2) == "04") {
         week1 += "10";
         week2 += "11";
         week3 += "12";
      }

      var week_param = {
         "vProjectCode": prjcode,
         "vEmplNo": emplno,
         "vWeek1": week1,
         "vWeek2": week2,
         "vWeek3": week3
      }
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/getWrmDataList',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: week_param,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("새로고침 후 다시 시도해 주십시오 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //부서명 조회
   var getDeptNameList = function() {
      var source = {
         datatype: "json",
         type: "GET",
         datafields: [
            { name: 'vDeptName', type: 'string'}
         ],
         url: "/pcc/pca/getDeptNameList",
         async: false
      };
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });
      return dataAdapter;
   };

   //추가 참여 연구원 목록 조회
   var getAddEmpList = function() {
      var add_param = {
         "vEstiCode": $("#pca_StoredEstiCode").val(),
         "vProjectCode": $("#pca_StoredProjectCode").val(),
         "vName": $("#pca_pop_name").val(),
         "vDeptName": $("#pca_pop_dept").jqxComboBox('val')
      }
      var add_source = {
         datatype: "json",
         type: "GET",
         data: add_param,
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vProjectCode' , type: 'string' },
            { name: 'vEmplNo'      , type: 'string' },
            { name: 'vName'        , type: 'string' },
            { name: 'vDeptName'    , type: 'string' },
            { name: 'vTeamName'    , type: 'string' },
            { name: 'vPosName'     , type: 'string' },
            { name: 'vWork'        , type: 'string' },
            { name: 'nContribution', type: 'float'  },
            { name: 'vContent'     , type: 'string' },
            { name: 'vConfirm'     , type: 'string' },
            { name: 'vFinish'      , type: 'string' }
         ],
         url: "/pcc/pca/getAddEmpList",
         async: false
      };
      var addDataAdapter = new $.jqx.dataAdapter(add_source);
      return addDataAdapter;
   };

   //참여연구원 추가
   var addEmp = function(emplno) {
      var add_param = {
         "vEstiCode": $("#pca_StoredEstiCode").val(),
         "vProjectCode": $("#pca_StoredProjectCode").val(),
         "vEmplNo": emplno
      }
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/addEmp',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: add_param,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("추가 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //참여연구원 삭제
   var removeEmp = function(emplno) {
      var add_param = {
         "vEstiCode": $("#pca_StoredEstiCode").val(),
         "vProjectCode": $("#pca_StoredProjectCode").val(),
         "vEmplNo": emplno
      }
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/removeEmp',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: add_param,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("삭제 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //기여율 입력
   var saveCont = function(empvolist) {
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/saveCont',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(empvolist),
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("기여율 입력 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //기여율입력 완료
   var finishCont = function(pcavo) {
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/finishCont',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: JSON.stringify(pcavo),
            async: false,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("기여율 입력 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //평가의견 조회
   var getReview = function(esticode, prjcode) {
      var review_param = {
         "vEstiCode": esticode,
         "vProjectCode": prjcode
      }
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/getReview',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: review_param,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("평가 의견 조회 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   //최종확인
   var doneCont = function() {
      var finish_param = {
         "vEstiCode": $("#pca_StoredEstiCode").val(),
         "vProjectCode": $("#pca_StoredProjectCode").val(),
         "vProjectPm": _loginUser
      }
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcc/pca/doneCont',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: finish_param,
            success: function(data) {
               deferred.resolve(data);
            },
            error: function(request,status,error) {
               alert("최종 확인 에러 발생 !");
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }
      return deferred.promise();
   };

   var registerWithDap = function(param) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcc/pca/registerWithDap',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(param),
            success: function(message) {
               deferred.resolve(message);
            },
            error: function(err) {
               console.log("오류 : ", err);
               alert("오류가 발생하여 미리보기에 실패하였습니다 !");
               $("#pca_jqxLoader").jqxLoader('close');   //로딩바 닫기
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   return {
      getCommonEstiCodeList: getCommonEstiCodeList,
      getCommonProjectCodeList: getCommonProjectCodeList,
      getPrjGoal: getPrjGoal,
      getOldGoal: getOldGoal,
      savePrjGoal: savePrjGoal,
      getEmpContributionList: getEmpContributionList,
      getContSum: getContSum,
      getWeekList: getWeekList,
      getDeptNameList: getDeptNameList,
      getAddEmpList: getAddEmpList,
      addEmp: addEmp,
      removeEmp: removeEmp,
      saveCont: saveCont,
      finishCont: finishCont,
      getReview: getReview,
      doneCont: doneCont,
      registerWithDap: registerWithDap
   }

}

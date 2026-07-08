var PjaTransaction = function() {

   //평가 코드 조회
   var getCommonEstiCodeList = function() {
      var source = {
         datatype: "json",
         type: "GET",
         datafields: [
            { name: 'vEstiCode'      , type: 'string' },
            { name: 'vEstiCodeName'  , type: 'string' },
            { name: 'vEstiCodeUpjate', type: 'string' }
         ],
         url: "/com/getEstiCodeList",
         async: false
      };
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });
      return dataAdapter;
   };

   // 센터명
   var getDeptCodeList = function(highTeam) {
      // 유영돈 부원장, 관리자 부서 전체 조회 가능 (이정승 본부장 제외)
      if (_loginUser === '9413421' || (_vmenugrade === 'A' && _loginUser != '9818740')) {
         highTeam = '';
      }

      var source02 = {
         datatype: "json",
         data: {
            "vHighTeam": highTeam
         },
         type: "GET",
         datafields: [
            { name: 'vDeptCode', type: 'string' },
            { name: 'vDeptName', type: 'string' }
         ],
         url: "/com/getHrDept",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02, {
         autoBind: true
      });

      return dataAdapter02;
   };

   //과제코드 조회
   var getCommonProjectCodeList = function() {
      const userDeptMap = {
         "0910157": ["청정에너지전환센터", "수소에너지솔루션센터"],
         "1110119": ["신소재공정센터", "융합소재연구센터", "기술정책센터"],
         "9818740": ["기계융합시스템센터", "그린시스템융합센터", "AI/DX센터"],
      };
      const selectedDept = $("#pja_searchDept").jqxComboBox("val");

      let requestBody = {};
      if (selectedDept === 'All') {
         const deptList = userDeptMap[_loginUser];
         if (deptList) {
            requestBody = { 
               "deptNameList": deptList,
               "vEstiCode": $("#pja_code").jqxComboBox('val'),
            };
         } else {
            requestBody = { 
               "vEstiCode": $("#pja_code").jqxComboBox('val'),
            };
         }
      } else {
         requestBody = { 
            "deptNameList": [selectedDept],
            "vEstiCode": $("#pja_code").jqxComboBox('val'),
         };
      }
      var source2 = {
         datatype: "json",
         type: "POST",
         contentType: "application/json",
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
            { name: 'vProjectGoal'     , type: 'string' },
            { name: 'vProjectMilestone', type: 'string' },
            { name: 'vEstiStep'        , type: 'string' },
            { name: 'vConfirm'         , type: 'string' },
            { name: 'vFinish'          , type: 'string' }
         ],
         url: "/pcj/pja/getProjectCodeList",
         formatData: function () {
            return JSON.stringify(requestBody);
         },
         async: false,
         processData: false,
      };
      var dataAdapter2 = new $.jqx.dataAdapter(source2);
      return dataAdapter2;
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
            { name: 'nContribution', type: 'float'  },
            { name: 'vContent'     , type: 'string' },
            { name: 'vConfirm'     , type: 'string' },
            { name: 'vFinish'      , type: 'string' }
         ],
         url: "/pcj/pja/getPrjEmpList",
         async: false
      };
      var dataAdapter3 = new $.jqx.dataAdapter(source3);
      return dataAdapter3;
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
               $("#pja_jqxLoader").jqxLoader('close');   //로딩바 닫기
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
            url: '/pcj/pja/getReview',
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

   return {
      getCommonEstiCodeList: getCommonEstiCodeList,
      getDeptCodeList: getDeptCodeList,
      getCommonProjectCodeList: getCommonProjectCodeList,
      getEmpContributionList: getEmpContributionList,
      getWeekList: getWeekList,
      registerWithDap: registerWithDap,
      getReview: getReview,
   }

}

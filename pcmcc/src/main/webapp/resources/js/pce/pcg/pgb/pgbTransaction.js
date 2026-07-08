var PgbTransaction = function() {

   //검색 필드 조회
   var getEstiCodeList = function() {
      var source01 = {
         datatype: "json",
         type: "GET",
         datafields: [
            { name: 'vEstiCode'      , type: 'string' },
            { name: 'vEstiCodeName'  , type: 'string' },
            { name: 'vEstiCodeView'  , type: 'string' },
            { name: 'vEstiCodeUpdate', type: 'string' }
         ],
         url: "/pcg/pga/getEstiCodeList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source01, {
         autoBind: true
      });

      return dataAdapter01;
   };

   var checkProject = function(searchProjectCode) {
      var deferred = $.Deferred();
      try {
         $.ajax({
            type: "GET",
            url: "/pcg/pgb/checkProject",
            data: {
               "vProjectCode": searchProjectCode
            },
            dataType: "json",
            success: function(data) {
               deferred.resolve(data);
            }
         });
      } catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   var getHrInfo = function(vemplno, vname, vretire) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            type: "GET",
            url: "/com/getHrInfo",
            data: {
               "vEmplNo": vemplno,
               "vName"  : vname,
               "vRetire": vretire
            },
            dataType: "json",
            success: function(data) {
               deferred.resolve(data);
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   //그리드 - 진행 단계
   var getEstiStep = function() {
      var source = [
         { "vItemCode": "A", "vItemName": "전체"                        },
         { "vItemCode": "1", "vItemName": "연구원 입력중/PM 평가중"     },
         { "vItemCode": "2", "vItemName": "연구원 확인중/센터장 확인중" },
         { "vItemCode": "3", "vItemName": "센터장 반려"                 },
         { "vItemCode": "4", "vItemName": "PM 최종 확인 중"             },
         { "vItemCode": "5", "vItemName": "최종 평가완료"               }
      ]
      var dataAdapter = new $.jqx.dataAdapter(source, {
         autoBind: true
      });

      return dataAdapter;
   };
   //위 autoBind는 local 사용용으로 삭제하지 마십시오. 2020-05-28

   //그리드 조회
   var getProjectCodeList = function() {
      var param = {
         "vEstiCode": $("#pgb_searchCode").jqxComboBox('val'),
         "vEstiStep": $("#pgb_searchStep").jqxComboBox('val')
      }
      var source01 = {
         datatype: "json",
         type: "GET",
         data: param,
         datafields: [
            { name: 'editFlag'         , type: 'string' },
            { name: 'vEstiCode'        , type: 'string' },
            { name: 'vProjectCode'     , type: 'string' },
            { name: 'vProjectName'     , type: 'string' },
            { name: 'vDeptName'        , type: 'string' },
            { name: 'vGovName'         , type: 'string' },
            { name: 'vProjectDivision' , type: 'string' },
            { name: 'vTotStartDate'    , type: 'string' },
            { name: 'vTotEndDate'      , type: 'string' },
            { name: 'vStartDate'       , type: 'string' },
            { name: 'vEndDate'         , type: 'string' },
            { name: 'vProjectPm'       , type: 'string' },
            { name: 'vProjectPmName'   , type: 'string' },
            { name: 'vProjectEva'      , type: 'string' },
            { name: 'vProjectEvaName'  , type: 'string' },
            { name: 'vProjectGoal'     , type: 'string' },
            { name: 'vProjectMilestone', type: 'string' },
            { name: 'vEstiStep'        , type: 'string' },
            { name: 'dsp_vEstiStep', value: 'vEstiStep', values: {
               source: getEstiStep().records, value: 'vItemCode', name: 'vItemName'
            }},
            { name: 'vDueDate1'        , type: 'string' },
            { name: 'vDueDate2'        , type: 'string' },
            { name: 'vDueDate3'        , type: 'string' },
            { name: 'vDueDate4'        , type: 'string' },
            { name: 'vDueDate5'        , type: 'string' },
         ],
         url: "/pcg/pgb/getProjctCodeList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source01);

      return dataAdapter01;
   };

   var saveProjectCode = function(pgbvolist) {
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pcg/pgb/saveProjectCode',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(pgbvolist),
            success: function(data) {
               deferred.resolve(data);
            }
         });
      } catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   return {
      getEstiCodeList: getEstiCodeList,
      checkProject: checkProject,
      getHrInfo: getHrInfo,
      getEstiStep: getEstiStep,
      getProjectCodeList: getProjectCodeList,
      saveProjectCode: saveProjectCode
   }

}

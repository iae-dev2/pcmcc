var PbaTransaction = function() {

   var getEstiCodeList = function() {
      var source01 = {
         datatype: "json",
         type: "GET",
         datafields: [
            { name: 'vEstiCodeName'  , type: 'string'},
            { name: 'vEstiCode'      , type: 'string'},
            { name: 'vEstiCodeUpdate', type: 'string'}
         ],
         url: "/com/getEstiCodeList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source01, {
         autoBind: true
      });

      return dataAdapter01;
   };

   var getProjectCodeList = function(emplno) {
      var datasource = {
         datatype: "json",
         data: {
            "vEstiCode": $("#pba_code").jqxComboBox('val'),
            "vEmplNo": _loginUser
         },
         datafields: [
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
            { name: 'vProejctGoal'     , type: 'string' },
            { name: 'vProjectMilestone', type: 'string' },
            { name: 'vEstiStep'        , type: 'string' },
            { name: 'vEmplNo'          , type: 'string' },
            { name: 'vWork'            , type: 'string' },
            { name: 'nContribution'    , type: 'number' },
            { name: 'vContent'         , type: 'string' },
            { name: 'vConfirm'         , type: 'string' },
            { name: 'vFinish'          , type: 'string' },
         ],
         url: "/pcb/pba/getPrjCodeList"
      };
      var dataAdapter = new $.jqx.dataAdapter(datasource);

      return dataAdapter;
   };

   var getAverageCont = function(esticode, prjcode) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcb/pba/getAverageCont',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: {
               "vEstiCode": esticode,
               "vProjectCode": prjcode
            },
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

   var getAdditionalPrjList = function() {
      var datasource = {
         datatype: "json",
         data: {
            "vEstiCode": $("#pba_code").jqxComboBox('val'),
            "vEmplNo": _loginUser
         },
         datafields: [
            { name: 'vEstiCode'     , type: 'string' },
            { name: 'vDeptName'     , type: 'string' },
            { name: 'vProjectPmName', type: 'string' },
            { name: 'vProjectCode'  , type: 'string' },
            { name: 'vProjectName'  , type: 'string' }
         ],
         url: "/pcb/pba/getAddPrjList",
         async: false
      };
      var dataAdapter = new $.jqx.dataAdapter(datasource);

      return dataAdapter;
   };

   var getEvaluationList = function(contribution, avg_cont, content) {
      var data = new Array();
      var row = {};
      row["nContribution"] = contribution;
      row["nUpperAmt"] = avg_cont;   //평균값 -> 연수로 나누기
      row["vContent"] = content;
      data[0] = row;
      var source = {
         localdata: data,
         datatype: "array"
      };
      var dataAdapter = new $.jqx.dataAdapter(source, {
         downloadComplete: function(data, status, xhr) { },
         loadComplete: function(data) { },
         loadError: function(xhr, status, error) { }
      });

      return dataAdapter;
   }

   var savePrjCode = function(vo) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcb/pba/savePrjCode',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(vo),
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

   var deletePrjCode = function(vo) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcb/pba/deletePrjCode',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(vo),
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

   var saveWork = function(vo) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcb/pba/saveWork',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(vo),
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

   var saveFinish = function(vo) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcb/pba/saveFinish',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(vo),
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

   var saveConfirm = function(vo) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pcb/pba/saveConfirm',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(vo),
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

   return {
      getEstiCodeList: getEstiCodeList,
      getProjectCodeList: getProjectCodeList,
      getAverageCont: getAverageCont,
      getAdditionalPrjList: getAdditionalPrjList,
      getEvaluationList: getEvaluationList,
      savePrjCode: savePrjCode,
      deletePrjCode: deletePrjCode,
      saveWork: saveWork,
      saveFinish: saveFinish,
      saveConfirm: saveConfirm
   }

}

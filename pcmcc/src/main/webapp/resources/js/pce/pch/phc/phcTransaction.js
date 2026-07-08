var PhcTransaction = function() {

   //평가코드 조회
   var getEstiCodeList = function() {
      var source = {
         datatype: "json",
         method: "GET",
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vEstiCodeName', type: 'string' }
         ],
         url: "/pcg/pga/getEstiCodeList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source, {
         autoBind: true
      });

      return dataAdapter01;
   };

   //과제코드 목록 그리드 조회
   var getPhcProjectCodeList = function() {
      var param = {
         "vEstiCode": $("#phc_code").jqxComboBox('val')
      }
      var source02 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'      , type: 'string' },
            { name: 'vProjectCode'   , type: 'string' },
            { name: 'vProjectName'   , type: 'string' },
            { name: 'vProjectPmName' , type: 'string' },
            { name: 'vProjectEvaName', type: 'string' }
         ],
         url: "/pce/phc/getPhcProjectCodeList",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02);

      return dataAdapter02;
   };

   //과제 참여연구원 그리드 조회
   var getPhcEmpList = function(esticode, prjcode) {
      var param = {
         "vEstiCode": esticode,
         "vProjectCode": prjcode
      }
      var source03 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'   , type: 'string' },
            { name: 'vProjectCode', type: 'string' },
            { name: 'vProjectName', type: 'string' },
            { name: 'vEmplNo'     , type: 'string' },
            { name: 'vName'       , type: 'string' },
            { name: 'vPosName'    , type: 'string' },
            { name: 'vTeamName'   , type: 'string' }
         ],
         url: "/pce/phc/getPhcEmpList",
         async: false
      };
      var dataAdapter03 = new $.jqx.dataAdapter(source03);

      return dataAdapter03;
   };

   var getHrInfo = function(vemplno, vname, vretire) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            type : "GET",
            url : "/com/getHrInfo",
            data : {
               "vEmplNo": vemplno,
               "vName": vname,
               "vRetire": vretire
            },
            dataType : "json",
            success : function(data) {
               deferred.resolve(data);
            }
         });
      }
      catch (err) {
         deferred.reject(err);
      }

      return deferred.promise();
   };

   //과제 참여연구원 그리드 저장
   var saveEmpGrid = function(Phcvolist) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pce/phc/savePhcEmpList',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(Phcvolist),
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
      getPhcProjectCodeList: getPhcProjectCodeList,
      getPhcEmpList: getPhcEmpList,
      getHrInfo: getHrInfo,
      saveEmpGrid: saveEmpGrid
   }

};

var PhbTransaction = function() {

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

   //참여연구원 목록 그리드 조회
   var getEmplNoList = function() {
      var param = {
         "vEstiCode": $("#phb_code").jqxComboBox('val')
      }
      var source02 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vEmplNo'      , type: 'string' },
            { name: 'vName'        , type: 'string' },
            { name: 'vPosName'     , type: 'string' },
            { name: 'vTeamName'    , type: 'string' },
            { name: 'nContribution', type: 'number' }
         ],
         url: "/pch/phb/getEmplNoList",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02);

      return dataAdapter02;
   };

   //개인별 기여율 그리드 조회
   var getEmplNoContributeList = function(esticode, emplno) {
      var param = {
         "vEstiCode": esticode,
         "vEmplNo": emplno
      }
      var source03 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'     , type: 'string' },
            { name: 'vProjectCode'  , type: 'string' },
            { name: 'vProjectName'  , type: 'string' },
            { name: 'vProjectPm'    , type: 'string' },
            { name: 'vProjectPmName', type: 'string' },
            { name: 'vEmplNo'       , type: 'string' },
            { name: 'vWork'         , type: 'string' },
            { name: 'nContribution' , type: 'number' },
            { name: 'vContent'      , type: 'string' },
            { name: 'vConfirm'      , type: 'string' },
            { name: 'vFinish'       , type: 'string' }
         ],
         url: "/pch/phb/getEmpContList",
         async: false
      };
      var dataAdapter03 = new $.jqx.dataAdapter(source03);

      return dataAdapter03;
   };

   //개인별 기여율 그리드 저장
   var saveContGrid = function(Phbvolist) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pch/phb/saveEmpContList',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(Phbvolist),
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
      getEmplNoList: getEmplNoList,
      getEmplNoContributeList: getEmplNoContributeList,
      saveContGrid: saveContGrid
   }

};

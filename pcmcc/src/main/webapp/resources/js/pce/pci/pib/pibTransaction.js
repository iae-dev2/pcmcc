var PibTransaction = function() {

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

   //개인별 인건비 그리드 조회
   var getPibList = function() {
      var param = {
         "vEstiCode": $("#pib_code").jqxComboBox('val')
      }
      var source02 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode', type: 'string' },
            { name: 'vEmplNo'  , type: 'string' },
            { name: 'vName'    , type: 'string' },
            { name: 'vPosName' , type: 'string' },
            { name: 'vDeptName', type: 'string' },
            { name: 'vTeamName', type: 'string' },
            { name: 'nAmount'  , type: 'number' },
         ],
         url: "/pci/pib/getPibList",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02);

      return dataAdapter02;
   };

   //개인별 인건비 그리드 저장
   var savePibGrid = function(Pibvolist) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pci/pib/savePibList',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(Pibvolist),
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
      getPibList: getPibList,
      savePibGrid: savePibGrid
   }

}

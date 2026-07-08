var PieTransaction = function() {

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

   // 연간인건비확보율 그리드 조회
   var getPieList = function() {
      var param = {
         "vYear": $("#pie_year").val(),
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
            { name: 'vDeptCode', type: 'string' },
            { name: 'vDeptName', type: 'string' },
            { name: 'vTeamCode', type: 'string' },
            { name: 'vTeamName', type: 'string' },
            { name: 'e1_nProjectCnt'  , type: 'number' },
            { name: 'e1_nContribution', type: 'number' },
            { name: 'e1_nLaborCost'   , type: 'number' },
            { name: 'e1_nAmount'      , type: 'number' },
            { name: 'e2_nProjectCnt'  , type: 'number' },
            { name: 'e2_nContribution', type: 'number' },
            { name: 'e2_nLaborCost'   , type: 'number' },
            { name: 'e2_nAmount'      , type: 'number' },
            { name: 'nLaborCost'      , type: 'number' },
            { name: 'nAmount'         , type: 'number' },
            { name: 'nSecureRate'     , type: 'number' },
         ],
         url: "/pci/pie/getPieList",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source02);

      return dataAdapter02;
   };

   //개인별 인건비 그리드 저장
   var savePieGrid = function(Pievolist) {
      var deferred = $.Deferred();

      try {
         $.ajax({
            url: '/pci/pie/savePieList',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            crossDomain: true,
            data: JSON.stringify(Pievolist),
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
      getPieList: getPieList,
      savePieGrid: savePieGrid
   }

}

var PicTransaction = function() {

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

   //직접비/간접비 그리드 조회
   var getPicGrid1List = function(param) {
      var source01 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'      , type: 'string' },
            { name: 'vProjectCode'   , type: 'string' },
            { name: 'nDirectAmount'  , type: 'number' },
            { name: 'nIndirectAmount', type: 'number' },
            { name: 'nAmount'        , type: 'number' }
         ],
         url: "/pci/pia/getPiaHalfYearList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source01);

      return dataAdapter01;
   };

   //참여율 그리드 조회
   var getPicGrid2List = function(param) {
      var source01 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vProjectCode' , type: 'string' },
            { name: 'vProjectName' , type: 'string' },
            { name: 'vEmplNo'      , type: 'string' },
            { name: 'vName'        , type: 'string' },
            { name: 'vDeptCode'    , type: 'string' },
            { name: 'vDeptName'    , type: 'string' },
            { name: 'vTeamCode'    , type: 'string' },
            { name: 'vTeamName'    , type: 'string' },
            { name: 'vPosName'     , type: 'string' },
            { name: 'nContribution', type: 'number' },
         ],
         url: "/pci/pic/getPicGrid2List",
         async: false
      };
      var dataAdapter02 = new $.jqx.dataAdapter(source01);

      return dataAdapter02;
   };

   //인건비 확보율 그리드 조회
   var getPicGrid3List = function(param) {
      var source01 = {
         datatype: "json",
         method: "GET",
         data: param,
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vProjectCode' , type: 'string' },
            { name: 'vDeptName'    , type: 'string' },
            { name: 'vTeamName'    , type: 'string' },
            { name: 'vEmplNo'      , type: 'string' },
            { name: 'vName'        , type: 'string' },
            { name: 'vPosName'     , type: 'string' },
            { name: 'nProjectCnt'  , type: 'number' },
            { name: 'nContribution', type: 'number' },
            { name: 'nLaborCost'   , type: 'number' },
            { name: 'nAmount'      , type: 'number' },
            { name: 'nSecureRate'  , type: 'number' }
         ],
         url: "/pci/pic/getPicGrid3List",
         async: false
      };
      var dataAdapter03 = new $.jqx.dataAdapter(source01);

      return dataAdapter03;
   };

   var calculatePic = function(param) {
      var deferred = $.Deferred();
      try {
         $.ajax({
            url: '/pci/pic/calculatePic',
            method: 'GET',
            contentType: 'application/json',
            dataType: 'text',
            crossDomain: true,
            data: param,
            success: function(message) {
               deferred.resolve(message);
            }
         });
      }
      catch (err) {
         console.error(err);
         deferred.reject(err);
      }

      return deferred.promise();
   };

   return {
      getEstiCodeList: getEstiCodeList,
      getPicGrid1List: getPicGrid1List,
      getPicGrid2List: getPicGrid2List,
      getPicGrid3List: getPicGrid3List,
      calculatePic: calculatePic
   }

}

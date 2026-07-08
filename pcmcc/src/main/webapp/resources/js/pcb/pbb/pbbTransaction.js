var PbbTransaction = function() {

   //평가코드 조회
   var getCommonEstiCodeList = function() {
      var source = {
         datatype: "json",
         method: "GET",
         datafields: [
            { name: 'vEstiCode'    , type: 'string' },
            { name: 'vEstiCodeName', type: 'string' }
         ],
         url: "/com/getEstiCodeList",
         async: false
      };
      var dataAdapter01 = new $.jqx.dataAdapter(source, {
         autoBind: true
      });
      return dataAdapter01;
   };

   //인건비 확보율 그리드 조회
   var getPbbGrid3List = function(param) {
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
         url: "/pcb/pbb/getPbbGrid3List",
         async: false
      };
      var dataAdapter03 = new $.jqx.dataAdapter(source01);
      return dataAdapter03;
   };

   return {
      getCommonEstiCodeList: getCommonEstiCodeList,
      getPbbGrid3List: getPbbGrid3List
   }

}

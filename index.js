var oDemoTable;
var incidents = [];
var gblSource = [];
var loadDemoTable = function(incidents){
    if(incidents == undefined){
        return;
    }
    incidents.forEach(function(item){
        parseDuplicates(item);
    })
    
    if(gblSource[0] == undefined){
        gblSource.shift();
    }

      oDemoTable.fnClearTable();

        for (var i = 0; i < gblSource.length; i++) {

            var aiNew = oDemoTable.fnAddData([gblSource[i].name,
                                              gblSource[i].datetime,
                                              gblSource[i].priority,
                                              gblSource[i].locationId,
                                              gblSource[i].priority], false);
            var nRow = oDemoTable.fnGetNodes(aiNew[0]);

            editRow(oDemoTable, nRow);

        }

        oDemoTable.fnDraw();
}
var imgSrc = ["src/img/alarm-high.svg","src/img/alarm-medium.svg","src/img/alarm-low.svg"];
var priority = ["High","Medium","Low"];

function editRow(oTable, nRow) {

    var aData = oTable.fnGetData(nRow);
    var jqTds = $('>td', nRow);
    var imgPath = imgSrc[aData[2]-1];
    var Prio = priority[aData[4] - 1];

    if($(window).width() >= 600 ){
        $("#demoTable thead").show();
        jqTds[0].innerHTML = '<img src="'+ imgPath +'" style="background-color:transparent;border:none;" alt="priority">';
        jqTds[1].innerHTML = '<input disabled="disabled" type="text" value="' + aData[0] + '" style="background-color:transparent;border:none;">';
        jqTds[2].innerHTML = '<input disabled="disabled" type="text" value="' + aData[1] + '" style="background-color:transparent;border:none;">';
        jqTds[3].innerHTML = '<input disabled="disabled" type="text" value="'+ Prio +'"style="background-color:transparent;border:none;">';
        jqTds[4].innerHTML = '<input disabled="disabled" type="text" value="' + aData[3] + '" style="background-color:transparent;border:none;">';    
    }
    else{
        $("#demoTable thead").hide();
        jqTds[0].innerHTML = '<img src="'+ imgPath +'" style="background-color:transparent;border:none;" alt="priority">';
        jqTds[1].innerHTML = '<div><input disabled="disabled" type="text" value="' + aData[1] + '" style="background-color:transparent;border:none;"></div>'+
                             '<div><input disabled="disabled" type="text" value="' + aData[3] + '" style="background-color:transparent;border:none;"></div>' +
                             '<div><input disabled="disabled" type="text" value="' + aData[0] + '" style="background-color:transparent;border:none;"></div>' +
                             '<div><input disabled="disabled" type="text" value="' + Prio + '" style="background-color:transparent;border:none;"></div>';
        jqTds[2].innerHTML = '';
        jqTds[3].innerHTML = '';
        jqTds[4].innerHTML = '';
        
    }
    
}
var parseDuplicates = function(items){
    //console.log(items);
    items.forEach(function(value){
        var id = value.id;
        if(gblSource[id])
            console.log("duplicate");
        else
            gblSource[id] = value;
    });
}
$(document).ready(function () {
    
     oDemoTable = $('#demoTable').dataTable({
        paging: false,
        "bPaginate": false,
        info: false,
        ordering: false,
        bScrollInfinite: true,
        searching: false
    });

    
    var loader = new BrowserESModuleLoader();
    //var oDemoTable = $('#demoTable').DataTable();
        // relative path or URL syntax is necessary as plain resolution throws
        loader.import('./src/js/fake-api.js').then(function(m) {
    
         return m.default.getLocations()
         .then(function(loc){
             var promises = [];
             for (let i = 0; i < loc.length; i++) {
                 promises.push(m.default.getIncidentsByLocationId(loc[i].id));
              
              }
             Promise.all(promises).then(function(values){
                 //console.log(values);
                 incidents=values;
                 loadDemoTable(incidents);
                 return values;
             });
         }).then(function(){
                  console.log(incidents.length);
                      //return incidents;
                  
              });
        });
    
    window.onresize = function(event) {
        loadDemoTable(incidents);
    };
    $(document).on('keypress', function(e) {
        var tag = e.target.tagName.toLowerCase();
        var charCode = (e.which) ? e.which : e.keyCode;
        if (charCode === 13 && tag != 'button' && tag != 'textarea') {
            e.preventDefault();
            return false;
        } else {
            return true;
        }

    });
  });
    

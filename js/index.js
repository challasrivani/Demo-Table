
import getLocations  from 'src/js/fake-api';
import getIncidentsByLocationId from 'src/js/fake-api';

var loadDemoTable = function() {
    
    // To fill demo table
    //tblSource
    //var jsPromise = Promise.resolve($.ajax('tblSource.getLocations'));
    
    fetch(getLocations).then(response => 
    response.json().then(data => ({
        data: data,
        status: response.status
    })
    ).then(res => {
        console.log(res.status, res.data.title)
    }));
    
    
}

$(document).ready(function () {
    
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

    oDemoTable = $('#demoTable').dataTable({
        paging: false,
        info: false,
        ordering: false,
        bScrollInfinite: false,
        searching: false,
        "language": {
            "emptyTable": "No Incidents recorded"
        }
    });

    loadDemoTable();

   /* $('#autoComboTable').on('click', '.odd, .even', function (e) {
        e.preventDefault();
        $('#autoComboTable tr').removeClass('highlighted');
        $(this).addClass('highlighted');

        selectedAutoComboRow = $('#autoComboTable').DataTable().row($(this));
        loadAutoComboElementQty($('#ddlconcept').val(), $('#autoComboTable').DataTable().row($(this)).data()[0]);

        $("#ddlcombocategory_1").val('-1'); applyFilter1("");
        $("#ddlcombocategory_2").val('-1'); applyFilter2("");
        $("#ddlcombocategory_3").val('-1'); applyFilter3("");

        busyLoadingElementTable = true;
        $("#acElementQtyTable_1").hide(); $("#acElementQtyTable_2").hide(); $("#acElementQtyTable_3").hide();
        $("#progressBar_element").show();
        $.when(loadAutoComboElementTable($('#ddlconcept').val(), $('#autoComboTable').DataTable().row($(this)).data()[0], document.getElementById('showAll_1').checked, 1),
               loadAutoComboElementTable($('#ddlconcept').val(), $('#autoComboTable').DataTable().row($(this)).data()[0], document.getElementById('showAll_2').checked, 2),
               loadAutoComboElementTable($('#ddlconcept').val(), $('#autoComboTable').DataTable().row($(this)).data()[0], document.getElementById('showAll_3').checked, 3))
          .done(function (a1, a2, a3) {
              busyLoadingElementTable = false;
              $("#acElementQtyTable_1").show();
              $("#acElementQtyTable_2").show();
              $("#acElementQtyTable_3").show();
        });

        (function checkProgress() {
            if (busyLoadingElementTable) {
                console.log("Loading " + busyLoadingElementTable);
                setTimeout(checkProgress, 200); // setTimeout(func, timeMS, params...)    
            } else {
                $("#progressBar_element").hide();
            }
        })();
       
    });*/


});
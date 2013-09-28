/* v0.1 */

/* Options */
var car_type_rates = {
'compact' : { rate : 34.95, km : 9}
, 'intermediate' : { rate : 37.95 , km :  10 }
, 'standard' : { rate : 43.95 , km : 11 }
, 'full_size' : { rate : 43.95 , km : 13 }
, 'suv' : { rate : 69.95 , km : 16 }
}
/* Options */

$(function() {
	$('#km').val( 100 );
	$('#days').val( 3 );
	
	$('#km').change( function (){
		calculate();
	}).keyup( function (){
		calculate();
	});
	$('#days').change( function (){
		calculate();
	}).keyup( function (){
		calculate();
	});
	$('#type').change( function (){
		calculate();
	});
	
	calculate();
});

function calculate(){
	var km = $('#km').val();
	var days = $('#days').val();
	
	var ctype = $('#type').val();
	
	var variance = 1;
	switch(ctype){
	case 'compact':
		variance = 2;
		break;
	case 'intermediate':
		variance = 3;
		break;
	case 'standard':
		variance = 4;
		break;
	case 'full_size':
		variance = 5;
		break;
	default:
	}
	
	var car_km = car_type_rates[ctype]['km'];
	to_num ( $('#car_km') , car_km );
	
	var result = km * days;
	result = result * variance;
	
	to_num ( $('#reimburse') , km * 0.52);
	
	var rental = car_type_rates[ctype]['rate'] * days;
	to_num ( $('#rental') , rental);
	
	var fees = days * 4.04;
	to_num ( $('#fees') , fees );
	
	var tax = rental * 14.925 / 100;
	to_num ( $('#tax') , tax );
	var refuel = ( days /100 * car_km ) * 1.45;
	to_num ( $('#refuel') , refuel );
	
	to_num ( $('#total') , ( rental + fees + tax + refuel ) );
}

function to_num ( obj, v ){
	obj.html( '...' );
	if(! v){
		obj.html( '$0' );
		return false;
	}
	obj.html( '$' + addCommas( v.toFixed(2) ) );
}
function addCommas(nStr)
{
	var x, x1, x2;
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}



function drawVisualization() {
  var data = google.visualization.arrayToDataTable([
    ['x', 'Car', 'Personal Car Costs', 'Rental Car Costs'],
    ['A',   1,       1,           0.5],
    ['B',   2,       0.5,         1],
    ['C',   4,       1,           0.5],
    ['D',   8,       0.5,         1],
    ['E',   7,       1,           0.5],
    ['F',   7,       0.5,         1],
    ['G',   8,       1,           0.5],
    ['H',   4,       0.5,         1],
    ['I',   2,       1,           0.5],
    ['J',   3.5,     0.5,         1],
    ['K',   3,       1,           0.5],
    ['L',   3.5,     0.5,         1],
    ['M',   1,       1,           0.5],
    ['N',   1,       0.5,         1]
  ]);

  new google.visualization.LineChart(document.getElementById('visualization')).
      draw(data, {curveType: "function",
		  width: 600, height: 400,
		  vAxis: {maxValue: 10}
		  , 'chartArea': {'width': '100%', 'height': '80%'}
		  , 'legend': {'position': 'bottom'}
		  }
  );
}
google.load('visualization', '1', {packages: ['corechart']});
google.setOnLoadCallback(drawVisualization);
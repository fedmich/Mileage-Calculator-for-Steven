/* v0.1 */

/* Options */
var car_type_rates = {
'compact' : { rate : 34.95, km : 9}
, 'intermediate' : { rate : 37.95 , km :  10 }
, 'standard' : { rate : 43.95 , km : 11 }
, 'full_size' : { rate : 43.95 , km : 13 }
, 'suv' : { rate : 69.95 , km : 16 }
}
var sales_tax = 14.975;	//This is percentage, don't put % character here
/* Options */

$(function() {
	$('#km').val( 250 );
	$('#days').val( 1 );
	$('#sales_tax').html( sales_tax + '%' );
	
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
	$('.ch_input').change( function (){
		calculate();
	}).keyup( function (){
		calculate();
	});
	$('.car_type').change( function (){
		calculate();
	});
	
	calculate();
});

//Language switcher
$(function() {
	var o = $('.langs_change a');
	o.click(function(){
		o.not(this).removeClass('active');
		$(this).addClass('active');
		
		var cc = this.rel;
		
		$('.lang').not('.lang_' + cc).hide().removeClass('active');
		$('.lang_' + cc).show().addClass('active');
		
		calculate();
	});
});

function calculate(){
	var km = $('#km').val();
	var days = $('#days').val();
	
	var ctype = $('.active .car_type').val();
	var fuel_cost = $('#fuel_cost').val();
	var km_rate = $('#km_rate').val();
	
	//from Option above
	var sales_tax_n = sales_tax;
	sales_tax_n = sales_tax / 100;	//Percentage
	
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
	to_num ( $('#car_km') , car_km , 0, '');
	
	var result = km * days;
	result = result * variance;
	
	to_num ( $('#reimburse') , km * km_rate);
	
	var rental = car_type_rates[ctype]['rate'] * days;
	to_num ( $('#rental') , rental);
	
	var fees = days * 4.04;
	to_num ( $('#fees') , fees );
	
	
	var tax = rental * sales_tax_n;
	to_num ( $('#tax') , tax );
	var refuel = ( km /100 * car_km ) * fuel_cost;
	to_num ( $('#refuel') , refuel );
	
	to_num ( $('#total') , ( rental + fees + tax + refuel ) );
}

function to_num ( obj, v , decimals , curr ){
	if(decimals!=0){
		decimals = 2;
	}
	if( curr !=''){
		curr = '$';
	}
	
	obj.html( '...' );
	if(! v){
		obj.html( '$0' );
		return false;
	}
	obj.html( curr + addCommas( v.toFixed(decimals) ) );
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


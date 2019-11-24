var result = document.querySelector('#getResult');
var output = document.querySelector('.outputBMI');
var recordBMI = {
	height:[],
	weight:[],
	BMI:[],
	time:[]
}

var strRecord;

throwBackData();
result.addEventListener('click', getData, false);

function getData(){
	
	var height = document.querySelector('#heightInput').value;
	var weight = document.querySelector('#weightInput').value;
	var today = new Date();
	var currentTime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	console.log(typeof(currentTime));

	if(height != '' && weight != ''){
		height = parseFloat(height);
		weight = parseFloat(weight);
		var BMI = caculate(height, weight);
		BMI = parseFloat(BMI);
		

		pushData(height, weight, BMI, currentTime);


		strRecord = JSON.stringify(recordBMI);
		var localBMI = localStorage.setItem('recordBMI_ls',strRecord);

		printOutput();
	}
	else{
		alert('Please enter weight and height!');
	}
	
}

printOutput();


function caculate(h, w){
	h /= 100;
	h = Math.pow(h, 2);
	h = h.toFixed(2);
	var b = w/h;
	b = b.toFixed(2);
	return b;
}


function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function printOutput(){
	var getRecordData = localStorage.getItem('recordBMI_ls');

	if(getRecordData !== null){

		var recordBMI_ary = JSON.parse(getRecordData);
		var str = '';
		for(var i = 0; i < recordBMI_ary.BMI.length; i++){
			var borderColor = whatColorIsIt(recordBMI_ary.BMI[i]);
			str += '<li style="border-left: 8px solid'+ borderColor +';"><em class="titleHead">';
			str += isOverWeighted(recordBMI_ary.BMI[i]);
			str += '</em><br><hr><em class="titleName">Height</em> <em class="titleValue">';
			str += recordBMI_ary.height[i];
			str += 'cm</em><em class="titleName">&nbsp &nbspWeight</em> <em class="titleValue">';
			str += recordBMI_ary.weight[i];
			str += 'kg</em><em class="titleName">BMI</em> ';
			str += recordBMI_ary.BMI[i];
			str += '<br><hr><em class="titleName" style="right: right; margin-left: 0px;">'+ recordBMI_ary.time[i] +'</em>';
			str += '</li>';
		}

		output.innerHTML = str;
	}
}

function pushData(h, w, B, t){
	recordBMI.height.push(h);
	recordBMI.weight.push(w) ;
	recordBMI.BMI.push(B);
	recordBMI.time.push(t);
}

function throwBackData(){
	var getRecordData = localStorage.getItem('recordBMI_ls');
		
	if(getRecordData !== null){
		var recordBMI_ary = JSON.parse(getRecordData);
		for(var i = 0; i < recordBMI_ary.BMI.length; i++){
			pushData(recordBMI_ary.height[i], recordBMI_ary.weight[i], recordBMI_ary.BMI[i], recordBMI_ary.time[i]);
		}	
	}
}


function isOverWeighted(B) {
	if(B < 18.5){
		return 'Too Light';
	}
	else if (B >= 18.5 && B < 25){
		return 'ideal';
	}
	else if (B >= 25 && B < 30){
		return 'overload';
	}
	else if (B >= 30 && B < 35){
		return 'mild obesity';
	}
	else if (B >= 35 && B < 40){
		return 'moderate obesity';
	}
	else{
		return 'severe obesity';
	}
}

function whatColorIsIt(B){
	if(B < 18.5){
		return '#31BAF9';
	}
	else if (B >= 18.5 && B < 25){
		return '#86D73F';
	}
	else if (B >= 25 && B < 30){
		return '#FF982D';
	}
	else if (B >= 30 && B < 35){
		return '#FF6C03';
	}
	else if (B >= 35 && B < 40){
		return '#FF6C03';
	}
	else{
		return '#FF1200';
	}
}

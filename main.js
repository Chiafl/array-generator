function generateMatrix(nRow, nCol, min, max){
	var mat = [];
	for (let i=0;i<nRow;i++){
		var arr = Array.from({length: nCol}, () => Math.round(min+Math.random()*(max-min)));
		mat.push(arr);
	}
	return mat;
}

function matrixToString(mat){
	if (!mat) return "";
	var str = "";
	mat.forEach((v, i) => {
		str += i == mat.length-1? "["+v+"]":"["+v+"],";
	})
	return str;
}

function updateTextbox(e){
	e.preventDefault();
	var textbox = document.getElementById("output");
	var nRow = parseInt(document.getElementById("input-num-row").value);
	var nCol = parseInt(document.getElementById("input-num-col").value);
	var nMin = parseInt(document.getElementById("input-min").value);
	var nMax = parseInt(document.getElementById("input-max").value);
	var nProperty = document.getElementById("input-property").value;
	if (nRow && nCol){
		var mat = generateMatrix(nRow, nCol, nMin, nMax);
		if (nProperty != 'random'){
			mat.forEach(arr=>{
				arr.sort((a,b)=>{return a-b;});
				if (nProperty == 'descending'){
					arr.reverse();
				}	
			})
		}
		var m = matrixToString(mat);
		textbox.value = nRow == 1? m : "["+m+"]";
	}
}

function copyToClipboard(e){
	e.preventDefault();
	var copyText = document.getElementById("output");
	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */
	navigator.clipboard.writeText(copyText.value);

	$('#clipboard-btn').tooltip('hide')
          .attr('data-original-title', 'Copied!')
          .tooltip('_fixTitle')
          .tooltip('show');
}

$(function(){
  $('[data-toggle="tooltip"]').tooltip();
  var generateBtn = document.getElementById("generate-btn");
  generateBtn.addEventListener('click', updateTextbox , false);

  var copyText = document.getElementById("clipboard-btn");
  copyText.addEventListener('click', copyToClipboard , false);
});

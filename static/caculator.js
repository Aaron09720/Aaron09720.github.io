//Calculator
var dpnum = "";  	//螢幕要顯示的數字
var calc = "";		//計算式
var ans = "";		//結果
var accCnt = 0; 
var calcState = false;

//jQuery函式 載入所有ＤＯＭ物件
$(document).ready(function(){

	//取得button點擊事件
	$("button").click(function(){

		//取得被點擊按鈕的value值(jQuery)
		var text = $(this).attr("value");
		
		//先判斷輸入值為何
		//若輸入為數字(運算子)
		if(parseInt( text, 10) == text || text === "."){
			accCnt = 0;
			//若前一次輸入不是運算元(第一次輸入)，直接輸入並顯示數字
			if(calcState === false){
				dpnum += text;
				calc += text;
				$(".displayFrame").val(dpnum);
			}

			//若前一次輸入是運算元，則先清除目前顯示數字，並重新顯示輸入數字
			else if(calcState === true){
				dpnum = "";
				dpnum += text;
				calc += text;
				$(".displayFrame").val(dpnum);
				calcState = false;
			}
		}

		//若輸入為運算元
		else if(text === "%" || text === "/" || text === "*" || text === "-" || text === "+"){
			if( calc.slice(-1) !== "%" || calc.slice(-1) !== "/" || calc.slice(-1) !== "*" || calc.slice(-1) !== "-" || calc.slice(-1) !== "+"){
				calc += text;
				calcState = true;
			}
		}
		
		//若輸入為AC/C
		else if(text == "AC/C"){
			//判斷accCnt目前被點擊次數，點一次為清除當前輸入，連點兩次則清除所有運算式
			if(accCnt === 0){
				accCnt += 1;
				//清除運算式中目前的輸入數字
				calc = calc.slice(0, (-1 * dpnum.length));
				dpnum = "";
				$(".displayFrame").val(dpnum);
			}
			else if(accCnt === 1){
				dpnum = "";
				calc = "";
				ans = "";
				accCnt = 0;
				clacState = false;
			}
		}


		//若輸入為+/-
		else if(text === "+/-"){
			if(dpnum === ""){
				dpnum += "-";
				calc += "-";
				$(".displayFrame").val(dpnum);
			}
			else if(dpnum === "-"){
				dpnum = "";
				$(".displayFrame").val(dpnum);
			}
			else if(parseInt(dpnum, 10) >= 0){
				calc = calc.slice(0, (-1 * dpnum.length));
				var tmp = (parseInt(dpnum, 10) * -1);
				dpnum = "";
				dpnum += tmp;
				calc += dpnum;
				console.log(calc);
				$(".displayFrame").val(dpnum);
			}
			else if(parseInt(dpnum, 10) < 0){
				calc = calc.slice(0, (-1 * dpnum.length)); 
				dpnum = dpnum.slice(0, 1);
				calc += dpnum;
				$(".displayFrame").val(dpnum);
			}
		}

		//若輸入為 = ，輸出結果
		else if(text === "="){
			ans = eval(calc);
			dpnum = "";
			calc = "";
			calc += ans;
			console.log(calc);
			$(".displayFrame").val(ans);
		}
	});	
});


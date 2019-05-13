//Quick of Eyes

var $block, level, score, countDownTime, diff;

function initialize(){
	level = 2,
	score = 0;
	countDownTime = 0;
}

function getRandomColor( max, min, d){
	return Math.floor( Math.random() * (max - min) + min);
}

function createBlock( num){

	//依據num參數建立div block數量
	$('#gameFrame').html("");
	for( var j = 1; j <= num * num; j++){
		$('#gameFrame').append('<div class="block" value="' + j +'"></div>');
	}

	//依據block數量調整每個block的長寬
	var blockWidth = (( 600 - (num + 1) * 4 ) / num),
	blockHeight = (( 600 - (num + 1) * 4 ) / num);
	$('.block').css({
		'width': blockWidth,
		'height': blockHeight 
	});

	//設定隨機的block顏色
	var r = getRandomColor( 240, 100),
	g = getRandomColor( 240, 100),
	b = getRandomColor( 240, 100),
	normalColor = "rgb( " + r + ", " + g + ", " + b +")";
	$('.block').css({
		"background-color": normalColor
	});

	//隨機設定一個顏色略與其他block不同的block
	// d:與其他顏色的誤差值
	dr = r - diff,
	dg = g - diff,
	db = b - diff,
	diffColor = "rgb( " + dr + ", " + dg + ", " + db +")",
	//隨機指定一個block
	diffValue = Math.floor(Math.random() * num * num);
	$('.block').each( function(){
		if( $(this).attr("value") == diffValue){
			$block = $(this);
		}	
	});
	$block.css({
		"background-color": diffColor
	});

	$block.on( 'click', function(){
		level++;
		score = Math.floor( score + countDownTime * level);
		createBlock(level);
	});

	$('.displayLevel span').text(level - 1);

}

function countDown(){
	var s;
	for( let i = 200; i >= 0; i--){
		setTimeout( function(){
			countDownTime = i / 10;
			$('.countDown span').text(countDownTime);
			if( i === 0){
				$('.score').css({
					"display": "block"
				});	
				$('.frame').not('.score').css({
					"display": "none"
				});
				$('.score .title span').text(score);
				clearTimeout();
			}
		}, ( 200 - i) * 100);
	}
}

$(document).ready(function(){

	$('.frame').not('.main').css({
		"display": "none"
	});

	$('.introBtn').click( function(){
		$('.intro').css({
			"display": "block"
		});	
		$('.frame').not('.intro').css({
			"display": "none"
		});
	});

	$('.backBtn').click( function(){
		$('.main').css({
			"display": "block"
		});	
		$('.frame').not('.main').css({
			"display": "none"
		});
	});

	
	$('.startBtn').click( function(){
		$('.level').css({
			"display": "block"
		});	
		$('.frame').not('.level').css({
			"display": "none"
		});
		
	});

	$('.easyBtn').click( function(){

		diff = 30;
		$('.game').css({
			"display": "block"
		});	
		$('.frame').not('.game').css({
			"display": "none"
		});

		initialize();
		createBlock(level);
		countDown();
	});

	$('.normalBtn').click( function(){
		
		diff = 20;
		$('.game').css({
			"display": "block"
		});	
		$('.frame').not('.game').css({
			"display": "none"
		});

		initialize();
		createBlock(level);
		countDown();
	});

	$('.hardBtn').click( function(){
		
		diff = 10;
		$('.game').css({
			"display": "block"
		});	
		$('.frame').not('.game').css({
			"display": "none"
		});

		initialize();
		createBlock(level);
		countDown();
	});
	
});
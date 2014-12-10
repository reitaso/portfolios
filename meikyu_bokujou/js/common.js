$(function(){
	//seen : title,opening,prologue,quiz,epilogue,gameover,endroll
	var seen = 'title';
	var talk = 0;
	//geinou,game,zatugaku,history,science
	var genle = 'geinou';
	var quiz = 0;
	var globalLife = 3;
	
	moveSeen(seen);
	moveTalk(talk);
	
	moveGenle(genle);
	moveQuiz(quiz);
	

//------------------------------------------------------------
//	ユーザー操作
//------------------------------------------------------------

//	タイトルの処理
//------------------------------
//gameFrameを非表示にする処理
	$('#gameFrame').addClass('off');
//オープニングに移動する処理
	$('#title .startBtn').on('click', function(){
		$('#gameFrame').removeClass('off').addClass('on');
		$('#title').removeClass('on').addClass('off');
		moveSeen('opening');
		moveTalk(0);
	});
	
	//スタートボタンのホバー処理
	$('#title .startBtn').on('mouseover', function(){
		$(this).stop(true).animate({
			'color' : '#fff000'
		},500);
	});
	$('#title .startBtn').on('mouseout', function(){
		$(this).stop(true).animate({
			'color' : '#fff'
		},500);
	});
	
	

//	オープニングの処理
//------------------------------
//.nextを押すと次のセリフに移動
	$('#opening .next').on('click',function(){
		var $this = $(this);

		var $talk = $('#' + seen + ' .talk > *');
		var talkLength = $talk.length;

		talk++;

		//現在のセリフがセリフの上限を超えたときとそうでない時の処理
		if(talkLength <= talk) {
			$('#opening').removeClass('on').addClass('off');
			moveSeen('prologue');
			moveTalk(0);
		} else {
			moveTalk(talk);
		}
		
	});
	
	//.nextのホバー処理
	$('.next').on('mouseover', function(){
		$(this).stop(true).animate({
			'backgroundColor' : '#f85353'
		},500);
	});
	$('.next').on('mouseout', function(){
		$(this).stop(true).animate({
			'backgroundColor' : 'rgba(0,0,0,0)'
		},500);
	});
	

//	プロローグの処理
//------------------------------
//.nextを押すと次のセリフに移動
	$('#prologue .next').on('click',function(){
		var $this = $(this);

		var $talk = $('#' + seen + ' .talk > *');
		var talkLength = $talk.length;

		talk++;

		//現在のセリフがセリフの上限を超えたときとそうでない時の処理
		if(talkLength <= talk) {
			console.log('test');
		} else {
			moveTalk(talk);
		}
		
		//1.セリフが終わったらジャンルを表示する。
		//2. それに合わせて、矢印を消す
		if(talkLength-1 === talk) {
			$('#genleSelect').removeClass('off').addClass('on');
			$('#prologue .next').css('display','none');
		}
		
	});
	
	//ジャンルボタンを押すと、該当するクイズに移動する
	$('.geinou').on('click',function(){
		$('#prologue').removeClass('on').addClass('off');
		$('#gameover, #endroll').removeClass('off').addClass('on');
		moveSeen('quiz');
		moveGenle('geinou');
		moveQuiz(0);
		moveTalk(0);
	});
	$('.game').on('click',function(){
		$('#prologue').removeClass('on').addClass('off');
		$('#gameover, #endroll').removeClass('off').addClass('on');
		moveSeen('quiz');
		moveGenle('game');
		moveQuiz(0);
		moveTalk(0);
	});
	$('.zatugaku').on('click',function(){
		$('#prologue').removeClass('on').addClass('off');
		$('#gameover, #endroll').removeClass('off').addClass('on');
		moveSeen('quiz');
		moveGenle('zatugaku');
		moveQuiz(0);
		moveTalk(0);
	});
	$('.history').on('click',function(){
		$('#prologue').removeClass('on').addClass('off');
		$('#gameover, #endroll').removeClass('off').addClass('on');
		moveSeen('quiz');
		moveGenle('history');
		moveQuiz(0);
		moveTalk(0);
	});
	$('.science').on('click',function(){
		$('#prologue').removeClass('on').addClass('off');
		$('#gameover, #endroll').removeClass('off').addClass('on');
		moveSeen('quiz');
		moveGenle('science');
		moveQuiz(0);
		moveTalk(0);
	});

//	クイズの処理
//------------------------------
//正解を押すと正解エフェクトを表示する
	$('.true').on('click',function(){
		$(this).addClass('trueSelect');
				
		var $quiz = $('#' + genle + '> *');
		$quiz.eq(quiz).find('> *').addClass('eventNone');
		
		setTimeout(function() {
			$('.true').removeClass('trueSelect');
			$quiz.eq(quiz).find('> *').removeClass('eventNone');
			quiz++;
			moveQuiz(quiz);
		}, 1200)
	});
	
//不正解を押すと不正解エフェクトを表示する
	$('.question dd:not(.true)').on('click',function(){
		$(this).addClass('falseSelect');
		
		var $quiz = $('#' + genle + '> *');
		$quiz.eq(quiz).find('> *').addClass('eventNone');
		
		setTimeout(function() {
			$quiz.eq(quiz).find('> *').removeClass('eventNone');
			$('.question dd:not(.true)').removeClass('falseSelect');
		}, 1200)
		
		//ライフポイントを消す処理
		globalLife--;
		changeLife(globalLife)
		
		//全てのライフが消えたらゲームオーバーに移動する
		if (globalLife===0) {
			setTimeout(function() {
				$('#quiz, #epilogue').removeClass('on').addClass('off');
				moveSeen('gameover');
			}, 2000)
		}
	});
	
	//最後のクイズに正解すると次のクイズに移動する
	$('.quiz5 .true').on('click',function(){
		setTimeout(function() {
			$('#quiz').removeClass('on').addClass('off');
			moveSeen('epilogue');
			moveTalk(0);
		}, 1000)
	});
	
	//選択肢のホバー処理
	$('.question dd').on('mouseover', function(){
		$(this).stop(true).animate({
			'color' : '#000',
			'backgroundColor' : '#ff6565'
		},200);
	});
	$('.question dd').on('mouseout', function(){
		$(this).stop(true).animate({
			'color' : '#fff',
			'backgroundColor' : 'rgba(0,0,0,0.8)'
		},200);
	});
	
	//最後のクイズに移動すると背景が変わる
	$('#quiz .quiz4 .true').on('click', function(){
		setTimeout(function() {
			$('#quiz').addClass('boss');
		}, 1200);
	});

//	エピローグの処理
//------------------------------
//.nextを押すと次のセリフに移動
	$('#epilogue .next').on('click',function(){
		var $this = $(this);

		var $talk = $('#' + seen + ' .talk > *');
		var talkLength = $talk.length;

		talk++;

		//現在のセリフがセリフの上限を超えたときとそうでない時の処理
		if(talkLength <= talk) {
			$('#quiz, #epilogue, #gameover').removeClass('on').addClass('off');
			moveSeen('endroll');
			staffRoll();
			moveTalk(talk);
		} else {
			moveTalk(talk);
		}
	});

//	ゲームオーバーの処理
//------------------------------
//「クイズからやり直す」を押すとジャンル選択に戻る処理
	$('.backQuiz').on('click',function(){
		moveSeen('prologue');
		moveTalk(46);
		changeLife(3);
		$('#genleSelect').removeClass('off').addClass('on');
		$('#prologue .next').css('display','none');
		$('#quiz').removeClass('boss');
		$('#gameover, #endroll').removeClass('on').addClass('off');
		$('#quiz, #prologue, #epilogue').removeClass('off').addClass('on');
	});
	
	//タイトルに戻る処理
	$('.backTitle').on('click', function(){
		moveSeen('title');
		moveTalk(0);
		changeLife(3);
		$('#gameFrame').addClass('off');
		$('#genleSelect').removeClass('on').addClass('off');
		$('#prologue .next').css('display','block');
		$('#quiz').removeClass('boss');
		$('#gameover, #endroll').removeClass('on').addClass('off');
		$('.seen').removeClass('off').addClass('on');
	});

//------------------------------------------------------------
//	機能
//------------------------------------------------------------
//------------------------------
//	シーン移動
//------------------------------	
	//シーンの移動
	/*function moveSeen(name) {
		var $seen = $('.seen');
		$seen.addClass('off');
		$('#' + name).removeClass('off').addClass('on');
		seen = name;
		talk = 0;
	}*/
	
	//フェード効果のシーンの移動
	function moveSeen(name) {
		var $seen = $('.seen');
		$seen.addClass('fade');
		$('#' + name).removeClass('fade');
		seen = name;
		talk = 0;
	}
		
	//次のシーンに移動
	function moveNextSeen(name) {
		$('#' + name).addClass('off');
		$('#' + name + ' + section').removeClass('off').addClass('on');
		seen = $('#' + name + ' + section').prop('id');
		talk = 0;
	}


//------------------------------
//	ジャンルの移動
//------------------------------	
	function moveGenle(name) {
		var $genle = $('.genle');
		$genle.addClass('off');
		$('#' + name).removeClass('off').addClass('on');
		genle = name;
	}
//------------------------------
//	クイズの移動
//------------------------------	
	function moveQuiz(index) {
		var $quiz = $('#' + genle + '> *');
		$quiz.addClass('off');
		$quiz.eq(index).removeClass('off').addClass('on');
		quiz = index;
	}
	

//------------------------------
//	セリフ移動
//------------------------------	
	function moveTalk(index) {
		var $talk = $('#' + seen + ' .talk > *');
		$talk.addClass('off');
		$talk.eq(index).removeClass('off').addClass('on');
		talk = index;
	}

//------------------------------
//	lifeの管理
//------------------------------
// 引数に表示したいライフを渡したらその分のlifeを表示する関数
// 1. $lifepoint変数を定義する
// 2. $lifepointの子供の要素を1回全て消して空にする

// 3. $lifepointの子供に引数で渡された数分のliを表示suru
// 4. 最終的にglobal変数のlifeに引数で渡された数字を代入して現在のlifeをglobal変数で管理しておく
	function changeLife(life) {
		var $lifepoint = $('.lifepoint li');
		$lifepoint.addClass('off');
		
		for (var i = 0; i <= life - 1; i++) {
			console.log(i);
			$lifepoint.eq(i).removeClass('off').addClass('on');
		}
		globalLife = life;
	}
	
//------------------------------
//	エンドロールのアニメーション
//------------------------------
	function staffRoll() {
		var $staff = $('#endroll .mmm');
		
		$staff.css('top', '250px');
		$staff.animate({
			'top' : '-2080px'
		},18000);
	}
});
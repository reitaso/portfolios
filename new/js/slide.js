$(function(){
    console.log("slide.js読み込んでるよ(ﾟДﾟ)b");
    //変数
    var $navBtn = $('main div ul#bottun li');//ボタン
	var $tabMove = $('main div ul#backnext li');//次へ＆戻るボタン
	var $section = $('main div ul#contents li');//表示するコンテンツ
    var contentid = 0;//表示位置

    //scroll処理
    function scroll (){
        $('main div ul#contents li').queue([]).stop();
        $('main div ul#contents li.on').queue([]).stop();
        
        //fix
        $('main div ul#contents li').css({
            opacity: 0,
            left: '150'+'px'
        });
        //animation
        $('main div ul#contents li.on').animate({
            opacity: 1,
            left: 0
        },200,'',function(){
        //↑秒、easing、この処理後の処理
            $('main div ul#contents li.on').delay(6600).animate({
                opacity: 0,
                left:'-150' + 'px'
            },200);
        })
    }
    
    //戻る、進むを押したときの処理
	$tabMove.click(
		function(){
			console.log('class名 : ' + $(this).attr('class'));
			console.log('nexttest : ' + $(this).attr('class').indexOf('next'));
			//戻るボタンが押されたときの場合の処理。今いる位置　-1　のコンテンツに移動
			if($(this).attr('class').indexOf('next') >= 0){
				contentid++;
                move(contentid);
                scroll();
			}
			//進むボタンが押されたときの場合の処理。今いる位置　+1　のコンテンツに移動
			if($(this).attr('class').indexOf('back') >= 0){
				contentid--;
                move(contentid);
                scroll();
			}
		}
	);
    
    //class="on"の移動
	function move(num) {
        //最小値
		if(num >= $section.length){
			num = 0;
		}
        //最大値
		if(num <= -1){
			num = $section.length-1;
		}
		contentid = num;
		$navBtn.removeClass('on');//リストについているonを消して
		$navBtn.eq(num).addClass('on');//その後に自分のクラスをonに付け直す。
		$section.removeClass('on');//その番号のコンテンツの位置のタグにアクセスして
		$section.eq(num).addClass('on');//クラスにonを付ける。
	}
    
    //クリックしたときの処理
    $navBtn.click(function () {
        var id = $(this).attr("id").replace('btn',' ');//クリックしたidの後ろの番号のみ取得
        move(id);
        scroll();
    });
    
    //自動スクロール
    setInterval(function () {
        contentid++;
        move(contentid);
        scroll();
    },7000);
});
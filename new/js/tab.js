$(function(){
    console.log('tab.js読み込んでるぜ(ﾟДﾟ)b');
    //変数
	var $navBtn = $('main div#info h2');//bottun
	var $section = $('main div#info div');//contents
    var contentid = 0;

    //クリックしたときの処理
    $navBtn.click(function () {
        var id = $(this).attr("id").replace('infoBtn',' ');//クリックしたidの後ろの番号のみ取得
        console.log('clickはできとるよ(ﾟДﾟ)b');
        move(id);
    });
    
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
});
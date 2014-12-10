//スティッキー
$(window).load(function(){
    $('#nav').sticky({ topSpacing: 0, className:"hey" });
});

//ページ内スクロール
$(function(){
    
    // #で始まるアンカーをクリックした場合に処理
    $('a[href^=#]').click(function() {
        // スクロールの速度
        var speed = 400; // ミリ秒
        // アンカーの値取得
        var href= $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top;
        // スムーススクロール
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
    
});

//ページトップボタン
$(function(){

    var pagetop = $('.pagetop');

    $(window).scroll(function(){
        if ( $(this).scrollTop() > 500 ) {
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });

    pagetop.click(function () {
        $('body, html').animate({ scrollTop: 0 }, 500);
        return false;
    });

});

//スクロールフェードイン
$(function(){
    var chalacter = $('#player, #niwatori, #zako, #boss1, #boss2, #boss3');
    var rules = $('#rules1, #rules2, #rules3, #rules4');
    
    chalacter.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        /*ここに実行したい内容を書く*/
        $(this).animate({
            opacity: '1',
            top: '0',
            right: '0',}, 800);
    });
    
    rules.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        /*ここに実行したい内容を書く*/
        $(this).animate({
            opacity: '1'
        }, 1500);
    });
});
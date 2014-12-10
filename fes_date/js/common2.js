$(function(){
	
	$("#main .ed").css({opacity:0});
	
	//オープニングから物語入り
	$("#main .op p").click(
		function(){
			$(this).parent("div.op").fadeOut(1000);
		}
	)
	
	var page ={
		seen :  0,
		select : 0,
		serihu : 0
	};
	
	
	var trueCount = 0;
	
	move(page.seen,page.select,page.serihu);
	
	$("ul.pager").children("li.next").click(
		function(){
			page.serihu ++ ;
			if($('.seen').eq(page.seen).find('.select').eq(page.select).find('.serihu').length - 1 == page.serihu){
				$(this).addClass("off");
			}
			move(page.seen,page.select,page.serihu);
		}
	);
	$("ul.pager").children("li.prev").click(
		function(){
			page.serihu--;
			$("li.next").removeClass("off");
			if(page.serihu == 0){
				$(this).addClass("off");
			}
			move(page.seen,page.select,page.serihu);
		}
	);
	
	//シーンと、selectと、台詞を移動する関数 (move関数)
	function move(seen,select,serihu) {
		$("ul.pager").children("li").removeClass("off");
		if(page.serihu == 0){
			$("li.prev").addClass("off");
		}
		if($('.seen').eq(page.seen).find('.select').eq(page.select).find('.serihu').length - 1 == page.serihu){
			$("li.next").addClass("off");
		}
		$('.seen').removeClass('on');
		$('.seen').find('.select').removeClass('on');
		$('.seen').find('.serihu').removeClass('on');
	
		$('.seen').eq(seen).addClass('on');
		$('.seen').eq(seen).find('.select').eq(select).addClass('on');
		$('.seen').eq(seen).find('.select').eq(select).find('.serihu').eq(serihu).addClass('on');
						
		var name = $('.seen ').eq(seen).find('.select').eq(select).find('.serihu').eq(serihu).attr('class');
		var face = name.split('bg_')[0].replace('serihu ','').replace(' on','');
		var n_char = $('p.char').attr('class').replace('char ','');
		
		console.log(face);
		console.log(n_char);

		if(face != 'ore' && face != n_char){
			$("p.char").fadeOut('fast');
			$("p.char").hide();
			$("p.char").attr('class','char');
			$("p.char").addClass(face).fadeIn();
		}
		console.log(page.seen,page.select,page.serihu);
		
		
		if(name.indexOf('bg_') >= 0) {
			var bgName = name.split('bg_')[1];
			$('.seen').eq(page.seen).attr('class','seen on');
			$('.seen').eq(page.seen).addClass(bgName);
		}
		
		//ガガガ
		
		if(page.seen == 0 && page.select == 0 && page.serihu == 29) {
			randomPosition($('.seen').eq(0),6);
		}
		if(page.seen == 0 && page.select == 0 && page.serihu == 99) {
			randomPosition($('.seen').eq(0),2);
		}
		if(page.seen == 3 && page.select == 0 && page.serihu == 1) {
			randomPosition($('.seen').eq(3),10);
		}
		if(page.seen == 3 && page.select == 0 && page.serihu == 20) {
			randomPosition($('.seen').eq(3),2);
		}
		if(page.seen == 3 && page.select == 1 && page.serihu == 1) {
			randomPosition($('.seen').eq(3),10);
		}
		if(page.seen == 3 && page.select == 1 && page.serihu == 20) {
			randomPosition($('.seen').eq(3),2);
		}
		
		/*
		bgChange(0,0,'room');
		bgChange(0,20,'room');
		bgChange(0,21,'dark');
		bgChange(0,34,'dark');
		bgChange(0,35,'church');
		bgChange(0,108,'');
		bgChange(0,108,'battle');
		
		bgChange(0,0,20,'room');
		bgChange(0,21,34,'dark');
		bgChange(0,35,107,'church');
		bgChange(0,108'battle');*/
		
		/*
		if(page.seen == 0 && page.serihu == 0){
			$('.seen').eq(0).attr('class','seen');
			$('.seen').eq(0).addClass('room');
		
			}else if(page.seen == 0 && page.serihu == 21){
		
				$('.seen').eq(0).attr('class','seen');
				$('.seen').eq(0).addClass('dark');
			}else if(page.seen == 0 && page.serihu == 35){
		
				$('.seen').eq(0).attr('class','seen');
				$('.seen').eq(0).addClass('church');
			}else if(page.seen == 0 && page.serihu == 108){
		
				$('.seen').eq(0).attr('class','seen');
				$('.seen').eq(0).addClass('battle');
			}*/
			
			if(page.seen == 3 && page.serihu == 10){
				$("p.char").attr('class','char');
				$("p.char").removeClass('sister_normal').fadeOut(1000);
			}
			/* エンディング */
			if(page.seen == 3 && page.serihu == $('.seen').eq(page.seen).find('.select').eq(page.select).find('.serihu').length - 1){
				
				$('#main .ed .mmm').css({
					top: 0
				});
				$("#main .ed").css({
					display: 'block'
				}).delay(1300).animate({
					opacity: 1
				},1000,function(){scroll();});
			}
			
	}
	
	function scroll(){
		$('.mmm').css({
			top: 0
		});
		var content_height = $('.mmm').outerHeight();
		$('.mmm').animate({ 
			top: -content_height + 370
		},15000);
	}
	
	function bgChange(seen,serihu,str) { 
	
		if(page.seen == seen && page.serihu == serihu){
			$('.seen').eq(seen).attr('class','seen on');
			$('.seen').eq(seen).addClass(str);
		}
		
	}
	
	$('ul.contine li').click(
		function(){
			$("#main .ed").fadeOut(1000).delay(1300).animate({
				opacity: 0	
			})
		}
	)
	
	$('ul.contine').children('li.restart').click(
		function(){
				page.seen = 0;
				page.select = 0;
				page.serihu = 111;	
				trueCount = 0;
				$("#main .ed").fadeOut(1000);
			
			move(page.seen,page.select,page.serihu);	
		}
	);
	
	$('ul.contine').children('li.close').click(
		function(){
				page.seen = 0;
				page.select = 0;
				page.serihu = 0;
				trueCount = 0;
				$("#main .ed").fadeOut(1000);
				$("#main .op").show();	
			move(page.seen,page.select,page.serihu);
		}
	);
	
	$('ul.root').children('li').click(
		function(){
			var name = $(this).attr('class');
			var selectNum  = name.split(' select')[1];
			var flg = name.split(' select')[0] =='yes';
			
			var BadEndFlg = false;
			
			console.log(flg);
			console.log(trueCount)
			page.seen++;
			page.select = selectNum;
			page.serihu = 0;
			
			trueCount = flg ? trueCount + 1 : trueCount - 1;
			
			
			if(name.indexOf('other') >= 0) {
				BadEndFlg = true;
			}
			
			console.log(page.seen);
			
			
			if(page.seen == $('.seen').length - 2){
				if (trueCount > 0){
					
					//Happy End
					page.select = 0;
					
				}else if(trueCount < 0){
					
					//Dere End
					page.select = 1;
					
				}
			}
			
			if(BadEndFlg) {
				page.seen = $('.seen').length - 2;
				page.select = 2;
				console.log('バッド');
			}
			move(page.seen,page.select,page.serihu);
			

		})
		

		function randomPosition(obj,num) {
			var wid = obj.width(),
				hei = obj.height(),
				animeCount = 0;
		
			for(var i = 0;i < num;i++) {
				 var randomTopNum = Math.floor(40 * Math.random()),
					  randomLeftNum = Math.floor(40 * Math.random());
			   
				 obj.delay(50).animate({
					  top : randomTopNum,
					  left : randomLeftNum
				 },0,function() {
					  ++animeCount;
					  if(animeCount == num) {
						   obj.css({
								top : 0,
								left : 0
						   });
					  }
				 });
			}
		}	
		
})


$(function(){

	var page ={
		shine : 1,
		select : 1,
		serihu : 1
	};
	
	$("#content").hide();
	$("#content p.char").hide();
	$("#content .section").hide();
	$("#content").fadeIn("normal");
	$("#content p.char").fadeIn("slow");
	$("#content .section:first").show();
	$("#content .section ul li.next").click(
		function(){
			$(this).parents("div.section").fadeOut("slow");
			$(this).parents("div.section").next().fadeIn();
		}
	);
	$("#content .section ul li.prev").click(
		function(){
			$(this).parents("div.section").fadeOut("slow");
			$(this).parents("div.section").prev().fadeIn();
		}
	);
	$(".sister").prev().children("ul.pager").children("li.next").click(
		function(){
			$("#content > p.char").addClass("maou");
			$("#content p.maou").hide();
			$("#content p.maou").fadeIn("slow");
		}
	);
	$(".sister").prev().children("ul.pager").children("li.next").click(
		function(){
			$("#content > p.char").addClass("maou");
			$("#content p.maou").hide();
			$("#content p.maou").fadeIn("slow");
		}
	);
	/*if($("sister").prev().hasClass("sister")){
		break;
		}
		else{
			$("sister").children("ul.pager").children(li.prev).click(){
				function(){
					$("#content p.char").removeClass("sister");
				}
			}
		}
	};*/
})

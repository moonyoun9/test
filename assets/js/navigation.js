$(function(){
	/* header */
	$("nav>ul>li").mouseover(function(){
		$("#header").addClass("on");
		$(this).siblings().find("ul").hide();
		$(this).find("ul").stop().slideDown(500);
		$(this).addClass("on").siblings().removeClass("on");
	})

	$("#header").mouseleave(function(){
		$("#header").removeClass("on");
		$("nav>ul>li").find("ul").stop().slideUp(300);
		$("nav>ul>li").removeClass("on");
	})

	var btnchk = 0;
	$(".btn_menu").click(function(){
		if(btnchk == 0){
			$(this).stop().addClass("openmenu");	
			$(".allmenuBg").addClass("on");
			$(".allmenu").addClass("open");
			btnchk = 1;
		}else{
			$(this).stop().removeClass("openmenu");
			$(".allmenuBg").removeClass("on");
			$(".allmenu").removeClass("open");
			btnchk = 0;
		}
	});

	/* 모바일 */
	$(document).on("click",".allmenu .allmenuwrap>div>ul>li",function(){
		
		if($(this).attr("class") == "act"){
			
			$(this).find("ul").slideUp(300);
			
		}else{

			$(this).find("ul").slideDown(300);
			
		}

		$(this).toggleClass("act");
		$(this).siblings("li").removeClass("act");
		$(this).siblings("li").find("ul").slideUp();

	});

});
    
    
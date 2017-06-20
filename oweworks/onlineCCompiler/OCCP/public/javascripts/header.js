$("#addMore").click(function() { //下拉菜单添加更多的功能
	var inputVal = $("#new-headline").val();
	if (inputVal) {
		$.ajax({
			"type": "get",
			"url": "/data",
			"data": $.param({
				"inputVal": inputVal
			}),
			"success": function(data) {
				location.href = "/tiku/" + inputVal;
			}
		})
	}
})

var breakpoint = 0;

// Function to set equinav breakpoint
function equiNavBreakpoint() {
	$('.equinav ul.navbar-nav > li').each(function() {
		breakpoint += $(this).innerWidth();
	}); //add up all menu items width for breakpoint
}

equiNavBreakpoint();

// Function to apply equinav menu
function equiNavMenu() {

	$('.equinav ul.navbar-nav > li').removeAttr('style');

	var mq = window.matchMedia('(min-width: 768px)');

	var nav = $('.equinav').innerWidth(); // Navbar Width
	var items = $('.equinav ul.navbar-nav > li').length; // Total number of menu items
	var space = nav - breakpoint; // Empty navbar space
	var spacer = parseInt(space / items); // Number of pixels to spread out to individual menu items. Since decimal places is not good with pixels we have to use parseInt.
	var xspace = nav - (breakpoint + (spacer * items)); // The remaining space after getting the spacer with parseInt
	var xspacer = Math.ceil(xspace / items); // The remaning number of pixels to distribute to menu items

	var num = 0;

	if (mq.matches) {

		if (nav > breakpoint) {

			$('.equinav').removeClass('equinav-collapse');

			if (breakpoint == 0) equiNavBreakpoint();

			$('.equinav ul.navbar-nav > li').each(function() {

				$(this).css({
					'width': 'auto'
				});

				var itemwidth = 0;
				itemwidth = (num < xspace) ? ($(this).innerWidth() + spacer) + xspacer : $(this).innerWidth() + spacer;

				$(this).css({
					'width': itemwidth + 'px'
				});

				num++;

				if ($(this).find('.dropdown-menu').length != 0) {
					if (num == items) $(this).find('.dropdown-menu').addClass('pull-right');
					if ($(this).find('.dropdown-menu').innerWidth() < $(this).innerWidth()) $(this).find('.dropdown-menu').css({
						'width': $(this).innerWidth() + 'px'
					});
				}
			});

		} else {

			$('.equinav').addClass('equinav-collapse');
			$('.equinav ul.navbar-nav > li > .dropdown-menu').removeAttr('style');

		}

	} else {

		$('.equinav').addClass('equinav-collapse');
		$('.equinav ul.navbar-nav > li > .dropdown-menu').removeAttr('style');

	};
}

equiNavMenu();

$(window).resize(function() {
	equiNavMenu();
});

$(document).off('click.bs.dropdown.data-api'); //关闭click.bs.dropdown.data-api事件，使顶级菜单可点击
$('.dropdown-toggle').parent('li').mouseenter(function() { //自动展开
	$(this).addClass('open')
})
$('.dropdown-toggle').parent('li').mouseleave(function() { //自动关闭
	$(this).removeClass('open')
})

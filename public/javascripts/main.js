$(document).ready(function () {

	$('[data-toggle="tooltip"]').tooltip();
	if (getCookie() == "true") {
		$("#wrapper").addClass("toggled");
		$("#logo2").css({
			visibility: 'hidden'
		});
		$("#logo1").css({
			display: 'inline'
		});
		$(".sidebar-footer i").css({
			transform: 'rotate(180deg)'
		});

	}

	$(".sidebar-footer,i.fa-bars").click(function (e) {
		e.preventDefault();
		// // $("#wrapper").toggleClass("toggled");
		console.log(getCookie());

		if (getCookie() == "false") {
			$("#wrapper").addClass("toggled");
			$("#logo2").css({
				visibility: 'hidden'
			});
			$("#logo1").css({
				display: 'inline'
			});
			$(".sidebar-footer i").css({
				transform: 'rotate(180deg)'
			});

			setCookie(true);
		} else {
			$(".sidebar-footer i").css({
				transform: 'rotate(360deg)'
			});
			$("#wrapper").removeClass("toggled");
			$("#logo2").css({
				visibility: 'visible'
			});

			setCookie(false);
		}

	});



});


function setCookie(data) {
	document.cookie = "sidebar=" + data;
}

function getCookie() {
	if (document.cookie.indexOf('sidebar') == -1) {
		setCookie(false);
	}

	return document.cookie.substr(document.cookie.indexOf('sidebar') + 8, document.cookie.length - 8);
}

$(document).ready(function() {
    var aORr = true;
    $(".sidebar-footer").click(function(e) {
        e.preventDefault();
        // // $("#wrapper").toggleClass("toggled");
        // console.log(aORr);

        if (aORr) {
            $("#wrapper").addClass("toggled");
            $("#logo2").css({
                visibility: 'hidden'
            });
            $("#logo1").css({
                display: 'inline'
            });
            $(".sidebar-footer i").css({
                transform: 'rotate(180deg)',
                transition: '.2s'
            });
            aORr = false;
        } else {
            $(".sidebar-footer i").css({
                transform: 'rotate(360deg)',
                transition: '.2s'
            });
            $("#wrapper").removeClass("toggled");
            $("#logo2").css({
                visibility: 'visible'
            });
            aORr = true;
        }

    });
})

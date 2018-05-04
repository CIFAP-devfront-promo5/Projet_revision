$(document).ready(
    function () {

        function switch_start_stop() {
            if (!($(this).hasClass('stopped')))
            {
                $(this).addClass('stopped');
                $(this).text("Relancez le temps");
                $(this).css('background-color','#9BE298');
                clearInterval(tempsReel);
            }
            else
            {
                $(this).removeClass('stopped');
                $(this).text("Arrêtez le temps");
                $(this).css('background-color','#fb806a');
                tempsReel = setInterval(horloge, 1000);
            }
        }


        function handle_scroll() {
            var Yscroll = $(window).scrollTop();
            offsetY = 0.8 * Yscroll + 'px';
            $('body').css('background-position', offsetX + offsetY);


        }

        function horloge() {
            var d = new Date();
            heure.innerHTML = d.toLocaleTimeString();
        }

        var heure = document.getElementById('temps');
        var tempsReel = setInterval(horloge, 1000);
        var start_stop = document.getElementById('stop');
        start_stop.addEventListener('click', switch_start_stop);
        var offsetY = 0;
        var offsetX;



        if (!!window.chrome && !!window.chrome.webstore) {
            $(window).scroll(handle_scroll);
        }

        $(window).bind('mousemove', function (e) {
            var mouseX = e.clientX;
            var X_center = $("body").innerWidth() / 2;
            offsetX = -parseFloat((mouseX - X_center) / 30) + 'px ';
            $('body').css('background-position', offsetX + offsetY);
        });


        $('#banner').hover(
            function () {
                $(this).addClass("zoomin").removeClass("zoomout");
            },
            function () {
                $(this).removeClass("zoomin").addClass("zoomout");
            }
        );
    });
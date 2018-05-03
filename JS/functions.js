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

function horloge() {
    var d = new Date();
    heure.innerHTML = d.toLocaleTimeString();
}

function handle_scroll() {
    var Yscroll = $(window).scrollTop();
    offsetY = 0.8 * Yscroll + 'px';
    $('body').css('background-position', offsetX + offsetY);


}
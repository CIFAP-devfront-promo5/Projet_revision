$(document).ready(function () {

        var height_banner = parseFloat($('#banner').css('height'));

        var offsetY = 800;


        $('#expertise .navbar_expertise > li').each(function () {
            $(this).hide();
        });

        $('.guys').on('click',function() {
            var id = $(this).attr('id');
            $('[data-target="' + id + '"]').css('display','block');
        });


    $(window).resize(function () {

            height_banner = parseFloat($('#banner').css('height'));
        });


        $(window).scroll(function (e) {
            var Y_scroll = $(window).scrollTop();

            if (Y_scroll > height_banner) {
                $('#fixed_navbar').fadeIn(500);
            }
            else {
                $('#fixed_navbar').fadeOut(500);
            }




            var exp_top = $('#expertise').offset().top;

            console.log(exp_top, Y_scroll);
            if (Y_scroll > exp_top - offsetY) {

                $('#expertise .navbar_expertise > li').each(function () {
                    $(this).show();
                });
                $('#expertise > .center_section > ul > li').addClass("animated fadeInUp");
                console.log('plus!!!')
            }

            var list_titles = [
                '#presentation',
                '#expertise',
                '#equipe',
                '#partenaires',
                '#reseau',
                '#actualites',
                '#contact'
            ];

            list_titles.forEach(function (elem) {
                $('[data-target="' + elem + '"] img').css('opacity','0');
            });

            var offset_nav = 150;

            for (var i = 0; i < list_titles.length - 1; i++)
            {
                var y_inf = $(list_titles[i]).offset().top;

                var y_sup = $(list_titles[i + 1]).offset().top;

                if (y_inf - offset_nav < Y_scroll && Y_scroll < y_sup - offset_nav) {
                    $('[data-target="' + list_titles[i] + '"] img').css('opacity','1');
                }

            }


        });
    }
)
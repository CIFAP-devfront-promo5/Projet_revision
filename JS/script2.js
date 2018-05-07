$(document).ready(
    function () {


        var height_1 = 75;
        var width_1 = 100;

        function attr_css() {
            $('#cadre').css(
                $(this).attr('id') ,
                $('#' + $(this).attr('id')).val()
            );
        }

        function check_position_cursor_resize(event) {

            $(document).mousemove(function (event) {
                var h = event.target.offsetHeight;


                var w = event.target.offsetWidth;

                var x = event.offsetX;
                var y = event.offsetY;

                // console.log('h:' + h, 'y:' + y, y > h - 10, y < h);


                var ID = event.target.id;

                var special_cursor = false;


                if ((y > h - 10 && y < h - 5) && (x > w - 10 && x < w - 5)) {
                    console.log('boubou');
                    $('#' + ID).css("cursor", "nw-resize");
                    special_cursor = true;
                }

                if (y > h - 10 && y < h) {
                    $('#' + ID).css("cursor", "n-resize");
                    special_cursor = true;
                    console.log('baba');
                }

                if (x > w - 10 && x < w - 5) {
                    $('#' + ID).css("cursor", "e-resize");
                    special_cursor = true;
                    console.log('babou');
                }

                if (!special_cursor) {
                    $('#' + ID).css("cursor", "default");
                }
            });

        }


        function check_position(event) {

            var h = event.target.offsetHeight;
            var w = event.target.offsetWidth;

            var x = event.offsetX;
            var y = event.offsetY;

            var ID = event.target.id;


            if((y > h - 10 && y < h - 5))
            {
                $(document).mousemove(function(event) {

                    $('#' + ID).append('<div class="temp_win"></div>');
                    $('#' + ID + ' > .temp_win').css("height",event.offsetY);
                    $('#' + ID + ' > .temp_win').css("width",$('#' + ID).css("width"));


                    $(document).mouseup(function() {
                        $(document).off('mousemove');
                        $('#' + ID).css("height",event.offsetY);
                        $('#' + ID + ' > .temp_win').remove();
                    })

                })


            }

            if((x > w - 10 && x < w - 5))
            {
                $(document).mousemove(function(event) {

                    $('#' + ID).append('<div class="temp_win"></div>');
                    $('#' + ID + ' > .temp_win').css("width",event.offsetX);
                    $('#' + ID + ' > .temp_win').css("height",$('#' + ID).css("height"));


                    $('#' + ID ).children('img').css('right', 10);
                    $(document).mouseup(function() {
                        $(document).off('mousemove');
                        $('#' + ID).children('img').css('right', 10);
                        $('#' + ID + ' > .temp_win').remove();
                        $('#' + ID).css("width",event.offsetX);

                    })

                })
            }

            if((y > h - 10 && y < h - 5) && (x > w - 10 && x < w - 5))
            {
                $(document).mousemove(function(event) {

                    $('#' + ID).append('<div class="temp_win"></div>');
                    $('#' + ID + ' > .temp_win').css("width",event.offsetX);
                    $('#' + ID + ' > .temp_win').css("height",event.offsetY);

                    $('#' + ID).children('img').css('right', 10);
                    $(document).mouseup(function() {
                        $(document).off('mousemove');
                        $('#' + ID).css("height",event.offsetY);
                        $('#' + ID).css("width",event.offsetX);
                        $('#' + ID + ' > .temp_win').remove();

                    })

                })
            }

        }

        function update_size() {

            if (parseFloat($(this).val()) > 50) {
                var prop = $(this).attr('id');
                var this_ = this;
                $('#cadre > div').each(function () {

                    var is_std_size = eval('parseFloat($(this).css("' + prop + '")) ==' + prop + '_1');
                    if (is_std_size) {
                        $(this).css(prop, $(this_).val());
                    }
                });

                width_1 = parseFloat($('#width').val());
                height_1 = parseFloat($('#height').val());
            }

        }

        $('#add_element').on('click',function() {
            var last_value = $('#cadre > div:last-child').text();
            last_value++;

            $('#cadre').append('<div id="' + last_value + '">' + last_value +
                '<img title = "supprimer" src="images/Delete.jpg"/></div>');

            $('#' + last_value).css('height', height_1);
            $('#' + last_value).css('width', width_1);

            $("#cadre > div > img").on("click",function() {
                var Id_parent = $(this).parent().attr('id');
                $("#" + Id_parent).remove();
            });

            $("#cadre > div").off('mousedown').on('mousedown',function(event)
            {
                check_position(event);
            });

            $('#width , #height').off('keyup').on('keyup', update_size);
        });

        $('.input_detect').on('change',attr_css);

        $('#width , #height').on('keyup', update_size);


        $("#cadre > div").on('mouseover',function(event)
        {
            check_position_cursor_resize(event);
        });

        $("#cadre > div").on('mousedown',function(event)
        {
            check_position(event);
        });

        $("#cadre > div > img").on("click",function() {
            var Id_parent = $(this).parent().attr('id');
            $("#" + Id_parent).remove();
        })


    });
$(document).ready(
    function () {

        // Valeurs par défaut :

        var height_1 = 75;
        var width_1 = 100;
        var Id_mem;

        var list_color = [
            '#851515',
            '#656028',
           '#3343d1',
           '#2db53b',
           '#849d1c',
           '#d24198',
           '#6e0180',
           '#317a17',
           '#ec2774',
           '#3c3841'
        ];

        //----------------------------------------------------------------
        // Fonctions
        //----------------------------------------------------------------

        function attr_css() {

            var property = $(this).attr('id');
            var value    = $('#' + $(this).attr('id')).val();

            $('#cadre').css(property , value);

        }


        function check_position(event) {


            var h = event.target.offsetHeight;
            var w = event.target.offsetWidth;

            var x = event.offsetX;
            var y = event.offsetY;

            var ID = event.target.id;


            if (event.target.id.length > 0)
            {
                if ((y > h - 12 && y < h - 3)) {

                    $(document).mousemove(function (event) {
                        $("#cadre > div").off('mousedown');
                        $('#' + ID).css("cursor", "n-resize");
                        $('#' + ID).append('<div class="temp_win"></div>');

                        var height_;
                        if (event.offsetY > 75)
                            height_ = event.offsetY;
                        else
                            height_ = 75;

                        $('#' + ID + ' > .temp_win').css("height", height_);
                        $('#' + ID + ' > .temp_win').css("width", $('#' + ID).css("width"));


                        $(document).mouseup(function () {
                            $('#' + ID).css("cursor", "default");
                            $(document).off('mousemove');
                            $('#' + ID).css("height", height_);
                            $('#' + ID + ' > .temp_win').remove();
                            $("#cadre > div").off('mousedown').on('mousedown', function (event) {
                                check_position(event);
                            });
                        })

                    })


                }

                if ((x > w - 12 && x < w - 3)) {
                    $(document).mousemove(function (event) {

                        var width_;
                        if (event.offsetX > 100)
                            width_ = event.offsetX;
                        else
                            width_ = 100;

                        $("#cadre > div").off('mousedown');
                        $('#' + ID).css("cursor", "e-resize");
                        $('#' + ID).append('<div class="temp_win"></div>');
                        $('#' + ID + ' > .temp_win').css("width", width_);
                        $('#' + ID + ' > .temp_win').css("height", $('#' + ID).css("height"));


                        $(document).mouseup(function () {
                            $('#' + ID).css("cursor", "default");
                            $(document).off('mousemove');
                            // $('#' + ID).children('i').css('right', 0);
                            $('#' + ID + ' > .temp_win').remove();
                            $('#' + ID).css("width", width_);
                            $("#cadre > div").off('mousedown').on('mousedown', function (event) {
                                check_position(event);
                            });

                        })

                    })
                }

                if ((y > h - 12 && y < h - 3) && (x > w - 12 && x < w - 3)) {
                    $(document).mousemove(function (event) {

                        $("#cadre > div").off('mousedown');
                        var width_;
                        if (event.offsetX > 100)
                            width_ = event.offsetX;
                        else
                            width_ = 100;

                        var height_;
                        if (event.offsetY > 75)
                            height_ = event.offsetY;
                        else
                            height_ = 75;

                        $('#' + ID).append('<div class="temp_win"></div>');
                        $('#' + ID + ' > .temp_win').css("width", width_);
                        $('#' + ID + ' > .temp_win').css("height", height_);
                        $('#' + ID).css("cursor", "nw-resize");


                        $(document).mouseup(function () {
                            // $('#' + ID).children('i').css('right', 0);
                            $(document).off('mousemove');
                            $('#' + ID).css("height", height_);
                            $('#' + ID).css("width", width_);
                            $('#' + ID + ' > .temp_win').remove();
                            $('#' + ID).css("cursor", "default");

                            $("#cadre > div").off('mousedown').on('mousedown', function (event) {
                                check_position(event);
                            });

                        })

                    })
                }
            }

        }

        function valid_element() {
            $('section input').each(function() {
                if($(this).val().length > 0)
                {
                    var property = $(this).attr('id');
                    var value_prop = $(this).val();
                    $('#' + Id_mem).css(property , value_prop);
                }
            });
            
            $("#menu").remove();

        }

        function modulo(x) {
            x--;
            while(x>8)
                x = x - 9 ;
            return x;
        }

        function update_size() {

            var prop = $(this).attr('id');

            if (parseFloat($(this).val()) > 50) {

                var this_ = this;
                $('#cadre > div').each(function () {

                    var is_std_size = eval('Math.floor(parseFloat($(this).css("' + prop + '"))) ==' + prop + '_1');
                    if (is_std_size) {
                        $(this).css(prop, $(this_).val());
                    }
                });

                width_1 = Math.floor(parseFloat($('#width').val()));
                height_1 = Math.floor(parseFloat($('#height').val()));
            }

        }



        //----------------------------------------------------------------
        // LISTENERS
        //----------------------------------------------------------------

        //----------------------------------------------------------------
        // Ajout d'élement
        //----------------------------------------------------------------

        $('#add_element').on('click',function() {
            var last_value = $('#cadre > div:last-child').text();
            last_value++;

            $('#cadre').append('<div class  ="noselect" unselectable="on" onselectstart="return false;" id="' + last_value + '">' + last_value +
                '<i title="Supprimer" class="fas fa-times"></i>' +
                // '<i unselectable="off" onselectstart="" class="fas fa-bars select"></i>' +
                '</div>');

            $('#' + last_value).css('height', height_1);
            $('#' + last_value).css('width', width_1);
            $('#' + last_value).css('background-color', list_color[modulo(last_value)]);

            $("#cadre > div > .fa-times").on("click",function() {
                var Id_parent = $(this).parent().attr('id');
                $("#" + Id_parent).remove();
            });

            $("#cadre > div > .fa-bars").on("click",function() {
                Id_mem = $(this).parent().attr('id');
                    $(this).append(
                        '<div id="menu">' +
                        '<section>' +
                        '   <div>' +
                        '       <h4>order : </h4>' +
                        '       <input type="text" name="" id="order">' +
                        '   </div>'    +
                        '   <div>' +
                        '       <h4>flex-grow : </h4>' +
                        '       <input type="text" name="" id="flex-grow">' +
                        '   </div>' +
                        '   <div>' +
                        '       <h4>flex-shrink : </h4>' +
                        '       <input type="text" name="" id="flex-shrink"></div>' +
                        '   <div>' +
                        '       <h4>flex-basis : </h4>' +
                        '       <input type="text" name="" id="flex-basis">' +
                        '   </div>' +
                        '   <div id="valid_elem">OK</div>' +
                        '</section>' +
                        '</div>'
                );

                $('#valid_elem').on('click',valid_element);
                
            });

            $("#cadre > div").off('mousedown').on('mousedown',function(event)
            {
                check_position(event);
            });

            $('#width , #height').off('keyup').on('keyup', update_size);
        });

        //----------------------------------------------------------------
        // Modification propriété
        //----------------------------------------------------------------


        $('.input_detect').on('change',attr_css);

        //----------------------------------------------------------------
        // Modification live de width et height
        //----------------------------------------------------------------

        $('#width , #height').on('keyup', update_size);



        //----------------------------------------------------------------
        // Resize des blocs
        //----------------------------------------------------------------

        $("#cadre > div").off('mousedown').on('mousedown',function(event)
        {
            check_position(event);
            return false;
        });

        //----------------------------------------------------------------
        // Suppression d'un bloc
        //----------------------------------------------------------------

        $("#cadre > div > .fa-times").on("click",function() {
            var Id_parent = $(this).parent().attr('id');
            $("#" + Id_parent).remove();
        });

        $("#cadre > div > .fa-bars").on("click",function() {
            Id_mem = $(this).parent().attr('id');
            $(this).append(
                '<div id="menu">' +
                '<section>' +
                '   <div>' +
                '       <h4>order : </h4>' +
                '       <input type="text" name="" id="order">' +
                '   </div>'    +
                '   <div>' +
                '       <h4>flex-grow : </h4>' +
                '       <input type="text" name="" id="flex-grow">' +
                '   </div>' +
                '   <div>' +
                '       <h4>flex-shrink : </h4>' +
                '       <input type="text" name="" id="flex-shrink"></div>' +
                '   <div>' +
                '       <h4>flex-basis : </h4>' +
                '       <input type="text" name="" id="flex-basis">' +
                '   </div>' +
                '   <div id="valid_elem">OK</div>' +
                '</section>' +
                '</div>'
            )
        });

        $('#valid_elem').on('click',valid_element);


    });
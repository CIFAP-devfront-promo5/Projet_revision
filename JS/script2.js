$(document).ready(
    function () {

        // Valeurs par défaut :

        var height_1 = 75;
        var width_1 = 100;
        var Id_mem;
        var align_self_val = 'stretch';

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


            $('.input_detect').each(function() {
                $(this).css('background-color','white');
            });
            $(this).css('background-color' , '#F7FFB8');

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
            var i = 0;
            $('#menu input , #menu select').each(function() {
                console.log(Id_mem, this);

                if($(this).val().length > 0 && i < 5)
                {
                    i++;
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

        function iif($condition,$siok,$siko){
            if ($condition == true)	return($siok);	else	return($siko);
        }

        function  isselected(align_self_val,value)
        {
            return iif(align_self_val == value , 'selected' , '');
        }

        function handle_child_props (event, this_) {
            Id_mem = $(this_).parent().attr('id');

            align_self_val = $('#' + Id_mem).css('align-self');

            $('body').append(
                '<div id="menu">' +
                '<section>' +
                '   <div>' +
                // '       <h4>Propriétés enfants<div>' +
                '       <span style="text-align: center;">Propriétés enfants</span>' +
                '       <i title="fermer" class="fas fa-times close"></i>' +
                '   </div>'    +
                '   <div>' +
                '       <h4>order : </h4>' +
                '       <input value = "' + $('#' + Id_mem).css('order') + '" type="text" name="" id="order">' +
                '   </div>'    +
                '   <div>' +
                '       <h4>flex-grow : </h4>' +
                '       <input value = "' + $('#' + Id_mem).css('flex-grow') + '" type="text" name="" id="flex-grow">' +
                '   </div>' +
                '   <div>' +
                '       <h4>flex-shrink : </h4>' +
                '       <input value = "' + $('#' + Id_mem).css('flex-shrink') + '" type="text" name="" id="flex-shrink"></div>' +
                '   <div>' +
                '       <h4>flex-basis : </h4>' +
                '       <input  value = "' + $('#' + Id_mem).css('flex-basis') + '" type="text" name="" id="flex-basis">' +
                '   </div>' +
                '   <div>' +
                '       <h4>align-self : </h4>' +
                '       <select  type="text" name="" id="align-self">' +
                '       <option ' + isselected(align_self_val,'flex-start') + ' value="flex-start">flex-start</option>' +
                '       <option ' + isselected(align_self_val,'flex-end') + '  value="flex-end">flex-end</option>' +
                '       <option ' + isselected(align_self_val,'center') + '  value="center">center</option>' +
                '       <option ' + isselected(align_self_val,'stretch') + ' value="stretch">stretch</option>' +
                '       <option ' + isselected(align_self_val,'baseline') + ' value="baseline">baseline</option>' +
                '       </select>' +
                '   </div>' +
                '   <div id="valid_elem"><h5>OK</h5></div>' +
                '</section>' +
                '</div>'
            );

            $('#menu').fadeIn(200);

            $('#menu').css('left',event.clientX);
            $('#menu').css('top',event.clientY + 15);
            $('#valid_elem').off('click').on('click',valid_element);
            $('.close').on('click',close_props);
        };

        function close_props() {

            $('#menu').fadeOut(200);
            $('#menu').remove();
        }


        function listeners_refresh()
        {
            //----------------------------------------------------------------
            // Suppression d'un élément
            //----------------------------------------------------------------

            $("#cadre > div > .remove").off("click").on("click",function() {
                var Id_parent = $(this).parent().attr('id');
                $("#" + Id_parent).remove();
            });


            //----------------------------------------------------------------
            // Propriétés enfant
            //----------------------------------------------------------------

            $("#cadre > div > .fa-bars").off("click").on("click",function(event) {

                handle_child_props(event, this)

            });

            //----------------------------------------------------------------
            // Resize des blocs
            //----------------------------------------------------------------

            $("#cadre > div").off('mousedown').on('mousedown',function(event)
            {
                check_position(event);
            });

            //----------------------------------------------------------------
            // Modification live de width et height
            //----------------------------------------------------------------

            $('#width , #height').off('keyup').on('keyup', update_size);
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

            $('#cadre').append('<div class  ="blocs noselect" unselectable="on" ' +
                'onselectstart="return false;" id="' + last_value + '">' + last_value +
                '<i title="Supprimer" class="fas fa-times remove"></i>' +
                '<i title="Propriétés enfant" class="fas fa-bars"></i>' +
                '</div>');

            $('#' + last_value).css('height', height_1);
            $('#' + last_value).css('width', width_1);
            $('#' + last_value).css('background-color', list_color[modulo(last_value)]);


            //----------------------------------------------------------------
            // Refresh listeners "element"
            //----------------------------------------------------------------

            listeners_refresh();
        });

        //----------------------------------------------------------------
        // Modification propriété
        //----------------------------------------------------------------


        $('.input_detect').on('change',attr_css);

    });
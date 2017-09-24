;(function () {
'use strict';

$('#send_ad').on('click',function(){
    sendanuncio();
    event.preventDefault();
});

$('.tipo, input[name="tags"]').on('click',function(){
    var tipo=$(this).attr('id');
    console.log(tipo);
    launchquery(0);
});
$('#price input,#nombre input').on('change',function(){
    var tipo=$(this).attr('id');
    console.log(tipo);
    launchquery(0);
});
$('#next').on('click',function(){
    var page = $('#pagina').val();
    console.log(page,'ppp');
    launchquery(page);
});
$('#prev').on('click',function(){
    var page = $('#pagina').val();
    console.log(page,'ppp');
    launchquery(parseInt(page)-12);
});

launchquery(0);
function launchquery(skip){
    var compra=$('#compra').prop('checked');
    var venta=$('#venta').prop('checked');
    if(!compra && !venta || compra && venta){
        var enventa='';
    }else{
        if(venta){
            var enventa=false;
        }else{
            var enventa=true;
        }
    }
    var name=$('#name').val();
    var min=$('#min').val();
    var max=$('#max').val();
    var tags=$('input[name="tags"]:checked').val();
    console.log(tags);


    var data={limit:6,skip:skip,venta:enventa,min:min,max:max,tags:tags,nombre:name};

    $.ajax(
        {
          url : 'http://localhost:3000/apiv1/anuncios',
          type: "GET",
          data : data,
          success : function(json) {
              
            //JSON.stringify(json);
            //console.log(json);
            $('.fh5co-narrow-content .row').html('');
            if(json.rows.length>0){
                $.each(json.rows, function(index,info){
                    var html="";
                    console.log(info);
                    //html +='<div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 work-item">';
                    html +='<a href="#">'
                    if(info.foto){
                        html +='<img src="anuncios/images/'+info.foto+'" class="img-responsive">';
                    }else{
                        html +='<img src="images/nofoto.jpg" class="img-responsive">';
                    }
                    html +='<div class="fh5co-work-nombre">'+info.nombre+'</div>'
                    html +='<div class="fh5co-work-precio">'+info.precio+' €</div>'
                    if(info.venta)
                        var venta='En Venta';
                    else
                        var venta='Compro';
                    html +='<div class="fh5co-work-tipo">'+venta+'</div>'
                    html +='<p class="fh5co-work-tags">'+info.tags+'</p>';
                    html +='</a>';
                    //</div>';
                    $('<div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 work-item"/>').html(html).appendTo('.fh5co-narrow-content .row');
                    
                });
                $('#pagina').val(parseInt(skip)+6);
                if(parseInt(skip)+6==6){
                    $('#prev').hide();
                }else{
                    $('#prev').show();
                }
            }else{
                $('<div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 work-item"/>').html('<p>No hay resultados</p>').appendTo('.fh5co-narrow-content .row');
            }
            
        },
        error : function(xhr, status) {
            alert('Lo sentimos, se ha producido un error');
        },
    });
    
}
    function sendanuncio(){
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/apiv1/anuncios',
            data: $("#form_new").serialize(),
            success: function(data)
            {
                $("#respuestaok").show();
                $("#respuestako").hide();
                $("#form_new")[0].reset();
            },
            error : function(xhr, status) {
                $("#respuestaok").hide();
                $("#respuestako").show();
            },
          });
          return false;
 
    }
}());
<script>
$(document).ready(function(){
    $('#gerarXLS').on('click',function(e){
        if(enviarFormulario()){
           
            e.preventDefault();
            $('form[name="form-relatorio"]').attr('method', 'GET');
            $('form[name="form-relatorio"]').attr('action', $(this).data('action')).submit();

            var consulta = $('form[name="form-relatorio"]').serializeArray();
            //Percorre o objeto para obter o campo.
            var dataObj = setObjetct(consulta);
                 
           /* $.ajax({
                url: '/apps/financeiro/relmensalidade/'+$(this).data('action'),
                type: 'get',                
                async:false,
                //dataType:'json',
                data:dataObj,
                success:function (data) {
                    console.log(data);
                }
            });  */

        }
    });
});

 //Function para inserçao de dados objeto
 function setObjetct(consulta){
    var dataObj = {};

     $(consulta).each(function(i, field){
         dataObj[field.name] = field.value;
     });

    return dataObj;
 }


</script>
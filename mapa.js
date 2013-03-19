
		
		function validaform(){ /* Função de validação para formulário */
			/*if((document.getElementById('cep_2').value == '' || document.getElementById('cep_1').value == '') && document.getElementById('endereco').value == '' ){
				alert("Informe o endereço ou CEP!"); 
				return false
			
			}*/
			if($('#endereco').val() == '')
			{
				$('#endereco').focus();
				alert("Informe o seu CEP ou endereço!"); 
				return false
			}
			document.getElementById('route').innerHTML='';
			return true;
		
		}  
		
		
		

		
//busca posição do imóvel
	function buscaDestino(endereco,descricao,lat,lng){
				    			
		var geo = new google.maps.Geocoder;
		var point;
		var to = endereco;
		
		//se tem latitude e longitude  busca  por elas , se não pelo endereço
		
		if(lat != '' && lng != ''){
			
			inicializa(lat,lng,descricao);
		
		} else {
				
		//retorno das coordenadas para a origem imovel
		geo.geocode({'address' : to}, function(results, status){
						lat=  results[0].geometry.location.lat();
						lng = results[0].geometry.location.lng();
						inicializa(lat,lng,descricao)
		   });	
		 
		}
				
	}


/* API V3 */	
var directionDisplay;
var directionsService = new google.maps.DirectionsService();	
	
	function inicializa(lat,long,descricao){
			
					
		directionsDisplay = new google.maps.DirectionsRenderer();
		var img = new google.maps.MarkerImage('../img/icone-maps-verde.png');	
		var Latlng = new google.maps.LatLng(lat,long);
		var mapOptions = {
          center: Latlng,
          zoom: 15,
		  streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
		  
        };
        var mapa = new google.maps.Map(document.getElementById("mapa_base"),
            mapOptions);

		var marker = new google.maps.Marker({
		position: Latlng,
		map: mapa,
		title: descricao,
		icon:img
		}); 
	
		
		 var infowindow = new google.maps.InfoWindow({
			content: descricao,
			'border-radius':10
		});

		google.maps.event.addListener(marker, 'click', function() {	
			infowindow.open(mapa,marker);
		});
	
		infowindow.open(mapa,marker);
		
		directionsDisplay.setMap(mapa);
		directionsDisplay.setPanel(document.getElementById("route"));
			
  }
	
		function gerarRota(endereco,ponto){
			
			//variaveis
			var from = '';
			var to = '';
		
					
		    
			var geo = new google.maps.Geocoder;
			
			from = $('#endereco').val();//destino
			to = endereco;//origem imovel
			
		/*	//retorno das coordenadas para o destino
		geo.geocode({'address' : from}, function(results, status){
						lat =  results[0].geometry.location.lat();
						lng = results[0].geometry.location.lng();
						
		   });
			
			//retorno das coordenadas para a origem imovel
		geo.geocode({'address' : to}, function(results, status){
						latTo =  results[0].geometry.location.lat();
						lngTo = results[0].geometry.location.lng();
		   });	*/
			
			
			  	var start =from;
				var end = to;
				var request = {
					origin:start,
					destination:end,
					travelMode: google.maps.DirectionsTravelMode.DRIVING,
					 provideRouteAlternatives: true,
					 optimizeWaypoints: true
				};
				
				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(response);
						
					}else{
						alert('Verifique o Endereço/Cep informado! Nenhum resultado encontrado');
					}
				});		
  


			
}
/* Fim Api V3*/
	/*
		function inicializa(lat,long,descricao) { //inicia mapa
			var centro; //variavel que obtem o centro do mapa latiude elongitude
			var info; // variavel para guardar informações sobre ponto desejado
			info  = "<div id='mapa_texto'>"+descricao+"</div>";
			var infoOptions = { maxWidth: 300,
								noCloseOnClick: true };//balão que contem as informações desejadas
			if (GBrowserIsCompatible()) {
			
				var iconeBase 	     = new GIcon();//varivel que cria icone para ponto
				//iconeBase.shadow     = "../img/mapa_sombra.png";//sombra do icone
				iconeBase.iconSize   = new GSize();  //tamanho do icone
				iconeBase.shadowSize = new GSize(51, 34);  //tamnaho da sombra
				iconeBase.iconAnchor = new GPoint(5, 5); //ponto (em pixels relativo a
				var pino   			 = new GIcon(iconeBase);
				//pino.image 			 = "../img/icone_google_maps.png";//icone de apontamento
				//pino.image 			 = "../img/icon_verde.png";//icone de apontamento
				pino.image 			 = "../img/icone-maps-verde.png";//icone de apontamento
				
						
				var marcadorOptions = { icon: pino,
										draggable: false };
										
				var marcador = new GMarker(new GLatLng(lat, long), marcadorOptions);//posicao do marcador iconede apontamento
				centro = new GLatLng(lat, long);// define aonde é o centro do mapa
			
				
				map = new GMap2(document.getElementById("mapa_base"));// pega o documento da div mapa para cira o map
				map.setCenter(new GLatLng(lat, long), 15);// seta o cnetro do mapa 
			
				
				
				
				
				geocoder = new GClientGeocoder();
				map.addControl( new GSmallMapControl() ); 
				map.addControl( new GMapTypeControl() );
				directionsPanel = document.getElementById("route");
			  
				 directions = new GDirections(map, directionsPanel);
				// directions = new GDirections(marcador, directionsPanel);
			   // alert(directions);
				
				map.openInfoWindowHtml(centro, info, infoOptions); // abre informações sobre o pornto
				map.addOverlay(marcador);
				GEvent.addListener(marcador, "click", function() {  map.openInfoWindowHtml(centro, info, infoOptions);  });
			}
		}
    */
		
	


     /*function gerarRota(endereco,ponto){
	//from = ""+document.getElementById("cep_1").value+'-'+document.getElementById("cep_2").value;
		
		from = "";
		/*
		if(document.getElementById("endereco").value == '' && document.getElementById("cep_1").value != '' && document.getElementById("cep_2").value != '' ){
			document.getElementById("endereco").value = '';
			from = document.getElementById("cep_1").value+'-'+document.getElementById("cep_2").value;
		}
		
		if(document.getElementById("endereco").value != '' &&(document.getElementById("cep_1").value == '' || document.getElementById("cep_2").value == '') ){
			document.getElementById("cep_1").value = '';
			document.getElementById("cep_2").value = '';
			from = document.getElementById("endereco").value;
		}
		
				if(document.getElementById("endereco").value != '' &&(document.getElementById("cep_1").value != '' || document.getElementById("cep_2").value != '') ){
			document.getElementById("endereco").value = '';
			from = document.getElementById("cep_1").value+'-'+document.getElementById("cep_2").value;
		}
		*/
		/*from = $('#endereco').val();//destino
		
		//alert(from);
		to = endereco;
		//alert(ponto)
		
		var pointfrom="";
		var pointto="";
		if ( geocoder ) {
			geocoder.getLatLng(from, 
				pointfrom = function(point){
						//alert('FROM'+point);
					if ( !point ) {
					  //  alert(from + " não encontrado");
					  
						document.getElementById('route').innerHTML= from + " n&atilde;o encontrado";
					} 
					document.getElementById('ponto_from').value=point;
								//alert(document.getElementById('ponto_from').value);
					pointfrom = document.getElementById('ponto_from').value;
					//pointfrom = "(-28.2566357,-52.4161427)";
					//pointto = "(-28.2611682,-52.4112717)";
					var string = "from: " + pointfrom + " to: "+ponto;
					//alert(string);
					directions.clear();
					directions.load(string);
					GEvent.addListener(directions, "error", erroGetRoute);
					//return point;
				}
			);
		
			alert(to);
			geocoder.getLatLng(to, 
				function(point){
							//alert('to'+point);
					if ( !point ) {
						 pointto=point;
						document.getElementById('route').innerHTML= to + " n&atilde;o encontrado";
						alert(to + " não encontrado");
						
					} 
					
				}
			);	

		} else {
			alert("GeoCoder n&atilde;o identificado");
		}
		$('#carregando').delay(1000).hide(1);
	}
  */  
	function erroGetRoute(){
		document.getElementById('route').innerHTML=" N&atilde;o foi possivel tra&ccedil;ar a rota de: " + from + " para: " + to ;
		//alert("Não foi possivel traçar a rota de: " + from + " para: " + to );
	}
	
            

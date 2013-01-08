$(document).ready(function () {
    setTimeout(setupmenu, 500);
});

function setupmenu() {
	var opcionactual  = "111";
	
    $("#menu-filtering-tabs").kendoTabStrip({
        dataSource: ["Segmentos","Marcas","Hist. por Segmento","Hist. por Marca","Vehículos"],
        change: function(e) {
            opcionactual = this.value();
            cargaopcion();
        }
    }).data("kendoTabStrip").select(0);


    function cargaopcion() {
			opcionseleccionada="segmentos.asp"
			if (opcionactual == "Segmentos") {opcionseleccionada="segmentos.asp"};
			if (opcionactual == "Marcas") {opcionseleccionada="marcas.asp"};
			if (opcionactual == "Hist. por Segmento") {opcionseleccionada="indexsegmento.html"};
			if (opcionactual == "Hist. por Marca") {opcionseleccionada="indexmarca.html"};
			if (opcionactual == "Vehículos") {opcionseleccionada="indexvehiculo.html"};
 
			$('#contenedor').fadeOut('slow', function(){
				$('#contenedor').load( opcionseleccionada  , function(){
					$('#contenedor').fadeIn('slow');
				});
			});
    }

}

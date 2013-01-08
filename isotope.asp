<head>
		<script src="bin/jquery-1.7.1.min.js"></script>
        <script src="bin/jquery.isotope.min.js" type='text/javascript' ></script>
		<script src="bin/yui-min.js"></script>   
		<script src="bin/raphael20.js" type="text/javascript" charset="utf-8"></script>		
</head> 
		  
			<script>
				var scrollview; 	
			</script>			
 
			<style>
			
				/* Start: Recommended Isotope styles */

				/**** Isotope Filtering ****/

				.isotope-item {
				  z-index: 2;
				}

				.isotope-hidden.isotope-item {
				  pointer-events: none;
				  z-index: 1;
				}

				/**** Isotope CSS3 transitions ****/

				.isotope,
				.isotope .isotope-item {
				  -webkit-transition-duration: 0.8s;
					 -moz-transition-duration: 0.8s;
						  transition-duration: 0.8s;
				}

				.isotope {
				  -webkit-transition-property: height, width;
					 -moz-transition-property: height, width;
						  transition-property: height, width;
				}

				.isotope .isotope-item {
				  -webkit-transition-property: -webkit-transform, opacity;
					 -moz-transition-property:    -moz-transform, opacity;
						  transition-property:         transform, opacity;
				}

				/**** disabling Isotope CSS3 transitions ****/

				.isotope.no-transition,
				.isotope.no-transition .isotope-item,
				.isotope .isotope-item.no-transition {
				  -webkit-transition-duration: 0s;
					 -moz-transition-duration: 0s;
						  transition-duration: 0s;
				}

				/* End: Recommended Isotope styles */			
				#scrollview-content {
					background-color:rgba(100, 100, 100, 0);
				}
				.item.gris   
				{  width: 170px;  height: 190px; background: rgba(240, 240, 240, .8); 
					border-style:solid;
					border-color:#666;		
					border-width:1px;					
				}
			</style>

			<br>
 		
			<div id="holdert1"    style= "position:relative;height:70px;top:-20px; width:200px;float: right;" ></div>
		
			<div   style="position:relative;width:810px; top:50px;left:40px;margin:0 10px;background-color:none;margin: auto;">
 
					<div id="scrollview-content"    >
							<div id="iso_container"  >
							
							
									<%
										For count = 1 to 18
											response.write( "<div id='is_" & count & " ' class='item gris'>") & vbCrLf
											response.write( "<div style= 'width:170px'> <center><p class='tituloind'>Indicador " &  count  & "</p> </center></div>") & vbCrLf
											response.write( "<center>") & vbCrLf
											response.write("<img src='marcas/chrysler.png' style=' border: 1px solid #777;' > </img>")& vbCrLf
											response.write( "</center>") & vbCrLf
											response.write( "<div   style= 'width:170px; ' >") & vbCrLf
											response.write( "<center>") & vbCrLf
											response.write( "<p id='calind" &  count & "' class='calificacion'>" &  count & "</p> ") & vbCrLf
											response.write( "</center>") & vbCrLf
											response.write( "</div>") & vbCrLf
											response.write( "</div>") & vbCrLf						
											
										Next					
									%>					
		  
								
							</div>
					</div>
			</div>
	
 

 

			<script type="text/javascript" charset="utf-8">

				YUI().use('scrollview', function(Y) {

					var scrollView = new Y.ScrollView({
						id:"scrollview",
						srcNode: '#scrollview-content',
						height: 530,
						flick: {
							minDistance:10,
							minVelocity:0.3,
							axis: "y"
						}
					});

					scrollView.render();
				});

				
 			
			</script>

			<script type='text/javascript'>//<![CDATA[ 

 
			$( function () {

			  $container = $('#iso_container'),
				  $checkboxes = $('#filters input');

			  $container.isotope({
				itemSelector: '.item',
				masonry: { columnWidth : 180 },			
				getSortData : {
				  selected : function( $item ){
					// sort by selected first, then by original order
					return ($item.hasClass('selected') ? -1000 : 0 ) + $item.index();
				  }
				},
				sortBy : 'selected'
			  })			  
			  
			  var $items = $container.find('.item');

 	  
			  			  
			  
			  $('#sorts_asc').on( 'click', 'button', function( event ) {
				var sortByKey = $( event.target ).attr('data-sort-by');
				$container.isotope({ sortBy: sortByKey , sortAscending : true });
			  });
			  $('#sorts_des').on( 'click', 'button', function( event ) {
				var sortByKey = $( event.target ).attr('data-sort-by');
				$container.isotope({ sortBy: sortByKey , sortAscending : false });
			  });

			  
			  $('#update-sort-data').click( function () {
				// set random calificacions and variacion
				$items.each( function( i, item ) 
				{
				
					  var $item = $( item );
					  var calificacionText =   Math.floor( Math.random() * 100 );
					  $item.find('.calificacion').text( 'Cal : ' + calificacionText   );
					  var variacionText =   Math.floor( Math.random() * 100 );
					  $item.find('.variacion').text( 'Desv : '+ variacionText );
				  
				});

				// apply getSortData
				$container.isotope( 'option', {
				  getSortData: {
					'calificacion': function( $item ) {
					  return  $item.find('.calificacion').text() ;
					},
					'variacion': function( $item ) {
					  return  $item.find('.variacion').text() ;
					},
					  'selected' : function( $item ){
						// sort by selected first, then by original order
						return ($item.hasClass('selected') ? -1000 : 0 ) + $item.index();
					  }					  
				  }
				});
				// update sortData on all items
				$container.isotope( 'updateSortData', $items );

			  });

			});

			//]]>  

			</script>


 
 
				<style type="text/css">
 
					{
						width:170px; height:120px;
						position:relative;
						top:-40px;		
				
					}
				</style>
				
				<script>
 							
						
				</script>	

				 <script type='text/javascript'>
						var moverst2;
					//<![CDATA[ 
						$(function(){
							
									var r = new Raphael("holdert1",300, 70 );
									
									var posbolas = 40;
									var posini=0;									
									var posfin=posbolas*24;
									
									var opt21 = r.circle(posbolas*1, 30,16).attr({fill: "#B3BBC5", stroke: "#B3BBC5"});
									var opt22 = r.circle(posbolas*2, 30,16).attr({fill: "#B3BBC5", stroke: "#B3BBC5"});

									moverst2 = r.set();
									moverst2.push(r.circle(posbolas*1, 30, 16));
									moverst2.attr({fill: "#2B8ABE", stroke: "#2B8ABE" });
									
									r.text(posbolas*1 , 29, 'ASC').attr({fill: "#fff"});
									r.text(posbolas*2 , 29, 'DES').attr({fill: "#fff"});
									
									opt21.click(function () {setdatos(1);});		
									opt22.click(function () {setdatos(2);});		
									
									function setdatos(pmover)
									{
											moverst2.animate({cx: posbolas*pmover}, 500, "<>");
											if (pmover==1)
											{ 
												$container.isotope({ sortBy: 'calificacion' , sortAscending : true });
											}
											if (pmover==2)
											{
												$container.isotope({ sortBy: 'calificacion' , sortAscending : false });
											}										
									}
									
						});
						

					//]]> 
				  </script>							
				  <script>											  
				  
						$("select#cbo_orden_t2").change(function(){
						
								if ($("#cbo_orden_t2").find('option:selected').val()==1)
								{ 
									$container.isotope({ sortBy: 'calificacion' , sortAscending : true });
								}
								if ($("#cbo_orden_t2").find('option:selected').val()==2)
								{
									$container.isotope({ sortBy: 'calificacion' , sortAscending : false });
								}
						})				
						
						
 									
			</script>	

 
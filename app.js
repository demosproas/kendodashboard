$(document).ready(function () {
    setTimeout(setup, 500);
});

function setup() {
    var selectedplaza = "nacional";
	var selectedgrupo = "compactos-a";
	var selectedtipodato  = "p";
	
	var defaultSeriesColors = [ "#F40000", "#eee", "#eee","#eee","#eee","#eee","#eee","#eee","#eee"];
	var defaultSeriesColorsN = [ "#F40000", "#F25F00", "#FC9200","#FDC300","#8DC701","#01A3C9","#0164B7","#0010A4","#6301A6"];

	var arr_series = new Array();
	arr_series[0] = 1;
	arr_series[1] = 0;
	arr_series[3] = 0;
	arr_series[4] = 0;
	arr_series[5] = 0;
	arr_series[6] = 0;
	arr_series[7] = 0;

 
	
    var stocksDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: function() {			
                    return "benchdata/data_" + selectedplaza.toLowerCase() + "_"+ selectedgrupo.toLowerCase() + "_" + selectedtipodato.toLowerCase() + ".txt";
                },
                dataType: "json"
            }
        },

        group: {
            field: "symbol"
        },

        sort: {
            field: "fecha",
            dir: "asc"
        },

        schema: {
            model: {
                fields: {
                    date: {
                        type: "date"
                    }
                }
            }
        },

        change: function() {
            $("[name=chart-type][value=area]").prop("checked", true);

            var view = this.view(),
                index = $("#company-filtering-tabs").data("kendoTabStrip").select().index();

            // populate detailed stock prices
            populateStockPrices(view[index], index);
        }
    });

    

    function populateStockPrices(data, companyIndex) {
        var container = $(".company-info"),
            yearlyStockValues = data.items,
            highest = yearlyStockValues[0].max,
            lowest = yearlyStockValues[0].min,
            lugar = 0,
            metric = "",
            format = function(number) {
                return kendo.toString(number, "n");
            },
            sparklineOptions = function(field, color, data) {
                return {
                    dataSource: data || yearlyStockValues,
                    series: [{
                        field: field,
                        color: color
                    }],
                    seriesDefaults: {
                        type: "line",
                        markers: { visible: false },
                        line: { width: 2 }
                    },
                    axisDefaults: {
                        visible: false,
                        majorGridLines: { visible: false }
                    },
                    legend: { visible: false }
                };
            };

        $.each(yearlyStockValues, function() {
            highest = this.max > highest ? this.max : highest;
            lowest = this.min < lowest ? this.min : lowest;
            lugar += this.lugar;
        });

		metric = "ACTUAL";

        function yearlyRelativeValue(stockValues) {
            return stockValues[stockValues.length-1].primaprom / stockValues[0].variacion * 100;
        }

        var relativeValues = $.map(yearlyStockValues, function(item, index) {
            var value = 100;

            if (index > 0) {
                value = item.primaprom * 100 / yearlyStockValues[index - 1].variacion;
            }

            return { value: value };
        });

        var companyRelativeGain = $.map(stocksDataSource.view(), function(data, index) {
            return {
                value: yearlyRelativeValue(data.items) - 100
            };
        });

        container
            .find(".prima-actual").text(format(yearlyStockValues[yearlyStockValues.length - 1].primaprom)).end()
            .find(".highest").text(format(highest)).end()
            .find(".lowest").text(format(lowest)).end()
            .find(".lowest-sparkline").kendoChart(sparklineOptions("primaprom", "#cd1533")).end()
            .find(".highest-sparkline").kendoChart(sparklineOptions("primaprom", "#639514")).end()
            .find(".first dt .metric").eq(1).text(metric).end().end()
            .find(".lugar").text(yearlyStockValues[yearlyStockValues.length - 1].lugar).end()
            .find(".relative-value").text(yearlyStockValues[yearlyStockValues.length - 1].variacion + " %").end()
            .find(".relative-value-sparkline").kendoChart(sparklineOptions("value", "#4da3d5", relativeValues)).end()
            .find(".lugar-chart").kendoChart({
                dataSource: yearlyStockValues,
                series: [{
                    field: "lugar",
                    gap: 0.7
                }],
                seriesDefaults: {
                    type: "column",
                    color: "#1c638d",
                    border: {
                        width: 0
                    },
                    overlay: {
                        gradient: "none"
                    }
                },
                axisDefaults: {
                    majorGridLines: { visible: false },
                    majorTicks: { visible: false }
                },
                categoryAxis: {
                    field: "fecha",

                    labels: {
                        format: "MMM",
                        color: "#727f8e"
                    }
                },
                tooltip: {
                    visible: true
                },
                valueAxis: {
                    visible: false
                },
                legend: { visible: false }
            }).end();
    }

    $("#yearly-stock-prices").kendoChart({
        dataSource: stocksDataSource,

        autoBind: false,

        seriesDefaults: {
            type: "line",
			line: { width: 2 },
            overlay: {
                gradient: "none"
            },
            markers: {
                visible: true
            },
            majorTickSize: 0,
            opacity: 1
        },

        series: [{
            field: "primaprom"
        }],

        seriesColors: defaultSeriesColors,

        valueAxis: {
            line: {
                visible: true
            },

            labels: {
                format: "${0}",
                skip: 2,
                step: 2,
                color: "#727f8e"
            }
        },

        categoryAxis: {
            field: "fecha",

            labels: {
                color: "#727f8e"
            },

            line: {
                visible: false
            },

            majorTicks: {
                visible: false
            },

            majorGridLines: {
                visible: false
            }
        },

        legend: {
            visible: false
        },
        tooltip: {
            visible: true
        } 
    });

function onoffseries(pserie) {
//aqui
//alert(e.category)
//alert(e.value)
	
	if (arr_series[pserie] == 1)
	{
		arr_series[pserie]=0
		defaultSeriesColors[pserie] ="#eee"; //greyed
	} else
	{
		arr_series[pserie]=1
		defaultSeriesColors[pserie] =defaultSeriesColorsN[pserie];
	}
	
	stocksDataSource.read();
	
};
	
    $("[name=chart-type]").on("click", function() {
        var chart = $("#yearly-stock-prices").data("kendoChart"),
            allSeries = chart.options.series,
            newSeriesType = $(this).val();

        chart.options.seriesDefaults.type = newSeriesType;

        for (var series in allSeries) {
            allSeries[series].type = newSeriesType;
            allSeries[series].opacity = newSeriesType == "area" ? .8 : 1;
        }

        chart.redraw();
    });

    var companyInfoTemplate = kendo.template($("#company-info-template").html());

    $(".company-info").each(function() {
        var panel = $(this);
        panel.html(companyInfoTemplate({ name: panel.attr("id") }));
    });

	
    $("#plaza-filtering-tabs").kendoTabStrip({
        dataSource: ["NACIONAL","DF","JAL","NL"],
        change: function(e) {
            selectedplaza = this.value();
            stocksDataSource.read();
        }
    }).data("kendoTabStrip").select(0);
	
    $("#tipo-filtering-tabs").kendoTabStrip({
	//JRGP AQUI SE CAMBIARIA TABS
        dataSource: ["COMPACTOS-A","COMPACTOS-B","DEPORTIVO","MINIVAN","PICK-UP","SEDAN-LUJO","SUBCOMPACTO","SUV"],
        change: function(e) {
            selectedgrupo = this.value();

            $(".selected-year").text(selectedgrupo);

            stocksDataSource.read();
        }
    }).data("kendoTabStrip").select(0);

    $("#company-filtering-tabs").kendoTabStrip({
		//JRGP AQUI SE CAMBIARIA TABS DE COMPAÑIAS
        dataSource: ["ABA", "AXA", "BANCOMER", "BANORTE", "GNP", "HSBC", "MAPFRE", "QUALITAS"],
        change: function() {
            var company = this.value().toLowerCase(),
                index = this.select().index(),
                view = stocksDataSource.view();
				
            if (view.length) {
                $(".company-info").html(companyInfoTemplate({ name: company }));
                populateStockPrices(view[index], index);
				
            }
        }
    })
        .find(".k-item").each(function(index) {
            var color = defaultSeriesColorsN[index];

            $(this).css({
                color: color,
                borderColor: color
            });
        }).end()
        .data("kendoTabStrip").select(0);

					//<![CDATA[ 
						$(function(){
							
							var r = new Raphael("holdert1",850, 70 );
							
									var posbolas = 85;
									var posini=10;										
									
									var serie1  = r.circle((posini+(posbolas*0)), 30,10).attr({fill: defaultSeriesColorsN[0] , "stroke-width":"0" });
									var serie2  = r.circle((posini+(posbolas*1)), 30,10).attr({fill: defaultSeriesColorsN[1], "stroke-width":"0" });
									var serie3  = r.circle((posini+(posbolas*2)), 30,10).attr({fill: defaultSeriesColorsN[2] , "stroke-width":"0" });
									var serie4  = r.circle((posini+(posbolas*3)), 30,10).attr({fill: defaultSeriesColorsN[3] , "stroke-width":"0" });
									var serie5  = r.circle((posini+(posbolas*4)), 30,10).attr({fill: defaultSeriesColorsN[4] , "stroke-width":"0" });
									var serie6  = r.circle((posini+(posbolas*5)), 30,10).attr({fill: defaultSeriesColorsN[5] , "stroke-width":"0" });
									var serie7  = r.circle((posini+(posbolas*6)), 30,10).attr({fill: defaultSeriesColorsN[6] , "stroke-width":"0" });
									var serie8  = r.circle((posini+(posbolas*7)), 30,10).attr({fill: defaultSeriesColorsN[7] , "stroke-width":"0" });
									
									serie1.click(function () {onoffseries(0);});		
									serie2.click(function () {onoffseries(1);});		
									serie3.click(function () {onoffseries(2);});		
									serie4.click(function () {onoffseries(3);});		
									serie5.click(function () {onoffseries(4);});		
									serie6.click(function () {onoffseries(5);});		
									serie7.click(function () {onoffseries(6);});		
									serie8.click(function () {onoffseries(7);});		

									posini=23;									
									r.text((posini+(posbolas*0)) , 29, 'ABA').attr({'text-anchor': 'start',fill: "#727F8E", "font-size": 10, "font-family": "Arial, sans-serif"});
									r.text((posini+(posbolas*1)) , 29, 'AXA').attr({'text-anchor': 'start',fill: "#727F8E", "font-size": 10, "font-family": "Arial, sans-serif"});
									r.text((posini+(posbolas*2)) , 29, 'BANCOMER').attr({'text-anchor': 'start',fill: "#727F8E", "font-size": 10, "font-family": "Arial, sans-serif"});
									r.text((posini+(posbolas*3)) , 29, 'BANORTE').attr({'text-anchor': 'start',fill: "#727F8E", "font-size": 10, "font-family": "Arial, sans-serif"});
									r.text((posini+(posbolas*4)) , 29, 'GNP').attr({'text-anchor': 'start',fill: "#727F8E", "font-size": 10, "font-family": "Arial, sans-serif"});
									r.text((posini+(posbolas*5)) , 29, 'HSBC').attr({'text-anchor': 'start',fill: "#727F8E", "font-size": 10, "font-family": "Arial, sans-serif"});
									r.text((posini+(posbolas*6)) , 29, 'MAPFRE').attr({'text-anchor': 'start',fill: "#727F8E", "font-size": 10, "font-family": "Arial, sans-serif"});
									r.text((posini+(posbolas*7)) , 29, 'QUALITAS').attr({'text-anchor': 'start',fill: "#727F8E", "font-size": 10, "font-family": "Arial, sans-serif"});
									
									var opt21 = r.circle(750, 30,16).attr({fill: "#B3BBC5" , "stroke-width":"0" });
									var opt22 = r.circle(800, 30,16).attr({fill: "#B3BBC5" , "stroke-width":"0" });

									moverst2 = r.set();
									moverst2.push(r.circle(750, 30, 16));
									moverst2.attr({fill: "#2B8ABE" , "stroke-width":"0" });
									
									r.text(750 , 29, 'P-P').attr({fill: "#fff"});
									r.text(800 , 29, 'POND').attr({fill: "#fff"});
									
									opt21.click(function () {setdatos(1);});		
									opt22.click(function () {setdatos(2);});		
									
									function setdatos(pmover)
									{
											
											if (pmover==1)
											{ 
												moverst2.animate({cx: 750 }, 500, "<>");
												selectedtipodato="p";
												$("#tipodato").html("PRIMAS");
												stocksDataSource.read();
											}
											if (pmover==2)
											{
												selectedtipodato="pond";
												moverst2.animate({cx: 800 }, 500, "<>");
												$("#tipodato").html("PONDERACION");
												stocksDataSource.read();
											}										
									};
									
									
						});
						

					//]]> 		
}

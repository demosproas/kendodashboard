$(document).ready(function () {
    setTimeout(setup_topmarcas, 500);
});

function setup_topmarcas() {
	

    var stocksDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: function() {
                    return "data/data-topmarcas-" + selectedplaza + ".json";
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

    var defaultSeriesColors = [ "#004A7F", "#0094FF", "#7FC9FF" ,"#47A75C" ];

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
            return stockValues[stockValues.length-1].primaprom / stockValues[0].open * 100;
        }

        var relativeValues = $.map(yearlyStockValues, function(item, index) {
            var value = 100;

            if (index > 0) {
                value = item.primaprom * 100 / yearlyStockValues[index - 1].open;
            }

            return { value: value };
        });

        var companyRelativeGain = $.map(stocksDataSource.view(), function(data, index) {
            return {
                value: yearlyRelativeValue(data.items) - 100
            };
        });
    }

    $("#yearly-stock-prices").kendoChart({
        dataSource: stocksDataSource,

        autoBind: false,

        seriesDefaults: {
            type: "line",
			line: { width: 4 },
            overlay: {
                gradient: "none"
            },
            markers: {
                visible: true
            },
            majorTickSize: 0,
            opacity: .8
        },

        series: [{
            field: "calif"
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
            visible: true
        },
        tooltip: {
            visible: true
        }
		
    });

 	
    $("#plaza-filtering-tabs").kendoTabStrip({
        dataSource: ["NACIONAL","DF","GDL","NL"],
        change: function(e) {
            selectedplaza = this.value();
            stocksDataSource.read();
        }
    }).data("kendoTabStrip").select(0);
	
 
  

}

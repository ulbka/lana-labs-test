function doSomething(){
    var data = [60, 5, 34, 16, 23, 42].sort(d3.descending);

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 500 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

    var chart = d3.select("#barChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d; }));
    y.domain([0, d3.max(data, function(d) { return d; })]);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text");

    chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); });

    // SLIDER
    var sliderHeight = 10;

    var brush = d3.svg.brush()
        .x(x)
        .extent([100, 300])
        .on("brushstart", brushstart)
        .on("brush", brushmove)
        .on("brushend", brushend);

    var arc = d3.svg.arc()
        .outerRadius(sliderHeight)
        .startAngle(10)
        .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });

    var slider = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", sliderHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    slider.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + sliderHeight + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"));

    var brushg = slider.append("g")
        .attr("class", "brush")
        .call(brush);

    brushg.selectAll(".resize").append("path")
        .attr("transform", "translate(0," +  sliderHeight + ")")
        .attr("d", arc);

    brushg.selectAll("rect")
        .attr("height", sliderHeight);

    brushstart();
    brushmove();

    function brushstart() {
        slider.classed("selecting", true);
    }

    function brushmove() {
        var s = brush.extent();
        chart.classed("selected", function (d) {
            return s[0] <= d && d <= s[1];
        });
    }

    function brushend() {
        slider.classed("selecting", !d3.event.target.empty());
    }
}

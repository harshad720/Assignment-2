//contains the data that's displayed
var bardata=[];

//mardin of the graph
var margin = {top: 30, right: 30,bottom: 40,left: 40}

var height=400 - margin.top - margin.bottom,
	width=600 - margin.left - margin.right,
	barwidth=50,
	baroffset=5;


function start() {

        //document.getElementById("celsius").innerHTML = "Waiting for data...";
        var deviceID = "40003e001747343338333633";
        var accessToken = "b789c597f2efed087a84cf359d7ece0c3b731246";
        var eventSource = new EventSource("https://api.spark.io/v1/devices/" + deviceID + "/events/?access_token=" + accessToken);

        eventSource.addEventListener('open', function(e) {
            console.log("Opened!"); },false);

        eventSource.addEventListener('error', function(e) {
            console.log("Errored!"); },false);

        eventSource.addEventListener('tdata', function(e) {
            var parsedData = JSON.parse(e.data);
            //var tempSpan = document.getElementById("celsius");
            //tempSpan.innerHTML = " celsius: " + parsedData.data ;
            var k=parseInt(parsedData.data);
            bardata.push(k);
            console.log(bardata);
            //tempSpan.style.fontSize = "28px";

            if(bardata.length >= 9){
            	bardata.shift();
            }

d3.selectAll('svg').remove();

            var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)+10])
        .range([0, height]);

var xScale = d3.scale.ordinal()
        .domain(d3.range(0, bardata.length))
        .rangeBands([0, width],.2)

var colors = d3.scale.linear()
				.domain([0,d3.max(bardata)])
				.range(["#FFB832","#C61C6F"])

var tempColor;

var tooltip = d3.select('body').append('div')
				.style('position','absolute')
				.style('padding','0')
				.style('background','white')
				.style('opacity',0)

var myChart = d3.select('#chart').append('svg')
		.style('background',"#E7E0CB")
		.attr('width',width+margin.left+margin.right)
		.attr('height',height+margin.top+margin.bottom)
		.append('g')
		.attr('transform','translate('+margin.left+','+margin.top+')')
		.selectAll('rect').data(bardata)
		.enter().append('rect')
			.style('fill',colors)
			.attr('width',xScale.rangeBand())
			.attr('x',function(d,i){
				return xScale(i);
			})
			.attr('height',0)/*function(d){
				return yScale(d);
			})*/
			.attr('y',height)/*function(d){
				return height-yScale(d);
			})*/
			.on('mouseover',function(d){

				tooltip.transition().style('opacity',.9)

				tooltip.html(d)
					.style('left',(d3.event.pageX)+'px')
					.style('top',(d3.event.pageY-35)+'px')


				tempColor=this.style.fill;
				d3.select(this)
					.transition()
					.style('opacity',.5)
					.style('fill','blue')
			})
			.on('mouseout',function(d){

				tooltip.transition().style('opacity',0)

				d3.select(this)
					.transition().delay(100).duration(50)
					.style('opacity',1)
					.style('fill',tempColor)
			})



myChart.transition()
	.attr('height',function(d){
				return yScale(d);
			})
	.attr('y',function(d){
				return height-yScale(d);
			})
	.delay(function(d,i){
		return i*10;
	})
	.duration(1000)
	.ease('elastic')

var vGuideScale =  d3.scale.linear()
					.domain([0,d3.max(bardata)])
					.range([height,0])

var vAxis= d3.svg.axis()
				.scale(vGuideScale)
				.orient('left')
				.ticks(10)



var vGuide = d3.select('svg').append('g') 
	vAxis(vGuide)
	vGuide.attr('transform','translate('+margin.left+','+margin.top+')')
	vGuide.selectAll('path')
		.style({fill:'none',stroke:"#000"})
	vGuide.selectAll('line')
		.style({stroke:"#000"})

var hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function(d, i) {
        return !(i % (bardata.length/5));
    }))

var hGuide = d3.select('svg').append('g')
    hAxis(hGuide)
    hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
    hGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    hGuide.selectAll('line')
        .style({ stroke: "#000"})













        }, false);
}









window.onload = function () {
    var shotCanvas = $('.shotCanvas')[0];
    var mortarCanvas = $('.mortarCanvas')[0];
    var airstrikesCanvas = $('.airstrikesCanvas')[0];
//        console.log(canvas);

    var shotContext = shotCanvas.getContext("2d");
    var mortarContext = mortarCanvas.getContext("2d");
    var airstrikesContext = airstrikesCanvas.getContext("2d");

    shotContext.font = "15px Arial";
    shotContext.textAlign = "center";
    mortarContext.font = "15px Arial";
    mortarContext.textAlign = "center";
    airstrikesContext.font = "15px Arial";
    airstrikesContext.textAlign = "center";

    $('.causeButton').on("click", function (e) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawAll(parseInt(this.value));
    });

    $('.animationButton').on("click", function (e) {
        startAnimation();
    });

    shotContext.fillStyle = "#505050";
    mortarContext.fillStyle = "#505050";
    airstrikesContext.fillStyle = "#505050";
    //    context.globalAlpha = 0.02;

    var dateTracker = "unknown";
    var yPosTracker = shotCanvas.height;

    var circles = [];

    var dateScale = d3.time.scale()
        .domain([new Date('1 Jan 2011'), new Date('1 Feb 2016')])
        .range([0, shotCanvas.width]);

    var yearsPositioning = [dateScale(new Date("2011")), dateScale(new Date("2012")), dateScale(new Date("2013")), dateScale(new Date("2014")), dateScale(new Date("2015")), dateScale(new Date("2016"))];
    console.log(yearsPositioning);

    var circle = {
        init: function (date, cause) {
            this.date = date;
            this.cause = cause;
            //            this.xPos = (parseInt(date.split("/")[2]) - 2011) * 200 + (parseInt(date.split("/")[1]) - 1) * (200 / 12) + (parseInt(date.split("/")[0]) - 1) * (200 / 12 / 30);
            this.xPos = dateScale(new Date(date.split("/").reverse().join("/")));
            if (date == dateTracker) {
                yPosTracker -= 0.4;
            } else {
                dateTracker = date;
                yPosTracker = shotCanvas.height;
            }
            this.yPos = yPosTracker;
            this.path = [[this.xPos, this.yPos]]
        },
        draw: function (context) {
//            console.log(c ontext); 
            context.beginPath();
            context.arc(this.xPos, this.yPos, 0.2, 0, 2 * Math.PI);
            context.fill();

            //            context.fillRect(this.xPos, this.yPos, 1.5, 1.5); 
        }
    }


    function drawAll(cause, context, svgClass, gClass) {
        console.log("called", context);
        for (var i = 0; i < circles.length; i++) {
            if (circles[i].cause === cause) {
                context.fillStyle = "#FF7900";
                circles[i].draw(context);
                context.fillStyle = "#505050";
            } else {
                circles[i].draw(context);
            }
        }
//        context.fillText("2012", yearsPositioning[1], canvas.height);
        //        window.open(canvas.toDataURL('image/png'));


        var svgCircles = d3.select(svgClass)
            .select(gClass)
            .selectAll('circle')
            .data(circles);

        console.log(circles);

        svgCircles.enter()
            .append('circle');

        svgCircles.exit().remove();

        svgCircles.attr('cx', function (d) {
            return d.xPos
        })
            .attr('cy', function (d) {
                return d.yPos
            })
            .attr('r', function (d) {
                return 0.4
            });

        svgCircles.style("fill", function (d) {
            if (d.cause === cause) {
                return "#FF7900"
            } else {
                return "#505050"
            }
        })


    }

    function initialiseCircles() {
        var xPosDest = 0;
        var yPosDest = 0;
        var steps = 50;
        for (var i = 0; i < all_civilians.length; i++) {
            var newCircle = Object.create(circle);
            newCircle.init(all_civilians[i][4], all_civilians[i][2]);

//            if (i % 400 === 0) {
//                console.log(i);
//                xPosDest = 0;
//                yPosDest += 2;
//            } else {
//                xPosDest += 2;
//            }
//
//            var xStep = 0;
//            if (xPosDest != newCircle.xPos) {
//                xStep = (xPosDest - newCircle.xPos) / steps;
//            }
//            var yStep = 0;
//            if (yPosDest != newCircle.yPos) {
//                yStep = (yPosDest - newCircle.yPos) / steps;
//            }
//
//            for (var j = 1; j <= steps; j++) {
//                newCircle.path.push([newCircle.xPos + j * xStep, newCircle.yPos + j * yStep])
//            }
            circles.push(newCircle);
        }
        $.each(contextMap, function (index, value) {
            drawAll(value.cause, value.context, value.svgClass, value.gClass);
            console.log(value);
        })
        console.log(circles);
    }

    var contextMap = [
        {
            context: shotContext,
            cause: 0, 
            svgClass: '.shotSvg', 
            gClass: 'g.shotCircles'
        },
        {
            context: mortarContext, 
            cause: 8, 
            svgClass: '.mortarSvg', 
            gClass: 'g.mortarCircles'
        },
        
        {
            context: airstrikesContext, 
            cause: 12, 
            svgClass: '.airstrikesSvg', 
            gClass: 'g.airstrikesCircles'
        }
    ]

    initialiseCircles();


};
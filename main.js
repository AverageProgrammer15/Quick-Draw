function setup(){
    canvas = createCanvas(280,280)
    canvas.center();
    background("white");
    
    synth = window.speechSynthesis;

    // classifier = ml5.imageClassifier('Insert Link',modelLoaded)
}

function modelLoaded(){
    console.log("Model Loaded!")
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(13)
    stroke(0)
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error)
    }else{

     console.log(results)
     document.getElementById("label").innerHTML = results[0].label;
     document.getElementById("confidence").innerHTML = results[0].confidence;

     utterThis = new SpeechSynthesisUtterance(results[0].label)
    }
}

function clearCanvas(){
    background("white")
};

function QuickDraw(){
    clearCanvas()
    Timer = 10;
    document.getElementById("QuickDraw").innerHTML = Timer
    function MinusTimer(){
        Timer -=1;
        console.log(Timer)
        document.getElementById("QuickDraw").innerHTML =Timer
        if (Timer == 0){
            clearInterval(TimerFunction)
            classifyCanvas();
            document.getElementById("QuickDraw").innerHTML = "Start Quick Draw"
         }
    }
    TimerFunction = setInterval(MinusTimer, 1000)

    
}
function setup() {
    canvas = createCanvas(500, 400);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
    strokeWeight(5);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clear() {
    background("white");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error("ERRO! codigo do erro: ", error);
    }
    console.log("Sucesso! veja o resultado: ", results);

    var result = results[0].label;
    document.getElementById("label").innerHTML = 'Nome ' + result.replace('_', ' ');
    document.getElementById("confidence").innerHTML = 'Precisão ' + Math.round(result[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(result.replace('_',' '));
    synth.speak(utterThis);
}
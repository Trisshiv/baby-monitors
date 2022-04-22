object = [];
Status = "";

function preload() {
    song = loadSound("alarm_r.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(460, 170);

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stato").innerHTML = "Status : Detecting Objects";
    document.getElementById("nood").innerHTML = "Baby Not Found";
}

function draw() {
    image(video, 0, 0, 600, 500);

    if (Status == true) {


        objectDetector.detect(video, gotResult);

        R = random(255);
        G = random(255);
        B = random(255);

        for (i = 0; i < object.length; i++) {

            document.getElementById("stato").innerHTML = "Status : Objects Detected";

            fill("red");
            percent = floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object[i].label == "person") {
                document.getElementById("nood").innerHTML = "Baby Found";
                song.stop();
            } else {
                document.getElementById("nood").innerHTML = "Baby not Found";
                song.play();
            }
        } //'for' end
    } //'if' end

}

function modelLoaded() {
    console.log("Model is Loaded!");
    Status = true;
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        object = result;
    }
}
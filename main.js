var Left_wrist_X = 0;
var Left_wrist_Y = 0;
var Right_wrist_X = 0;
var Right_wrist_Y = 0;
var music1 = new Audio("music.mp3");
var music2 = new Audio("music2.mp3");
var left_score = 0;
var right_score = 0;
var song_name = "";
var left = "";
var right = "";

function preload() {
    song1 = loadSound("music.mp3"); 
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();

    video = createCapture(VIDEO, 600, 400);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoad);
    poseNet.on('pose',gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 400);
    if (left_score > 0.2) {
        song2.stop();
        stroke("black");
        fill("red");
        circle(Left_wrist_X, Left_wrist_Y, 20);
        song1.play();
        document.getElementById("button").innerHTML = " Song Name: Sunflower";
    }

    if (right_score > 0.2) {
        song1.stop();
        stroke("black");
        fill("red");
        circle(Right_wrist_X,Right_wrist_Y, 20);
        song2.play();
        document.getElementById("button").innerHTML = " Song Name: Alone";
    }
}

function modelLoad() {
    console.log("The PoseNet model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
    }

    Left_wrist_X = results[0].pose.leftWrist.x;
    Left_wrist_Y = results[0].pose.leftWrist.y;
    left_score = results[0].pose.keypoints[9].score;
    Right_wrist_X = results[0].pose.rightWrist.x;
    Right_wrist_Y = results[0].pose.rightWrist.y;
    right_score = results[0].pose.keypoints[10].score;
    console.log("The X position of left wrist is " + Right_wrist_X + " and Y position is " + Right_wrist_Y);
    console.log("The X position of left wrist is " + Left_wrist_X + " and Y position is " + Left_wrist_Y);
    console.log("The Value of left score is " + left_score);
    console.log("The Value of right score is " + right_score);
}


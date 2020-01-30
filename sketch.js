let sel,sel1;
let value = 0;

let img = [];
let vid;

let Inum = 100;
let num = 0;
let p=1;

var ctracker;
var videoInput;

var noseX = 0;
var noseY = 0;

var preNoseX = 0;

function preload() {
  for(let i=0;i<200;i++){
  img[i] = loadImage('./data/picture0/Movie' + p + '.jpg');
  p++;
  }  
}

function setup() {
	
  sel = createSelect();
  sel.position(10, 550);
  sel.option('select');
  sel.option('movie');
  sel.option('touch');
  sel.option('gyro');
  sel.option('face');
  sel.changed(selectForm);

  sel1 = createSelect();
  sel1.position(80, 550);
  sel1.option('b1');
  sel1.option('g1');
  sel1.option('w1');
  //sel1.changed(selectView);]
  
  videoInput = createCapture(VIDEO);
  videoInput.size(600, 340);
  videoInput.position(0, 0);
  
  //videoInput.hide();
  
  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
  
    noStroke();
    createCanvas(400, 400,WEBGL);	
}

function draw() {
	noStroke();
    selectForm();
}

function selectForm() {
  let form = sel.value();

  if(form === "movie"){
    SelectMovie();
  }else if(form === "touch"){ 
    SelectTouch();
  }else if(form === "gyro"){
   SelectGyro();
  }else if(form === "face"){
   SelectFace();
  }
}

function selectView() {
    let formv = sel1.value();

  if(formv === "b1"){
    //img = loadImage('./data/picture1/Movie '+Inum+'.jpg');
  }else if(formv === "g1"){
    //img = loadImage('./data/picture2/Movie'+Inum+'.jpg');
  }else if(formv === "w1"){
    //SelectGyro();
  }
}

function SelectMovie() {
  if(num == 0){
    noCanvas();
    vid = createVideo('./data/movie1/example1.mp4',videoLoad);
  image(vid,0,0,400, 400);
  }
	num++;
}

function videoLoad(){
  vid.loop();
  vid.volume(0);
}

function SelectTouch() {
  texture(img[Inum]); 
  plane(400,400);
}

let preX;
function touchStarted() {
  preX = mouseX;
}

function touchMoved(event) {
  if (mouseX > preX) {
    value = value - 1;
    Inum = Inum + value;
    if(value <= -30){ 
      value = -30;
    }
  }else {
    value = value + 1;
    Inum = Inum + value*2;
    if(value >= 30){
      value = 30;
    }
  }
 
  if(Inum < 20){
    Inum =20;
  }
  if(Inum >= 180){
    Inum = 180;
  }
}

function SelectGyro() { 
  //angleMode(DEGREES);
  background(200);
  let a =30;
  /*if(radians(rotationY) <= -a){
    Inum = 20;
  }else if(radians(rotationY) >= a){
    Inum = 180;
  }else {*/
    //Inum = Inum + radians(rotationY);
  //}
  rotateY(radians(rotationY));
  box(200,200,200);
  //texture(img[Inum]);
  //plane(400,400);
}

function SelectFace() {
  clear();
  
  var detectionScore = ctracker.getScore();

  if (detectionScore > 0) {
    preNoseX = noseX;
    console.log(preNoseX);
    
    var positions = ctracker.getCurrentPosition();

    /*var leftEyeX = positions[32][0];
    var leftEyeY = positions[32][1];

    var rightEyeX = positions[27][0];
    var rightEyeY = positions[27][1];*/
    if(position[62][0]){
    noseX = positions[62][0];
    noseY = positions[62][1];
    }else{
      noseX = preNoseX;
    }
    /*var faceLeftX = positions[1][0];
    var faceLeftY = positions[1][1];
    var faceRightX = positions[13][0];
    var faceRightY = positions[13][1];*/
    
    //var size = dist(faceLeftX,faceLeftY, faceRightX, faceRightY);

    
    //var noseSize = map(volume, 0, 1, 30, 400);
    console.log(Math.round(noseX));

  }
      faceMoved();
    texture(img[Inum]); 
    plane(400,400);
}

function faceMoved() {
  
  if (noseX > preNoseX) {
    value = value - 1;
    Inum = Inum + value;
    if(value <= -30){ 
      value = -30;
    }
  }else {
    value = value + 1;
    Inum = Inum + value*2;
    if(value >= 30){
      value = 30;
    }
  }
 
  if(Inum < 20){
    Inum =20;
  }
  if(Inum >= 80){
    Inum = 80;
  }
}


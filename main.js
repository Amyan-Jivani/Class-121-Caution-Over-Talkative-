function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded(){
  console.log("CONGRATS = Model is Loaded!(HA HA HA)");
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

var previous_result="";

function gotResult(error, results){
if(error){
  console.error(error);
}
else if((results[0].confidence>0.5)&&(previous_result!= results[0].label)){
  console.log(results);
  previous_result = results[0].label;
  var synth = window.speechSynthesis;
  speak_data = "Object Deteected is "+results[0].label;
  utterthis= new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterthis);
  
  document.getElementById("result_object").innerHTML = results[0].label;
  document.getElementById("result_accuracy").innerHTML = (results[0].confidence*100).toFixed(2)+"%";

}
}




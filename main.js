function setup()
{
    canvas  = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";

}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}

img = "";
status = "";
objects = [];

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function preload()
{
    img = loadImage('dog_cat.jpg');

}

function draw()
{
    image(video, 0 , 0 , 380 , 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);

       for(i = 0; i<objects.lenght; i++)
       {
          document.getElementById("status").innerHTML = "status:object detected";
          document.getElementById("number_of_object").innerHTML = "Number of Objects detected are :" + objects.length;
          fill(r,g,b);
          percent = floor(objects[i].confidence*100);
          text(objects[i].label+""+percent+"%"+objects[i].x+objects[i].y);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          if(objects[i].label == "person")
          {
            document.getElementById("number_of_object").innerHTML = "Baby Found";
          }
          else{
            document.getElementById("number_of_object").innerHTML = "Baby Not Found";
          }
       }
    }
    /*fill("#FF0000");
    text("dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);
    fill("#FF0000");
    text("cat", 320, 120);
    noFill();
    stroke("#FF0000");
    rect(300, 90 , 270, 320);*/
}

let x, y;
let currentangle = 0; 
let step = 20;
let angle = 90; 


let thestring = 'A'; 
let numloops = 10; 
let therules = [];
therules[0] = ['A', '-BF+AFA+FB-'];
therules[1] = ['B', '+AF-BFB-FA+'];

let whereinstring = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  stroke(100, 30, 90, 255);

  
  x = 0;
  y = height-2;

 
  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }
}

function draw() {

 
  drawIt(thestring[whereinstring]);

  whereinstring++;
  if (whereinstring > thestring.length-1) whereinstring = 0;

}

// interpret an L-system
function lindenmayer(s) {
  let outputstring = ''; // start a blank output string

  for (let i = 0; i < s.length; i++) {
    let ismatch = 0; 
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1];
        ismatch = 1; 
        break; 
      }
    }
   
    if (ismatch == 0) outputstring+= s[i];
  }

  return outputstring; 
}


function drawIt(k) {

  if (k=='F') { 
    
    let x1 = x + step*cos(radians(currentangle));
    let y1 = y + step*sin(radians(currentangle));
    line(x, y, x1, y1); 

   //update position
    x = x1;
    y = y1;
  } else if (k == '+') {
    currentangle += angle; // turn left
  } else if (k == '-') {
    currentangle -= angle; // turn right
  }

  
  let r = random(100, 255);
  let g = random(30,255);
  let b = random(60,255);
  let a = random(255,255);

  // pick a gaussian (D&D) distribution for the radius:
  let radius = 0;
  radius += random(0, 15);
  radius += random(0, 15);
  radius += random(0, 15);
  radius = radius / 3;

  // draw the stuff:
  fill(r, g, b, a);
  ellipse(x, y, radius, radius);
}
color colors[] = { #ff0000, #fffa00, #f62394, #8b20bb, #0024ba, #007ac7, #00b3d4, #01b700, #83ce01 };
color fillColor1; 
color fillColor2; 
int cellX=150;
int cellY=150;
int cellW=4;
int cellH = 4;
int maxBoxen=10;
int maxW=5;
int maxH=5;
int[] x;
int[] y;
int w[];
int h[];
int dx[];
int dy[];
int count[];
int tries=10; // Number of tries before giving up
int c=0;
void setup() {
  noLoop();
  size(600,600);
  background(255);
  noFill();
}

void draw() {
	fillColor1 = colors[(int)random(8)];
	fillColor2 = colors[(int)random(8)];
	
	background(255);
	maxBoxen = random(200) + 10;
    x = new int[maxBoxen];
    y = new int[maxBoxen];
    w = new int[maxBoxen];
    h = new int[maxBoxen];
    count = new int[maxBoxen];

  //fill(fillColor, 255);
  x[0]=cellX/2;
  y[0]=cellY/2;
  /*x[0]=(int)random(cellX);
  y[0]=(int)random(cellY);*/
  w[0]=(int)random(maxW)+1;
  h[0]=(int)random(maxH)+1;
  
  int startx;
  int starty;
  for (int i=1; i<maxBoxen; i++) {
    // choose a corner
    int corner = (int)random(4)+1;
    switch (corner) {
      case 1:
        startx=x[i-1];
        starty=y[i-1];
        break;
      case 2:
        startx=x[i-1]+w[i-1];
        starty=y[i-1];
        break;
      case 3:
        startx=x[i-1]+w[i-1];
        starty=y[i-1]+h[i-1];
        break;
      case 4:
        startx=x[i-1];
        starty=y[i-1]+h[i-1];
        break;
    }
    int len = (int)random(18)+2;
    int dir = (int)random(4)+1;
    int dirX=0;
    int dirY=0;
    switch (dir) {
      case 1:
        dirX=-1;
        dirY=0;
        break;
      case 2:
        dirX=0;
        dirY=1;
        break;
      case 3:
        dirX=1;
        dirY=0;
        break;
      case 4:
        dirX=0;
        dirY=-1;
        break;
    }
    
    if (((x[i-1]+len*dirX)<1) || ((x[i-1]+len*dirX)>cellX-cellW-1)) { print("flipped X"); dirX=dirX*-1; }
    if (((y[i-1]+len*dirY)<1) || ((y[i-1]+len*dirY)>cellY-cellH-1)) { print("flipped Y"); dirY=dirY*-1; }

    x[i]=x[i-1]+len*dirX;
    y[i]=y[i-1]+len*dirY;
    w[i]=(int)random(maxW)+1;
    h[i]=(int)random(maxH)+1;
  }
  
  // Print each value, from 0 to 255 
 for (int i = 0; i < maxBoxen; i++) { 
	 if (random(100) > 80) {
		 fill(fillColor1, 255);
		 } else {
			 fill(fillColor2, 255);
		 }
	 if (random(100) > 90) {
		 noFill();
	 } 
   rect(x[i]*cellW, y[i]*cellH, w[i]*cellW, h[i]*cellH);
   if (i<maxBoxen-1) {
     line(x[i]*cellW, y[i]*cellH, x[i+1]*cellW, y[i+1]*cellH);
   }
 } 
}

void mousePressed() {  
  redraw();                                                                                                                                   
}    

void keyPressed() {  
  redraw();                                                                                                                                   
}   
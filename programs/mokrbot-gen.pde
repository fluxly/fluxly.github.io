
color colors[] = { #ff0000, #fffa00, #f62394, #8b20bb, #0024ba, #007ac7, #00b3d4, #01b700, #83ce01 };

int pageCellW = 600;
int pageCellH = 600;
int topMargin=20;
int botMargin=20;
int leftMargin=50;
int rightMargin=50;

int[] x;
int[] y;
int w[];
int h[];
int dx[];
int dy[];
int count[];
int maxR=10;
int maxC=(int)random(3)+2;
int cellW=10;
int cellH=14;
int maxW=5;
int maxH=5;

void setup() {
  noLoop();
  size(600, 600);
  
  x = new int[maxC*maxR];
  y = new int[maxC*maxR];
  w = new int[maxC*maxR];
  h = new int[maxC*maxR];
  fill(0, 0, 0, 255);
  background(255, 255, 255);
  noStroke();
}

void draw() {
  background(255, 255, 255);
  randomGrey();
  int cols = (int)random(2)+4;
  
  for (int k = 0; k<cols; k++) {
    for (int i=0; i<maxC; i++) {
      int colW = (pageCellW/2)/maxC;
      createVerticalGroup(i, leftMargin + (i)*colW, colW);
    }
    drawRects(maxC, maxR);
  }
  
  fill(255, 255, 255, 255);
  noStroke();
  stroke(255);
  for (int k = 0; k<1; k++) {
    for (int i=0; i<maxC/2; i++) {
      int colW = (pageCellW/2)/(maxC/2);
      createVerticalGroup2(i, leftMargin + (i)*colW, colW);
    }
    drawRects(maxC, maxR);
  }
  
  randomGrey();
  for (int k = 0; k<4; k++) {
    for (int i=0; i<maxC; i++) {
      int colW = (pageCellW/2-20)/maxC;
      createVerticalGroup(i, leftMargin + (i)*colW, colW);
    }
    drawRects(maxC, maxR);
  }

  randomGrey();
  for (int k = 0; k<maxC/2; k++) {
    if (true) {
      int myW = (int)random(4)+2;
      rect(x[k], y[k], myW, pageCellH-topMargin-botMargin);
      rect(pageCellW-x[k], y[k], myW, pageCellH-topMargin-botMargin);
    }
  }
  
      // CNC outlines
  /*for (int i=0; i<(int)random(4)+2; i++) {
    fill(255, 255, 255, 255);
    rect(0, i*100, 60, 5);
    rect(50, i*100-5, 5, 15);
  }*/
  
  
  fill(255, 255, 255, 255);
  noStroke();
  for (int k = 0; k<1; k++) {
    for (int i=0; i<maxC/2; i++) {
      int colW = (pageCellW/2)/(maxC/2);
      createVerticalGroup2(i, leftMargin + (i)*colW, colW);
    }
    drawRects(maxC, maxR);
  }
  // Spindle
  fill(255, 255, 255, 255);
  int myW = (int)random(40)+5;
  rect(pageCellW/2-myW/2, 0, myW, pageCellH);
  
  int myK = 0;
  for (int k =0; k<10; k++) {
     if ((int)random(100)> 50) {
        myW = (int)random(60)+10;
        fill(255, 255, 255, 255);
        rect(pageCellW/2-myW/2, k*myW, myW, myW);
        randomGrey();
        int offset = (int)random(10)+2;
        rect(pageCellW/2-myW/2+offset/2, k*myW+offset/2, myW-offset, myW-offset);
        myK = k;
     }
  }
  randomGrey();
  rect(pageCellW/2-myW/4, topMargin, myW/2, myK*myW);
  rect(pageCellW/2-myW/8, myK*myW, myW/4, myK*myW+(int(random(30))+10));
  
  //Gantry
  createHoritzGroup(topMargin+(int)random(40)+1);
  randomGrey();
  drawRects(1, maxR);
  rect(leftMargin, topMargin+(int)random(40)+1, pageCellW-rightMargin-leftMargin, (int)random(20)+20);
  
  // Add Tool heads
  int myH = (int)random(200)+100;
  stroke(0, 0, 0);
  line(pageCellW/2, pageCellH-myH, pageCellW/2, 100);
  noStroke();
  fill(255, 0, 255, 255);
  myW = (int)random(50)+50;
  //rect(pageCellW/2-myW/2, pageCellH-myH-myW, myW, myH);
  makeToolHead(pageCellW/2-myW/2, pageCellH-myH-myW, myW, myH);
  
  // build area
  
  fill(255, 255, 255, 255);
  myW = (int)random(200)+100;
  rect(pageCellW/2-myW/2, pageCellH-myH, myW, myH);
  fill(0, 0, 0, 255);
  rect(pageCellW/2-myW*.75/2, pageCellH-myH*.75, myW*.75, (int)random(20)+10); //plate
  rect(pageCellW/2-myW*.75, pageCellH-myH*.75, myW*1.5, (int)random(10)+5);
  int myW2 = (int)random(10)+10;
  rect(pageCellW/2-myW/4, pageCellH-myH*.75, myW2, myH*.75); //verticals
  rect(pageCellW/2+myW/4-myW2, pageCellH-myH*.75, myW2, myH*.75);myW = (int)random(200)+100;
  rect(pageCellW/2-myW/2, pageCellH-myH*.5, myW, myH*.5);
  rect(leftMargin, pageCellH-myH*.5-5, pageCellW-leftMargin-rightMargin, 30);
  // Keep track of places to put hardware and place at end or in separate layer
  
  // Add a few not symmetrical features
  
  // optional air slots on back
  
  // optional cross axis halfwayish down
  
  // add circles and triangles
  
  // Draw ground
  fill(255, 255, 255, 255);
  int myGnd = (int)random(50)+botMargin;
  rect(0, pageCellH-myGnd, pageCellW, myGnd);
}

void randomGrey() {
  int g = (int)random(60);
  fill(0, 0, 0, 255);
}

void drawRects(int n1, int n2) {
  for (int i=0; i<n1; i++) {
    for (int j=0; j<n2; j++) {
      int vvv = i*maxR+j;
      //println(i + ": "+ vvv);
      rect(pageCellW-rightMargin-x[i*maxR+j], y[i*maxR+j], w[i*maxR+j]*cellW, h[i*maxR+j]*cellH);
      // Draw reflected
      rect(leftMargin+x[i*maxR+j]-w[i*maxR+j]*cellW, y[i*maxR+j], w[i*maxR+j]*cellW, h[i*maxR+j]*cellH);
    }
  }
}

void createVerticalGroup(int n, int xCenter, int colW) {
  int yCount = topMargin + (int)random(100);
  xCenter = xCenter + ((int)random(4)-2)*cellW;
  for (int j =0; j<maxR; j++) {
    x[n*maxR+j] = xCenter;
    if ((j > 0)) {
      yCount = yCount + h[n*maxR+j-1]*cellH;
    } 
    y[n*maxR+j] = yCount;
    w[n*maxR+j]=(int)random(maxW)+maxW/3;
    h[n*maxR+j]=(int)random(maxH)+1;
  }
}

void createVerticalGroup2(int n, int xCenter, int colW) {
  int yCount = topMargin + (int)random(20);
  xCenter = xCenter + ((int)random(4)-2)*cellW;
  for (int j =0; j<maxR; j++) {
    x[n*maxR+j] = xCenter;
    if ((j > 0)) {
      yCount = yCount + h[n*maxR+j-1]*cellH;
    } 
    y[n*maxR+j] = yCount;
    w[n*maxR+j]=(int)random(maxW/2);
    h[n*maxR+j]=(int)random(maxH)+1;
  }
}

void createHoritzGroup(int yCenter) {
  int xCount = leftMargin + (int)random(20)-10;
  for (int j =0; j<maxR; j++) {
    y[j] = yCenter + ((int)random(4)-2)*cellH;
    if ((j > 0)) {
      xCount = xCount + w[1]*cellW;
    } 
    x[j] = xCount;
    w[j]=(int)random(maxH)+1;
    h[j]=(int)random(maxW)+maxW/3;
  }
}

void makeToolHead(int x1, int y1, int w1, int h1) {
   fill(255, 255, 255);
   rect(x1, y1, w1, h1);
   fill(0, 0, 0);
   int w2 = (int)(random(60)+4);
   int h2 = (int)(random(20)+4);
   rect((x1+w1/2)-w2/2, y1, w2, h2);
   rect((x1+w1/2)-2, y1, 4, h1);
   noStroke();
}

void mousePressed() {  
  redraw();                                                                                                                                   
}    

void keyPressed() {  
  redraw();                                                                                                                                   
}   

/**
 * Diaglyphs
 */

/* @pjs font="Providence.ttf"; */

PFont f;
float angle1 = 0;
float angle2 = 0;
int s = 300;
float s1 = 1.5;
float s2 = 1.5;

int n = 1;
int[] x = { 720, 400, 400, 400, 400, 400, 400, 400, 400 };
int[] y = { 400, 400, 400, 400, 400, 400, 400, 400, 400 };
char[] c1;
char[] c2;
color colors[] = { #ff0000, #fffa00, #f62394, #8b20bb, #0024ba, #007ac7, #00b3d4, #01b700, #83ce01 };
void setup() {
    size(1440, 800);
    background(0);
    frameRate(30);
    // Create the font
    //printArray(PFont.list());
    //f = createFont("cmunobi.ttf", size);
    //f = createFont("Providence.ttf", size);

	f = loadFont("Providence");
    textFont(f, s);
    textAlign(CENTER, CENTER);
    c1 = new char[9];
    c2 = new char[9];
    chooseCharacters();
} 

void draw() {
  angle1 += ((float)mouseX / 500) * .9;
  angle2 -= ((float)mouseY / 500);
  if (angle1 == 360) angle1 = 0;
  if (angle2 == -1) angle2 = 359;
  background(0);

  for (int i=0; i < n; i++) {
      fill(colors[i]);
      
      pushMatrix();
      translate(x[i], y[i]);
      
      scale(s1);
      rotate(angle1);
      translate(0, -size/4);
      
      text(c1[i], 0, 0);
      popMatrix();
      pushMatrix();
      translate(x[i], y[i]);
      scale(s1);
      
      rotate(angle2);
      translate(0, -size/4);
      
      text(c2[i], 0, 0);
      popMatrix();
   }
}

void chooseCharacters() {
    for (int i=0; i < 9; i++) {
	    int val = int(random(90)+33);
        c1[i] = char(val);
		val = int(random(90)+33);
        c2[i] = char(val);
    	  //c1[i] = char();
          //c2[i] = char(int(random(90)+33));
          if ((c1[i] == ']') || (c1[i] == '[')) { c1[i] = '@'; }
          if ((c2[i] == ']') || (c2[i] == '[')) { c2[i] = '&'; }
          if ((c1[i] == 'L') || (c1[i] == '7')) { c1[i] = '#'; }
          if ((c2[i] == 'L') || (c2[i] == '6')) { c2[i] = '%'; }
          if ((c1[i] == 'l') || (c1[i] == '1')) { c1[i] = '@'; }
          if ((c2[i] == 'l') || (c2[i] == '1')) { c2[i] = '&'; }
          if ((c1[i] == 'Z')) { c1[i] = '@'; }
          if ((c2[i] == 'Z')) { c2[i] = '&'; }
          x[i] = ((1440/(n)) * i) + (720/n);
    }
}

void mousePressed() {

}

void keyPressed() {

    
    if ((key >= '1') && (key <= '9')) {
       // print((int)key + " ");
        n = (int)key - 48;
        s1 = 1.5 - (float)(0.15 * n);
       // print(s1 + " ");
    }
    
    chooseCharacters();
    
    if (n == 1) {
	
      x[0] = 720;
      y[0] = 400;
    }
}

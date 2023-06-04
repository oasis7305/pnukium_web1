let img,sound1,sound2,button,sound3,a=0,b=0; 
let button10,button11,button12;
//점수
let score;
//사각형
let rx,ry; //사각형 시작점
let rw=200,rh=30; //사각형 크기
//삼각형
let cx,cy; //삼각형 시작점
const cr=15;//원의 반지름
let cdirx=1; //
let cdiry=-1; //
let cspeed=5; //움직이는 속도
//시작 flag
let sFlag = true;
let sFlag1 = false;
function setup() {
  createCanvas(600, 600); //400 400조건에서 rect 120 370 150 30이 맞다
  initDraw();
  
}
function preload()
{
  //img=loadImage('./img/logo.png');
  sound1=loadSound('./sound/폭발.wav');
  sound2=loadSound('./sound/blop.mp3');
}
//초기화 그리기
function initDraw()
{
  //사각형 시작점
  rx=width/2-rw/2;
  ry=height-rh;
  //원 시작점
  cx=width/2;
  cy=height/2;
  //점수
  score = 0;
}
//사각형 그리기
function rectDraw()
{
  //마우스로 움직이기
  //rx=mouseX;
  //키보드로 움직이기
  if (keyIsDown(LEFT_ARROW))
  {
    rx -= 5;
  }
  if(keyIsDown(RIGHT_ARROW))
  {
    rx += 5;
  }
  //캔버스 안쪽에서 움직이기
  if(rw>=width-rx)
  {
    rx=width-rw;
  }
  if(rx<0)
  {
    rx=0;
  }
  rect(rx,ry,rw,rh);
}
//원 그리기
function circleDraw()
{
  //막대에 닿았을때
  if(cx > rx && cx<=rx+rw&& cy>=ry - cr)
  {
     cdiry = -cdiry;
     score = score +1; //점수 +1
     sound2.play();//소리삽입
  }
  else if(cy>=ry - cr) // cy>=height는 공의 판정이 이상하지않지만 점수가 내려가지않고 score -1, cy>=ry - cr은 점수가 내려가지만 공의 판정이 진짜 이상하다. 
    //내보내기를 할때는 공유->전체화면을 추천
  {
    cdiry=-cdiry;
    score = score -1; //점수 -1
    //sound2.play();//소리삽입
  }
  //벽면에 닿았을때 튕기기
  if(cx<=cr||cx>=width-cr)
  {
    cdirx=-cdirx;
    cx=cx+cdirx*random(cr*2);
  }
  if(cy<=cr||cy>=height-cr)
  {
    cdiry=-cdiry;    
    cy=cy+cdiry*random(cr*2);
  }
  //새로운 중심점
  cx=cx+cdirx*cspeed;
  cy=cy+cdiry*cspeed;
  circle(cx,cy,cr*2);
}
function circleDraw1()
{
  //막대에 닿았을때
  if(cx > rx && cx<=rx+rw&& cy>=ry - cr)
  {
     cdiry = -cdiry;
     score = score +2; //점수 +1
     sound2.play();//소리삽입
  }
  else if(cy>=ry - cr) // cy>=height는 공의 판정이 이상하지않지만 점수가 내려가지않고 score -1, cy>=ry - cr은 점수가 내려가지만 공의 판정이 진짜 이상하다. 
    //내보내기를 할때는 공유->전체화면을 추천
  {
    cdiry=-cdiry;
    score = score -2; //점수 -1
    //sound2.play();//소리삽입
  }
  //벽면에 닿았을때 튕기기
  if(cx<=cr||cx>=width-cr)
  {
    cdirx=-cdirx;
    cx=cx+cdirx*random(cr*10);
  }
  if(cy<=cr||cy>=height-cr)
  {
    cdiry=-cdiry;    
    cy=cy+cdiry*random(cr*10);
  }
  //새로운 중심점
  cx=cx+cdirx*cspeed;
  cy=cy+cdiry*cspeed;
  circle(cx,cy,cr*2);
  circle(cx,cy,cr*4);
}
function showScore()
{
  textSize(24);
  text('만든이:JUNE',10,30);
  text('점수 :'+score,40,55);
  textSize(20);
  if(score==-4)
  {
     lose();
     x=0;
     y=0;
     w=width;
     h=height; 
     A(x,y,w,h); //clearRect()의 역할을 함
  }
  if(score==1)
  {
    
    a++;
    if(a==1) b++;
    cleara();
  }
}
function cleara()
{
  button10=createButton('again');
  button10.size(200,50);
  button10.position(width/2,height/5*2);
  button10.mousePressed(cog);
  button11=createButton('back');
  button11.size(400,100);
  button11.position(width/3,height/5*3);
  button11.mousePressed(changeFlag);
}
function lose()
{
  removeElements();
  sound1.play();
  text('게임오버',300,300);
}
//시작화면
function startBt()
{
  
  text('벽돌게임',width/2-100,height/2-50);
  textSize(50);
  button=createButton('시작하기');
  button.size(200,50);
  button.position(width/3,height/5*3);
  button.style('font-size','24');
  button.mousePressed(changeFlag);
} 
//게임시작
function changeFlag()
{
  removeElements(); //화면을 지운다.그림이나 버튼지우기에 좋음
  sFlag=false;
  sFlag1=true;
}
function cog()
{
  removeElements();
  sFlag=false;
  sFlag1=false;
}
function back()
{
  removeElements();
  if(b==1)
  {
    sFlag=false;
    sFlag1=false;
  }
}
function go()
{
  button10=createButton('level 1');
  button10.size(200,50);
  button10.position(width/2,height/5*2);
  button10.mousePressed(cog);
  button11=createButton('level 2');
  button11.size(400,100);
  button11.position(width/3,height/5*3);
  button11.mousePressed(back);
}
function draw() {
  
  background(220);
  if(sFlag)
  {
     startBt(); // 시작화면
  }
  else if(!sFlag&&!sFlag1)
  {
    //게임 시작
    rectDraw(); //막대
    circleDraw(); //공
    showScore(); //점수
  }
  else if(!sFlag&&!sFlag1&&b==1)
  {
    //게임 시작
    rectDraw1(); //막대
    circleDraw1(); //공
    showScore1(); //점수
  }
  if(!sFlag&&sFlag1)
  {
    go();
  }
}
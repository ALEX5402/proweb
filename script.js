const textContainer = document.getElementById('text-loading');
const textRoot = document.getElementById('text-root');
const textGreeting = document.getElementById('text-greeting');
const textPress = document.getElementById('text-press');
const textnullBit = document.getElementById('text-nullBit');
const textInfo = document.getElementById('text-info');
const textGithub = document.getElementById('text-github');
const textYT = document.getElementById('text-yt');
const textDC = document.getElementById('text-dc');
const video = document.getElementById('myVideo');
const screen = document.getElementById('black-screen');
const mCanv = document.getElementById("canv");
const dots = '...';
let ipaddr;
let country;
let entered;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLoading() {
  const loadingText = 'Loading ';
  
  
  
  for(let i = 0; i < loadingText.length; i++){
    textContainer.textContent += loadingText[i];
    await sleep(50);
  }

  try{
    await fetchIP();
  }
  catch(error){
    country = null;
    ipaddr = null;
  }
  
  for(let i = 0; i < dots.length * 4; i++){
    textContainer.textContent += '.';
    if(i % 4 == 0){
        textContainer.textContent = loadingText;
    }
    if(i != (dots.length*4) -1){
        await sleep(90);
        
    }
  }
  textContainer.textContent = '';
  grantingAccess();
}

async function grantingAccess() {
  const rootText = 'root@alex:~';
  textRoot.textContent = rootText;
  
  const granting = document.createElement('span');
  const grantingText = 'Granting access ';
  granting.style.color = 'white';

  const hashtag = document.createElement('span');
  hashtag.textContent = '# ';
  hashtag.style.color = 'darkred';

  const success = document.createElement('span');
  const successText = '(Access granted)'; 
  success.style.color = 'lime';
  
  textRoot.appendChild(hashtag);
  textRoot.appendChild(granting);
  textRoot.appendChild(success);
  
  await sleep(200);
  for(let i = 0; i < grantingText.length; i++){
    granting.textContent += grantingText[i];
    await sleep(50);
  }
  const loadSym = ["|", "/", "-", "\\", ];
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < loadSym.length ; j++){
        await sleep(100);
        granting.textContent = grantingText;
        granting.textContent += loadSym[j];
    }
  }
  granting.textContent = grantingText;
  
  for(let i = 0; i < successText.length; i++){
    success.textContent += successText[i];
    await sleep(50);

  }

  welcoming();
}

async function welcoming() {
  if(country == null || ipaddr == null){
    try{
      await fetchIP();
    }
    catch(error){
        ipaddr = 'Earthling';
        country = 'Earth';
    }
  } 
  const welcome = ['Welcome back ', `Good to see someone from ${country}.`];
  
  const ipTextSpan = document.createElement('span');
  const iptext = ipaddr.toString();
  ipTextSpan.style.fontFamily = 'bold';
  ipTextSpan.style.fontStyle = 'italic';
  ipTextSpan.style.color = 'lime';

  const restGreet = document.createElement('span');
  
  
  for(let i = 0; i < welcome[0].length ; i++){ 
    textGreeting.textContent += (welcome[0])[i];
    await sleep(100);
  }

  textGreeting.appendChild(ipTextSpan);

  for(let i = 0; i < iptext.length; i++){
    console.log(ipaddr);
    ipTextSpan.textContent += iptext[i];
    await sleep(100);
    
  }

  textGreeting.appendChild(restGreet);
  restGreet.textContent += '! ';
  for (let i = 0; i < welcome[1].length; i++){
    restGreet.textContent += (welcome[1])[i];
    await sleep(50);
  }
  entered = false
  const pressText = 'Press anywhere to See Magic';
  screen.addEventListener('click', playVid);
  textPress.textContent = pressText;
  async function toggleVisibility() {
    while (!entered) {
      textPress.style.visibility = 'visible';
      await sleep(1200);
      textPress.style.visibility = 'hidden';
      await sleep(1200);
    }
  }

  await toggleVisibility();
  
}

async function fetchIP() {
    
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    ipaddr = data.ip;
    console.log(ipaddr);
    
    const geoResponse = await fetch('https://ipapi.co/json/');
    const geodata = await geoResponse.json();
    country = geodata.country_name;
    
    
}

function playVid(){
  textPress.style.visibility = 'hidden';
  entered = true;
  video.muted = false;
  video.play();
  video.focus = true
  screen.classList.add('black-screen-hidden');
  animstart();
}



class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1; 
    this.vy = Math.random() * 2 - 1; 
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    
    if (this.x <= 0 || this.x >= mCanv.width) {
      this.vx *= -1;
    }
    if (this.y <= 0 || this.y >= mCanv.height) {
      this.vy *= -1;
    }
  }
}

const sentences = ["Hi, I am a Self Taught Android Developer 🎉", 
"I love to Sleep on my free time 😅 ",
"I love to modify system frameworks on Android 🤖",
"And I love Kotlin More Than Girls 😘",
"Currently working as a freelancer and worked few projects in past 🙂"];
let currentSentenceIndex = 0;
let currentCharacterIndex = 0;
let writing = true;
let currText = "";

function typeText(){
  if(currentSentenceIndex >= sentences.length ){
    currentSentenceIndex = 0;
  }
  console.log(currentSentenceIndex);
  console.log(currentCharacterIndex);
  if(currentCharacterIndex >= sentences[currentSentenceIndex].length && writing ){
    
    console.log("did");
    currentSentenceIndex += 1;
    writing = false
  }

  if(writing){
    textInfo.textContent = currText;
    currText += sentences[currentSentenceIndex][currentCharacterIndex];
    currentCharacterIndex+=1;
  }
  else{
    textInfo.textContent = currText;
    currText = currText.slice(0,-1);
    currentCharacterIndex -= 1;
    if(currentCharacterIndex === 0){
      writing = true;
    }
  }
  console.log(currText);
}

function linkHandle(event){
  const clickId = event.target.id;

  switch(clickId){
    case 'text-github':
      window.open('https://github.com/alex5402', '_blank');
      break;
    case 'text-yt':
      window.open('https://x.com/shellstr0m', '_blank');
      break;
    case 'text-dc':
      window.open('https://discord.gg/2TTB3RmMMe', '_blank');
      break;
  }
}


async function animstart(){
  textnullBit.style.zIndex = "6";
  const alex = "ALEX5402"
  textnullBit.textContent = alex;
  textInfo.textContent = "hahaha so cool";
  textGithub.textContent = "Github";
  textYT.textContent = "Twitter";
  textDC.textContent = "Discord";

  textGithub.addEventListener('click', linkHandle)
  textYT.addEventListener('click', linkHandle);
  textDC.addEventListener('click', linkHandle);
  mCanv.style.zIndex = "5";
  
  const ctx = mCanv.getContext("2d");
  const points = [];
  mCanv.width = window.innerWidth;
  mCanv.height = window.innerHeight;

  for (let i = 0; i < 45; i++) {
    const x = Math.random() * mCanv.width;
    const y = Math.random() * mCanv.height;
    const point = new Point(x, y);
    points.push(point);
  }

  function changeTextColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    textnullBit.style.color = randomColor;
  }
  setInterval(changeTextColor, 1000);

  async function anima(){
    let cursorX = window.innerWidth/2;
    let cursorY = 0;

    function hMouse(event){
      cursorX = event.clientX;
      cursorY = event.clientY;
    }
    mCanv.addEventListener("mousemove", hMouse);

    const interval = 200;
    let currentTime = performance.now();
    let timePast
    while(true){
      

      mCanv.width = window.innerWidth;
      mCanv.height = window.innerHeight;
      ctx.clearRect(0, 0, mCanv.width, mCanv.height);
      console.log(cursorX);
      console.log(cursorY);
      
      timePast = performance.now() - currentTime;
      


      for(const point of points){
        point.update();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        const distance = Math.sqrt((cursorX - point.x) ** 2 + (cursorY - point.y) ** 2);
        if(distance < 400){
          ctx.strokeStyle = "red";
          ctx.beginPath();
          ctx.moveTo(cursorX, cursorY);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      }

      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for(let i = 1; i< points.length; i++){
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      
      if(timePast >= interval){
        typeText();
        currentTime = performance.now();
      }
      await sleep(1);

    }
  }

  await anima();
  
}

typeLoading();

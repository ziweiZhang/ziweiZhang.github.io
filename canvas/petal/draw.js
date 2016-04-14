var ua = window.navigator['userAgent'].toLowerCase(),
    isAndroid = /Android|HTC/i.test(ua), 
    isIOS =  !isAndroid && /iPod|iPad|iPhone/i.test(ua),
    isPC = !isAndroid&&!isIOS;
var cvs = document.getElementById("flowers"),
	ctx = cvs.getContext("2d"),
	_scale = 1,
	_moveX = 0,
	_width = 640,
	_height = isPC?window.innerHeight:1008;
	bg = new Image();
var colors = [
		["#d92310","#ffb5ab"],
		["#f6a60d","#f6e0b4"],
		["#ee56cc","#eeaadf"]
	],
	w=50,
	peekhole = null,
	flowersNum = isPC?40:30,
	fs = [],
	text = [
		"如何让你遇见我",
		"在我最美丽的时刻",

		"为这",
		"我已在佛前求了五百年",
		"求佛让我们结一段尘缘",
		"佛於是把我化做一棵树",
		"长在你必经的路旁",

		"阳光下",
		"慎重地开满了花",
		"朵朵都是我前世的盼望",

		"当你走近",
		"请你细听",
		"那颤抖的叶",
		"是我等待的热情",

		"而当你终于无视地走过",
		"在你身后落了一地的",
		"朋友啊",
		"那不是花瓣",
		"那是我凋零的心",
	];

	cvs.height = window.innerHeight;
	_scale = window.innerHeight/_height;
	cvs.width = window.innerWidth;
	_moveX = (window.innerWidth-_width*_scale)/2;
	bg.src="tree.jpg";
	bg.onload=function(){
		init();
		animate();

	}

	function init(){
		var ratio = 0.1,
			_colornum = Math.floor(Math.random()*3);

		peekhole=ctx.createRadialGradient(w*(2-ratio),w,w*ratio,w,w,w);
		peekhole.addColorStop(0.0,colors[_colornum][0]);
		peekhole.addColorStop(ratio,colors[_colornum][1]);
		peekhole.addColorStop(0.3,colors[_colornum][1]);
		peekhole.addColorStop(0.9,colors[_colornum][0]);
	}

	function animate(){
		var f,i=0;
		for(;i<flowersNum;i++){
			f = new Flower(Math.random()*100-200,-Math.random()*100-100,Math.random()*90,Math.random()*0.1+0.2,Math.random()*2/100+0.01,Math.random()*3/100+0.005,Math.random()*3+0.1);
			fs.push(f);
		}
		
		blow();
	}
	function blow(){
		ctx.clearRect(0,0,cvs.width,cvs.height);
		drawTree();
		
		for(i=0;i<flowersNum;i++){
			fs[i].draw();
			if(fs[i].x>=_width||fs[i].y>_height){
				fs[i].x = Math.random()*100-200;
				fs[i].y = -Math.random()*100-100;
				fs[i].angle = Math.random()*90;
				fs[i].scale = Math.random()*0.1+0.2;
				fs[i].num = 0;
			}
		}
		drawText();
		requestAnimFrame(blow);
	}

	var textN = 0;
	function drawText(){
		ctx.save();
		ctx.translate(_moveX,0);

		ctx.scale(_scale,_scale);
		ctx.textAlign = "center";
		var i=0;
		for(;i<text.length;i++){
			ctx.fillText(text[i],500,50+30*i);
		}
		
		ctx.restore();
	}

	function drawTree(){
		ctx.save();
		ctx.translate(_moveX,0);

		ctx.scale(_scale,_scale);
		ctx.drawImage(bg,(_width-bg.width)/2,(_height-bg.height)/2,bg.width,bg.height);
		ctx.restore();
	}
	function rads(x){
		return Math.PI*x/180;
	}
	function Flower(x,y,angle,scale,speedX,speedY,speedA){
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.scale = scale;
		this.speedX = speedX;
		this.speedY = speedY;
		this.speedA =speedA;
		this.curveUp = -Math.random()*20;
		this.curveDown = Math.random()*20;
		this.type = Math.floor(Math.random()*3);
		this.num = 0;
				
		
		this.draw = function(){
			var x=this.x,y = this.y;
			ctx.save();
			
			ctx.fillStyle = peekhole;
			ctx.translate((w+x-10)*_scale+_moveX,(w+y)*_scale);

			ctx.rotate(rads(this.angle));
			ctx.scale(this.scale*_scale,this.scale*_scale);
			
			ctx.beginPath();
			
			ctx.moveTo(10,w-20);
			ctx.quadraticCurveTo(65,w-40+this.curveUp,90,w);
			ctx.quadraticCurveTo(65,w+40+this.curveDown,10,w+20);

			if(this.type==0){
				ctx.quadraticCurveTo(0,w,10,w-20);

			}else if(this.type==2){
				ctx.quadraticCurveTo(5,w-5,30,w);
				ctx.quadraticCurveTo(5,w+5,10,w-20);				
			}else{
				ctx.quadraticCurveTo(10,w+5,15,w+12);
				ctx.quadraticCurveTo(0,w,10,w-10);
				ctx.quadraticCurveTo(10,w-10,10,w-20);
			}


			ctx.closePath();
			ctx.fill();
			ctx.restore();
			this.num++;
			this.x += this.num*speedX;
			this.y += this.num*speedY;
			this.angle += speedA;
		}
	}
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback,1000 / 60);
        };
})();

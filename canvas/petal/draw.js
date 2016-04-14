var ua = window.navigator['userAgent'].toLowerCase(),
    isAndroid = /Android|HTC/i.test(ua), 
    isIOS =  !isAndroid && /iPod|iPad|iPhone/i.test(ua),
    isPC = !isAndroid&&!isIOS;
var cvs = document.getElementById("flowers"),
	ctx = cvs.getContext("2d"),
	_scale = 1,
	_moveX = 0,
	_width = 640,
	_height = 1008;
	bg = new Image();
	
	cvs.height = window.innerHeight;
	_scale = window.innerHeight/_height;
	cvs.width = window.innerWidth;
	_moveX = (window.innerWidth-_width*_scale)/2;
	bg.src="tree.jpg";
	bg.onload=function(){
		animate();

	}

	// console.log(moveX+","+_scale)
	function animate(){
		var f,i=0,n=isPC?80:30,fs=[];
		for(;i<n;i++){
			f = new Flower(Math.random()*100-200,-Math.random()*100-100,Math.random()*90,Math.random()*0.1+0.2,Math.random()*2/100+0.01,Math.random()*3/100+0.005,Math.random()*3+0.1);
			fs.push(f);
		}
		var id = setInterval(function(){
			
			ctx.clearRect(0,0,cvs.width,cvs.height);
			ctx.save();
			ctx.translate(_moveX,0);

			ctx.scale(_scale,_scale);
			ctx.drawImage(bg,(_width-bg.width)/2,(_height-bg.height)/2,bg.width,bg.height);
			ctx.restore();
			for(i=0;i<n;i++){
				fs[i].draw();
				if(fs[i].x>=_width||fs[i].y>_height){
					fs[i].x = Math.random()*100-200;
					fs[i].y = -Math.random()*100-100;
					fs[i].angle = Math.random()*90;
					fs[i].scale = Math.random()*0.1+0.2;
					fs[i].num = 0;
				}
			}
			
		},1000/60);
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
		this.w=50;
		this.peekhole = null;

		this.init = function(){
			var w = this.w,ratio=0.1;
			peekhole=ctx.createRadialGradient(w*(2-ratio),w,w*ratio,w,w,w);
			peekhole.addColorStop(0.0,"#d92310");
			peekhole.addColorStop(ratio,"#ffb5ab");
			peekhole.addColorStop(0.3,"#ffb5ab");
			peekhole.addColorStop(0.9,"#d92310");
		}
		this.init();
		this.draw = function(){
			var w = this.w,x=this.x,y = this.y;
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

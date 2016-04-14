var wrap = document.getElementById("canvas-wrap"),
	cvs = document.getElementById("flowers"),
	ctx = cvs.getContext("2d"),
	bg = new Image();
	cvs.width = wrap.offsetWidth;
	cvs.height = wrap.offsetHeight;
	bg.src="tree.jpg";
	bg.onload=function(){
		animate();

	}
	function animate(){
		var f,i=0,n=80,fs=[];
		// var w = new Worker("worker.js");
		// w.postMessage("");
		for(;i<n;i++){
			f = new Flower(Math.random()*200-100,-Math.random()*200-100,Math.random()*90,Math.random()*0.1+0.2,Math.random()*2/100+0.005,Math.random()*3/100+0.005,Math.random()*3+0.1);
			fs.push(f);
		}
		// ctx.clearRect(0,0,cvs.width,cvs.height);
		// ctx.drawImage(bg,(cvs.width-bg.width)/2,(cvs.height-bg.height)/2,bg.width,bg.height);

		// new Flower(100,100,90,1,Math.random()*2/100,Math.random()*3/100,Math.random()*3+0.1).draw();
		var id = setInterval(function(){
			ctx.translate(0,0);
			// ctx.fillStyle="black";
			ctx.clearRect(0,0,cvs.width,cvs.height);
			ctx.drawImage(bg,(cvs.width-bg.width)/2,(cvs.height-bg.height)/2,bg.width,bg.height);
		
			for(i=0;i<n;i++){
				fs[i].draw();
				if(fs[i].x>=cvs.width||fs[i].y>cvs.height){
					fs[i].x = Math.random()*200-100;
					fs[i].y = -Math.random()*200-100;
					fs[i].angle = Math.random()*90;
					fs[i].scale = Math.random()*0.1+0.2;
					fs[i].num = 0;
				}
			}
			
		},1000/30);
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
			var w = 50,ratio=0.1,x=this.x,y = this.y,peekhole;
			ctx.save();
			
			ctx.translate(w+x-10,w+y);

			ctx.rotate(rads(this.angle));
			ctx.scale(scale,scale);
			peekhole=ctx.createRadialGradient(w*(2-ratio),w,w*ratio,w,w,w);
			peekhole.addColorStop(0.0,"#d92310");
			peekhole.addColorStop(ratio,"#ffb5ab");
			peekhole.addColorStop(0.3,"#ffb5ab");
			peekhole.addColorStop(0.9,"#d92310");
			ctx.fillStyle = peekhole;
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
			// ctx.fillRect(0,0,w*2,w*2)
			ctx.restore();
			this.num++;
			this.x += this.num*speedX;
			this.y += this.num*speedY;
			this.angle += speedA;
		}
	}
	
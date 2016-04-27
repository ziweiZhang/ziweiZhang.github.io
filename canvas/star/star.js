var cvs = document.getElementById("stars"),
	ctx = cvs.getContext("2d"),
	starArray = [],
	meteorArray = [];
cvs.height = window.innerHeight;
cvs.width = window.innerWidth;
var requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback,1000 / 60);
        };
})();
createStars(300);
createMeteor(2);
drawStars();

function createMeteor(num){
	var i=0,meteor;
	for(;i<num;i++){
		meteor = new Meteor({
			x:Math.random()*cvs.width,
			y:Math.random()*cvs.height,
			speed:Math.random()*5,
			length:Math.random()*100+20,
			angle:Math.random()*Math.PI/2+Math.PI/3
		});
		meteorArray.push(meteor);
	}
	
	console.log(meteorArray)
}
function createStars(num){
	var i = 0,star ,_n=250;
	for(;i<num;i++){
		var x = 0;
		if(i>_n){
			if(Math.floor((num-i)/50)%2==0){
				x = (100-i%100)*3+cvs.width/8*3;
			}else{
				x = i%100*3+cvs.width/8*3;
			}
		}else{
			x = Math.random()*cvs.width;
		}
		star = new Star({
			x:x,
			y:Math.random()*cvs.height,
			speed:Math.random()*0.03,
			width:i>_n?Math.random()*2:Math.random()*1.5,
			opacity:Math.random()*0.1
		});
		starArray.push(star);
	}
	// drawStars();
	// console.log(starArray);
	}
function drawStars(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
	for(star in starArray){
		starArray[star].draw();
	}
	for(meteor in  meteorArray){
		meteorArray[meteor].draw();
	}
	// console.log("draw")
	requestAnimFrame(drawStars);
}
function Meteor(meteor){
	this.x = meteor.x;
	this.y = meteor.y;
	this.length = meteor.length;
	this.speed = meteor.speed;
	this.angle = meteor.angle;
	this.draw = function(){
		ctx.save();
		// ctx.fillStyle="#ffffff"
		var ex=Math.floor(this.x+Math.cos(this.angle)*this.length),
			ey=Math.floor(this.y+Math.sin(this.angle)*this.length),
			grd=ctx.createLinearGradient(this.x,this.y,ex,ey);
grd.addColorStop(1,"rgba(255,255,255,1)");
grd.addColorStop(0.8,"rgba(255,255,255,0.8)");
grd.addColorStop(0,"rgba(255,255,255,0)");
		// ctx.strokeStyle="#ffffff";
		ctx.strokeStyle=grd;
		ctx.lineWidth = 2;
		// ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		// ctx.lineTo(this.x+100,this.y+100);
		// ctx.strokeRect(this.x,this.y,10,10)
		ctx.lineTo(ex,ey);
		// ctx.closePath();
		ctx.stroke();
		ctx.restore();
		this.x+=Math.floor(Math.cos(this.angle)*this.speed);
		this.y+=Math.floor(Math.sin(this.angle)*this.speed);
		if(this.x>cvs.width||ex<0||this.y>cvs.height||ey<0){
			this.x = Math.random()*cvs.width;
			this.y = Math.random()*cvs.height;
		}
	}
}
function Star(star){
	this.x = star.x;
	this.y = star.y;
	this.speed =star.speed;
	this.width = star.width;
	this.opacity = star.opacity;
	this.draw = function(){
		ctx.save();
		// ctx.font ="16px";
		ctx.fillStyle = "#ffffff";

		// ctx.fillText(this.opacity,this.x,this.y);
		ctx.beginPath();
		ctx.globalAlpha = this.opacity;
		// ctx.fillRect(this.x,this.y,100,100);
		ctx.arc(this.x,this.y,this.width,0,Math.PI*2,false);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		this.opacity+=this.speed;
		if(this.opacity>=1){
			this.opacity = 1;
			this.speed = -this.speed;
		}else if(this.opacity<=0){
			this.opacity = 0;
			this.speed = -this.speed;
		}
		// console.log(this.opacity)
	};
}



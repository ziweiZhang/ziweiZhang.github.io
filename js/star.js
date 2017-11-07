"use strict";
var cvs = document.getElementById("stars"),
	ctx = cvs.getContext("2d"),
	starArray = [],
	meteorArray = [];
cvs.height = window.innerHeight;
cvs.width = window.innerWidth;
var initX = cvs.width,
	initY = cvs.height/2;
var requestAnimFrame = (function(){
return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback,1000 / 60);
        };
})();

function createMeteor(num){
	var i=0,meteor;
	for(;i<num;i++){
		meteor = new Meteor(i);
		meteorArray.push(meteor);
	}
}
function createStars(num){
	var i = 0,star ,_n=250;
	for(;i<num;i++){
		var x = 0;
		if(i>_n){
			if(Math.floor((num-i)/50)%2===0){
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
			width:i>_n?Math.random()*3:Math.random()*1.5,
			opacity:Math.random()*0.1
		});
		starArray.push(star);
	}
}
function drawStars(){
	var star, meteor;
	ctx.clearRect(0,0,cvs.width,cvs.height);
	for(star in starArray){
		starArray[star].draw();
	}
	for(meteor in  meteorArray){
		meteorArray[meteor].draw();
	}
	
	requestAnimFrame(drawStars);
}
function Meteor(id){
	this.id = id;
	this.reset = function(){
		this.x = Math.random()*initX;
		this.y = Math.random()*initY - cvs.height/6;
		this.length = Math.random()*50+40;
		this.speed = Math.random()*4+5;
		this.angle = Math.random()*Math.PI/6+Math.PI/4;
	};
	this.draw = function(){
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		var grd=ctx.createLinearGradient(
			0,
			0,
			this.length,
			2);
		grd.addColorStop(1,"rgba(255,255,255,1)");
		grd.addColorStop(0.7,"rgba(255,255,255,0.4)");
		grd.addColorStop(0,"rgba(255,255,255,0)");
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,this.length,2);
		ctx.restore();
		this.x+=Math.cos(this.angle)*this.speed;
		this.y+=Math.sin(this.angle)*this.speed;
		if(this.x>cvs.width||this.y>cvs.height){
			this.reset();
		}
	};
	this.reset();
}
function Star(star){
	this.x = star.x;
	this.y = star.y;
	this.speed =star.speed;
	this.width = star.width;
	this.opacity = star.opacity;
	this.draw = function(){
		ctx.save();
		ctx.fillStyle = "#ffffff";

		ctx.beginPath();
		ctx.globalAlpha = this.opacity;
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
	};
}

createStars(300);
createMeteor(5);
drawStars();

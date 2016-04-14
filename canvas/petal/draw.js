onmessage = function(e){
	deal(e.data);
};
function deal(data){
	var fs = data.fs,n=data.n;
	for(i=0;i<n;i++){
		fs[i].draw();
		if(fs[i].x>=600||fs[i].y>700){
			fs[i].x = Math.random()*200-100;
			fs[i].y = -Math.random()*200-100;
			fs[i].angle = Math.random()*90;
			fs[i].scale = Math.random()*0.1+0.2;
			fs[i].num = 0;
		}
	}
}
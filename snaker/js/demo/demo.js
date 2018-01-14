function Ball(radius,color){
	
	if(radius==undefined){radius=40}
	if(color==undefined){color="#FF0000";}
	//x轴坐标：X
	//y轴坐标：Y
	this.x=0;
	this.y=0;
	//圆的半径：R=>radius
	this.radius=radius;
	
	//速度单位：V=>velocity
	this.vx=0;
	this.vy=0;
	
	//质量单位：M=>mass
	this.mass=1;
	
	//旋转角度 
	this.totation=0;
	//缩放属性
	this.scaleX=1;
	this.scaleY=1;
	
	//绘图填充颜色
	this.color=utils.parseColor(color);
	//设置线宽
	this.lineWidth=1;
	/*
	 * 参数
	 * t--- current time(当前时间);
   	 *	b--- beginning value(初始值);
   	 *	c--- change in value(变化量);
   	 *	d---duration(持续时间);
   	 * speed 步长;
	 */
	this.t=0;
	this.b=0;
	this.c=0;
	this.d=0;
	this.speed=1;
}

Ball.prototype.draw=function(context){
	//保存canvas当前路径
	context.save();
	//平移坐标系（居中、居左、居右）
	context.translate(this.x,this.y);
	//旋转坐标系
	context.rotate(this.rotation);
	//缩放坐标系
	context.scale(this.scaleX,this.scaleY);
	//设置线条宽度（属性）
	context.lineWidth=this.lineWidth;
	//设置填充颜色风格（属性）
	context.fillStyle=this.color;
	//开始定义路径
	context.beginPath();
	
	//向canvas路径上添加一段弧
	context.arc(0,0,this.radius,0,(Math.PI*2),true);
	//结束路径
	context.closePath();
	//开始填充
	context.fill();
	if(this.lineWidht>0){
		//沿着canvas当前路径绘制边框
		context.stroke();
	}
	//回复之前保存的绘图状态
	context.restore();
};

Ball.prototype.getBounds=function (){
	//构造函数
	return{
		x:this.x-this.radius,
		y:this.y-this.radius,
		widht:this.radius*2,
		height:this.radius*2
	};
};

<template>
	<div class="run-map-page">
	<div class="canvas-box">
		<canvas id="myCanvasBelt" width="850" height="650"></canvas>
		<canvas id="myCanvas" width="850" height="650"></canvas>
		<div 
			class="lifting-arm-img" 
			:style="{
				'display': displayArm ? 'block' : 'none',
				'left': liftingArmImg[0].left + 'px',
				'top': liftingArmImg[0].top + 'px',
				'transform': 'rotateX(0) rotateZ('+liftingArmImg[0].rotation+'deg)',
			}"></div>
			<div 
			class="lifting-arm-img" 
			:style="{ 
				'display': displayArm ? 'block' : 'none',
				'left': liftingArmImg[1].left + 'px',
				'top': liftingArmImg[1].top + 'px',
				'transform': 'rotateX(0) rotateZ('+liftingArmImg[1].rotation+'deg)',
			}"></div>
			<div 
			class="lifting-arm-img" 
			:style="{ 
				'display': displayArm ? 'block' : 'none',
				'left': liftingArmImg[2].left + 'px',
				'top': liftingArmImg[2].top + 'px',
				'transform': 'rotateX(0) rotateZ('+liftingArmImg[2].rotation+'deg)',
			}"></div>
	</div>
	</div>
</template>
<script>

import axios from "axios";

let Ajax = axios.create({
  baseURL:'https://www.easy-mock.com/mock/5b2bc70743896129857dc8dc/jiyi',
  timeout: 5000,
  // headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
});

Ajax.interceptors.response.use(function (response) {
	// 对响应数据做点什么	
	
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default {
	name: "RunMap",
	data() {
		return {
			ctx: null,
			ctxBelt: null,
			liftingArmImg: [
				{
					left: 0,
					top: 0,
					rotation: 0,
				},
				{
					left: 0,
					top: 0,
					rotation: 0,
				},
				{
					left: 0,
					top: 0,
					rotation: 0,
				},
			],
			belt: {
				"1a": 0,
			},
			lmq: [ 8, 18 ],//犁煤器，对应11a、11b皮带上的煤落向哪个煤仓
			offset: 0,
			displayArm: false,
			dlj:[
				{"position":106.5,"rotation":-40.5,"status":1},
				{"position":61,"rotation":22.85,"status":0},
				{"position":221.8,"rotation":47,"status":1}
			],
		}
	},
	computed: {
		lmqStartXOne() {
				let i = parseInt((this.lmq[0] - 1)/6);
				let j = (this.lmq[0] - 1) - i*6;
			return 674.5 - 23*i - 30*( i*5 + j) + 8;
		},
		lmqStartXTwo() {
				let i = parseInt((this.lmq[1] - 1)/6);
				let j = (this.lmq[1] - 1) - i*6;
			return 674.5 - 23*i - 30*( i*5 + j) + 8;
		},
		dljPositionYOne() {
			return 140 + 360 - (this.dlj[0].position * 1.2);
		},
		dljPositionYTwo() {
			return 140 + 360 - (this.dlj[1].position * 1.2);
		},
		dljPositionYThree() {
			return 140 + 360 - (this.dlj[2].position * 1.2);
		},
	},
	mounted() {

		this.ctx = document.getElementById("myCanvas").getContext("2d");
		this.ctxBelt = document.getElementById("myCanvasBelt").getContext("2d");
		this.drawRoundedRect(this.ctx, 20, 140, 107, 360, 40, 10, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 143, 140, 107, 360, 10, 10, true, false, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 310, 140, 105, 358, 10, 10, true, true, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 433, 140, 105, 358, 10, 10, true, true, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 600, 140, 107, 360, 10, 10, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 723, 140, 107, 360, 10, 40, true, false, 2, "#595959", "#959595");

		//绘画煤仓
		// this.drawCoalBunker();

		//绘画煤堆
		//测试，先画一个煤堆试试
		// this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/1-101.png"), 23, 170, 100, 183.4 );
		// this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/1-103.png"), 146, 170, 100, 95.6 );

		// this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/2-102.png"), 313, 170, 100, 89.2 );
		// this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/2-104.png"), 436, 170, 100, 82 );

		// this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/3-201.png"), 603, 170, 100, 206.4 );
		// this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/3-203.png"), 723, 170, 100, 81.4 );
		
		//画三个斗轮机
		// this.drawBucketWheelOne(this.ctx, 124, 101, -50, 0, 0); // old x: 130
		// this.drawBucketWheelOne(this.ctx, 413, 201, 45, 0, 1);	// old x: 420
		// this.drawBucketWheelOne(this.ctx, 704, 251, 135, 0, 2);	// old x: 710

		//画所有的转运站
		this.drawTransferStationAll()

		//画皮带，重头戏
		// this.drawBelt(this.ctx);
		// this.animation(this.ctx);
		this.animation(this.ctxBelt);

		//画船
		this.drawShip(this.ctx);

		//发送ajax请求
		this.ajaxGetData();
		
	},
	methods: {
		//画煤堆得背景
		drawRoundedRect(ctx, x, y, width, height, r_left, r_right, fill, stroke, lineWidth, strokeStyle, fillStyle)  { 
			ctx.save(); 
			ctx.beginPath(); 
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = strokeStyle; 
			ctx.fillStyle = fillStyle;

			// draw top and top right corner 
			ctx.moveTo(x + r_left, y); 
			ctx.arcTo(x + width, y, x + width, y + r_right, r_right); 

			// draw right side and bottom right corner 
			ctx.arcTo(x + width, y + height, x + width - r_right, y + height, r_right); 

			// draw bottom and bottom left corner 
			ctx.arcTo(x, y + height, x, y + height - r_left, r_left); 

			// draw left and top left corner 
			ctx.arcTo(x, y, x + r_left, y, r_left); 
			
			if (fill) { 
				ctx.fill(); 
			} 
			if (stroke) { 
				ctx.stroke(); 
			}
			ctx.closePath();
			ctx.restore(); 
		},
		//画所有煤仓
		drawCoalBunker() {

			// let startX = 754.5;
			let startX = 674.5; //缩短间距
			let starty = 34.5;

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 6; j++) {
					let fontText = "A";
					switch (j) {
						case 0:
								fontText = "A";
							break;
						case 1:
								fontText = "B";
							break;
						case 2:
								fontText = "C";
							break;
						case 3:
								fontText = "D";
							break;
						case 4:
								fontText = "E";
							break;
						case 5:
								fontText = "F";
							break;
						default:
							break;
					}
					let mcIndex = i * 6 + j + 1; //煤仓索引
					this.drawCoalBunkerOne(this.ctx, startX, starty, [], fontText, "#78a8e8", i, mcIndex);
					// startX -= 24;
					startX -= 23; //缩短间距
				}
				// startX -= 42;
				startX -= 30; //缩短间距
			}

		},
		//画一个煤仓
		drawCoalBunkerOne(ctx, x, y, mcArray = [], fontText, fontColor, outerIndex, mcIndex) {

			ctx.save();
			ctx.translate(x, y);
			ctx.beginPath();
			ctx.fillStyle = '#FFFFFF';
			ctx.moveTo(1, 1); 
			ctx.lineTo(18, 1);
			ctx.lineTo(18, 21); 
			ctx.lineTo(10, 40);
			ctx.lineTo(1, 21);
			ctx.closePath();
			ctx.fill();

			ctx.globalCompositeOperation = 'source-atop';

			// mcArray.map((value, index)=>{
				ctx.beginPath();
				ctx.fillStyle='#78a8e8';
				ctx.fillRect(1,10,17,15);
				ctx.closePath();
			// })


			ctx.beginPath();
			ctx.fillStyle='#e86e6b';
			ctx.fillRect(1,25,17,15);
			ctx.closePath();

			ctx.restore();


			ctx.save();
			ctx.translate(x, y);
			ctx.beginPath();
			ctx.strokeStyle = "#2070c2"; 
			ctx.lineWidth = 1;
			ctx.moveTo(1, 0); 
			ctx.lineTo(18, 0);
			ctx.lineTo(18, 20); 
			ctx.lineTo(10, 41);
			ctx.lineTo(1, 20);
			ctx.closePath();

			//渲染煤仓下的文字,煤仓编号
			ctx.font = '16px Arial';
			ctx.fillStyle = fontColor;
			ctx.textAlign = 'center';
			ctx.fillText(fontText, 10, 60);
			ctx.stroke();

			//渲染煤仓下的机组编号
			if (fontText == "D") {
				ctx.beginPath();
				ctx.font = '14px Arial';
				ctx.fillStyle = "#8a8a8a";
				ctx.textAlign = 'start';
				ctx.fillText(`#${outerIndex + 1}机组`, 0, 76);
				ctx.closePath();
			}

			//画两个犁煤器，先画长的，再画短的
			if (mcIndex == this.lmq[0] + 1 ) {
				this.drawCoalPloughLong(ctx, x);
			}
			if (mcIndex == this.lmq[1] + 1 ) {
				this.drawCoalPloughShort(ctx, x);
			}
			ctx.restore();
		},
		//画一个煤堆
		drawCoalHeapOne(ctx, src, x, y, w, h, valueX, valueY, index ) {
			let imageObj = new Image();
			imageObj.src = src;
			imageObj.onload = () => {
				// ctx.save();
				let width = imageObj.width;
				let height = imageObj.height;
				let webScale = 1.4;
				// let yy = 140 + 360 + 65 - y * webScale;
				let yy = 140 + 360 + 40 - y * webScale;
				let ww;
				if (width && height && valueX) {
					let scale = (h/height).toFixed(3);
					w = width*scale;
					let eq = parseInt(index/4); //计算是哪部分的煤堆，煤堆分成三部分，从右至左，1,2,3
					let beltX = [715, 425, 135]; //皮带的横坐标，也是煤堆定位的横坐标啦
					ww = w*webScale;
					if (valueX > 0) {
						x = beltX[eq] + valueX*webScale - ww/2 + 10;
					} else {
						x = beltX[eq] + valueX*webScale - ww/2 - 20;
					}
				}
				
				ctx.drawImage(imageObj, x, yy, ww, h*webScale);
				// ctx.restore();
			};
		},
		// drawCoalHeapOne(ctx, src, x, y, w, h ) {
		// 	let imageObj = new Image();
		// 	imageObj.src = src;
		// 	imageObj.onload = () => {
		// 		// ctx.save();
		// 		let width = imageObj.width;
		// 		let height = imageObj.height;
		// 		w = 80;
		// 		let renderHeight = 80*height/width;
		// 		let yy = 170  + 320 - y * 1.2;
		// 		ctx.drawImage(imageObj, x, yy, w, renderHeight*1.2);
		// 		// ctx.restore();
		// 	};
		// },
		//画一个斗轮机
		drawBucketWheelOne(ctx, x, end, rotation, status, index){
			let y = 140 + 360 + 14 - (end * 1.2);
			let imageObj = new Image();
			imageObj.src = require("../assets/fuselage.png"); //斗轮机的机身部分
			imageObj.onload = () => {
				// ctx.save();
				// ctx.drawImage(imageObj, x, y, 15, 66);
				ctx.drawImage(imageObj, x, y, 15, 56.7);
				// ctx.restore();

				//画斗轮机的吊臂
				this.drawLiftingArm(x, y, rotation, status, index);
			};
		},
		//画斗轮机的吊臂
		drawLiftingArm(x, y, rotation, status, index) {
			// this.liftingArmImg[0] = {
			// 	left: x,
			// 	top: y,
			// 	rotation,
			// }
			this.liftingArmImg[index].left = x - 3;
			// this.liftingArmImg[index].left = x;
			this.liftingArmImg[index].top = y - 40 - 16;
			this.liftingArmImg[index].top = y - 55 - 16;
			// this.liftingArmImg[index].top = y - 40 - 30;
			this.liftingArmImg[index].rotation = rotation;
		},
		//画一个转运站，皮带中间的那些转运站
		drawTransferStationOne(ctx, x, y){
			let imageObj = new Image();
			imageObj.src = require("../assets/transferStation.png"); //中转站
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, x, y, 31, 16);
				// ctx.restore();
			};
		},
		//画所有的转运站
		drawTransferStationAll(){
			this.drawTransferStationOne(this.ctx, 120, 120); //-23
			this.drawTransferStationOne(this.ctx, 410, 120);
			this.drawTransferStationOne(this.ctx, 700, 120);
			this.drawTransferStationOne(this.ctx, 700, 80); //增加一个转运站
			this.drawTransferStationOne(this.ctx, 700, 3);

			this.drawTransferStationOne(this.ctx, 120, 510); //-23
			this.drawTransferStationOne(this.ctx, 410, 510);
			this.drawTransferStationOne(this.ctx, 700, 510);

			this.drawTransferStationOne(this.ctx, 700, 533);

			this.drawTransferStationOne(this.ctx, 120, 560);

			//画一个皮带的终点
			this.drawBeltEnd(this.ctx);
		},
		//画皮带的终点,只有一个，定位直接赋值
		drawBeltEnd(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/beltEnd.png"); //皮带的终点
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 20, 1, 20, 20);
				// ctx.restore();
			};
		},
		//画犁煤器,长的
		drawCoalPloughLong(ctx, x) {
			let imageObj = new Image();
			imageObj.src = require("../assets/coalPloughLong.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, x + 4, 4.5, 21, 24);
				// ctx.restore();
			};
		},
		//画犁煤器,短的
		drawCoalPloughShort(ctx, x) {
			let imageObj = new Image();
			imageObj.src = require("../assets/coalPloughShort.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, x + 4, 14.5, 17, 15);
				// ctx.restore();
			};
		},
		//画卸船机, 长的
		drawShipUnloaderLong(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/shipUnloaderLong.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 180, 550, 43, 89);
				// ctx.restore();
			};
		},
		//画卸船机, 短的
		drawShipUnloaderShort(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/shipUnloaderShort.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 270, 550, 43, 69);
				// ctx.restore();
			};
		},
		//画船
		drawShip(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/ship.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 160, 615, 178, 31);
				// ctx.restore();
				this.drawShipUnloaderLong(ctx);
				this.drawShipUnloaderShort(ctx);
				//等船绘制完成后再去绘制卸船机
			};
			this.drawShipTwo(this.ctx);
		},
		//画第二艘船
		drawShipTwo(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/ship.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 420, 615, 178, 31);
				// ctx.restore();
				this.drawShipUnloaderLong(ctx);
				this.drawShipUnloaderShort(ctx);
				//等船绘制完成后再去绘制卸船机
			};
			this.drawShipUnloaderShortTwo(this.ctx)
		},
		//画卸船机, 短的,第二条船上的
		drawShipUnloaderShortTwo(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/shipUnloaderShort.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 450, 550, 43, 69);
				// ctx.restore();
			};
		},
		//画皮带，重头戏
		drawBelt(ctx) {
			ctx.clearRect(0, 0, 850, 650);

			//计算左上角犁煤器左侧的皮带所处的X轴的长度
			this.drawDashedLine(ctx, [[this.lmqStartXOne, 7], [30, 7]], "#FF423C", false); //old:[710, 7], [30, 7] 左上角犁煤器左侧的皮带， 最顶层的皮带, 1
			this.drawDashedLine(ctx, [[this.lmqStartXTwo, 16], [30, 16]], "#FF423C", false); //old:[710, 16], [30, 16] 左上角犁煤器左侧的皮带，从上往下第二个的皮带, 2

			this.drawDashedLine(ctx, [[710, 7], [30, 7]], "#FF423C", true); // 最顶层的皮带, 1
			this.drawDashedLine(ctx, [[710, 16], [30, 16]], "#FF423C", true); // 从上往下第二个的皮带, 2

			this.drawDashedLine(ctx, [[710, 80], [710, 7]], "#22AC38"); //old:[710, 120], [710, 7] 3,左
			this.drawDashedLine(ctx, [[720, 80], [720, 7]], "#FF423C", true); //old:[720, 120], [720, 7] 4,右

			this.drawDashedLine(ctx, [[710, 120], [710, 80]], "#22AC38"); // old:[710, 120], [710, 7] 增加转运站多的皮带， 3,左
			this.drawDashedLine(ctx, [[720, 120], [720, 80]], "#FF423C", true); // old:[720, 120], [720, 7]  增加转运站多的皮带，4,右

			this.drawDashedLine(ctx, [[130, 124], [710, 124]], "#FF423C", true); // 5, 上
			this.drawDashedLine(ctx, [[420, 132], [710, 132]], "#22AC38"); // 6， 下

			//斗轮机上面的皮带
			this.drawDashedLine(ctx, [[135, this.dljPositionYThree], [135, 120]], "#FF423C", true); //7 左
			this.drawDashedLine(ctx, [[425, this.dljPositionYTwo], [425, 120]], "#22AC38"); //8 中
			this.drawDashedLine(ctx, [[715, this.dljPositionYOne], [715, 120]], "#22AC38"); //9 右

			//斗轮机下面的皮带
			this.drawDashedLine(ctx, [[135, 510], [135, this.dljPositionYThree]], "#FF423C", true); //7 左
			this.drawDashedLine(ctx, [[425, 510], [425, this.dljPositionYTwo]], "#22AC38", false); //8 中
			this.drawDashedLine(ctx, [[715, 510], [715, this.dljPositionYOne]], "#22AC38", false); //9 右



			this.drawDashedLine(ctx, [[710, 514], [130, 514]], "#FF423C", true); // 5, 上
			this.drawDashedLine(ctx, [[710, 522], [130, 522]], "#22AC38"); // 6， 下

			this.drawDashedLine(ctx, [[710, 545], [710, 522]], "#22AC38"); // 3,左
			this.drawDashedLine(ctx, [[720, 545], [720, 522]], "#FF423C", true); // 4,右

			this.drawDashedLine(ctx, [[130, 570], [130, 537], [710, 537]], "#22AC38"); // 5, 上
			this.drawDashedLine(ctx, [[138, 570], [138, 545], [710, 545]], "#FF423C", true); // 6， 下

			this.drawDashedLine(ctx, [[710, 564], [130, 564]], "#FF423C", true); // 5, 上
			this.drawDashedLine(ctx, [[710, 572], [130, 572]], "#22AC38"); // 6， 下
		},
		// 画一条皮带
		// 绘制虚线或实线
		// @param {Array} points - 二维数组，表示所有的坐标点,第一个点默认为起点
		// @param {Array} clearArea - 二维数组, 第一维长度为3, 第二维长度为4,表示煤仓运转时虚线运动范围,擦除之前绘制的所有内容的方法
		// @param {Array} setLineDash - 点划线间距
		// @param {Number} lineWidth - 线宽
		// @param {String} color - 线段颜色
		drawDashedLine(ctx, points, color = "#FF423C", clearArea = null, setLineDash = [4], lineWidth = 4) {
			// let ctx = this.ctx;
			ctx.save();
			ctx.beginPath();
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = color;
			// ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
			// ctx.clearRect(0,0, 385, 30);
			// ctx.clearRect(268,58, 53, 60);
			// ctx.clearRect(318,0, 70, 60);
			if (clearArea) {
				//如果清除区域存在，则显示虚线
				// ctx.clearRect(clearArea[0][0],clearArea[0][1],clearArea[0][2],clearArea[0][3]);
				// ctx.clearRect(clearArea[1][0],clearArea[1][1],clearArea[1][2],clearArea[1][3]);
				// ctx.clearRect(0, 0, 850, 650);  
				ctx.setLineDash(setLineDash);
				ctx.lineDashOffset = -this.offset; 
			}
			points.map((point, index)=>{
				if (index == 0) {
				ctx.moveTo(point[0], point[1]);
				} else {
				ctx.lineTo(point[0], point[1]);
				}
			})
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		},
		animation(ctx) {
			cancelAnimationFrame(this.animationTimer);
			let then = this;
			this.animationTimer = requestAnimationFrame(function fn() {
				then.offset++;
				if (then.offset > 16) {
				then.offset = 0;
				}
				then.drawBelt(ctx);
				then.animationTimer = requestAnimationFrame(fn);
			});
		},
		ajaxGetData() {
			Ajax.get("/runMap").then(res => {
				// console.log(res.data);
				if (res.data) {
					let { dlj, dzc, lmq, mc, md, pd, st, xcj } = res.data;
					//斗轮机
					this.handle_dlj(dlj);
					//皮带
					this.handle_pd(pd);
					//煤仓
					this.handle_mc(mc);
					//犁煤器
					this.handle_lmq(lmq);
					//煤堆
					this.handle_md(md);
					//煤仓
					this.handle_xcj(xcj);

				}
				
			}).catch(error => {
				//网络请求错误
				console.log(error);
			});
		},
		handle_dlj(dlj) {
			this.dlj = dlj;
			if (!this.displayArm) {
				this.displayArm = true;
			}
			this.drawBucketWheelOne(this.ctx, 127, dlj[2].position, dlj[2].rotation, dlj[2].status, 0); // old x: 130 124
			this.drawBucketWheelOne(this.ctx, 416, dlj[1].position, dlj[1].rotation, dlj[1].status, 1);	// old x: 420 413
			this.drawBucketWheelOne(this.ctx, 706, dlj[0].position, dlj[0].rotation, dlj[0].status, 2);	// old x: 710 704
		},
		handle_pd(pd) {
			// console.log(pd);
		},
		handle_mc(mc) {
			// console.log(mc);

		},
		handle_lmq(lmq) {
			this.lmq = lmq;
			//绘画煤仓
			this.drawCoalBunker();
		},
		handle_md(md) {
			// console.log(md);
			let x = [723, 603, 723, 603, 436, 313, 436, 313, 146, 23, 146, 23];
			let index = 0;
			for (const i in md) {
				if (md.hasOwnProperty(i)) {
					const value = md[i];
					// this.drawCoalHeapOne(this.ctx, "./pic/" + value.url, x[index], 170, 100, value.end - value.start );
					this.drawCoalHeapOne(this.ctx, require("../assets/pic/" + value.url), x[index], value.end, 100, value.end - value.start, value.x, value.y, index );
					index++;
				}
			}
			// md.map((value, index)=>{
			// 	this.drawCoalHeapOne(this.ctx, "./pic/" + value.url, x[index], 170, 100, value.end - value.start );
			// });
			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/1-101.png"), 23, 170, 100, 183.4 );
			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/1-101.png"), 23, 170, 100, 183.4 );

			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/1-103.png"), 146, 170, 100, 95.6 );
			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/1-103.png"), 146, 170, 100, 95.6 );

			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/2-102.png"), 313, 170, 100, 89.2 );
			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/2-102.png"), 313, 170, 100, 89.2 );

			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/2-104.png"), 436, 170, 100, 82 );
			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/2-104.png"), 436, 170, 100, 82 );

			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/2-102.png"), 603, 170, 100, 206.4 );
			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/3-201.png"), 603, 170, 100, 206.4 );

			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/1-101.png"), 723, 170, 100, 81.4 );
			// this.drawCoalHeapOne(this.ctx, require("../assets/pic/1-103.png"), 723, 170, 100, 81.4 );
		},
		handle_xcj(xcj) {
			// console.log(xcj);
		},

	}
}
</script>
<style lang="scss">
@import "../assets/css/runMap.scss";
</style>



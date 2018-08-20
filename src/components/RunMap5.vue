<template>
	<!-- <div class="run-map-page" :style="{ position: 'relative' , 'transform': 'scale(' + unitPageScale +')', top: unitPageScaleTop + 'px' }"> -->
	<!-- <div class="run-map-page" :style="{ position: 'relative' , zoom: unitPageScale }"> -->
	<div class="run-map-page">
	<div class="canvas-box" :style="{ zoom: unitPageScale }">
	<!-- <div class="canvas-box" :style="{ zoom: 1.2 }"> -->
	<!-- <div class="canvas-box" :style="{ zoom: 1 }"> -->
		<canvas id="myCanvasBelt" width="920" height="650"></canvas>
		<canvas id="myCanvas" width="920" height="720"></canvas>
		<div 
			class="lifting-arm-img" 
			:style="{
				'display': displayArm ? 'block' : 'none',
				'left': liftingArmImg[0].left + 'px',
				'top': liftingArmImg[0].top + 'px',
				'transform': 'rotateX(0) rotateZ('+liftingArmImg[0].rotation+'deg)',
        'background-image': liftingArmImg[0].status == 1 ? 'url('+require('../assets/liftingArm_running.png')+')' : 'url('+require('../assets/liftingArm.png')+')',
			}"></div>
			<div 
			class="lifting-arm-img" 
			:style="{ 
				'display': displayArm ? 'block' : 'none',
				'left': liftingArmImg[1].left + 'px',
				'top': liftingArmImg[1].top + 'px',
				'transform': 'rotateX(0) rotateZ('+liftingArmImg[1].rotation+'deg)',
        'background-image': liftingArmImg[1].status == 1 ? 'url('+require('../assets/liftingArm_running.png')+')' : 'url('+require('../assets/liftingArm.png')+')',
			}"></div>
			<div 
			class="lifting-arm-img" 
			:style="{ 
				'display': displayArm ? 'block' : 'none',
				'left': liftingArmImg[2].left + 'px',
				'top': liftingArmImg[2].top + 'px',
				'transform': 'rotateX(0) rotateZ('+liftingArmImg[2].rotation+'deg)',
        'background-image': liftingArmImg[2].status == 1 ? 'url('+require('../assets/liftingArm_running.png')+')' : 'url('+require('../assets/liftingArm.png')+')',
			}"></div>
	</div>
	</div>
</template>
<script>

import axios from "axios";

import { getPdPosition, getPdState, setSTStatusAll, getDzcPosition } from "../js/tool.js"

let Ajax = axios.create({
  baseURL:'https://www.easy-mock.com/mock/5b2bc70743896129857dc8dc/jiyi',
  timeout: 9000,
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
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      unitPageScale: 1,
      unitPageScaleTop: 0,
      transformBig: false, //缩放类型是变大吗？判断当前是缩放变大还是变小
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
      mc: [], //煤仓
      pd: {}, //皮带
      st: {}, //三通
      dzc: {}, //电子秤
      xcj: [
        {
          "position": 0,
          "pitch": 0,
          "status": 0
        },
        {
          "position": 0,
          "pitch": 0,
          "status": 0
        },
        {
          "position": 0,
          "pitch": 0,
          "status": 0
        }
      ]
		}
  },
  beforeMount() {
    window.onresize = () => {
      // console.log(this.clientWidth, document.documentElement.clientWidth)
      // this.clientWidth = document.documentElement.clientWidth;
      // this.clientHeight = document.documentElement.clientHeight;

      let newClientWidth = document.documentElement.clientWidth;
      let newClientHeight = document.documentElement.clientHeight;
      if (this.clientWidth < newClientWidth || this.clientHeight < newClientHeight) {
        this.transformBig = true;
      }
      if (this.clientWidth > newClientWidth || this.clientHeight > newClientHeight) {
        this.transformBig = false;
      }
      this.clientWidth = newClientWidth;
      this.clientHeight = newClientHeight;
    };
    this.handleClientWidth(this.clientWidth);
    this.handleClientHeight(this.clientHeight);
  },
  watch: {
    clientWidth(val) {
      this.throttle(val, "width");
    },
    clientHeight(val) {
      this.throttle(val, "height");
    }
  },
	computed: {
		lmqStartXOne() {
      let i = parseInt((this.lmq[0] - 0)/6);
      let j = (this.lmq[0] - 0) - i*6;
      let x = 710 - 23 - 30*i - 23*( i*6 + j);
			return x > 65 ? x : 65;
		},
		lmqStartXTwo() {
      let i = parseInt((this.lmq[1] - 0)/6);
      let j = (this.lmq[1] - 0) - i*6;
      // let x = 674.5 - 23*i - 30*( i*5 + j) + 8 + 5;
      let x = 710 - 23 - 30*i - 23*( i*6 + j);
			return x > 65 ? x : 65;
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
		this.handleClientHeight(document.documentElement.clientHeight);

		this.ctx = document.getElementById("myCanvas").getContext("2d");
		this.ctxBelt = document.getElementById("myCanvasBelt").getContext("2d");
		this.drawRoundedRect(this.ctx, 30, 140, 97, 400, 60, 20, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 143, 140, 97, 400, 20, 20, true, false, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 433, 140, 97, 400, 20, 20, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 320, 140, 97, 400, 20, 20, true, false, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 610, 140, 97, 400, 20, 20, true, false, 2, "#595959", "#959595");
    this.drawRoundedRect(this.ctx, 723, 140, 97, 400, 20, 60, true, false, 2, "#595959", "#959595");
    
    //画电子秤
    this.drawRoundedRect(this.ctx, 740, 28, 160, 72, 5, 5, true, false, 1, "#d3d4d3", "#f5fbf9", 4, "#a8aba8"); // 10A, 10B
		this.drawRoundedRect(this.ctx, 740, 570, 160, 72, 5, 5, true, false, 1, "#d3d4d3", "#f5fbf9", 4, "#a8aba8"); // 2B 3A 3B

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

		

		//画皮带，重头戏
		// this.drawBelt(this.ctx);
		// this.animation(this.ctx);
		this.animation(this.ctxBelt);

		//画船
    this.drawShip(this.ctx);
    
    //画三通
    // this.drawSTAll(this.ctx);

    //画所有的转运站
		// this.drawTransferStationAll()

		//发送ajax请求
		this.ajaxGetData();
		
	},
	methods: {
		//画煤堆得背景
		drawRoundedRect(ctx, x, y, width, height, r_left, r_right, fill, stroke, lineWidth, strokeStyle, fillStyle, shadowBlur, shadowColor)  { 
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
        if (shadowBlur) {
          ctx.shadowBlur = shadowBlur;
        }
        if (shadowColor) {
          ctx.shadowColor = shadowColor;
        }
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
					this.drawCoalBunkerOne(this.ctx, startX, starty, this.mc[mcIndex-1], fontText, "#78a8e8", i, mcIndex);
					// startX -= 24;
					startX -= 23; //缩短间距
				}
				// startX -= 42;
				startX -= 30; //缩短间距
			}

		},
		//画一个煤仓
		drawCoalBunkerOne(ctx, x, y, mcArray = [], fontText, fontColor, outerIndex, mcIndex) {
			// console.log(mcArray)
			ctx.save();
			ctx.translate(x, y);
			ctx.beginPath();
			ctx.fillStyle = '#FFFFFF';
			// ctx.moveTo(1, 1); 
			// ctx.lineTo(18, 1);
			// ctx.lineTo(18, 21); 
			// ctx.lineTo(10, 40);
			// ctx.lineTo(1, 21);
			// ctx.closePath();

			//07/30更新数据 start
			ctx.moveTo(1, 1); 
			ctx.lineTo(18, 1);
			ctx.lineTo(18, 21); 
			ctx.lineTo(14, 31);
			ctx.lineTo(6, 31);
			ctx.lineTo(1, 20);
			ctx.closePath();
			//07/30更新数据 end

			ctx.fill();

			ctx.globalCompositeOperation = 'source-atop';

			// mcArray.map((value, index)=>{
			// 	ctx.save();
			// 	ctx.beginPath();
			// 	let height = 40 - parseInt(value.height) * 5 / 2;
			// 	ctx.fillStyle = value.color;
			// 	ctx.fillRect(1,height,17,15);
			// 	ctx.closePath();
			// 	ctx.restore();
			// })
			for (let i = 0; i < mcArray.length; i++) {
				// const value = mcArray[i];
				// ctx.beginPath();
				// let height = 40 - parseInt(value.height) * 5 / 2;
				// ctx.fillStyle = value.color;
				// ctx.fillRect(1,height,17,15);
				// ctx.closePath();
			}


			// ctx.beginPath();
			// ctx.fillStyle='#e86e6b';
			// ctx.fillRect(1,25,17,15);
			// ctx.closePath();

			//07/30更新数据 start
			// let heightOne = 40 - mcArray[0].height * 5 / 2;
			// let heightTwo = 40 - mcArray[1].height * 5 / 2;
			let heightOne = 40 - mcArray[0].height * 2 - 8;
			let heightTwo = 40 - mcArray[1].height * 2 - 8;

			ctx.beginPath();
			ctx.fillStyle = mcArray[0].color;
			ctx.fillRect(1,heightOne,17,40);
			ctx.closePath();


			ctx.beginPath();
			ctx.fillStyle = mcArray[1].color;
			ctx.fillRect(1,heightTwo,17,40);
			ctx.closePath();
			//07/30更新数据 end


			ctx.restore();


			ctx.save();
			ctx.translate(x, y);
			ctx.beginPath();
			ctx.strokeStyle = "#2070c2"; 
			ctx.lineWidth = 1;
			// ctx.moveTo(1, 0); 
			// ctx.lineTo(18, 0);
			// ctx.lineTo(18, 20); 
			// ctx.lineTo(10, 41);
			// ctx.lineTo(1, 20);
			// ctx.closePath();

			//07/30更新数据 start
			ctx.moveTo(1, 0); 
			ctx.lineTo(18, 0);
			ctx.lineTo(18, 20); 
			ctx.lineTo(14, 31);
			ctx.lineTo(6, 31);
			ctx.lineTo(1, 20);
			ctx.closePath();
			//07/30更新数据 end

			//渲染煤仓下的文字,煤仓编号
			ctx.font = '16px Arial';
			ctx.fillStyle = fontColor;
			ctx.textAlign = 'center';
			// ctx.fillText(fontText, 10, 60);
			ctx.fillText(fontText, 10, 50); // 0807 update
			ctx.stroke();

			//渲染煤仓下的机组编号
			if (fontText == "D") {
				ctx.beginPath();
				ctx.font = '14px Arial';
				ctx.fillStyle = "#8a8a8a";
				ctx.textAlign = 'start';
				// ctx.fillText(`#${outerIndex + 1}机组`, 0, 76);
				ctx.fillText(`#${outerIndex + 1}机组`, 0, 66); // 0807 update
				ctx.closePath();
			}

			//画两个犁煤器，先画长的，再画短的
			if (mcIndex == this.lmq[0] + 1 ) {
        if (this.lmq[0] != 23) {
          this.drawCoalPloughLong(ctx, x);
        }
			}
			if (mcIndex == this.lmq[1] + 1 ) {
        if (this.lmq[1] != 23) {
          this.drawCoalPloughShort(ctx, x); 
        }
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
				let yy = 160 + 360 + 40 - y * webScale;
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
			let y = 160 + 360 + 14 - (end * 1.2);
			let imageObj = new Image();
			imageObj.src = status == 1 ?  require("../assets/fuselage_running.png") : require("../assets/fuselage.png"); //斗轮机的机身部分
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
			// this.liftingArmImg[index].top = y - 55 - 16;
			this.liftingArmImg[index].top = y - 40 - 10;
			this.liftingArmImg[index].rotation = rotation;
			this.liftingArmImg[index].status = status;
		},
		//画一个转运站，皮带中间的那些转运站
		drawTransferStationOne(ctx, x, y){
			let imageObj = new Image();
			imageObj.src = require("../assets/transferStation.png"); //中转站
			imageObj.onload = () => {
				// ctx.save();
        // ctx.drawImage(imageObj, x, y, 31, 16);
        x+=3;
        y-=5;
				ctx.drawImage(imageObj, x, y, 26, 26);
				// ctx.restore();
			};
		},
		//画所有的转运站
		drawTransferStationAll(){
			this.drawTransferStationOne(this.ctx, 120, 120); //-23
			this.drawTransferStationOne(this.ctx, 410, 120);
			this.drawTransferStationOne(this.ctx, 700, 120);
			this.drawTransferStationOne(this.ctx, 700, 70); //增加一个转运站
			this.drawTransferStationOne(this.ctx, 700, 3);

			this.drawTransferStationOne(this.ctx, 120, 550); //-23
			this.drawTransferStationOne(this.ctx, 410, 550);
			this.drawTransferStationOne(this.ctx, 700, 550);

			this.drawTransferStationOne(this.ctx, 700, 593);

			this.drawTransferStationOne(this.ctx, 120, 630);

			//画一个皮带的终点
			this.drawBeltEnd(this.ctx);
		},
		//画皮带的终点,只有一个，定位直接赋值
		drawBeltEnd(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/beltEnd.png"); //皮带的终点
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 55, 1, 20, 20);
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
				ctx.drawImage(imageObj, 180, 620, 43, 89);
				// ctx.restore();
			};
		},
		//画卸船机, 短的
		drawShipUnloaderShort(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/shipUnloaderShort.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 270, 620, 43, 69);
				// ctx.restore();
			};
		},
		//画船
		drawShip(ctx) {
			let imageObj = new Image();
			imageObj.src = require("../assets/ship.png");
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, 160, 685, 178, 31);
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
				ctx.drawImage(imageObj, 420, 685, 178, 31);
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
				ctx.drawImage(imageObj, 450, 620, 43, 69);
				// ctx.restore();
			};
    },
    //画皮带， 使用接口数据
    drawBelt(ctx) {
      ctx.clearRect(0, 0, 850, 650);
      let pd = this.pd;
      for (const key in pd) {
        if (pd.hasOwnProperty(key)) {
          const pdValue = pd[key];
          const PdPosition = getPdPosition(key, this);
          const pdStatus = getPdState(pdValue)
          this.drawDashedLine(ctx, PdPosition, pdStatus[0], pdStatus[1]);
        }
      }
    },
		// 画一条皮带
		// 绘制虚线或实线
		// @param {Array} points - 二维数组，表示所有的坐标点,第一个点默认为起点
		// @param {Array} clearArea - 二维数组, 第一维长度为3, 第二维长度为4,表示煤仓运转时虚线运动范围,擦除之前绘制的所有内容的方法
		// @param {Array} setLineDash - 点划线间距
		// @param {Number} lineWidth - 线宽
		// @param {String} color - 线段颜色
		drawDashedLine(ctx, points, color = "#FF423C", clearArea = null, setLineDash = [4], lineWidth = 6) {
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
    //画所有的三通
    drawSTAll(ctx) {
      let stStatus = setSTStatusAll(this.st);
      for (const key in stStatus) {
        if (stStatus.hasOwnProperty(key)) {
          const value = stStatus[key];
          const PdPosition = getPdPosition(key, this);
          this.drawST(ctx, PdPosition, value, key);
        }
      }
    },
    //画三通, 画一条三通， 三通和皮带是一起的，相当于是皮带的起始点和结尾点的属性，
    //由于皮带是动画，三通不是动画，于是分开渲染，通过皮带的定位参数，求得三通的定位参数
    //其实前面几个参数都没啥作用，需要的只是points定位位置，只有最后面的drawST，才判断是否需要画三通，判断是画实线还是虚线，根据a路用实线和b路用虚线，默认虚线
    drawST(ctx, points, lineType = ["",""], lineNumber) {
      //画三通
      ctx.save();
      ctx.beginPath();

      let point1 = points[0]; //第一个点
      let point2 = points[1]; //第二个点
      let isHorizontalLine1 = false; //判断三通是不是横线
      let isFromLeftToRight1 = false; // 如果三通是横线，判断横线动画方向是不是从左到右。
      let isFromBottomToUp1 = false;
      if (point1[0] < point2[0]) {
        ///从左到右
        isFromLeftToRight1 = true;
      }
      if (point1[1] > point2[1]) {
        //从下到上
        isFromBottomToUp1 = true;
      }
      if (point1[1] == point2[1]) {
        //说明是横线
        isHorizontalLine1 = true;
      }
      if (lineType[0].length > 0) {
        isHorizontalLine1 ? this.drawStImgHorizontal(ctx, point1[0], point1[1], "start", isFromLeftToRight1, lineType[0], lineNumber) : this.drawStImgVertical(ctx, point1[0], point1[1], "start",isFromBottomToUp1, lineType[0], lineNumber)
      }


      let pointEnd1 = points[points.length - 2]; //倒数第二个点
      let pointEnd2 = points[points.length - 1]; //倒数第一个点
      let isHorizontalLine2 = false; //判断三通是不是横线，皮带尾部的三通线
      let isFromLeftToRight2 = false; // 如果三通是横线，判断横线动画方向是不是从左到右。
      let isFromBottomToUp2 = false;
      if (pointEnd1[0] < pointEnd2[0]) {
        ///从左到右
        isFromLeftToRight2 = true;
      }
      let isFromBottomToUp = true; // 如果三通是竖线，判断横线动画方向是不是从下到上
      if (pointEnd1[1] > pointEnd2[1]) {
        //从下到上
        isFromBottomToUp2 = true;
      }
      if (pointEnd1[1] == pointEnd2[1]) {
        //说明是横线
        isHorizontalLine2 = true;
      }
      if (lineType[1].length > 0) {
        isHorizontalLine2 ? this.drawStImgHorizontal(ctx, pointEnd2[0], pointEnd2[1], "end", isFromLeftToRight2, lineType[1], lineNumber) : this.drawStImgVertical(ctx, pointEnd2[0], pointEnd2[1], "end", isFromBottomToUp2, lineType[1], lineNumber)
      }
      ctx.closePath();
      ctx.restore();
    },
    //画水平的三通线
    drawStImgHorizontal(ctx, x, y, isStart, isFromLeftToRight, lineType = "", lineNumber) {
			if (lineType.length < 1) {
				return;
			}
      // let ctx =  this.$data.ctx;
      if (isStart == "start" && !isFromLeftToRight) {
        x -= 42 - 22 - 5;
      } else if (isStart == "end" && isFromLeftToRight) {
        x -= 42 - 22 - 5;
      } else if (isStart == "start"  && isFromLeftToRight) {
				x -= -5;
			} else if (isStart == "end" && !isFromLeftToRight) {
				x -= 0;
			}
			if (lineNumber == "5a" && isStart == "start") {
				x -= 5;
			}
			if (lineNumber == "5b" && isStart == "start") {
				x -= 5;
			}
			let imageObj = new Image();
			let imgSrc = lineType == "a" ? require("../assets/horizontalSTSolid.png") : require("../assets/horizontalST.png");
			imageObj.src = imgSrc;
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, x, y - 4, 22, 8);
				// ctx.restore();
			};
    },
    //画竖直的三通线
    drawStImgVertical(ctx, x, y, isStart, isFromBottomToUp, lineType = "", lineNumber) {
			if (lineType.length < 1) {
				return;
			}
      if (isStart == "start" && isFromBottomToUp) {
        y -= 42 - 28;
      } else if (isStart == "end" && !isFromBottomToUp) {
        y -= 42 - 28;
      } else if (isStart == "start" && !isFromBottomToUp) {
				y -= 5;
			} else if (isStart == "end" && isFromBottomToUp) {
				y -= -5;
			}
			if (lineNumber == "3a" && isStart == "end") {
				y -= 15;
			} else if (lineNumber == "3a" && isStart == "start") {
				y -= -3;
			}
			if (lineNumber == "3b" && isStart == "end") {
				y -= 15;
			} else if (lineNumber == "3b" && isStart == "start") {
				y -= -3;
			}
			if (lineNumber == "10a" && isStart == "end") {
				y -= 5;
			}
			if (lineNumber == "10b" && isStart == "end") {
				y -= 5;
			}
			let imageObj = new Image();
			let imgSrc = lineType == "a" ? require("../assets/verticalSTSolid.png") : require("../assets/verticalST.png")
			imageObj.src = imgSrc;
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, x - 3, y, 6, 22);
				// ctx.restore();
			};
    },
    //画电子秤
    drawDzc(ctx) {
      let dzc = this.dzc;
      for (const key in dzc) {
        if (dzc.hasOwnProperty(key)) {
          const value = dzc[key];
          let { ssl, ljl } = value;
          const info = getDzcPosition(key);
          let { id, x, y } = info;
          this.drawDzcOne(ctx, x, y, id, ssl, ljl);
          
        }
      }

    },
    drawDzcOne(ctx, x, y, id, ssl, ljl) {
      ctx.save();
      ctx.beginPath();
      ctx.font = '12px Arial';
      ctx.fillStyle = "#000";
      ctx.textAlign = 'start';
      ctx.fillText(`${id}:${ssl}t/h(累计：${ljl}t)`, x, y, 135);
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
					//卸船机
          this.handle_xcj(xcj);
          //三通
          this.handle_st(st);
          //电子秤
          this.handle_dzc(dzc);

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
    handle_st(st) {
      // console.log(pd);
      this.st = st;
      //画三通
      this.drawSTAll(this.ctx);
      //画所有的转运站
		  this.drawTransferStationAll()
    },
    handle_dzc(dzc) {
      this.dzc = dzc;
      //画电子秤
      this.drawDzc(this.ctx);
    },
		handle_pd(pd) {
      // console.log(pd);
      this.pd = pd;
		},
		handle_mc(mc) {
			this.mc = mc;

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
    handleClientWidth(val) {
      // if (val < 900) {
      //   this.unitPageScale = (val / 900).toFixed(3);
      //   this.unitPageScaleTop = (val - 900) / 2;
      // } else if (val >= 900 && val <= 1900) {
      //   this.unitPageScale = 1;
      //   this.unitPageScaleTop = 0;
      // } else {
      //   this.unitPageScale = (val / 1900).toFixed(3);
      //   this.unitPageScaleTop = (val - 900) / 20;
      // }

      if (val < 900) {
        this.setPageScale(val, 900);
      } else if (val >= 900 && val <= 1900) {
        if (this.clientHeight > 700) {
          this.unitPageScale = 1;
        }
      } else {
        this.setPageScale(val, 1900);
      }

    },
    setPageScale(val, baseline) {
      let newPageScale = (val / baseline).toFixed(3);
      // if (this.transformBig && this.unitPageScale < newPageScale ) {
      //   this.unitPageScale = newPageScale;
      // }
      // if (!this.transformBig && this.unitPageScale > newPageScale ) {
      //   this.unitPageScale = newPageScale;
			// }
			this.unitPageScale = newPageScale;
    },
    handleClientHeight(val) {
      // if (val < 700) {
      //   this.unitPageScale = (val / 700).toFixed(3);
      //   this.unitPageScaleTop = (val - 700) / 2;
      // } else if (val >= 700 && val <= 1080) {
      //   this.unitPageScale = 1;
      //   this.unitPageScaleTop = 0;
      // } else {
      //   this.unitPageScale = (val / 1080).toFixed(3);
      //   this.unitPageScaleTop = (val - 700) / 4;
      // }

      let newClientHeight = document.documentElement.clientHeight;
      let baseline = 760;
      // if (newClientHeight > baseline) {
      //   baseline = newClientHeight;
      // }
      if (val < baseline) {
        this.setPageScale(val, baseline);
      } else if (val >= baseline && val <= 1080) {
        if (this.clientWidth >= 900) {
					// this.unitPageScale = 1;
        }
					this.setPageScale(val, 760);
      } else {
          this.setPageScale(val, 760);
      }
    },
    throttle(val, type = "width") {
      if (!this.timer) {
        this.timer = true;
        setTimeout(() => {
          if (type == "width") {
            this.handleClientWidth(val);
          }
          if (type == "height") {
            this.handleClientHeight(val);
          }
          this.timer = false;
        }, 50);
      }
    },
	}
}
</script>
<style lang="scss">
@import "../assets/css/runMap.scss";
</style>



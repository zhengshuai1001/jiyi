<template>
	<div class="run-map-page">
	<div class="canvas-box">
		<canvas id="myCanvas" width="850" height="650"></canvas>
		<div 
			class="lifting-arm-img" 
			:style="{ 
				'left': liftingArmImg[0].left + 'px',
				'top': liftingArmImg[0].top + 'px',
				'transform': 'rotateX(45deg) rotateZ('+liftingArmImg[0].rotation+'deg)',
			}"></div>
	</div>
	</div>
</template>
<script>
export default {
	name: "RunMap",
	data() {
		return {
			ctx: null,
			liftingArmImg: [
				{
					left: 0,
					top: 0,
					rotation: 0,
				},
			]
		}
	},
	mounted() {
		// this.liftingArmImg[0] = {
		// 	left: 100,
		// 	top: 200,
		// 	rotation: 90,
		// }
		this.liftingArmImg[0].left = 100;
		this.liftingArmImg[0].top = 200;
		this.liftingArmImg[0].rotation = 90;

		this.ctx = document.getElementById("myCanvas").getContext("2d");
		this.drawRoundedRect(this.ctx, 20, 140, 107, 360, 40, 10, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 143, 140, 107, 360, 10, 10, true, false, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 310, 140, 105, 358, 10, 10, true, true, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 433, 140, 105, 358, 10, 10, true, true, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 600, 140, 107, 360, 10, 10, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 723, 140, 107, 360, 10, 40, true, false, 2, "#595959", "#959595");

		//绘画煤仓
		this.drawCoalBunker();

		//绘画煤堆
		//测试，先画一个煤堆试试
		this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/1-101.png"), 23, 170, 100, 183.4 );
		this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/1-103.png"), 146, 170, 100, 95.6 );

		this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/2-102.png"), 313, 170, 100, 89.2 );
		this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/2-104.png"), 436, 170, 100, 82 );

		this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/3-201.png"), 603, 170, 100, 206.4 );
		this.drawCoalHeapOne(this.ctx, require("../assets/CoalHeap/3-203.png"), 723, 170, 100, 81.4 );
		
		//画一个斗轮机
		this.drawBucketWheelOne(this.ctx, 130, 201, 45, 0);

	},
	methods: {
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
		drawCoalBunker() {

			let startX = 754.5;
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
					this.drawCoalBunkerOne(this.ctx, startX, starty, [], fontText, "#78a8e8", i);
					startX -= 24;
				}
				startX -= 42;
			}

		},
		//画一个煤仓
		drawCoalBunkerOne(ctx, x, y, mcArray = [], fontText, fontColor, outerIndex) {

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
			ctx.restore();
		},
		//画一个煤堆
		drawCoalHeapOne(ctx, src, x, y, w, h ) {
			let imageObj = new Image();
			imageObj.src = src;
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, x, y, w, h);
				// ctx.restore();
			};
		},
		//画一个斗轮机
		drawBucketWheelOne(ctx, x, end, rotation, status){
			let y = 140 + 360 - (end * 1.2);
			let imageObj = new Image();
			imageObj.src = require("../assets/fuselage.png"); //斗轮机的机身部分
			imageObj.onload = () => {
				// ctx.save();
				ctx.drawImage(imageObj, x, y, 10, 42.7);
				// ctx.restore();

				//画斗轮机的吊臂
				this.drawLiftingArm(x, y, rotation, status);
			};
		},
		//画斗轮机的吊臂
		drawLiftingArm(x, y, rotation, status) {
			// this.liftingArmImg[0] = {
			// 	left: x,
			// 	top: y,
			// 	rotation,
			// }
			// this.liftingArmImg[0].left = x;
			// this.liftingArmImg[0].top = y;
			// this.liftingArmImg[0].rotation = rotation;

			console.log(this.liftingArmImg[0]);
		},
	}
}
</script>
<style lang="scss">
@import "../assets/css/runMap.scss";
</style>



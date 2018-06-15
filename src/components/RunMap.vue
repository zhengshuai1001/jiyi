<template>
	<div class="run-map-page">
	<div class="demo">
		<canvas id="myCanvas" width="850" height="650"></canvas>
	</div>
	</div>
</template>
<script>
export default {
	name: "RunMap",
	data() {
		return {
			ctx: null,
		}
	},
	mounted() {
		this.ctx = document.getElementById("myCanvas").getContext("2d");
		this.drawRoundedRect(this.ctx, 20, 140, 107, 360, 40, 10, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 143, 140, 107, 360, 10, 10, true, false, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 310, 140, 105, 358, 10, 10, true, true, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 433, 140, 105, 358, 10, 10, true, true, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 600, 140, 107, 360, 10, 10, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 723, 140, 107, 360, 10, 40, true, false, 2, "#595959", "#959595");

		//绘画煤仓
		this.drawCoalBunker();

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
			let starty = 44.5;

			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 6; j++) {
					this.drawCoalBunkerOne(this.ctx, startX, starty);
					startX -= 24;
				}
				startX -= 42;
			}

		},
		drawCoalBunkerOne(ctx, x, y, mcArray = []) {

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
			ctx.stroke();
			ctx.restore();
		}
	}
}
</script>
<style lang="scss">
@import "../assets/css/runMap.scss";
</style>



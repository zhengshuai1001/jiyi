<template>
	<div class="run-map-page">
		{{msg}}
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
			msg: "good love 郑国庆的第一个 Vue 多页面开发页面",
			ctx: null,
		}
	},
	mounted() {
		this.ctx = document.getElementById("myCanvas").getContext("2d");
		this.drawRoundedRect(this.ctx, 20, 140, 110, 360, 40, 10, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 140, 140, 110, 360, 10, 10, true, false, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 430, 140, 108, 358, 10, 10, true, true, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 310, 140, 108, 358, 10, 10, true, true, 2, "#595959", "#959595");

		this.drawRoundedRect(this.ctx, 600, 140, 110, 360, 10, 10, true, false, 2, "#595959", "#959595");
		this.drawRoundedRect(this.ctx, 720, 140, 110, 360, 10, 40, true, false, 2, "#595959", "#959595");

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
		}
	}
}
</script>
<style lang="scss">
@import "../assets/css/runMap.scss";
</style>



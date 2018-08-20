<!--<template>
    <div class="first">{{msg}}</div>
</template>-->
<template>
  <!-- <div class="unit-page" :style="{ 'transform': 'scale(' + unitPageScale +')', top: unitPageScaleTop + 'px' }"> -->
    <div class="unit-page" :style="{ 'zoom': unitPageScale }">
    <div class="tab-box">
      <Row :gutter="16">
        <Col span="6">
        <div class="tab-btn" :class="{active: active == 0}" @click="handleTab(0)">1号机组</div>
        </Col>
        <Col span="6">
        <div class="tab-btn" :class="{active: active == 1}" @click="handleTab(1)">2号机组</div>
        </Col>
        <Col span="6">
        <div class="tab-btn" :class="{active: active == 2}" @click="handleTab(2)">3号机组</div>
        </Col>
        <Col span="6">
        <div class="tab-btn" :class="{active: active == 3}" @click="handleTab(3)">4号机组</div>
        </Col>
      </Row>
    </div>
    <div class="main-box">
      <Row>
        <Col span="12">
        <Row>
          <Col span="24">
          <Row class="upper" type="flex" align="middle">
            <Col span="6">
            <div class="left-tag">上仓计划：</div>
            </Col>
            <Col span="18">
            <Row type="flex" justify="space-between">
              <div class="bunker-box">蒙混</div>
              <div class="bunker-box">蒙混</div>
              <div class="bunker-box">神混</div>
            </Row>
            </Col>
          </Row>
          <Row>
            <Col span="6">
            <div class="lalala" style="width:100%;height:1px;"></div>
            </Col>
            <Col span="18">
            <Row type="flex" justify="space-between">

              <div class="bunker-box"  v-for="(item,index) in mcGroupOne" :key ="index">
                <div class="color-box-out">
                  <Row type="flex" class="color-box flex">
                    <div class="color color-0"></div>
                    <div class="color color-1" :style="{'height': item[0].height/16*100 + '%', 'background-color': item[0].color}"></div>
                    <div class="color color-2" :style="{'height': item[1].height/16*100 + '%', 'background-color': item[1].color}"></div>
                  </Row>
                  <img src="../assets/coalBunker.png">
                  <span class="coal-bunker-number">{{ index == 0 ? "A" : null }}{{ index == 1 ? "B" : null }}{{ index == 2 ? "C" : null }}</span>
                </div>
              </div>
            </Row>
            </Col>
          </Row>
          <Row class="middle" type="flex" align="middle">
            <Col span="6">
            <!-- <div class="left-tag">煤种切换：</div> -->
            </Col>
            <Col span="18">
            <Row type="flex" justify="space-between">
              <div class="bunker-box" style="color: #1bc273; font-size: 15px;">45.13</div>
              <div class="bunker-box" style="color: #ff6600; font-size: 15px;">45.13</div>
              <div class="bunker-box" style="color: #ff6600; font-size: 15px;">45.13</div>
            </Row>
            </Col>
          </Row>
          <Row class="lower" type="flex" align="top">
            <Col span="6">
            <div class="left-tag" :style="{'margin-bottom': '10px'}">煤种切换：</div>
            <div class="left-tag">当前煤种：</div>
            </Col>
            <Col span="18" class="canvas-father">
              <Row type="flex" justify="space-between">
                <div class="bunker-box coal-type">
                  <p>5h</p>
                  <p>澳煤</p>
                </div>
                <div class="bunker-box coal-type">
                  <p>5h</p>
                  <p>神混</p>
                </div>
                <div class="bunker-box coal-type">
                  <p>5h</p>
                  <p>神混</p>
                </div>
              </Row>
              <canvas class="canvas-belt" id="canvas-upper" width="385" height="70"></canvas>
              <!-- <canvas class="canvas-belt" id="canvas-upper" width="385" height="70" :style="{ 'zoom': unitPageScale }"></canvas> -->
            </Col>
          </Row>
          </Col>
          <Col span="24">
          <Row class="upper" type="flex" align="middle">
            <Col span="6">
            <div class="left-tag">上仓计划：</div>
            </Col>
            <Col span="18">
            <Row type="flex" justify="space-between">
              <div class="bunker-box">蒙混</div>
              <div class="bunker-box">蒙混</div>
              <div class="bunker-box">神混</div>
            </Row>
            </Col>
          </Row>
          <Row>
            <Col span="6">
            <div class="lalala" style="width:100%;height:1px;"></div>
            </Col>
            <Col span="18">
            <Row type="flex" justify="space-between">

              <div class="bunker-box"  v-for="(item,index) in mcGroupTwo" :key ="index">
                <div class="color-box-out">
                  <Row type="flex" class="color-box flex">
                    <div class="color color-0"></div>
                    <div class="color color-1" :style="{'height': item[0].height/16*100 + '%', 'background-color': item[0].color}"></div>
                    <div class="color color-2" :style="{'height': item[1].height/16*100 + '%', 'background-color': item[1].color}"></div>
                  </Row>
                  <img src="../assets/coalBunker.png">
                  <span class="coal-bunker-number">{{ index == 0 ? "D" : null }}{{ index == 1 ? "E" : null }}{{ index == 2 ? "F" : null }}</span>
                </div>
              </div>

            </Row>
            </Col>
          </Row>
          <Row class="middle" type="flex" align="middle">
            <Col span="6">
            <!-- <div class="left-tag">煤种切换：</div> -->
            </Col>
            <Col span="18">
            <Row type="flex" justify="space-between">
              <div class="bunker-box" style="color: #1bc273; font-size: 15px;">45.13</div>
              <div class="bunker-box" style="color: #ff6600; font-size: 15px;">45.13</div>
              <div class="bunker-box" style="color: #ff6600; font-size: 15px;">45.13</div>
            </Row>
            </Col>
          </Row>
          <Row class="lower" type="flex" align="top">
            <Col span="6">
            <div class="left-tag" :style="{'margin-bottom': '10px'}">煤种切换：</div>
            <div class="left-tag">当前煤种：</div>
            </Col>
            <Col span="18" class="canvas-father">
              <Row type="flex" justify="space-between">
                <div class="bunker-box coal-type">
                  <p>5h</p>
                  <p>澳煤</p>
                </div>
                <div class="bunker-box coal-type">
                  <p>5h</p>
                  <p>神混</p>
                </div>
                <div class="bunker-box coal-type">
                  <p>5h</p>
                  <p>神混</p>
                </div>
              </Row>
              <canvas class="canvas-belt" id="canvas-lower" width="385" height="100"></canvas>
            </Col>
          </Row>
          </Col>
        </Row>
        </Col>
        <Col span="12">
        <!-- <div class="right-img-box"></div> -->
        <Row class="right-img-box" type="flex" justify="space-between">
          <Col span="11">
          <div class="right-img-col one">
            <div class="stove">#1炉</div>
            <p class="stove-txt">600MV</p>
            <p>澳煤：神混=32.68</p>
            <p>Mt=12.1%</p>
            <p>Vd af=37.22%</p>
            <p>Ad=15.63%</p>
            <p>St,d=0.83%</p>
            <p>Qnet,ar=5235dc al/kg</p>
            <p>ST=1450℃/1280℃</p>
          </div>
          </Col>
          <Col span="10">
          <div class="right-img-col two">
            <p>锅炉效率：83.62%</p>
            <p>排烟温度：123℃</p>
            <p>飞灰含碳：0.82%</p>
            <p>炉腔氧量：2.8%</p>
            <p>排烟氧量：3.5%</p>
            <p>燃烧NOx：225mg/m3</p>
            <p>燃烧SO2：1250mg/m3</p>
            <p>烟尘排放：3.5ug/m3</p>
          </div>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>

import axios from "axios";

let Ajax = axios.create({
  baseURL:'https://www.easy-mock.com/mock/5b2bc70743896129857dc8dc/jiyi',
  timeout: 9000,
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
  name: "Unit",
  data() {
    return {
      active: 0,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
      unitPageScale: 1,
      unitPageScaleTop: 0,
      ctx: null,
      ctx2: null,
      offset: 0,
      offset2: 0,
      animationTimer: null,
      pointsA: [ [30, 40], [30, 60], [320, 60], [320, 10], [385, 10] ], //A煤仓的线条连接点
      pointsB: [ [150, 40], [150, 60], [320, 60], [320, 10], [385, 10] ], //B煤仓的线条连接点
      pointsC: [ [270, 40], [270, 60], [320, 60], [320, 10], [385, 10] ], //C煤仓的线条连接点
      pointsD: [ [30, 70], [30, 90], [320, 90], [320, 10], [385, 10] ], //D煤仓的线条连接点
      pointsE: [ [150, 70], [150, 90], [320, 90], [320, 10], [385, 10] ], //E煤仓的线条连接点
      pointsF: [ [270, 70], [270, 90], [320, 90], [320, 10], [385, 10] ], //F煤仓的线条连接点
      // clearRectAVertical: [], //A煤仓运转时虚线运动范围, 垂直区域，这个值实质是canvas在指定区域，擦除之前绘制的所有内容的方法。四个值分别为起点的 x 轴坐标，起点的 y 轴坐标，矩形的宽度和高度
      // clearRectALevel: [],  //水平区域
      // clearRectBVertical: [], //垂直区域
      // clearRectBLevel: [], //水平区域
      // clearRectCVertical: [268,40, 4, 20],  //垂直区域
      // clearRectCLevel: [268,58, 53, 60],  //水平区域
      // clearRectTail: [320,0, 385, 60], //尾巴的范围,即最后连接火炉，向上转弯的那块区域
      clearRectA: [ [28,40, 4, 20], [28,58, 293, 4], [318,0, 385, 60] ],
      clearRectB: [ [148,40, 4, 20], [148,58, 173, 4], [318,0, 385, 60] ],
      clearRectC: [ [268,40, 4, 20], [268,58, 53, 4], [318,0, 385, 60] ],
      clearRectD: [ [28,70, 4, 20], [28,88, 293, 4], [318,0, 385, 90] ],
      clearRectE: [ [148,70, 4, 20], [148,88, 173, 4], [318,0, 385, 90] ],
      clearRectF: [ [268,70, 4, 20], [268,88, 53, 4], [318,0, 385, 90] ],
      isWorkingA: true, //A煤仓的状态，是否在运动
      isWorkingB: false,
      isWorkingC: false,
      isWorkingD: false,
      isWorkingE: true,
      isWorkingF: true,
      mc: [], //煤仓
    };
  },
  beforeMount() {
    window.onresize = () => {
      this.clientWidth = document.documentElement.clientWidth;
      this.clientHeight = document.documentElement.clientHeight;
    };
    this.handleClientWidth(this.clientWidth);
    this.handleClientHeight(this.clientHeight);
  },
  computed: {
    mcGroupOne() {
      let mc = this.mc;
      let active = this.active * 6;
      return mc.slice(active, active + 3)
    },
    mcGroupTwo() {
      let mc = this.mc;
      let active = this.active * 6;
      return mc.slice(active + 3, active + 6)
    }
  },
  mounted() {
    // window.onresize = () => {
    //   this.clientWidth = document.documentElement.clientWidth;
    //   this.clientHeight = document.documentElement.clientHeight;
    // }
    this.ctx = document.getElementById("canvas-upper").getContext("2d"); 
    this.ctx2 = document.getElementById("canvas-lower").getContext("2d"); 
    this.animation();

    //发送ajax请求
		this.ajaxGetData();
  },
  watch: {
    clientWidth(val) {
      this.throttle(val, "width");
    },
    clientHeight(val) {
      this.throttle(val, "height");
    }
  },
  methods: {
    handleTab(index) {
      this.active = index;
    },
    handleClientWidth(val) {
      // console.log(val, (val / 600).toFixed(3));
      if (val < 800) {
        this.unitPageScale = (val / 800).toFixed(3);
        this.unitPageScaleTop = (val - 800) / 2;
      } else if (val >= 800 && val <= 1900) {
        this.unitPageScale = 1;
        this.unitPageScaleTop = 0;
      } else {
        this.unitPageScale = (val / 1900).toFixed(3);
        this.unitPageScaleTop = (val - 800) / 20;
      }
    },
    handleClientHeight(val) {
      // console.log(val, (val / 600).toFixed(3));
      if (val < 600) {
        this.unitPageScale = (val / 600).toFixed(3);
        this.unitPageScaleTop = (val - 600) / 2;
      } else if (val >= 600 && val <= 1080) {
        this.unitPageScale = 1;
        this.unitPageScaleTop = 0;
      } else {
        this.unitPageScale = (val / 1080).toFixed(3);
        this.unitPageScaleTop = (val - 600) / 4;
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
        }, 100);
      }
    },
    drawCanvas() {
      this.drawDashedLine(this.ctx, this.pointsA, this.isWorkingA ? this.clearRectA : null);
      this.drawDashedLine(this.ctx, this.pointsB, this.isWorkingB ? this.clearRectB : null);
      this.drawDashedLine(this.ctx, this.pointsC, this.isWorkingC ? this.clearRectC : null);

      this.drawDashedLine(this.ctx2, this.pointsD, this.isWorkingD ? this.clearRectD : null);
      this.drawDashedLine(this.ctx2, this.pointsE, this.isWorkingE ? this.clearRectE : null);
      this.drawDashedLine(this.ctx2, this.pointsF, this.isWorkingF ? this.clearRectF : null);
    },
    animation() {
      cancelAnimationFrame(this.animationTimer);
      let then = this;
      this.animationTimer = requestAnimationFrame(function fn() {
        then.offset++;
        if (then.offset > 16) {
          then.offset = 0;
        }
        then.drawCanvas();
        then.animationTimer = requestAnimationFrame(fn);
      });
    },
    // 绘制虚线
    // @param {Array} points - 二维数组，表示所有的坐标点,第一个点默认为起点
    // @param {Array} clearArea - 二维数组, 第一维长度为3, 第二维长度为4,表示煤仓运转时虚线运动范围,擦除之前绘制的所有内容的方法
    // @param {Array} setLineDash - 点划线间距
    // @param {Number} lineWidth - 线宽
    // @param {String} color - 线段颜色
    drawDashedLine(ctx, points, clearArea = null, setLineDash = [4], lineWidth = 2, color = "#2d6284") {
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
        ctx.clearRect(clearArea[0][0],clearArea[0][1],clearArea[0][2],clearArea[0][3]);
        ctx.clearRect(clearArea[1][0],clearArea[1][1],clearArea[1][2],clearArea[1][3]);
        ctx.clearRect(clearArea[2][0],clearArea[2][1],clearArea[2][2],clearArea[2][3]);  
      }
      ctx.setLineDash(setLineDash);
      ctx.lineDashOffset = -this.offset; 
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
    ajaxGetData() {
      Ajax.get("/runMap").then(res => {
				// console.log(res.data);
				if (res.data) {
					let { mc } = res.data;
					//煤仓
					this.handle_mc(mc);

				}
			}).catch(error => {
				//网络请求错误
				console.log(error);
			});
    },
    handle_mc(mc) {
      this.mc = mc;
    }
  }
};
</script>
<style lang="scss" >
  @import "../assets/css/unit.scss";
</style>



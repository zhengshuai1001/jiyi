drawBelt(ctx) {
  ctx.clearRect(0, 0, 850, 650);
  this.drawDashedLine(ctx, [[710, 7], [30, 7]]); // 最顶层的皮带, 1
  this.drawDashedLine(ctx, [[710, 16], [30, 16]]); // 从上往下第二个的皮带, 2

  this.drawDashedLine(ctx, [[710, 120], [710, 7]], "#22AC38"); // 3,左
  this.drawDashedLine(ctx, [[720, 120], [720, 7]]); // 4,右

  this.drawDashedLine(ctx, [[710, 124], [130, 124]], "#22AC38"); // 5, 上
  this.drawDashedLine(ctx, [[710, 132], [420, 132]], "#22AC38"); // 6， 下

  this.drawDashedLine(ctx, [[135, 510], [135, 120]], "#FF423C", true); //7 左
  this.drawDashedLine(ctx, [[425, 510], [425, 120]], "#22AC38"); //8 中
  this.drawDashedLine(ctx, [[715, 510], [715, 120]], "#22AC38"); //9 右



  this.drawDashedLine(ctx, [[710, 514], [130, 514]]); // 5, 上
  this.drawDashedLine(ctx, [[710, 522], [130, 522]], "#22AC38"); // 6， 下

  this.drawDashedLine(ctx, [[710, 545], [710, 522]], "#22AC38"); // 3,左
  this.drawDashedLine(ctx, [[720, 545], [720, 522]]); // 4,右

  this.drawDashedLine(ctx, [[130, 570], [130, 537], [710, 537]], "#22AC38"); // 5, 上
  this.drawDashedLine(ctx, [[138, 570], [138, 545], [710, 545]]); // 6， 下

  this.drawDashedLine(ctx, [[710, 564], [130, 564]]); // 5, 上
  this.drawDashedLine(ctx, [[710, 572], [130, 572]], "#22AC38"); // 6， 下
},
drawBelt(ctx) {
  ctx.clearRect(0, 0, 850, 650);
  this.drawDashedLine(ctx, [[710, 7], [30, 7]], "#FF423C", true); // 最顶层的皮带, 1
  this.drawDashedLine(ctx, [[710, 16], [30, 16]]); // 从上往下第二个的皮带, 2

  this.drawDashedLine(ctx, [[710, 120], [710, 7]], "#22AC38"); // 3,左
  this.drawDashedLine(ctx, [[720, 120], [720, 7]], "#FF423C", true); // 4,右

  this.drawDashedLine(ctx, [[130, 122], [710, 122]], "#FF423C", true); // 5, 上
  this.drawDashedLine(ctx, [[420, 130], [710, 130]], "#22AC38"); // 6， 下

  this.drawDashedLine(ctx, [[135, 510], [135, 120]], "#FF423C", true); //7 左
  this.drawDashedLine(ctx, [[425, 510], [425, 120]], "#22AC38"); //8 中
  this.drawDashedLine(ctx, [[715, 510], [715, 120]], "#22AC38"); //9 右



  this.drawDashedLine(ctx, [[710, 502], [130, 502]], "#FF423C", true); // 5, 上
  this.drawDashedLine(ctx, [[710, 510], [130, 510]], "#22AC38"); // 6， 下

  this.drawDashedLine(ctx, [[710, 525], [710, 502]], "#22AC38"); // 3,左
  this.drawDashedLine(ctx, [[720, 525], [720, 502]], "#FF423C", true); // 4,右

  this.drawDashedLine(ctx, [[130, 550], [130, 524], [710, 524]], "#22AC38"); // 5, 上
  this.drawDashedLine(ctx, [[138, 550], [138, 532], [710, 532]], "#FF423C", true); // 6， 下

  this.drawDashedLine(ctx, [[710, 551], [130, 551]], "#FF423C", true); // 5, 上
  this.drawDashedLine(ctx, [[710, 559], [130, 559]], "#22AC38"); // 6， 下
},
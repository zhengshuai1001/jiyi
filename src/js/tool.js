//皮带定位数据
let pdPositionJson = {
    "11a1": [[710, 7], [65, 7]],
    "11b1": [[710, 16], [65, 16]],
    "11a2": [[-1, 7], [65, 7]],
    "11b2": [[-1, 16], [65, 16]],
    "10b": [[710, 80], [710, 7]],
    "10a": [[720, 80], [720, 7]],
    "9b": [[710, 120], [710, 80]],
    "9a": [[720, 120], [720, 80]],
    "7": [[130, 128], [420, 128]],
    "8b": [[420, 124], [710, 124]],
    "8a": [[420, 132], [710, 132]],
    "6c2": [[135, -1], [135, 120]],
    "6b2": [[425, -1], [425, 120]],
    "6a2": [[715, -1], [715, 120]],
    "6c1": [[135, 550], [135, -1]],
    "6b1": [[425, 550], [425, -1]],
    "6a1": [[715, 550], [715, -1]],
    "4a": [[710, 554], [425, 554]],
    "5a": [[425, 554], [130, 554]],
    "4b": [[710, 562], [425, 562]],
    "5b": [[425, 562], [130, 562]],
    "3b": [[710, 595], [710, 562]],
    "3a": [[720, 595], [720, 562]],
    "2b": [[130, 630], [130, 597], [710, 597]],
    "2a": [[138, 630], [138, 605], [710, 605]],
    "1a": [[470, 634], [130, 634]],
    "1b": [[470, 642], [130, 642]],
    "0a": [[710, 634], [470, 634]],
    "0b": [[710, 642], [470, 642]]
};

//获取皮带的位置坐标， 有几根皮带起始位置是动态的
export function getPdPosition(pdID, self) {
  let PdPosition = pdPositionJson[pdID] || [[], []];
  switch (pdID) {
    case "11a2":
      PdPosition[0][0] = self.lmqStartXOne;
      break;
    case "11b2":
      PdPosition[0][0] = self.lmqStartXTwo;
      break;
    case "6c2":
      PdPosition[0][1] = self.dljPositionYThree;
      break;
    case "6b2":
      PdPosition[0][1] = self.dljPositionYTwo;
      break;
    case "6a2":
      PdPosition[0][1] = self.dljPositionYOne;
      break;
    case "6c1":
      PdPosition[1][1] = self.dljPositionYThree;
      break;
    case "6b1":
      PdPosition[1][1] = self.dljPositionYTwo;
      break;
    case "6a1":
      PdPosition[1][1] = self.dljPositionYOne;
      break;
    default:
      break;
  }
  return PdPosition
}

//根据皮带状态，判断皮带应该显示什么颜色，是否是向前滚动的虚线
export function getPdState(status) {
  let PdStatus = ["#22AC38", false]; //默认状态是0, 停止， 绿色实线
  switch (status) {
    case 1:
      PdStatus = ["#FF423C", true] //1， 运动， 红色虚线
      break;
    case 2:
      PdStatus = ["#FFD700", false] //2, 检修， 黄色实线
      break;
  }
  return PdStatus;
}

let stStatus = {
  "2a": ["","a"],
  "2b": ["","b"],
  "3a": ["","a"],
  "3b": ["","b"],
  "4a": ["","a"],
  "4b": ["","b"],
  "6a2": ["","a"],
  "6b2": ["","b"],
  "7": ["","a"],
  "8a": ["","a"],
  "8b": ["","b"],
  "10a": ["","a"],
  "10b": ["","b"],
  "6a1": ["",""],
  "6b1": ["",""],
  "5a": ["",""],
  "5b": ["",""],
  "9a": ["",""],
  "9b": ["",""],
  "11a1": ["",""],
  "11b1": ["",""]
}

function setSTStatus(key, value) {
  switch (key) {
    case "2a":
      value == "a" ? stStatus["3a"][0] = "a" : stStatus["3b"][0] = "a"
      break;
    case "2b":
      value == "a" ? stStatus["3a"][0] = "b" : stStatus["3b"][0] = "b"
      break;
    case "3a":
      value == "a" ? stStatus["6a1"][0] = "a" : stStatus["4a"][0] = "a"
      break;
    case "3b":
      value == "a" ? stStatus["6a1"][0] = "b" : stStatus["4b"][0] = "b"
      break;
    case "4a":
      value == "a" ? stStatus["6b1"][0] = "a" : stStatus["5a"][0] = "a"
      break;
    case "4b":
      value == "a" ? stStatus["6b1"][0] = "b" : stStatus["5b"][0] = "b"
      break;
    case "6a2":
      value == "a" ? stStatus["9a"][0] = "a" : stStatus["9b"][0] = "a"
      break;
    case "6b2":
      value == "a" ? stStatus["8a"][0] = "b" : stStatus["8b"][0] = "b"
      break;
    case "7":
      value == "a" ? stStatus["8a"][0] = "a" : stStatus["8b"][0] = "a"
      break;
    case "8a":
      value == "a" ? stStatus["9a"][0] = "a" : stStatus["9b"][0] = "a"
      break;
    case "8b":
      value == "a" ? stStatus["9a"][0] = "b" : stStatus["9b"][0] = "b"
      break;
    case "10a":
      value == "a" ? stStatus["11a1"][0] = "a" : stStatus["11b1"][0] = "a"
      break;
    case "10b":
      value == "a" ? stStatus["11a1"][0] = "b" : stStatus["11b1"][0] = "b"
      break;
    default:
      break;
  }
}

export function setSTStatusAll(stData = {}) {
  for (const key in stData) {
    if (stData.hasOwnProperty(key)) {
      const value = stData[key];
      setSTStatus(key, value);
    }
  }
  return stStatus
}

export function getDzcPosition(DzcID) {
  let info = {
    id: '',
    x: '',
    y: '',
  }
  switch (DzcID) {
    case '2b':
      info.id = '2B';
      info.x = 750;
      info.y = 594 - 7 + 5;
      break;
    case '3a':
      info.id = '3A';
      info.x = 750;
      info.y = 618 - 7;
      break;
    case '3b':
      info.id = '3B';
      info.x = 750;
      info.y = 642 - 7 - 5;
      break;
    case '10a':
      info.id = '10A';
      info.x = 750;
      info.y = 64 - 10 + 8;
      break;
    case '10b':
      info.id = '10B';
      info.x = 750;
      info.y = 100 - 10 - 8;
      break;
  
    default:
      break;
  }
  return info
}
// '''
// # === 思路 ===
// # 核心：每次落稳之后截图，根据截图算出棋子的坐标和下一个块顶面的中点坐标，
// #      根据两个点的距离乘以一个时间系数获得长按的时间
// # 识别棋子：靠棋子的颜色来识别位置，通过截图发现最下面一行大概是一条直线，就从上往下一行一行遍历，
// #      比较颜色（颜色用了一个区间来比较）找到最下面的那一行的所有点，然后求个中点，
// #      求好之后再让 Y 轴坐标减小棋子底盘的一半高度从而得到中心点的坐标
// # 识别棋盘：靠底色和方块的色差来做，从分数之下的位置开始，一行一行扫描，由于圆形的块最顶上是一条线，
// #      方形的上面大概是一个点，所以就用类似识别棋子的做法多识别了几个点求中点，
// #      这时候得到了块中点的 X 轴坐标，这时候假设现在棋子在当前块的中心，
// #      根据一个通过截图获取的固定的角度来推出中点的 Y 坐标
// # 最后：根据两点的坐标算距离乘以系数来获取长按时间（似乎可以直接用 X 轴距离）
// '''

// toastLog(app.versionCode)

// 按压时间
function pressCompat (x, y, duration) {
  if (device.sdkInt >= 24) { // 安卓系统API版本。例如安卓4.4的sdkInt为19。
    press(x, y, duration)
  } else {
    Swipe(x, y, x, y, duration)
  }
}

// 找到人物脚部中点坐标
function findPersonPosition (img) {
  // 人物的颜色：#433f5a,    autojs截图蓝色部分，#05a9f1
  const pos = images.findColor(img, '#433f5a', { // 在图片a里找这个颜色
    // region: [100, 510, 979, 1090], //屏幕区域范围
    threshold: 4
  })
  if (!pos) { // 如果没找到返回null,不再往下执行
    return null
  }
  pos.x = pos.x - 3 // 执行到这里说明找到了，x加-3得到人头棋子顶部的中心位置坐标
  pos.y = pos.y + 185 // 找的颜色是人头棋子的头顶坐标y加185得到人头棋子脚部坐标
  console.log('找到人物脚部中点坐标=', pos)
  return pos // 返回人头棋子的坐标
}

// 比色函数，比色误差为第10行定义的
function abs (a7, a8) {
  const awc = 10
  if (Math.abs(colors.red(a7) - colors.red(a8)) < awc && Math.abs(colors.green(a7) - colors.green(a8)) < awc && Math.abs(colors.blue(a7) - colors.blue(a8)) < awc) {
    return true
  } else {
    return false
  }
}

// 找下个位置图块的坐标
function findNextDivPosition (img, personPosition) {
  // 人物棋子所在方块中心坐标和下个方块中心坐标是对称的，对称点就是这个，多次调试测出
  const divX = device.width - personPosition.x // 块的顶点坐标x
  const divY = device.height - personPosition.y // 块的顶点坐标y
  virtualPerson.setPosition(divX - 5, divY - 5)
  return {
    x: divX, // 找下个图块顶点x坐标,5是后来调试发现的误差加上去的
    y: divY
  }
}

function jump () {
  // 截图
  const imgObj = images.captureScreen()
  // console.log(imgObj)
  // 判断图片是否加载成功
  if (!imgObj) {
    throw Error('没有图片')
  }
  const personPosition = findPersonPosition(imgObj) // 找人物棋子坐标
  if (!personPosition) {
    throw Error('找不到人物坐标')
  }
  const DivTopPosition = findNextDivPosition(imgObj, personPosition)
  console.log('找到下一个块的顶点坐标x=', DivTopPosition)
  const disX = Math.abs(DivTopPosition.x - personPosition.x) // 计算出x的距离
  const disY = Math.abs(DivTopPosition.y - personPosition.y)

  const dis2point = Math.sqrt((disX * disX) + (disY * disY))
  const timeRatio = 1.31
  const time = dis2point * timeRatio // 计算出x比例下的距离并乘以时间系数得到精确的点击按压时间

  const pressX = random(450, 500)
  const pressY = random(450, 500)
  pressCompat(pressX, pressY, time) // 随便找一点可以操作的点进行精确时间点击
  virtualPerson.setPosition(-1000, -1000)
  const ran = random(1000, 1500)
  sleep(ran) // 延时越长越稳定//点击完延时0.x秒，隐藏悬浮窗，避免挡截图
}

const virtualPerson = floaty.window(
  <frame h="10" w="10">
    <button id="action" bg="#ff00cc">记点</button>
  </frame>
)
virtualPerson.setPosition(-1000, -1000) // 建立悬浮窗并隐藏

function main () {
  auto()
  images.requestScreenCapture()

  console.show()
  // console.log('设备宽度：', device.width)//1080
  // console.log('设备高度：', device.height)//2040
  // console.setSize(1080, 100)
  console.setPosition(0, 1500)

  let timer = null
  try {
    // setInterval, setTimeout
    timer = setInterval(() => {
      jump()
    }, 2000)
  } catch (error) {
    console.log('发生错误，停止程序=', error)
    clearInterval(timer)
  }
}
main()

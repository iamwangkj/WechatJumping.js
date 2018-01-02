# WechatJumping.js
JavaScript版本微信跳一跳"AI"脚本 可以在安卓设备上运行。

**注意，需要安卓7.0以上或者有root权限的设备才能运行本脚本**

## v2脚本
感谢唐嫣(QQ:3194096648)提供的v2版本，更快更准确，同时跳过了微信的作弊检测（但没有跳过高分检测），下载：https://raw.githubusercontent.com/hyb1996/WechatJumping.js/master/WechatJumpingV2.js

v2脚本的使用方法gif图：
![image](https://github.com/hyb1996/WechatJumping.js/blob/master/v2-preview.gif)

## 使用方法
1. 下载脚本WechatJumpingAI.js并安装软件Auto.js，使用Auto.js打开或导入该脚本文件
2. 打开微信跳一跳界面，切回Auto.js，运行脚本（可能需要根据分辨率调整系数），回到微信跳一跳界面
3. 第一次运行脚本时可能会弹出需要打开无障碍服务的请求并跳转到权限申请界面，此时需要在该界面的无障碍权限应用列表中中找到Auto.js并开启权限，并重新运行脚本；同时会弹出请求屏幕截图的权限申请，此时请点击"总是允许"并同意权限
4. 现在可以愉快地刷分啦~如果因算法问题导致游戏失败，脚本会自动重新开始游戏；一旦退出微信界面，脚本会自动停止。

系数的调整是，如果是720p分辨率建议为2.099，1080p则为1.392，2k屏幕则为1.045；如果发现总是跳的太远则调小，反之调大。

## 算法与原理

本脚本由wangshub的python代码修改而来，参见https://github.com/wangshub/wechat_jump_game

1. 使用opencv实现的快速找色函数找出并计算棋子位置。具体为先根据棋子颜色找出棋子顶部位置，再遍历顶部这一行的像素找出顶部的中点位置，偏移得到棋子底部中点位置。
2. 使用项目wangshub/wechat_jump_game的算法缓慢找出并计算跳跃目标的位置。
3. 根据跳跃距离乘以系数计算按压时间并按压

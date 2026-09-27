# 谢启鸿高等代数第9章 · 内积空间

本人一直对谢帅高代第9章中揭示的优美结构十分感兴趣，觉得有很多值得深挖的东西，但是总是容易忘记或者说没有时间整理。如今借助硅基助手做了一个基于视频板书整理的网页，感兴趣的同侪可以一起参考学习。

[在线阅读](https://gary-cf.github.io/xie-qihong-ch09-book/) · [全章讲义](https://gary-cf.github.io/xie-qihong-ch09-book/book.html) · [总结与速查](https://gary-cf.github.io/xie-qihong-ch09-book/book.html#summary)

## 内容

按第9章的正式节序，将课程整理为可连续阅读的图文讲义，保留概念引入、证明路线、例子和几何解释，并附集中总结与核心 Cheatsheet。

- 9.1 内积空间的概念
- 9.2 内积的表示和正交基
- 9.3 伴随
- 9.4 内积空间的同构、正交变换和酉变换
- 9.5 自伴随算子
- 9.6 复正规算子
- 9.7 实正规矩阵
- 9.8 谱分解与极分解
- 9.9 奇异值分解
- 9.10 最小二乘解
- 第9章总结与核心 Cheatsheet

网页支持中文搜索、数学公式、板书放大、手机阅读和打印。公式、字体及核心资源随构建产物提供，也可离线阅读。

## 本地运行

需要 Node.js 18 或更高版本及 npm。在项目根目录运行：

~~~bash
npm ci
npm run build
npm run check
npm run preview
~~~

打开 http://localhost:4173/ 。其中 localhost 是你自己电脑上的地址；按 Ctrl+C 停止预览服务。

构建产物位于 dist 目录。也可直接用浏览器打开本机的 dist/index.html 或 dist/book.html。离线复制时保留整个 dist 目录。

## 修改内容

| 文件 | 用途 |
|---|---|
| content/09-01.md 至 content/09-10.md | 各节正文、公式、图注 |
| content/10-summary.md | 总结与 Cheatsheet |
| assets/figures/ | 入选板书图片 |
| web/style.css | 字号、颜色、间距及响应式布局 |
| web/app.js | 搜索与图片放大交互 |
| scripts/build.mjs | 首页、导航与静态构建 |

修改源文件后，重新运行 npm run build，再刷新页面。dist 是自动生成的目录，直接修改其中的文件会在下一次构建时被覆盖。

正文数学使用行内公式 \(...\) 和独立公式 \[...\]，采用内积第一变量线性的约定。修改公式时请留意实、复数域及相关定理条件。

## 一起完善

欢迎指出数学错误、转录偏差、表述不清或阅读体验问题。反馈时尽量注明节号、原文位置与修改理由；涉及课程内容时，可附原视频位置或板书依据。

本讲义借助 AI 整理，虽已进行逐节核对，仍可能存在遗漏或错误，请结合原课程辨析使用。编者补充与纠错已在相应位置标注。

## 来源与说明

- [谢启鸿老师的 B 站课程视频](https://www.bilibili.com/video/BV1mJ411r7ZB/)：本项目对应 P97–P114。
- [官方教材介绍](https://www.cnblogs.com/torsor/p/16843108.html)
- [官方课程与资料](https://www.cnblogs.com/torsor/p/4731153.html)
- [图文整理参考项目 videobook](https://github.com/Luke-Evan/videobook)

本网页仅供学习参考。课程、原板书与截图的权利归原权利人；网站实现与构建代码采用 [MIT 许可证](LICENSE)，课程图文内容不包含在此授权范围内，详见 [来源与许可说明](NOTICE.md)。KaTeX 等第三方组件遵循各自许可证。

编辑目录、来源定位、数学核对与本地复验方法见 [维护说明](docs/maintenance.md)。

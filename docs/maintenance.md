# 维护与部署

## 本地修改

Node.js 18 或更高版本可构建；GitHub Actions 使用 Node.js 22。

~~~bash
npm ci
npm run build
npm run check
npm run preview
~~~

正文在 content/ 中，首页和导航由 scripts/build.mjs 生成，样式在 web/style.css，交互在 web/app.js。不要直接修改 dist；构建会覆盖它。

新增图片时同步更新 assets/figure-dimensions.json 的宽高，保留来源图注。编辑正文请保持标题锚点和来源注记，并同步修改附录中的回链。

## 来源与数学约定

- [目录与课程映射](../editorial/toc-mapping.md)
- [符号约定](../editorial/notation.md)
- [已订正问题](../editorial/corrections.md)
- [来源精度边界](../editorial/unresolved.md)
- [数学核对清单](../editorial/math-checklist.md)

内积第一变量线性、第二变量共轭线性。标题锚点以及 source 注记会在构建时生成目录和来源折叠区。editorial/source-ranges.json 为原始字幕段落对应的范围定位，不是逐字视频同步保证。

完整原始转录与全量图片筛选记录不在公开仓库中。修改课程实质内容应以原视频、可核验的板书或数学推导为依据，不以自动转录替代判断。

## 验证

~~~bash
npm run check
python3 scripts/math-check.py
~~~

数学脚本复算部分例题及分解性质，不替代逐节证明检查。运行结果写入被Git忽略的 editorial 目录。

浏览器复验需先在另一个终端启动 npm run preview：

~~~bash
PLAYWRIGHT_BROWSERS_PATH=.browsers npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=.browsers node scripts/browser-check.mjs
~~~

脚本检查桌面、手机、中文搜索、放大返回、打印样式、离线文件打开和子路径，并临时启动4174端口服务。Linux如缺系统库，可按Playwright提示安装。

## GitHub Pages

仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。

推送 main 会自动安装锁定依赖、构建、检查并部署 dist；Pull Request 只执行构建检查，不部署。工作流为 .github/workflows/pages.yml。网站资源采用相对路径，可使用仓库名作为 URL 前缀。

本地模拟子路径：

~~~bash
BASE_PATH=/course/ch09 PORT=4174 npm run preview
~~~

访问 http://localhost:4174/course/ch09/ 。离线阅读需复制整个 dist 目录。

## 授权

代码 MIT 与课程图文内容的权利范围分开，详见 [NOTICE](../NOTICE.md)。

# SE2025-T1
我创建的文字分词处理平台是一个基于纯前端Web技术开发的在线中文文本处理工具，主要采用HTML5、CSS3和原生JavaScript构建。我的任务主要是前端页面框架的设计和功能实现。本网站平台界面设计简洁直观，包含了顶部导航栏、侧边功能菜单和主操作区域三大部分。

文件结构
project/
├── index.html          #主页面结构
├── style.css           #样式定义
├── script.js           #业务逻辑
└── lib/                #第三方库
    └── fontawesome/    # 图标库

平台核心功能包括自动标点处理和自动分词两大模块。自动标点功能能够智能识别文本语义并为无标点文字添加现代标点符号；而自动分词功能能够通过算法将连续的中文字符串切分为有意义的词汇单元，词与词之间以空格清晰分隔，为后续的文本分析和自然语言处理提供基础支持。这两个功能主要面对的是古籍文献的分词和标点，同时也能很好地处理现代文字。

两个模块布局类似，都有输入区域、结果展示区域、清空按钮以及示例文本展示按钮，结果显示后可以选择保存结果或者下载结果。除此以外平台还提供了其他辅助功能，包括文本保存管理、处理结果下载导出、使用帮助说明和常见问题解答等。文本保存中的内容只能是保存的该次结果而不能存储多次结果；文本下载则是可以存入多次文本分词记录并且有外部导出作用。

所有操作均在用户本地浏览器中完成，确保数据处理的安全性和隐私性，同时支持响应式设计，能够在桌面电脑、平板和手机等多种设备上流畅使用，为用户提供便捷高效的中文文本处理体验。

各模块功能与主要函数
1. 初始化模块
功能：页面加载时的初始设置和事件绑定
initTextAreaCounter() - 初始化标点文本区域字数统计
initSegmentationTextAreaCounter() - 初始化分词文本区域字数统计
initNavigationLinks() - 绑定导航链接点击事件
initEventListeners() - 初始化其他事件监听器

2. 页面管理模块
功能：控制页面显示和导航状态
showPage(pageId) - 显示指定页面
updateActiveState(activeLink) - 更新导航激活状态

3. 自动标点处理模块
功能：为无标点文本添加现代标点符号，主要面向古籍文献
processText() - 标点处理主函数
addModernPunctuation(text) - 标点添加核心算法
displayPunctuationResult(resultText) - 显示标点结果
loadExamples() - 加载标点示例文本
clearText() - 清空标点文本区域

4. 自动分词处理模块
功能：将中文文本分割为有意义的词语，词与词之间以空格分隔
processSegmentation() - 分词处理主函数
simpleChineseSegment(text) - 分词核心算法
displaySegmentationResult(resultText, wordCount) - 显示分词结果
loadSegmentationExamples() - 加载分词示例文本
clearSegmentationText() - 清空分词文本区域

5. 数据管理模块
功能：处理结果的保存和下载管理
uploadText() - 保存标点处理结果（单次存储）
uploadSegmentationText() - 保存分词处理结果（单次存储）
downloadResult() - 下载标点结果（多次记录）
downloadSegmentationResult() - 下载分词结果（多次记录）
exportText() - 导出标点文本文件
exportSegmentationText() - 导出分词文本文件

因为主要是前端页面设计，所以关于文本分词、标点标注功能以及文本导出功能使用的是原生JavaScript实现的基础算法，如果要实现更准确和完整的分词标点功能，还需要引入专业的外部自然语言处理库。

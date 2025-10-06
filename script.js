let uploadedText = '';
let downloadedText = '';
let currentPage = 'auto-punctuation';

document.addEventListener('DOMContentLoaded', function() {
    console.log('智能标注平台初始化完成');
    initTextAreaCounter();
    initSegmentationTextAreaCounter();
    initNavigationLinks();
    initEventListeners();
});

/*初始化自动标点文本区域字数统计功能*/
function initTextAreaCounter() {
    const textArea = document.getElementById('input-text');
    const wordCount = document.getElementById('word-count');
    
    if (!textArea || !wordCount) return;
    
    //监听文本输入事件
    textArea.addEventListener('input', function() {
        const count = this.value.length;
        wordCount.textContent = `当前字数：${count}/800`;
        
        //如果超过限制，改变颜色提示
        if (count > 800) {
            wordCount.style.color = 'red';
        } else {
            wordCount.style.color = '#777';
        }
    });
}

/*初始化自动分词文本区域字数统计功能*/
function initSegmentationTextAreaCounter() {
    const textArea = document.getElementById('segmentation-text');
    const wordCount = document.getElementById('segmentation-word-count');
    
    if (!textArea || !wordCount) return;
    textArea.addEventListener('input', function() {
        const count = this.value.length;
        wordCount.textContent = `当前字数：${count}/800`;

        if (count > 800) {
            wordCount.style.color = 'red';
        } else {
            wordCount.style.color = '#777';
        }
    });
}

/*初始化导航链接点击事件*/
function initNavigationLinks() {
    //为所有导航链接添加点击事件
    document.querySelectorAll('.nav-links a, .sidebar-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            updateActiveState(this);
        });
    });
}

/**
 * 更新导航活动状态
 * @param {Element} activeLink
 */
function updateActiveState(activeLink) {
    document.querySelectorAll('.nav-links a, .sidebar-links a').forEach(item => {
        item.classList.remove('active');
    });
    activeLink.classList.add('active');
    const pageId = activeLink.getAttribute('data-page');
    document.querySelectorAll(`[data-page="${pageId}"]`).forEach(item => {
        item.classList.add('active');
    });
}

/*初始化其他事件监听器*/
function initEventListeners() {
    console.log('事件监听器初始化完成');
}

/**
 * 显示指定页面部分
 * @param {string} pageId
 */
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentPage = pageId;
    } else {
        document.querySelector('.page-section').classList.add('active');
        currentPage = 'auto-punctuation';
    }
}

/**
 * 显示功能提示
 * @param {string} functionName 
 */
function showFunction(functionName) {
    alert(`您点击了 ${functionName} 功能`);
}

/*加载自动标点示例文本*/
function loadExamples() {
    const examples = [
        "孟子见梁惠王王曰叟不远千里而来亦将有以利吾国乎孟子对曰王何必曰利亦有仁义而已矣",
        "大学之道在明明德在亲民在止于至善知止而后有定定而后能静静而后能安安而后能虑虑而后能得",
        "子曰学而时习之不亦说乎有朋自远方来不亦乐乎人不知而不愠不亦君子乎",
        "北冥有鱼其名为鲲鲲之大不知其几千里也化而为鸟其名为鹏鹏之背不知其几千里也怒而飞其翼若垂天之云"
    ];
    //随机选择一个示例
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    document.getElementById('input-text').value = randomExample;
    //更新字数统计
    const wordCount = document.getElementById('word-count');
    if (wordCount) {
        wordCount.textContent = `当前字数：${randomExample.length}/800`;
    }
    processText();
}

/*加载自动分词示例文本*/
function loadSegmentationExamples() {
    const examples = [
        "自然语言处理是人工智能领域中的一个重要方向",
        "深度学习技术在计算机视觉和语音识别方面取得了显著成果",
        "智能文字标注平台提供自动分词和标点功能帮助用户处理文本",
    ];
    //随机选择一个示例
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    document.getElementById('segmentation-text').value = randomExample;
    
    //更新字数统计
    const wordCount = document.getElementById('segmentation-word-count');
    if (wordCount) {
        wordCount.textContent = `当前字数：${randomExample.length}/800`;
    }
    processSegmentation();
}

/*自动标点功能 */
function processText() {
    const inputText = document.getElementById('input-text').value;

    if (!inputText.trim()) {
        alert('请输入要处理的文本内容');
        return;
    }
    
    if (inputText.length > 800) {
        alert('文本长度超过限制，请缩短文本内容');
        return;
    }
    //显示加载中状态
    const resultArea = document.getElementById('result-area');
    const resultContent = document.getElementById('result-content');
    resultContent.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> 正在添加标点符号，请稍候...</p>';
    resultArea.style.display = 'block';

    setTimeout(() => {
        try {
            const processedText = addModernPunctuation(inputText);
            displayPunctuationResult(processedText);
        } catch (error) {
            console.error('标点处理失败:', error);
            resultContent.innerHTML = `<p style="color: red;">处理失败: ${error.message}</p>`;
        }
    }, 1000);
}

/**
 * 添加现代标点符号
 * 使用简单规则为文本添加标点
 * @param {string} text 
 * @returns {string}
 */
function addModernPunctuation(text) {
    if (!text || text.length === 0) return text;
    
    let result = text;
    //常见标点符号
    const punctuation = ['，', '。', '？', '！', '；', '：'];
    
    //简单的标点添加规则
    //在常见句末词后添加句号
    const sentenceEndWords = ['乎', '矣', '也', '焉', '耳', '已', '哉', '耶', '欤', '兮'];
    sentenceEndWords.forEach(word => {
        const regex = new RegExp(`(${word})(?![，。！？；：])`, 'g');
        result = result.replace(regex, `$1。`);
    });
    
    //在疑问词后添加问号
    const questionWords = ['何', '岂', '安', '焉', '孰', '谁', '胡', '奚', '曷', '如何', '何以'];
    questionWords.forEach(word => {
        const regex = new RegExp(`(${word})(?![，。！？；：])`, 'g');
        result = result.replace(regex, `$1？`);
    });
    
    //在感叹词后添加感叹号
    const exclamationWords = ['呜呼', '噫', '嘻', '嗟乎', '善哉', '大哉'];
    exclamationWords.forEach(word => {
        const regex = new RegExp(`(${word})(?![，。！？；：])`, 'g');
        result = result.replace(regex, `$1！`);
    });
    
    //在常见连接词后添加逗号
    const conjunctionWords = ['而', '则', '然', '故', '是以', '于是', '然后'];
    conjunctionWords.forEach(word => {
        const regex = new RegExp(`(${word})(?![，。！？；：])`, 'g');
        result = result.replace(regex, `$1，`);
    });
    
    //根据句子长度添加逗号（简单规则）
    //将文本按句号分割
    const sentences = result.split('。');
    for (let i = 0; i < sentences.length; i++) {
        if (sentences[i].length > 10) {
            //在长句中随机位置添加逗号
            const midPoint = Math.floor(sentences[i].length / 2);
            if (midPoint > 0 && midPoint < sentences[i].length) {
                sentences[i] = sentences[i].substring(0, midPoint) + '，' + sentences[i].substring(midPoint);
            }
        }
    }
    result = sentences.join('。');
    //确保文本以句号结束
    if (!/[，。！？；：]$/.test(result)) {
        result += '。';
    }
    
    return result;
}

/**
 * 显示自动标点处理结果
 * @param {string} resultText - 处理后的文本
 */
function displayPunctuationResult(resultText) {
    const resultContent = document.getElementById('result-content');
    
    resultContent.innerHTML = `
        <h4>自动标点完成！</h4>
        <div style="margin-top: 15px; padding: 10px; background-color: #f0f7ff; border-radius: 4px;">
            ${resultText}
        </div>
    `;
}

/**
 * 处理自动分词
 * 使用简单规则进行中文分词
 */
function processSegmentation() {
    const inputText = document.getElementById('segmentation-text').value;
    if (!inputText.trim()) {
        alert('请输入要分词的文本内容');
        return;
    }
    
    if (inputText.length > 800) {
        alert('文本长度超过限制，请缩短文本内容');
        return;
    }
    
    //显示加载中状态
    const resultArea = document.getElementById('segmentation-result-area');
    const resultContent = document.getElementById('segmentation-result-content');
    resultContent.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> 正在分词处理中，请稍候...</p>';
    resultArea.style.display = 'block';
    setTimeout(() => {
        try {
            //使用简单规则进行分词
            const words = simpleChineseSegment(inputText);
            //将分词结果用空格连接显示
            const processedText = words.join(' ');

            displaySegmentationResult(processedText, words.length);
        } catch (error) {
            console.error('分词处理失败:', error);
            resultContent.innerHTML = `<p style="color: red;">处理失败: ${error.message}</p>`;
        }
    }, 1000);
}
/**
 * 简单中文分词函数
 * 使用基于词典的最大正向匹配算法
 * @param {string} text - 待分词的文本
 * @returns {Array} - 分词后的词语数组
 */
function simpleChineseSegment(text) {
    if (!text || text.length === 0) return [];
    
    //简单的中文词典
    const dictionary = [
        '自然', '语言', '处理', '人工', '智能', '领域', '重要', '方向',
        '深度', '学习', '技术', '计算机', '视觉', '语音', '识别', '取得', '显著', '成果',
        '智能', '标注', '平台', '提供', '自动', '分词', '标点', '功能', '帮助', '用户', '处理', '文本',
        '中文', '分词', '信息', '处理', '基础', '步骤', '之一',
        '孟子', '梁惠王', '千里', '仁义', '大学', '之道', '明明德', '亲民', '至善',
        '子曰', '学而时习之', '不亦说乎', '有朋自远方来', '不亦乐乎', '人不知而不愠', '不亦君子乎',
        '北冥', '有鱼', '其名', '为鲲', '不知', '千里', '化为', '其名', '为鹏', '怒而飞', '翼若', '垂天'
    ];
    
    const result = [];
    let start = 0;
    const maxLen = 4; 
    
    while (start < text.length) {
        let found = false;
        
        //从最大长度开始尝试匹配
        for (let len = Math.min(maxLen, text.length - start); len > 0; len--) {
            const word = text.substring(start, start + len);
            //如果在词典中或者是单个字符
            if (dictionary.includes(word) || len === 1) {
                result.push(word);
                start += len;
                found = true;
                break;
            }
        }       
        //如果没有找到匹配的词，向前移动一个字符
        if (!found) {
            result.push(text[start]);
            start++;
        }
    }
    return result;
}

/**
 * 显示自动分词处理结果
 * @param {string} resultText 
 * @param {number} wordCount
 */
function displaySegmentationResult(resultText, wordCount) {
    const resultContent = document.getElementById('segmentation-result-content');
    
    resultContent.innerHTML = `
        <h4>自动分词完成！</h4>
        <p>分词数量: ${wordCount}</p>
        <div style="margin-top: 15px; padding: 10px; background-color: #f0f7ff; border-radius: 4px;">
            ${resultText}
        </div>
    `;
}

/*清空自动标点文本输入区域*/
function clearText() {
    document.getElementById('input-text').value = '';
    const wordCount = document.getElementById('word-count');
    if (wordCount) {
        wordCount.textContent = '当前字数：0/800';
        wordCount.style.color = '#777';
    }
    const resultArea = document.getElementById('result-area');
    if (resultArea) {
        resultArea.style.display = 'none';
    }
}

/*清空自动分词文本输入区域*/
function clearSegmentationText() {
    document.getElementById('segmentation-text').value = '';
    const wordCount = document.getElementById('segmentation-word-count');
    if (wordCount) {
        wordCount.textContent = '当前字数：0/800';
        wordCount.style.color = '#777';
    }
    const resultArea = document.getElementById('segmentation-result-area');
    if (resultArea) {
        resultArea.style.display = 'none';
    }
}

/*保存自动标点文本内容*/
function uploadText() {
    const resultContent = document.getElementById('result-content');
    
    //检查是否有处理结果
    if (!resultContent || !resultContent.textContent || 
        resultContent.textContent.includes('正在添加标点符号') || 
        resultContent.textContent.includes('处理失败')) {
        alert('请先处理文本内容');
        return;
    }
    const resultText = resultContent.textContent;
    uploadedText = resultText;
    
    const uploadedContent = document.getElementById('uploaded-content');
    if (uploadedContent) {
        uploadedContent.innerHTML = `
            <h4>已保存的文本内容：</h4>
            <div style="margin-top: 15px; padding: 10px; background-color: #f0f7ff; border-radius: 4px;">
                ${resultText}
            </div>
            <p style="margin-top: 10px; color: #777; font-size: 0.9rem;">注：每次保存会覆盖之前的内容</p>
        `;
    }
    
    alert('文本保存成功！');
    
    showPage('text-upload');
    
    const uploadLink = document.querySelector('[data-page="text-upload"]');
    if (uploadLink) {
        updateActiveState(uploadLink);
    }
}

/*上传/保存自动分词文本内容*/
function uploadSegmentationText() {
    const resultContent = document.getElementById('segmentation-result-content');

    if (!resultContent || !resultContent.textContent || 
        resultContent.textContent.includes('正在分词处理中') || 
        resultContent.textContent.includes('处理失败')) {
        alert('请先处理文本内容');
        return;
    }
    
    const resultText = resultContent.textContent;
    
    uploadedText = resultText;
    
    const uploadedContent = document.getElementById('uploaded-content');
    if (uploadedContent) {
        uploadedContent.innerHTML = `
            <h4>已保存的文本内容：</h4>
            <div style="margin-top: 15px; padding: 10px; background-color: #f0f7ff; border-radius: 4px;">
                ${resultText}
            </div>
            <p style="margin-top: 10px; color: #777; font-size: 0.9rem;">注：每次保存会覆盖之前的内容</p>
        `;
    }
    
    alert('文本保存成功！');
    showPage('text-upload');
    
    const uploadLink = document.querySelector('[data-page="text-upload"]');
    if (uploadLink) {
        updateActiveState(uploadLink);
    }
}

/*下载自动标点处理结果*/
function downloadResult() {
    const resultContent = document.getElementById('result-content');

    if (!resultContent || !resultContent.textContent || 
        resultContent.textContent.includes('正在添加标点符号') || 
        resultContent.textContent.includes('处理失败')) {
        alert('请先处理文本内容');
        return;
    }
    
    const resultText = resultContent.textContent;
    
    downloadedText = resultText;
    
    const downloadedContent = document.getElementById('downloaded-content');
    if (downloadedContent) {
        downloadedContent.innerHTML = `
            <h4>已下载的文本内容：</h4>
            <div style="margin-top: 15px; padding: 10px; background-color: #f0f7ff; border-radius: 4px;">
                ${resultText}
            </div>
            <div style="margin-top: 15px;">
                <button class="btn" onclick="exportText()"><i class="fas fa-file-export"></i> 导出文本文件</button>
            </div>
        `;
    }
    
    alert('结果下载成功！');
    
    showPage('result-download');
    
    const downloadLink = document.querySelector('[data-page="result-download"]');
    if (downloadLink) {
        updateActiveState(downloadLink);
    }
}

/*下载自动分词处理结果*/
function downloadSegmentationResult() {
    const resultContent = document.getElementById('segmentation-result-content');
    
    if (!resultContent || !resultContent.textContent || 
        resultContent.textContent.includes('正在分词处理中') || 
        resultContent.textContent.includes('处理失败')) {
        alert('请先处理文本内容');
        return;
    }
    
    const resultText = resultContent.textContent;
    
    downloadedText = resultText;
    
    const downloadedContent = document.getElementById('downloaded-content');
    if (downloadedContent) {
        downloadedContent.innerHTML = `
            <h4>已下载的文本内容：</h4>
            <div style="margin-top: 15px; padding: 10px; background-color: #f0f7ff; border-radius: 4px;">
                ${resultText}
            </div>
            <div style="margin-top: 15px;">
                <button class="btn" onclick="exportSegmentationText()"><i class="fas fa-file-export"></i> 导出文本文件</button>
            </div>
        `;
    }
    
    alert('结果下载成功！');
    
    showPage('result-download');
    
    const downloadLink = document.querySelector('[data-page="result-download"]');
    if (downloadLink) {
        updateActiveState(downloadLink);
    }
}

/*导出自动标点文本文件*/
function exportText() {
    if (!downloadedText) {
        alert('没有可导出的内容');
        return;
    }
    const blob = new Blob([downloadedText], { type: 'text/plain;charset=utf-8' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '标点结果.txt';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    alert('文本文件导出成功！');
}

/*导出自动分词文本文件*/
function exportSegmentationText() {
    if (!downloadedText) {
        alert('没有可导出的内容');
        return;
    }
    
    const blob = new Blob([downloadedText], { type: 'text/plain;charset=utf-8' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '分词结果.txt';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    alert('文本文件导出成功！');
}

/**
 * 模拟API调用函数
 * 实际应用中替换为真实的API调用
 * @param {string} endpoint
 * @param {Object} data 
 * @returns {Promise}
 */
function simulateAPICall(endpoint, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                let response;
                
                if (endpoint === 'process-text') {
                    response = {
                        success: true,
                        processingTime: Math.floor(Math.random() * 500) + 200,
                        result: '模拟处理结果'
                    };
                }
                
                resolve(response);
            } else {
                reject(new Error('服务器暂时不可用，请稍后再试'));
            }
        }, 1000);
    });
}

/**
 * 实际API调用示例
 * 在实际应用中替换simulateAPICall函数
 * @param {string} endpoint
 * @param {Object} data
 * @returns {Promise} 
 */
function callRealAPI(endpoint, data) {
    //使用axios发送真实的HTTP请求
    return axios.post(`/api/${endpoint}`, data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.response?.data?.message || '请求失败');
        });
}

//将函数暴露给全局作用域，以便HTML中的onclick属性可以调用
window.showFunction = showFunction;
window.processText = processText;
window.clearText = clearText;
window.downloadResult = downloadResult;
window.uploadText = uploadText;
window.exportText = exportText;
window.loadExamples = loadExamples;

//自动分词相关函数
window.processSegmentation = processSegmentation;
window.clearSegmentationText = clearSegmentationText;
window.downloadSegmentationResult = downloadSegmentationResult;
window.uploadSegmentationText = uploadSegmentationText;
window.exportSegmentationText = exportSegmentationText;
window.loadSegmentationExamples = loadSegmentationExamples;

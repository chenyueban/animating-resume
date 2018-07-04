function writeCode({prefix, viewDom, codeDom, code, type}) {
    return new Promise((resolve, reject) => {
        try {
            let n = 0
            const timer = setInterval(() => {
                n++
                viewDom.innerHTML = type ? Prism.highlight(prefix + code.substring(0, n), Prism.languages[type], type) : code.substring(0, n)
                codeDom ? codeDom.innerHTML = prefix + code.substring(0, n) : void 0
                viewDom.scrollTop = viewDom.scrollHeight
                if (n >= code.length) {
                    window.clearInterval(timer)
                    resolve('done')
                }
            }, 10)
        } catch (e) {
            reject(e)
        }
    })
}
function toMarkDown({viewDom, code}) {
    return new Promise((resolve, reject) => {
        try {
            viewDom.innerHTML = marked(code)
            viewDom.scrollTop = viewDom.scrollHeight
            resolve('done')
        } catch (e) {
            reject(e)
        }
    })
}

const step1 = {
    prefix: '',
    viewDom: document.querySelector('#code-window'),
    codeDom: document.querySelector('#codes'),
    code: `
/**
 *  Hello 我是陈新尧
 *
 *  一名前端工程师
 *
 *  这个页面太单调了 加点颜色如何？
 */

* {
    transition: all 1s;
    box-sizing: border-box;
}

body {
    height: 100vh;
    background-color: rgb(63, 82, 99);
    overflow: hidden;
}

pre {
    color: white;
}

pre:not(:empty) {
    position: absolute;
    width: 48%;
    max-height: 46%;
    overflow: auto;
    background-color: #272822;
    border: 1px solid white;
    font-size: 14px;
    border-radius: 5px;
    box-shadow: -4px 4px 2px 0 rgba(0, 0, 0, 0.3);
    padding: 10px;
}

pre:hover {
    box-shadow: 0px 0px 40px 5px rgba(255, 255, 255, 0.4);
}

/**
 *  这样太难看了，我们加点高亮如何
 */
`,
    type: 'css'
}

const step2 = {
    prefix: step1.code,
    viewDom: document.querySelector('#code-window'),
    codeDom: document.querySelector('#codes'),
    code: `
/**
 *  这样感觉好多了，我们在加点样式
 */

body {
    perspective: 1000px;
}

#code-window {
    margin-left: 50%;
    transform: rotateY(-10deg);
    transform-origin: right;
    max-height: 94.5%;
}

/**
 *  我还需要一块画板来介绍自己
 */
 
#md-window {
    background-color: white;
    margin-left: 20px;
    transform: rotateY(10deg);
    transform-origin: left;
    max-height: 94.5%;
}
`,
    type: 'css'
}

const step3 = {
    prefix: '',
    viewDom: document.querySelector('#md-window'),
    codeDom: null,
    code: `
### 个人信息

- 陈新尧/男/1996
- Github：http://github.com/chenyueban

### 联系方式

- 手机：15563685309
- Email：269380014@qq.com
- QQ：269380014
- 微信: chensmoke

### 我的技能

- 掌握HTML JavaScript CSS等前端基本知识 喜欢用Less、Iconfont等技术
- 使用ESlint规范 对代码的规范有严格要求
- 熟悉Vue.js及其生态圈 熟悉webpack等工具
- 了解ES6并正在学习使用到工作中
- 熟悉NodeJS MongoDB Redis等后端知识

`,
    type: ''
}

const step4 = {
    prefix: step1.code + step2.code,
    viewDom: document.querySelector('#code-window'),
    codeDom: document.querySelector('#codes'),
    code: `
/**
 *  然后我们准将markdown转为HTML看看
 *  ready?
 *  3.
 *  2.
 *  1.
 */

`,
    type: 'css'
}

const step5 = {
    viewDom: document.querySelector('#md-window'),
    code: marked(step3.code),
}

writeCode(step1)
    .then(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'vendor/prism/prism.css'
        document.head.appendChild(link)

        return writeCode(step2)
    })
    .then(() => {
        return writeCode(step3)
    })
    .then(() => {
        return writeCode(step4)
    })
    .then(() => {
        step5.viewDom.classList.add('flipped')
        toMarkDown(step5)
    })
    .then(() => {

    })
    .catch(err => console.log(err))
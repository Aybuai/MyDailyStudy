### 1、HTML 语义化？

- 增强代码可读性，方便维护（人）
- 增强爬虫 SEO（机器）

### 2、块级元素&内联样式

- display: block/table；div、h1-h6、table、p 等
- display: inline/inline-block；span、input、button、img 等

### 3、盒子模型的理解？怪异和标准怎么切换？

- 盒模型有两种，分别是标准盒模型和怪异盒模型。盒模型都是由四个部分组成，分别是 margin、border、padding、content。
- 两种盒模型的区别在于设置宽高不同，标准盒模型：content；怪异盒模型：border、padding 和 content。
- 通过修改 box-sizing 属性切换，content-box 标准盒模型（默认值）；border-box 怪异盒模型。

### 4、重排（回流）和重绘的区别？

页面渲染流程：<br>

- 解析 html 绘制 DOM 树
- 解析 css 绘制 CSSOM 树
- 把 DOM 和 CSSOM 组合生成 render 树
- 基于 render 树布局
- 绘制到屏幕上<br>

布局这一过程就是重排（回流），绘制到屏幕上就是重绘。页面元素发生形状大小变化就是重排，外观发生变化就是重绘。重排一定会重绘,但是重绘不一定重排。

### 5、伪类和伪元素的区别？

伪元素：在内容元素前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。仅在外部可见，文档源代码找不到。例如：

```javascript
p::before { content: '第一章' }
p::after { content: 'hot' }
```

伪类：将特殊的效果添加到特定的选择器上。它是已有元素添加类别，不会产生新的元素。
例如：

```javascript
a:hover { color: #FF00FF }
```

### 6、css 样式隔离方案？

**BEM**：是一种 css 命名方法论，意思是块（Block）、元素（Element）、修饰符（Modifier）的简写<br>
**CSS Modules**：顾名思义，css-modules 将 css 代码模块化，可以避免本模块样式被污染，并且可以很方便的复用 css 代码<br>
**CSS in JS**：CSS in JS 是 2014 年推出的一种设计模式，它的核心思想是把 CSS 直接写到各自组件中，也就是说用 JS 去写 CSS，而不是单独的样式文件里<br>
**预处理器**：css 预处理器会增加一些原生 css 不具备的特性，使之更加具有可读性且易于维护。例如：

- 代码混合
- 嵌套选择器
- 继承选择器<br>

常见的预处理器有：sass，less（预处理器：外面嵌套不同，同一文件同一名称可以分别生效）<br>
**Shadow DOM**：由于子应用的样式作用域仅在 shadow 元素下，那么一旦子应用中出现运行时越界跑到外面构建 DOM 的场景，必定会导致构建出来的 DOM 无法应用子应用的样式的情况。
比如 sub-app 里调用了 antd modal 组件，由于 modal 是动态挂载到 document.body 的，而由于 Shadow DOM 的特性 antd 的样式只会在 shadow 这个作用域下生效，结果就是弹出框无法应用到 antd 的样式。解决的办法是把 antd 样式上浮一层，丢到主文档里，但这么做意味着子应用的样式直接泄露到主文档了，比较适用于微前端特殊场景。<br>
**vue scoped**：当 `<style> `标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。

### 7、vue scoped 能做样式隔离的原理？

通过使用 postcss 后处理器给类别增加一个用 hash 值组成的属性选择器，data-v-hash 值 保证全局唯一。

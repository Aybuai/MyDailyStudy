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

### 8、css 优先级是怎样计算的？

!important 优先级最高 > 内联样式权重 1000 > id 选择器权重 100 > 类选择器、属性选择器、伪类选择器权重 10 > 标签选择器、伪元素选择器权重 1 > 子选择器、后代选择器、兄弟选择器、通配符选择器权重 0 > 继承的样式没有权重

### 9、BFC 是什么？

BFC（Block Formatting Context）块级格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。<br>

**BFC 形成条件：**<br>

- 1、浮动元素，float 除 none 以外的值；
- 2、定位元素，position（absolute，fixed）；
- 3、display 为以下其中之一的值 inline-block，table-cell，table-caption；
- 4、overflow 除了 visible 以外的值（hidden，auto，scroll）；

**BFC 特性：** <br>

- 1.内部的 Box 会在垂直方向上一个接一个的放置；
- 2.垂直方向上的距离由 margin 决定；（解决垂直外边距重叠问题）
- 3.bfc 的区域不会与 float 的元素区域重叠；（防止浮动文字环绕）
- 4.计算 bfc 的高度时，浮动元素也参与计算；（清除浮动）
- 5.bfc 就是页面上的一个独立容器，容器里面的子元素不会影响外面元素；

### 10、position 有哪些值？分别是干嘛的？

- static：position 默认值，忽略 left、top、right、bottom 和 z-index 属性
- relative：相对定位，使用场景：子元素相对于父元素进行定位。
- absolute：绝对定位，指给元素设置绝对定位。有两种情况：
  - a、祖先元素设置了 relative、absolute，就相对祖先元素绝对定位。
  - b、没有设置 position 属性的祖先元素，相对 body 进行定位。
- fixed：固定在某一个地方，fixed 元素总是相对于 body 定位的。使用场景：`回到顶部`、`侧边栏或广告图`
- inherit：继承父元素的 position 属性
- sticky：当元素在容器中被滚动超过指定的偏移值时，元素会固定在容器的指定位置（相当于 fixed）。

### 11、flex：1 代表什么？

实际上是 `flex-grow`、`flex-shrink` 和 `flex-basis` 三个属性的缩写<br>

- flex-grow：定义项目的的放大比例；默认为 0，即 即使存在剩余空间，也不会放大；
- flex-shrink：定义项目的缩小比例；默认为 1，即 如果空间不足，该项目将缩小
- flex-basis： 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间；默认值为 auto，即 项目原本大小。

### 12、css 画三角形？

CSS 绘制三角形主要用到的是 border 属性，也就是边框。<br>

箭头向下的三角形：<br>

```css
div {
  width: 0;
  height: 0;
  border-top: 50px solid red;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```

### 13、手写代码单行文本，多行文本字数过多显示...？

- 单行文本溢出

```css
overflow: hidden; // 溢出隐藏
text-overflow: ellipsis; // 溢出用省略号显示
white-space: nowrap; // 规定段落中的文本不进行换行
```

- 多行文本溢出

```css
overflow: hidden; // 溢出隐藏
text-overflow: ellipsis; // 溢出用省略号显示
display: -webkit-box; // 作为弹性伸缩盒子模型显示。
-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
-webkit-line-clamp: 3; // 显示的行数
```

### 14、css 怎么画 0.5px 的线？

- 采用 transform: scale()的方式，该方法用来定义元素的 2D 缩放转换：

```javascript
transform: scale(0.5, 0.5);
```

- 采用 meta viewport 的方式：

```javascript
<meta
  name="viewport"
  content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"
/>
```

### 15、css3 怎么开启 GPU 加速？（css3 怎么开启硬件加速？）

浏览器在处理下面的 css 的时候，会使用 GPU 渲染<br>

- transform（当 3D 变换的样式出现时会使用 GPU 加速）
- opacity
- filter
- will-change

### 16、css 性能优化？

**加载性能：**<br>

- （1）css 压缩：将写好的 css 进行打包压缩，可以减小文件体积。
- （2）css 单一样式：当需要下边距和左边距的时候，很多时候会选择使用 margin:top 0 bottom 0；但 margin-bottom:bottom;margin-left:left;执行效率会更高。
- （3）减少使用@import，建议使用 link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

**选择器性能：**<br>

- （1）避免使用通配规则，如\*{}计算次数惊人，只对需要用到的元素进行选择。
- （2）尽量少的去对标签进行选择，而是用 class。
- （3）尽量少的去使用后代选择器，降低选择器的权重值。

**渲染性能：**<br>

- （1）尽量减少页面重排、重绘
- （2）属性值为 0 时，不加单位
- （3）不使用@import 前缀，它会影响 css 的加载速度

**可维护性、健壮性：**<br>

- （1）将具有相同属性的样式抽离出来，整合并通过 class 在页面中进行使用，提高 css 的可维护性。
- （2）样式与内容分离：将 css 代码定义到外部 css 中。

### 17、垂直水平居中布局方案？行内元素垂直居中？

[垂直居中布局](https://juejin.cn/post/6844903982960214029)

### 18、怎么使元素隐藏？分别说出对 dom 树的影响和是否响应绑定事件？

- **display: none**：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。
- **visibility: hidden**：元素在页面中仍占据空间，但是不会响应绑定的监听事件。
- **opacity: 0**：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。
- **position: absolute**：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
- **z-index: 负值**：来使其他元素遮盖住该元素，以此来实现隐藏。
- **clip/clip-path**：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
- **transform: scale(0,0)**：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

### 19、css 动画有哪些？怎么实现？

- **transition 过渡**：将变化按照设置的时间长度缓慢执行完毕，而不是立即执行。
- **animation 动画**：animation-name: 指定一个 @keyframes 的名称，动画将要使用这个@keyframes 定义

### 20、transition 属性是什么？transition 和 animation 的区别？

- transition 是过度属性，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。它类似于 flash 的补间动画，设置一个开始关键帧，一个结束关键帧。
- animation 是动画属性，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。它也类似于 flash 的补间动画，但是它可以设置多个关键帧（用@keyframe 定义）完成动画。

### 21、rem 和 em 的区别？移动端适配怎么做？（三种）

rem 和 em 它们都是相对长度单位，em 是相对于其父元素来设置字体大小，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。而 rem 是相对于根元素，这样就意味着，只需要在根元素确定一个参考值。<br>

- 1、rem，em
- 2、媒体查询
- 3、flex
- 4、百分比布局

### 22、浏览器会累计很多次再重新渲染机制（队列机制），怎么打破这个机制？（浏览器刷新渲染是一种队列排队机制，怎样才能立即重新渲染更新，告诉浏览器要立即拿到计算结果？）

window.resize()<br>
触发重排的属性方法等，例如 offsetTop、scrollTop、clientTop 等

### 23、如何清除浮动？如何解决父元素高度塌陷？

**浮动的影响：**<br>

- （1）由于浮动元素脱离了文档流，所以父元素的高度无法被撑开，影响了与父元素同级的元素
- （2）与浮动元素同级的非浮动元素会跟随其后，因为浮动元素脱离文档流不占据原来的位置
- （3）如果该浮动元素不是第一个浮动元素，则该元素之前的元素也需要浮动，否则容易影响页面的结构显示

**清除浮动的 3 个方法：**<br>

- 使用 clear: both 清除浮动 在浮动元素后面放一个空的 div 标签，div 设置样式 clear:both 来清除浮动。
- 利用伪元素 after 来清除浮动 给父元素添加了::after 伪元素，通过清除伪元素的浮动，达到撑起父元素高度的目的

```javascript
  .clearfix::after{
    content: "";
    display: block;
    visibility: hidden;
    clear: both;
  }
```

- 使用 CSS 的 overflow 属性 当给父元素设置了 overflow 样式，不管是 overflow:hidden 或 overflow:auto 都可以清除浮动只要它的值不为 visible 就可以了，它的本质就是建构了一个 BFC，这样使得达到撑起父元素高度的效果<br>

解决父元素高度塌陷：给父元素设置 overflow:hidden

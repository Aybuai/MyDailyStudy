# JS高级语法运用笔记

## JS是一门高级的编程语言
从编程语言发展史来说，划分三个阶段：<br>
- **机器语言：** 100010011，一些机器指令
- **汇编语言：** mov，ax，bx，一些汇编指令
- **高级语言：** C，C++，Java，JavaScript等

## 浏览器工作原理
从输入地址后浏览器的工作：
![浏览器工作原理](../assets/浏览器工作原理.jpg)

## 浏览器内核和JS引擎的关系
- 以 WebKit 为例，WebKit 由两部分组成，分别是：
`WebCore`：负责 HTML 解析、布局、渲染等。<br>
`JavaScriptCore`：解析、执行 JavaScript 代码<br>
- 小程序里面的 JavaScript 代码就是被 JavaScriptCore 执行的
- JS代码由JS引擎转换成CPU指令来执行

## V8引擎的原理
- V8 是用 C++ 编写的开源高性能 JavaScript 和 WebAssembly 引擎，它已被用于 Chrome 和 Node.js 等。
- 可以运行在 Windows 7+，macOS 10.12+和使用 x64，IA-32，ARM 或 MIPS 处理器的 Linux 系统上。
- V8 可以独立运行，也可以嵌入到任何 C++ 应用程序中。
![V8引擎](../assets/V8引擎.jpg)

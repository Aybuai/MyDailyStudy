## 1、v-for 和 v-if 可以混合使用吗？为什么？

**不可以**，`v-for`计算优先级比`v-if`高，首先会把虚拟节点渲染出来，然后再进行`v-if`判断。降低渲染性能

## 2、v-for 中为什么加 key？

如果不使用 `key`，`Vue` 会使用一种最大限度减少动态元素并且尽可能的尝试`就地修改/复用`相同类型元素的算法。**key** 是为 `Vue` 中 `vnode` 的唯一标记，通过这个 `key`，`diff` 算法可以**更准确、更快速**<br>

- **更准确**：因为带 `key` 就不是就地复用了，在 `sameNode` 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
- **更快速**：利用 `key` 的唯一性生成 `map` 对象来获取对应节点，比遍历方式更快

## 3、事件默认有个 event 参数，它是什么？怎么使用？事件被绑定到哪里？

当事件没有参数，则默认有个 `event` 参数；如果有自定义参数，则需要使用`$event` 传过去。

- `event` 的构造函数是 `MouseEvent`，即是原生的 `event` 对象
- `event` 被挂载到当前元素下，即 `event.target`

## 4、vue 父子组件如何通讯？

- **props、$emit**：<br>
  父组件使用动态数据传递，子组件使用`props`接收，可以使用数组/对象数据结构，对象结构可以定义类型和默认值。<br>
  子组件使用`$emit` 事件回传<br>
- **自定义事件进行组件通讯**：<br>
  自定义事件就是使用一个额外的 `js` 文件，其中声明一个 `Vue` 实例即可<br>
  `$on`，`$emit`，`$off`，参数分别是：注册函数名，真实函数<br>
  **$on**：绑定自定义事件<br>
  **$emit**：调用自定义事件<br>
  **$off**：在组件销毁时，要及时销毁自定义事件，否则可能会造成内存泄漏。在 `beforeDestroy` 中调用`$off`<br>
- **$refs**：<br>
  获取当前组件实例
- **$parent&$children**：<br>
  获取当前组件的父组件和子组件
- **vuex**：<br>
  Vue 中全局状态管理系统，用于多个组件中数据共享。
- **provide&inject**：<br>
  上层组件提供，下层组件注入使用。（适用于组件库编写）

## 5、父子组件声明周期调用顺序？

- **加载渲染过程**：<br>
  父`beforeCreate` -> 父`created` -> 父`beforeMount` -> 子`beforeCreate` -> 子`created` -> 子`beforeMount` -> 子`mounted` -> 父`mounted`
- **更新过程**：<br>
  父`beforeUpdate` -> 子`beforeUpdate` -> 子`updated` -> 父`updated`
- **销毁过程**：<br>
  父`beforeDestroy` -> 子`beforeDestroy` -> 子`destroyed` -> 父`destroyed`
- **全流程**：<br>
  `beforeCreate` -> `created` -> `beforeMount` -> `mounted` -> `beforeUpdate` -> `updated` -> `beforeDestroy` -> `destroyed`

## 6、vue 双向绑定原理（响应式原理）？

[参考文档](https://juejin.cn/post/6844903597986037768)<br>
[参考文档](https://juejin.cn/post/6935344605424517128)<br>

**采用数据劫持结合观察者模式的方式**<br>
通过 Object.defineProperty()来劫持各个属性（只会劫持已经存在的属性）的 `setter`，`getter`，`dep` 和 `Watcher` 实现依赖收集和派发更新的过程：

- `vue` 将 `data` 初始化为一个 `Observer` 并对对象中的每个值，重写了其中的 `get`、`set`，`data` 中的每个 `key`，都有一个独立的 `dep`（依赖收集器）。
- 在 `get` 中，向 `dep`（依赖收集器）添加了监听
- 在 `mount` 时，实例了一个 `Watcher`，将收集器的目标指向了当前 `Watcher`
- 在 `data` 值发生变更时，触发 `set`，触发了 `dep`（依赖收集器）中的所有监听的更新，来触发 **Watcher.update**

## 7、$nextTick 是什么？为什么优先解决微任务？

`nextTick` 中的回调是在下次 `DOM` 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 `DOM`。主要思路就是采用微任务优先的方式调用异步方法去执行 `nextTick` 包装的方法

## 8、vuex 是什么？为什么使用？

`vuex` 是专门为 `vue` 提供的全局状态管理系统，用于多个组件中数据共享、数据缓存等。（无法持久化、内部核心原理是通过创造一个全局实例 new Vue）
主要包括以下几个模块：

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 `Store` 中获取数据，`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性。
- Mutation：是唯一更改 `store` 中状态的方法，且必须是同步函数。
- Action：用于提交 `mutation`，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 `Store` 拆分为多个 `store` 且同时保存在单一的状态树中。

## 9、keep-alive 是什么？怎么实现的？生命周期？首次加载是先执行 activated 还是 deactivated，为什么？

[参考文档](https://juejin.cn/post/7165675789885636616)<br>

**作用与用法：**<br>

开发中缓存组件使用 `keep-alive` 组件，`keep-alive` 是 vue 内置组件，`keep-alive` 包裹动态组件 `component` 时，会缓存不活动的组件实例，而不是销毁它们，这样在组件切换过程中将状态保留在内存中，防止重复渲染 `DOM`。<br>

**使用细节：**<br>

结合属性 `include` 和 `exclude` 可以明确指定缓存哪些组件或排除缓存指定组件。`vue3` 中结合 `vue-router` 时变化较大，之前是 `keep-alive` 包裹 `router-view`，现在需要反过来用 `router-view` 包裹 `keep-alive`。<br>

`keep-alive` 的中缓存的时候还运用了 **LRU(Least Recently Used)** 算法。<br>

**LRU(最近最少使用) 缓存机制：**<br>

如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1`。如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组`「关键字-值」`。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间<br>

**组件缓存后更新，解决方案可以有以下两种：**

- beforeRouteEnter：在有 `vue-router` 的项目，每次进入路由的时候，都会执行 `beforeRouteEnter`。
- activated：在 `keep-alive` 缓存的组件被激活的时候，都会执行 `activated` 钩子。

**原理：**<br>

`keep-alive` 是一个通用组件，它内部定义了一个 `map`，缓存创建过的组件实例，它返回的渲染函数内部会查找内嵌的 `component` 组件对应组件的 `vnode`，如果该组件在 `map` 中存在就直接返回它。由于 `component` 的 `is` 属性是个响应式数据，因此只要它变化，`keep-alive` 的 `render` 函数就会重新执行。<br>

**参数：**<br>

keep-alive 接收三个参数：

- include：可传字符串、正则表达式、数组，名称匹配成功的组件会被缓存
- exclude：可传字符串、正则表达式、数组，名称匹配成功的组件不会被缓存
- max：可传数字，限制缓存组件的最大数量，超过 max 则按照 LRU 算法进行置换

**include 和 exclude，传数组情况居多。**<br>

**生命周期：**<br>

生命周期有：activated 激活、deactivated 离开

- activated： 页面第一次进入的时候，钩子触发的顺序是 created -> mounted -> activated
- deactivated: 页面退出的时候会触发 deactivated

**当再次前进或者后退的时候只触发 `activated`。**<br>

使用 `keep-alive` 会将数据保留在**内存中**，如果要在每次进入页面的时候获取最新的数据，需要在 `activated` 阶段获取数据，承担原来 `created` 钩子中获取数据的任务。那么，我们一般会在动态组件、路由组件去用到 `keep-alive `组件。

## 10、vue2 和 vue3 的区别？

- 响应式系统：vue2 是 Object.defineProperty()；vue3 使用的是 proxy
- vue3 全部由 ts 重构，对 ts 支持更友好
- 自定义渲染器
- composition API
- vue3 可以存在多个根节点，vue2 只能有一个

## 11、history 和 hash 路由实现原理？区别是什么？

[参考文档](https://juejin.cn/post/7004638318843412493#heading-19)<br>
[参考文档](https://juejin.cn/post/7110592611231989767)<br>

**hash 模式**<br>

- 1.**location.hash** 的值实际就是 `URL` 中 **#** 后面的东西 它的特点在于：`hash` 虽然出现 `URL` 中，但不会被包含在 `HTTP` 请求中，对后端完全没有影响，因此改变 `hash` 不会重新加载页面。
- 2.可以为 `hash` 的改变添加监听事件

```javascript
window.addEventListener("hashchange", funcRef, false);
```

每一次改变 hash（window.location.hash），都会在浏览器的访问历史中增加一个记录。<br>
利用 hash 的以上特点，就可以来实现前端路由 **“更新视图但不重新请求页面”** 的功能了<br>

> 特点：兼容性好但是不美观

**history 模式**<br>

利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。<br>

这两个方法应用于浏览器的历史记录站，在当前已有的 `back`、`forward`、`go` 的基础之上，它们提供了对历史记录进行修改的功能。这两个方法有个共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前 `URL` 改变了，但浏览器不会刷新页面，这就为单页应用前端路由 **“更新视图但不重新请求页面”** 提供了基础。

> 特点：虽然美观，但是刷新会出现 404 需要后端进行配置

## 12、请说出常用的设计模式？（5 种以上）并举例实际项目中的使用场景。

[参考文档](https://juejin.cn/post/6844904032826294286)<br>
[参考文档](https://juejin.cn/post/6961222829979697165#heading-29)<br>

- 1.工厂模式 - 传入参数即可创建实例

  虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode

- 2.单例模式 - 整个程序有且仅有一个实例

  `vuex` 和 `vue-router` 的插件注册方法 `install` 判断如果系统存在实例就直接返回掉

- 3.观察者模式 (响应式数据原理)
- 4.策略模式 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略
- 5.策略模式：优化 if else 冗余代码
- 6.代理模式：mini-vue proxy

## 13、$emit和$on 的本质？

[参考文档](https://blog.csdn.net/u013205165/article/details/110952379)<br>

- 1.`$on`、`$emit` 基于发布订阅模式
- 2.`$on` 用来收集所有的事件依赖，他会将传入的参数 `event` 和 `fn` 作为 `key` 和 `value` 的形式存到 `vm._events` 这个事件集合里，就像这样 `vm._events[event]=[fn]`;
- 3.而 `$emit` 是用来触发事件的，他会根据传入的 `event` 在 `vm_events` 中找到对应的事件并执行 `invokeWithErrorHandling(cbs[i], vm, args, vm, info)`
- 4.最后我们看 `invokeWithErrorHandling` 方法可以发现，他是通过 `handler.apply(context, args)` 和 `handler.call(context)` 的形式执行对应的方法

## 14、虚拟 dom 是什么？原理？优缺点？

用 js 模拟一颗 dom 树,放在浏览器内存中.当你要变更时,虚拟 dom 使用 diff 算法进行新旧虚拟 dom 的比较,将变更放到变更队列中,反应到实际的 dom 树,减少了 dom 操作。<br>
虚拟 DOM 将 DOM 树转换成一个 JS 对象树,diff 算法逐层比较,删除,添加操作,但是,如果有多个相同的元素,可能会浪费性能,所以,react 和 vue-for 引入 key 值进行区分。<br>

**优点：**<br>

- **保证性能下限：** 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
- **无需手动操作 DOM：** 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
- **跨平台：** 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等。

**缺点:**<br>

**无法进行极致优化：** 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。

## 15、mixin 是什么？优缺点？原理？vue3 用什么取代了？

组件和组件之间有时候会存在相同的代码逻辑，分为**局部混入**和**全局混入**，我们希望对**相同的代码逻辑进行抽取**

- Mixin 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能
- 一个 Mixin 对象可以包含任何组件选项 --- 其本质就是一个对象
- 当组件使用 Mixin 对象时，所有 Mixin 对象的选项将被 混入该组件本身的选项中

**缺点：**<br>

- 变量来源不明确，不利于阅读
- 多 mixin 可能会造成命名冲突
- mixin 和组件可能出现多对多的关系，复杂度较高

Vue3 使用 Composition API 替代了，优点：

- 代码提取
- 代码重用
- 命名冲突解决

## 16、自定义指令？原理？

Vue 自定义指令有**全局注册**和**局部注册**两种方式。先来看看注册全局指令的方式，通过 `Vue.directive(id, [definition])` 方式**注册全局指令**。然后在入口文件中进行 Vue.use() 调用。<br>
它的作用价值在于当开发人员在某些场景下需要对普通 DOM 元素进行操作。提高代码复用。<br>
指令本质上是装饰器，是 vue 对 HTML 元素的扩展，给 HTML 元素增加自定义功能。vue 编译 DOM 时，会找到指令对象，执行指令的相关方法。<br>
自定义指令有五个生命周期（也叫钩子函数），分别是 `bind`、`inserted`、`update`、`componentUpdated`、`unbind`

- 1.bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- 2.inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- 3.update：被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
- 4.componentUpdated：被绑定元素所在模板完成一次更新周期时调用。
- 5.unbind：只调用一次，指令与元素解绑时调用。

**原理**<br>

- 1.在生成 ast 语法树时，遇到指令会给当前元素添加 directives 属性
- 2.通过 genDirectives 生成指令代码
- 3.在 patch 前将指令的钩子提取到 cbs 中,在 patch 过程中调用对应的钩子
- 4.当执行指令对应钩子函数时，调用对应指令定义的方法

## 17、事件绑定原理？

$on、$emit 是基于发布订阅模式的，维护一个事件中心，on 的时候将事件按名称存在事件中心里，称之为订阅者，然后 emit 将对应的事件进行发布，去执行事件中心里的对应的监听器

## 18、$set 的原理？

因为响应式数据 我们给对象和数组本身都增加了 `__ob__` 属性，代表的是 Observer 实例。当给对象新增不存在的属性 首先会把新的属性进行响应式跟踪 然后会触发对象 `__ob__` 的 `dep` 收集到的 `watcher` 去更新，当修改数组索引时我们调用数组本身的 `splice` 方法去更新数组

## 19、Vue3 比 Vue2 有什么优势？

- 1.性能更好
- 2.体积更小
- 3.更好的 TS 支持
- 4.更好的代码组织
- 5.更好的逻辑抽离
- 6.更多新功能

## 20、Vue3 声明周期

- Options API
  - 1.beforeDestroy 改为 beforeUnmount
  - 2.destroyed 改为 unmounted
  - 3.其他沿用 Vue2 的生命周期
- Composition API<br>
  `setup` 相当于整合了 `beforeCreate` 和 `created`<br>
  其余生命周期分别是写在 `setup` 中的函数：<br>
  - 1.onBeforeMount()
  - 2.onMounted()
  - 3.onBeforeUpdate()
  - 4.onUpdated()
  - 5.onBeforeUnmount()
  - 6.onUnmounted()

## 21、Composition API 和 Options API

- 1.更好的代码组织
- 2.更好的逻辑复用
- 3.更好的类型推导

**如何选择？**<br>

- 1.不建议共用，会引起混乱
- 2.小型项目、业务逻辑简单，用 options API
- 3.中大型项目、逻辑复杂，用 composition API

## 22、如何理解 ref、toRef 和 toRefs

**ref：**<br>

- 1.生成值类型的响应式数据
- 2.可用于模版和 reactive
- 3.通过`.value` 修改值

**toRef：**<br>

- 1.针对一个响应式对象（reactive 封装）的 prop
- 2.创建一个 ref，具有响应式
- 3.两者保持引用关系。

**toRefs：**<br>

- 1.将响应式对象（reactive 封装）转换为普通对象
- 2.对象的每个 prop 都是对应的 ref（不然 reactive 响应式直接解构会失去响应式）
- 3.两者保持引用关系

## 23、为何 ref 需要 value 属性？

- 1.ref 是一个对象（不丢失响应式，值类型不能用 proxy 代理），value 储存值
- 2.通过 `.value` 属性的 `get` 和 `set` 实现响应式
- 3.用于模版、reactive 时，不需要 `.value`，其他情况都需要

## 24、Vue3 升级了哪些重要的功能？

- 1.createApp
- 2.emits 属性：在子组件中声明 `emits` `options` 父组件的绑定事件
- 3.生命周期：使用 `setup` 整合 `beforeCreate` 和 ` created``，beforeDestroy ` 改为 `beforeUnmount`，`destroyed` 改为 `unmounted`，其他与 vue2 一致
- 4.多事件处理：在点击事件中写入多个处理函数，用逗号分割
- 5.Fragment：可以存放多个根节点
- 6.移除 `.sync`
- 7.异步组件的写法：需要从 Vue 引入 `defineAsyncComponent`，使用这个函数包裹 import() 引入异步组件
- 8.移除 filter：双括号中用 | 分割转换含义
- 9.Teleport：主要场景就是把组件的嵌套层级提高
- 10.Suspense：用来加载异步组件未成功时的一些 `loading`，主要实现原理就是具名插槽
- 11.Composition API

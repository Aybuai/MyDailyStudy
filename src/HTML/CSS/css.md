### 1、盒子模型的理解？不同盒模型的 offsetWidth 大小怎么判断？

- **标准盒模型**和**怪异盒模型**的大小分别是由`content`；`border`、`padding`、`content`组成。
- 默认标准盒模型，使用`box-sizing`属性切换，`content-box`标准盒模型；`border-box`怪异盒模型。
- **offsetWith**是由`padding` + `border` + `content`三部分组成。
- 相邻元素的垂直外边距（margin-top 和 margin-bottom）会重叠（取决于大的 margin），空标签也会重叠。

### 2、margin-left、margin-top、margin-right、margin-bottom 负值区别？

- `margin-top`和`margin-left`负值，元素向上、向左移动
- `margin-right`负值，右侧元素左移，自身不受影响
- `margin-bottom`负值，下方元素上移，自身不受影响

### 3、圣杯布局和双飞翼布局的技术总结（考察 float 属性）

- 使用`float`布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，一个用`padding`为两侧留白 一个用`margin`为两侧留白

### 4、如何使用 flex 布局实现三点筛子

HTML：<br>

```html
<div class="wrapper">
  <div class="item">·</div>
  <div class="item">·</div>
  <div class="item">·</div>
</div>
```

CSS：<br>

- 父元素样式使用

```css
.wrapper {
  height: 100px;
  width: 100px;
  border: solid 1px red;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}
```

- 子元素 item 样式使用

```css
.item:nth-child(2) {
  align-self: center;
}
.item:nth-child(3) {
  align-self: flex-end;
}
```

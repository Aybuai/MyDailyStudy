### 1、盒子模型的理解？不同盒模型的offsetWidth大小怎么判断？

- 1、**标准盒模型**和**怪异盒模型**的大小分别是由`content`；`border`、`padding`、`content`组成。
- 2、默认标准盒模型，使用`box-sizing`属性切换，`content-box`标准盒模型；`border-box`怪异盒模型。
- 3、**offsetWith**是由`padding` + `border` + `content`三部分组成。
- 4、相邻元素的垂直外边距（margin-top和margin-bottom）会重叠（取决于大的margin），空标签也会重叠。


### 2、margin-left、margin-top、margin-right、margin-bottom负值区别？

- 1、`margin-top`和`margin-left`负值，元素向上、向左移动
- 2、`margin-right`负值，右侧元素左移，自身不受影响
- 3、`margin-bottom`负值，下方元素上移，自身不受影响


### 3、圣杯布局和双飞翼布局的技术总结（考察float属性）

- 1、使用`float`布局
- 2、两侧使用margin负值，以便和中间内容横向重叠
- 3、防止中间内容被两侧覆盖，一个用`padding`为两侧留白  一个用`margin`为两侧留白
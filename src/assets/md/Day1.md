# Day1 

## 上午

制作一个12刻度的时钟。

### Setp1 画圆

```css
border-radius: 50%;
```

### Step2 画刻度

刻度由1-12组成，由js循环创建12个元素，然后使用position给每个元素分别定位，具体位置由三角函数计算

```js
for i 1->12
let x=center.x+r * Math.sin(i * 30 * Math.PI / 180);
let y=center.x-r * Math.cos(i * 30 * Math.PI / 180);
el.style = `top:${y}px;left:${x}px`;//为ES6新写法
```

### Step3 画时针

时针分为时分秒三个针，三个针需要绕中心旋转，使用css设置

```css
transform-origin: center bottom;
```

在js里面需要动态获取当前时间，并计算时分秒。

```js
function update() //s m h分别为当前秒数、分数、小时数
second.style = `transform:rotate(${s * 6}deg)`;
minute.style = `transform:rotate(${(m+s/60)*6}deg)`;
hour.style = `transform:rotate(${(h+m/60+s/3600)*30}deg)`;
```

然后使用setInterval(update,1000)方法，每过一秒就调用update函数。

## 下午

配置nodejs和vue，创建第一个Vue项目...

## 晚上

尝试几个简单的Vue项目

- CountAdd，数字自动变化

  ```javascript
  mounted() {
      setInterval(() => {
          this.count++;
      }, 1000)
  },
  ```

- ClickAdd，数字点击变化

  ```javascript
  add(){
      this.count++;
  },
  ```

- ClickColorChange，点击变换颜色

```javascript
 changeColor(){
     this.nowColor = this.nowColor==='red'?'aqua':'red';
     }
```

- 红绿灯，点击按钮红灯熄绿灯亮或者绿灯熄红灯亮

```javascript
click:function () {
    this.colors.color1 = this.colors.color1==='red'?'gray':'red';
    this.colors.color2 = this.colors.color2==='green'?'gray':'green';
}
```

- 按钮，点击按钮切换显示

  ![image-20210617094412848](C:\Users\miko\AppData\Roaming\Typora\typora-user-images\image-20210617094412848.png)

  ![image-20210617094424174](C:\Users\miko\AppData\Roaming\Typora\typora-user-images\image-20210617094424174.png)

  ```html
  <div :class="'board ' + nowBoard" @click="change">
      <span :class="'point '+ nowPoint"></span>
  </div>
  <div class="test"></div>
  ```

  ```javascript
  change: function () {
      this.nowBoard = this.nowBoard === 'board-on' ? 'board-off' : 'board-on';
      this.nowPoint = this.nowPoint === 'point-on' ? 'point-off' : 'point-on';
  }
  ```

```css
.board {
    display: flex;
    align-items: center;
    width: 100px;
    height: 40px;
    border-radius: 30px;
}
.board-on {
    background-color: #1890ff;
}
.board-off {
    background-color: #ccc;
}
.point {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    line-height: 40px;
    transition: all .5s ease;
}
.point-on {
    left: 1px;
}
.point-off {
    left: 59px;
}
```
# r-gauger
#### wonderfull and powerfull Reactjs gauge width unlimit style
all of this examples created by r-gauger

![GitHub Logo](/images/demo.jpg)

### Install
```npm install r-gauger```
### Usage
ES6: <br>
```import Gauge from 'r-gauger;'``` <br>
ES5: <br>
```var Gauge = require('r-gauger');```
### Step By Step Tutorial

## Step1 : start and end props
Prop  | Type   | Default | Description
----- | ------ | ------- | -----------
start | number | 0       | Set Start Of Gauge Range
end   | number | 100     | Set End Of Gauge Range

```javascript
<Gauge 
  start={0}
  end={120}
/>
```

## Step2 : ranges props

Prop   | Type             | Default  | Description 
------ | ---------------- | -------- | --------
ranges | Array of objects | Optional | Set Colorfull ranges of gauge 

##### each object properties
Property | Type             | Default  | Description 
-------- | ---------------- | -------- | --------
value    | number           | Required | end value of range
color    | string(color)    | "#000"   | color of range

```javascript
...
ranges={[
  {value:70,color:"#13e1f9"},
  {value:110,color:"#ff090f"},
  {value:120,color:"#f5c125"}
]}
...
```

![GitHub Logo](/images/1.jpg)

## Step3 : style props
Prop | Description | Type | Default
---- | ----------- | ---- | --------
style | Set Css style of gauge | Css Object | Optional
```
...
style={{width:200,height:200,background:"#eeeeee",border:'1px solid #ccc',borderRadius:'5px'}}
...
```

![GitHub Logo](/images/style.jpg)

## Step4 : angle props

Prop | Description | Type | Default
---- | ----------- | ---- | --------
angle | Set angle of gauge | number between 90 and 360 | 180

```
...
angle:270,
...
```

![GitHub Logo](/images/angle.jpg)

## Step5 : thickness props

Prop | Description | Type | Default
---- | ----------- | ---- | --------
thickness | Set thickness of gauge ranges | number | 10

```
...
thickness:4,
...
```

![GitHub Logo](/images/thickness.jpg)

## Step6 : radius props

Prop | Description | Type | Default
---- | ----------- | ---- | --------
radius | Set radius of gauge ranges | number | 70

```
...
radius:88,
...
```

![GitHub Logo](/images/radius.jpg)

## Step7 : label props

props | type | Description | Default  
----- | ---- | ----------- | -----
label | object | set labels of gauge | Optional 

label style with object type: 

``` 
... 
label:{
  step:20, //distance between each 2 labels, type=number
  style:{ //styling labels, type=object or function(here use object)
    color:"#909090", //color of labels, type=string
    fontSize:8, //font size of labels, type=number 
    offset:61 //distance of labels from center, type=number
  }
},
...
```

![GitHub Logo](/images/label.jpg)

label style with function type:
``` 
... 
label={{
  step:20,
  style:function(value,props){ //use functional style, parameters = (value : value of label, props : all gauge props)
    var color;
    for(var i = 0; i < props.ranges.length; i++){
      if(value <= props.ranges[i].value){
        color = props.ranges[i].color;
        break;
      }
    }
    return {
      color,
      fontSize:8,
      offset:61
    }
  }
}}
...
```

![GitHub Logo](/images/label-2.jpg)

## Step8 : scale props

props | type | Description | Default  
----- | ---- | ----------- | -----
scale | object | set scales of gauge | Optional 

props | type | Description | default  
----- | ---- | ----------- | -----
scale | object | set scales of gauge | Optional 

scale style with object type:

``` 
... 
scale={{
  step:5, //distance between each 2 scales, type=number
  style:{ //styling scales, type=object or function
    color:"#b4b4b4", //color of scales, type=string
    width:1, //width of scales, type=number
    height:10, //height of scales, type=number
    offset:70 //distance of scales from center, type=number
  }
}}
...
```

![GitHub Logo](/images/scale-1.jpg)

scale style with function type:

```
...
scale={{
  step:5,
  style:function(value,props){
    var height = value % 10 === 0?10:5;
    var offset = value % 10 === 0?70:75;
    var width = value % 10 === 0?2:1;
    return {
      color:"#b4b4b4",
      width,
      height,
      offset
    }
  }
}}
...
```

![GitHub Logo](/images/scale-2.jpg)

## Step8 : circles props

props | type | Description | Default  
----- | ---- | ----------- | -----
circles | Array Of Objects | design gauge by circles | Optional

```
...
circles={[
  {
    lineWidth:1, //line width of circle, type=number
    stroke:"#b4b4b4", //stroke color of circle, type=string, default='#000'
    radius:80, //radius of circle, type=number
    slice:true //slicing circle or not, type=boolean, default=false
  },
  {
    fill:"#e5e5e5", //set fill color of circle, type=string, default='#000'
    stroke:'#aaa',
    radius:50,
    slice:false
  }
]}
...
```

![GitHub Logo](/images/circles.jpg)

## Step9 : handle props

props | type | Description | Default  
----- | ---- | ----------- | -----
handle | Object or Array Of Objects | Set Handles of Gauge | Optional

Set one handle (Object)
```
...
handle={{
  value:30, //value of handle, type=number, required
  style:{ //styling handle
    width:4, //width of handle, type=number, default=4
    height:58, //height of handle, type=number, default=calculate by component
    radius:5, //radius of circle of handle center, type=number, default=4
    offset:0, //distance of handle from center, type=number, default=0
    color:"#666666" //color of handle, type=string, default='#000'
  }
}}
...
```

![GitHub Logo](/images/handle-1.jpg)

Set 2 handles (Array Of Objects)

```
...
handle={[
  {
    value:30,
    style:{
      width:4,
      height:58,
      radius:5,
      offset:0,
      color:"#666666"
    }
  },
  {
    value:50,
    style:{
      width:12,
      height:-10,
      radius:0,
      offset:99,
      color:"blue"
    }
  }
]}
...
```

![GitHub Logo](/images/handle-2.jpg)

## Step10 : text props

props | type | Description | Default  
----- | ---- | ----------- | -----
text | Object Or Array Of Objects | Set Texts of Gauge | Optional

Set 2 text

```
...
text:[
  {
    value:"My Gauge", //value of text, type=string or function(here use string)
    style:{
      fontSize:12, //font size of text, type=number, default=10
      top:74, //top of text, type=number, default=20
      left:0, //left of text, type=number, default=0
      color:"#000000", //color of text, type=string, default='#000'
      rotate:0  //rotate angle of text, type=number between 0 and 360, default=0
    }
  },
  {
    value:function(props){ //value of text, type=string of function(here use function)
      return props.handle[0].value;
    },
    style:{
      fontSize:20,
      top:24,
      left:0,
      color:"#000000",
      rotate:0
     }
  },
],
...
```

![GitHub Logo](/images/text.jpg)

## Step11 : direction props

props | type | Description | Default  
----- | ---- | ----------- | -----
direction | string | set direction of gauge('clock' or 'clockwise') | 'clock'

```
...
direction='clockwise'
...
```

![GitHub Logo](/images/direction.jpg)

## Step12 : position props

props | type | Description | Default  
----- | ---- | ----------- | -----
position | array width 2 member(left,top) | set left and top of gauge | ['50%','50%']

```
...
position={['50%',190]}
...
```

## Step13 : rotate props

props | type | Description | Default  
----- | ---- | ----------- | -----
rotate | number between 0 and 360 | set rotation of gauge | 0

```
...
rotate={90}
...
```

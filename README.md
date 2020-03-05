# r-gauger

![GitHub Logo](/images/demo.jpg)

### Install
```npm install r-gauger```
### Usage
ES6: <br>
```import RGauger from 'r-gauger;'``` <br>
ES5: <br>
```var RGauger = require('r-gauger');```
### Step By Step Tutorial

## Step 1:start and end props
```
<RGauger 
  start={0} //Set Start Of Gauge Range, type = number, default = 0
  end={120} //Set End Of Gauge Range, type = number, default = 100
/>
```
## Step 2:ranges props
Prop | Description | Type | Required
---- | ----------- | ---- | --------
ranges | Set Colorfull ranges of gauge | Array | Optional
```
...
ranges={[
  {
    value:70, //end value of range, type=number, required 
    color:"#13e1f9" //color of range, type=string, default='#000'
  },
  {
    value:110,
    color:"#ff090f"
  },
  {
    value:120,
    color:"#f5c125"
  }
]}
...
![GitHub Logo](/images/ranges.jpg)

## Step 3:style props
Prop | Description | Type | Required
---- | ----------- | ---- | --------
style | Set Css style of gauge | Css Object | Optional
```
...
style={{width:200,height:200,background:"#eeeeee",border:'1px solid #ccc',borderRadius:'5px'}}
...
```
![GitHub Logo](/images/style.jpg)
## Step 4:angle props
Prop | Description | Type | Required
---- | ----------- | ---- | --------
angle | Set angle of gauge | number between 90 and 360 | 180
```
...
angle:270,
...
```
![GitHub Logo](/images/angle.jpg)
## Step 5:thickness props
Prop | Description | Type | Required
---- | ----------- | ---- | --------
thickness | Set thickness of gauge ranges | number | 10
```
...
thickness:4,
...
```
![GitHub Logo](/images/thickness.jpg)
## Step 6:radius props
Prop | Description | Type | Required
---- | ----------- | ---- | --------
radius | Set radius of gauge ranges | number | 70
```
...
radius:88,
...
```
![GitHub Logo](/images/radius.jpg)


## Step 7:label props
props | type | Description | default  
----- | ---- | ----------- | -----
label | object | set labels of gauge | Optional 
``` 
... 
label:{
  step:20, //distance between each 2 labels, type=number
  style:{ //styling labels, type=object
    color:"#909090", //color of labels, type=string
    fontSize:8, //font size of labels, type=number 
    offset:61 //distance of labels from center, type=number
  }
},
...
```
![GitHub Logo](/images/label.jpg)
## Step 8:scale props
props | type | Description | default  
----- | ---- | ----------- | -----
scale | object | set scales of gauge | Optional 
``` 
... 
## Step 7:scale props
props | type | Description | default  
----- | ---- | ----------- | -----
scale | object | set scales of gauge | Optional 
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

set functional style of scales
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
## Step 8:circles props
props | type | Description | default  
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
## Step 9:handle props
props | type | Description | default  
----- | ---- | ----------- | -----
handle | Object or Array Of Objects | Set Handles of Gauge | Optional
Use one handle (object)
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
![GitHub Logo](/images/circles.jpg)








...
```
![GitHub Logo](/images/label.jpg)


## Step4:angle props
props | type | Description | default  
----- | ---- | ----------- | -----
angle | number between 60 and 360 | set angle of gaguge | 300 
``` 
... 
  angle=150
...
```
![GitHub Logo](/images/3.jpg)

## Step5:label props
Props | Type | Description | Default  
----- | ---- | ----------- | -----
label | Object | set labels of gauge | 

label property | Type | Description | Default
-------------- | ---- | ----------- | -------
step | number | spece between each 2 labels | Required
style | object | styling labels | will calculate by component
``` 
... 
  label={{
    step:10,
  }}
...
```
![GitHub Logo](/images/4.jpg)

style property | Type | Description | Default
-------------- | ---- | ----------- | -------
color | string | set color of labels | '#000'
fontSize | number | set font size of labels | 10
offset | number | set distance of labels from center | will calculate by component

``` 
... 
  label={{
    step:20,
    style:{fontSize:12,color:'#aaa',offset:90}
  }}
...
```
![GitHub Logo](/images/5.jpg)
## Step6:scale props
Props | Type | Description | Default  
----- | ---- | ----------- | -----
scale | Object | set scales of gauge | 

scale property | Type | Description | Default
-------------- | ---- | ----------- | -------
step | number | spece between each 2 scales | Required
style | object or function | styling scales | will calculate by component
``` 
... 
  scale={{
    step:5,
  }}
...
```
![GitHub Logo](/images/6.jpg)

style property | Type | Description | Default
-------------- | ---- | ----------- | -------
color | string | set color of scale | '#000'
width | number | set width of scales | 1
height | number | set height of scales | 1
offset | number | set distance of labels from center | will calculate by component

``` 
... 
  scale:{
    step:5,
    style:{
      width:2,height:6,color:'#aaa',offset:12
    }
  }
...
```
![GitHub Logo](/images/7.jpg)

Dynamic styling scales. scale.style can be a function that receive value of current scale and all props ass parameters.

```
...
scale:{ 
  step:5,
  style:function(value,props){
    var width = value % 10 === 0?2:1;
    var height = value % 10 === 0?6:3;
    var offset = value % 10 === 0?12:10;
    var color;
    for(var i = 0; i < props.ranges.length; i++){
      if(value <= props.ranges[i].value){
        color = props.ranges[i].color;
        break;
      }
    }
    return {
      width,height,offset,color
    }
  }
}
...
```

![GitHub Logo](/images/8.jpg)

## Step7:handle props
Props | Type | Description | Default  
----- | ---- | ----------- | -----
handle | Object Or Array Of Objects  | set handles of gauge | 

hanle property | Type | Description | Default
-------------- | ---- | ----------- | -------
value | number | Value Of Handle | Required
style | object | styling handle | will calculate by component
``` 
... 
  handle={{
    value:30,
  }}
...
```
![GitHub Logo](/images/9.jpg)
Styling Handle

style property | Type | Description | Default
-------------- | ---- | ----------- | -------
color | string | Set color of handle | '#000'
width | number | Set width of handle | 4
height | number | Set height of handle | Will calculate by component
offset | number | Set distance of handle from center | will calculate by component
radius | number | Set radius of handle circle | 4

``` 
... 
  handle:{
    value:30,
    style:{color:'#555',width:8,height:60,radius:8}
  }
...
```
![GitHub Logo](/images/10.jpg)

use multi handle
```
...
handle:[
  {
    value:30,
    style:{color:'#555',width:12,height:60,radius:10}
  },
  {
    value:60,
    style:{color:'red',width:16,height:10,radius:0,offset:57}
  },
]
...
```
![GitHub Logo](/images/11.jpg)

## Step8:text props

Props | Type | Description | Default  
----- | ---- | ----------- | -----
text | Array Of Objects  | Use texts in gauge | 

text property | Type | Description | Default  
--------------- | ---- | ----------- | -----
value | number or string or function | Set text of gauge |
fontSize | number | Set font size of text | 10
color | string | Set color of text | '#000'
top | number | Set top of text from center | 20
left | number | Set left of text from center | 0
rotate | number between 0 and 360 | Set rotate angle of text | 0

```
...
text={[
  {
    value:'My Gauge',
    fontSize:20,
    
  }
]}
...
```
![GitHub Logo](/images/12.jpg)


## Step8:circles props

Props | Type | Description | Default  
----- | ---- | ----------- | -----
circles | Array Of Objects  | Use circles for design gauge | 

circle property | Type | Description | Default  
--------------- | ---- | ----------- | -----
radius | number | Set radius of circle |
stroke | string | Set stroke color of circle |
fill | string | Set fill color of circle |
slice | boolean | Set slicing circle or not | false

```
...
circles:[
  {radius:99,stroke:'#aaa',slice:true},
  {radius:30,fill:'#ccc',slice:false},        
]
...
```
![GitHub Logo](/images/12.jpg)

## Step9:style props

Props | Type | Description | Default  
----- | ---- | ----------- | -----
style | Css Objects  | Set style of gauge | 

```
...
style:{
  border:'1px solid',borderRadius:'8px',background:'#eee',width:'230px'
}
...
```
![GitHub Logo](/images/13.jpg)

## Step10:position props

Props | Type | Description | Default  
----- | ---- | ----------- | -----
position | Array  | Set position(top and left) of gauge | ['50%','50%'] 

```
...
position:['50%',130]
...
```
in this props we set top of gauge to center of container(130) 

![GitHub Logo](/images/14.jpg)

## Step11:offsetAngle props

Props | Type | Description | Default  
----- | ---- | ----------- | -----
offsetAngle | number between 0 and 360  | Use for rotate gauge | 0 

```
...
offsetAngle={45}
...
```
![GitHub Logo](/images/15.jpg)

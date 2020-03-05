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

## Step1
```<RGauger />```
## Step2:ranges props
props | type | Description | default  
----- | ---- | ----------- | -----
ranges | Array Of Objects | set ranges by value and color | 
``` 
... 
  ranges={[
     {value:33,color:'red'},
     {value:66,color:'orange'},
     {value:100,color:'yellow'},
  ]}
...
```
![GitHub Logo](/images/1.jpg)
## Step3:thickness props
props | type | Description | default  
----- | ---- | ----------- | -----
thickness | number | set thickness of ranges arc | 10 
``` 
... 
  thickness=4
...
```
![GitHub Logo](/images/2.jpg)
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

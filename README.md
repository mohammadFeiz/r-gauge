# r-gauger

### Install
```npm install r-gauger```
### Usage
ES6: <br>
```import RGauger from 'r-gauger;'``` <br>
ES5: <br>
```var RGauger = require('r-gauger');```
### Step By Step Tutorial

#### Step1
```<RGauger />```
#### Step2:ranges props
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
#### Step3:thickness props
props | type | Description | default  
----- | ---- | ----------- | -----
thickness | number | set thickness of ranges arc | 10 
``` 
... 
  thickness=4
...
```
![GitHub Logo](/images/2.jpg)
#### Step4:angle props
props | type | Description | default  
----- | ---- | ----------- | -----
angle | number between 60 and 360 | set angle of gaguge | 300 
``` 
... 
  angle=150
...
```
![GitHub Logo](/images/3.jpg)

#### Step5:label props
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
#### Step6:scale props
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
  style:function(value){
    var height = value % 10 === 0?6:3;
    var offset = value % 10 === 0?12:10;
    return {
      width:2,height,color:'#aaa',offset
    }
  }
}
...
```

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
#### Step2
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
#### Step3
props | type | Description | default  
----- | ---- | ----------- | -----
thickness | number | set thickness of ranges arc | 10 
``` 
... 
  thickness=4
...
```
![GitHub Logo](/images/2.jpg)
#### Step5
Props | Type | Description | Default  
----- | ---- | ----------- | -----
label | Object | set labels of gauge | 

label property | Type | Description | Default
-------------- | ---- | ----------- | -------
step | number | spece between each 2 labels | Required
style | object | styling labels | will calculate by component

style property | Type | Description | Default
-------------- | ---- | ----------- | -------
color | string | set color of labels | '#000'
fontSize | number | set font size of labels | 10
offset | number | set distance of labels from center | will calculate by component


``` 
... 
  label={{
    step:10,
    style:{
    }
  }}
...
```
![GitHub Logo](/images/2.jpg)

import React ,{Component}from 'react';
import RCanvas from 'r-canvas';

export default class RGauger extends Component{
  constructor(props){
    super(props);
    this.getDetails();
  }
  getPercentByValue(value,start,end){return 100 * (value - start) / (end - start)}
  getDetails(){
    var {angle,start,end} = this.props;
    this.startAngle = 270 - angle / 2;
    this.scales = this.getScales();
    this.labels = this.getLabels();
    this.slice = [this.getAngleByValue(start),this.getAngleByValue(end)];
    this.circles = this.getCircles();
  }
  getAngleByValue(value){
    var {start,end,angle,offsetAngle,direction} = this.props;
    var percent = this.getPercentByValue(value,start,end);
    return this.startAngle + angle / 100 * percent + offsetAngle + (direction === 'clockwise'?180:0);
  }
  
  getRanges(){
    var {ranges = [],radius,thickness} = this.props;
    if(!thickness){return []}
    var Ranges = (typeof ranges === 'function'?ranges(this.props):ranges).map((r)=>{ 
      let {value,color} = r;
      value = parseFloat(value); 
      return {color,angle:this.getAngleByValue(value)}
    })
    var circles = [];
    for(var i = 0; i < Ranges.length; i++){
      var {color,angle} = Ranges[i];
      var startAngle = i === 0?this.getAngleByValue(this.props.start):Ranges[i - 1].angle;
      var endAngle = angle;
      circles.push({r:radius,slice:[startAngle,endAngle],stroke:color,lineWidth:thickness})
    }
    return circles;
  }
  getCircles(){
    var {circles} = this.props;
    if(!circles || circles.length === 0){return []}
    return circles.map((c)=>{
      let {radius:r=20,color:stroke = '#555',lineWidth = 1} = c;
      return {r:c.radius,lineWidth:c.lineWidth,stroke:c.stroke,fill:c.fill,slice:c.slice?this.slice:undefined}
    });

  }
  getLabels(){
    var labels = [];
    var {start,end,label,radius,thickness,angle:mainAngle} = this.props;
    var {step,style = {},edit} = label;
    var Style = typeof style === 'function'?(value)=>{style(value,this.props)}:()=>{return style;}
    if(!step){return [];}
    var value = start;
    while(value <= end){
      var {fontSize = 10,offset,color = '#000'} = Style(value);
      var pivot = offset?-offset:-(radius - thickness/2 - fontSize - 3);
      var angle = this.getAngleByValue(value);
      labels.push({text:edit?edit(value):value,fill:color,pivot:[pivot,0],rotate:angle,angle:-angle,fontSize})
      value+=step;
    } 
    if(mainAngle === 360 && labels[labels.length - 1].rotate % 90 === 0){labels.pop();}
    return labels;
  }
  getScales(){
    var scales = [];
    var {start,end,scale,radius,thickness} = this.props;
    var {step,style = {}} = scale;
    var Style = typeof style === 'function'?(value)=>{return style(value,this.props)}:()=>{return style;}
    if(!step){return [];}
    var value = start;
    while(value <= end){
      var {offset = 0,color = '#000',width,height = 5} = Style(value);
      var angle = this.getAngleByValue(value);
      scales.push({stroke:color,points:[[0,0],[height,0]],lineWidth:width,pivot:[-(radius - height - thickness / 2 + offset),0],rotate:angle,})
      value+=step;
    } 
    return scales;
  }
  getHandles(){
    var {handle} = this.props;
    if(!handle){return [];}
    return Array.isArray(handle)?handle.map((h)=>this.getHandle(h)):[this.getHandle(handle)];
  }
  getHandle(handle){
    var {start,end,radius,thickness} = this.props;
    var {value = false,style = {}} = handle;
    var Style = typeof style === 'function'?(value)=>{style(value,this.props)}:()=>{return style;}
    var {offset = 0,color = '#000',width = 4,height = (radius - thickness/2),radius:handleRadius=4} = Style(value);
    var angle = this.getAngleByValue(value);
    return { 
      items:[
        {fill:color,points:[[0,-width / 2],[height,0],[0,width / 2]],lineWidth:width,pivot:[-offset,0],rotate:angle,close:true},
        {r:handleRadius,fill:color}
      ] 
    }
  }
  getTexts(){
    var {text} = this.props;
    if(!text){return [];}
    var texts = Array.isArray(text)?text.map((t)=>this.getText(t)):[this.getText(text)];
    return texts;
  } 
  getText(text){
    var {value,style = {}} = text;
    var Style = typeof style === 'function'?style(this.props):style;
    var {top = 20,left = 0,fontSize = 10,color = '#000',rotate = 0} = Style;
    return {
      text:typeof value === 'function'?value(this.props):value,x:left,y:top,rotate,fontSize,fill:color
    }
  }
  getItems(){return this.props.customShapes.concat(this.circles,this.getRanges(),this.labels,this.scales,this.getTexts(),this.getHandles())} 
  getStyle(){
    var Style = {...this.props.style};
    Style.width = Style.width || '200px';
    Style.height = Style.height || '200px';
    return Style;
  }
  render(){
    var {dynamic,position,direction,id,className} = this.props;
    if(dynamic){this.getDetails();}
    return (
      <RCanvas className={`r-gauger${className?' ' + className:''}`} id={id} items={this.getItems()} style={this.getStyle()} axisPosition={position} rotateSetting={{direction:direction === 'clockwise'?'clockwise':'clock'}}/>
    )
  }
}
RGauger.defaultProps = {angle:300,offsetAngle:0,start:0,end:100,thickness:10,radius:70,label:{},scale:{},direction:'clock',position:['50%','50%'],customShapes:[]}
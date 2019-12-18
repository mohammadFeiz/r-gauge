import React,{Component} from 'react';
import Canvas from 'r-canvas';
import $ from 'jquery';
export default class RGauge extends Component{
  constructor(props){
    super(props);
    this.maxHeight = 0;
    this.setStaticValues();
    var {range,pointer = [],pin,label,ranges,animate} = this.props;
    pointer = JSON.parse(JSON.stringify(pointer));
    this.state= {
      pointer:animate?pointer.map((p)=>{p.value = range[0]; return p}):pointer,
      prevPin:JSON.stringify(pin),
      prevLabel:JSON.stringify(label),
      prevRanges:JSON.stringify(ranges),
      getValue:this.getValue.bind(this),
      animate:this.animate.bind(this),
      setStatics:this.setStatics.bind(this)
    }
    this.setStatics();
  }
  setStatics(){
    this.getRanges();
    this.getPins();
    this.labels = this.getLabels();
  }
  static getDerivedStateFromProps(props,state){
    if(JSON.stringify(props.pointer) !== state.prevPointer){
      state.animate(props.pointer.map((p)=>{return state.getValue(p.value)}));
      return {prevPointer:JSON.stringify(props.pointer)}
    }
    if(JSON.stringify(props.pin) !== state.prevPin || 
    JSON.stringify(props.label) !== state.prevLabel || 
    JSON.stringify(props.ranges) !== state.prevRanges){
      state.setStatics();
      return {
        prevPin:JSON.stringify(props.pin),
        prevLabel:JSON.stringify(props.label),
        prevRanges:JSON.stringify(props.ranges)
      }
    }
    return null;
  }
  animate(val){
    clearInterval(this.interVal);
    var {pointer} = this.state;
    var sign = pointer.map((p,i)=>{return Math.sign(val[i] - p.value) * Math.ceil(Math.abs(val[i] - p.value) / 40)});
    var newValue = pointer;
    var clear = newValue.map(()=>{return false;})
    this.interval = setInterval(()=>{
      for(var i = 0; i < newValue.length; i++){
        if(clear[i]){continue;}
        newValue[i].value+=sign[i];
        if(sign[i] > 0){
          if(newValue[i].value >= val[i]){
            clear[i] = true;
            newValue[i].value = val[i];
            console.log(newValue);
          }
        }
        else{
          if(newValue[i].value <= val[i]){
            clear[i] = true;
            newValue[i].value = val[i];
          }
        }
      }
      if(clear.indexOf(false) == -1){clearInterval(this.interval);}
      this.setState({value:newValue})
    },40);
  }
  setStaticValues(){
    var {style,direction,thickness} = this.props;
    var {padding = 0,angle = 180,radius = 100} = style;
    this.sin = Math.sin((angle - 180) / 2 * Math.PI / 180);
    this.cos = Math.cos((180 - angle) / 2 * Math.PI / 180);
    this.startAngle = 90 - angle/2;
    if(angle < 180){this.width = 2 * radius * this.cos; this.height = radius;}
    else{this.width = radius * 2; this.height = radius * (this.sin + 1) + 16;}
    this.rangeRadius = radius - thickness / 2 - padding;
    this.angleOffset = direction === 'clock'?180:0;
  }
  getAngleByValue(value){
    var {range,style} = this.props;
    var [start,end] = range,{angle = 180} = style;
    return (value - start) * angle / (end - start) + this.startAngle;
  }
  getStyle(){
    return {width:this.width,height:this.height};
  }
  getValue(value){
    var val;
    var [start,end] = this.props.range;
    if(value === undefined){val = start}
    if(typeof value === 'number'){val = value;}
    else{
      if(value.indexOf('%') !== -1){
        var range = end - start;
        val = range * parseFloat(value) / 100 + start;
      }
      else{
        val = parseFloat(value);
      }
    }
    val = val > end?end:val; 
    val = val < start?start:val;
    return val;
  }
  getPinColor(val){
    for(var i = 0; i < this.ranges.length; i++){
      var {value,stroke} = this.ranges[i];
      if(val <= value){
        return stroke; 
      }
    }
  }
  getRanges(){
    var {range,pinStyle,ranges,style,thickness} = this.props;
    var {padding = 0,angle = 180,radius = 100} = style;
    var [start,end] = range;
    this.ranges = [];
    for(var i = 0; i < ranges.length; i++ ){
      var [value,stroke = '#000'] = ranges[i].split(' ');
      var beforeValue = i === 0? start:this.ranges[i - 1].value;
      value = this.getValue(value);
      var s = this.getAngleByValue(beforeValue);
      var e = this.getAngleByValue(value);
      this.ranges.push({
        type:'arc',stroke,slice:[s + this.angleOffset,e + this.angleOffset],
        r:this.rangeRadius,lineWidth:thickness,value
      });
    }
  }
  getPins(value){ 
    var {pin,range,style:GS,thickness} = this.props;
    var {padding = 0,radius = 100} = GS;
    this.pins = [];
    if(!pin){return;}
    var [start,end] = range;
    var {step,style} = pin;
    var value = Math.round((start - step) / step) * step; 
    value = value < start ?start:value;  
    this.minPin = 1000;
    var getStyle,defaultStyle = {width:1,height:6,offset:thickness};
    if(typeof style === 'function'){
      getStyle = function(value){return $.extend({},defaultStyle,style(value))};
    }
    else{
      var computedStyle = $.extend({},defaultStyle,style);
      getStyle = function(){return computedStyle};
    }
    while (value <= end) {
        var {offset,color = this.getPinColor(value),width,height} = getStyle(value);
        var r = radius - height / 2 - offset - padding;
        this.minPin = Math.min(this.minPin,r - height / 2);
        var angle = this.getAngleByValue(value);
        this.pins.push({type:'arc',x:0,y:0,stroke:color,slice:[angle - width/2 + this.angleOffset,angle + width / 2 + this.angleOffset],r,lineWidth:height});    
        value += step;
    } 
  }
  getLabels(){
    var {label,range,style:GS,thickness} = this.props,labels = [];
    var {angle = 180,radius = 100,direction} = GS;
    var [start,end] = range;
    var {step,style} = label;
    var value = Math.round((start - step) / step) * step; 
    value = value < start ?start:value;  
    while (value <= end) {
        var Style = $.extend({},{},typeof style === 'function'?style(value):style);
        var {color = '#000',fontSize=10,offset} = Style;
        offset = offset || ((this.minPin || radius - thickness) - 10);
        var ang = this.getAngleByValue(value);
        labels.push({
          type:'text',fill:color,text:value,fontSize,
          textBaseLine:'middle',pivot:{x:-offset,y:0},rotate:ang + this.angleOffset,angle:-ang + this.angleOffset
        });    
        value += step;
    }
    if(angle === 360 && labels[labels.length - 1].rotate === 270){//prevent meeting first and last label
      labels.pop();
    }
    return labels; 
  }
  getText(){
    var {title,style} = this.props;
    if(!title){return []}
    var {width,height} = this;
    var {text,x = 0,y = 0,color='#000',fontSize=14} = title;
    text = typeof text === 'function'?text({pointer:this.state.pointer,ranges:this.props.ranges}):text;
    return {type:'text',x,y,text,fill:color,fontSize,rotate:this.angleOffset}
  }
  getItems(){
    var {pinStep,ranges = [],style} = this.props;
    var {radius = 100} = style;
    
    var {pointer} = this.state;
    var pins = this.pins;
    var rngs = this.ranges;
    var handle = this.getHandle();
    var labels = this.labels;
    var text = this.getText(); 
    var circles = pointer.map((p,i)=>{
      return {type:'arc',x:0,y:0,r:this.handleRadius[i],fill:this.handleColor[i]}
    })
    return rngs.concat(pins,handle,circles,labels,text);
  }
  getHandle(){
    var {range,style,thickness} = this.props; 
    var {padding = 0,radius = 100} = style;
    var {pointer} = this.state;
    var [start,end] = range;
    this.handleColor = [];
    this.handleRadius = [];
    return pointer.map((p,i)=>{
      var {width = 2,height = radius - thickness - padding,color = '#000',radius:r = radius / 20,offset = 0,value} = p;
      this.handleColor.push(color);
      this.handleRadius.push(r);
      return {
        lineWidth:width,
        type:'line',
        fill:color,
        points:[
          {x:0,y:0},{x:0,y:width/2},{x:height,y:0},{x:0,y:-width/2} 
        ],
        pivot:{x:-offset,y:0},
        rotate:this.getAngleByValue(value) + this.angleOffset
      }
    })
  }
  getContainerStyle(style){
    return $.extend({},{
      display:'inline-flex',
      justifyContent:'center',
      alignItems:'center',
    },style);
  }
  render(){
    var {ranges = [],id,className,style,direction} = this.props;
    var {angle = 180,radius = 100} = style;
    
    return(
      <div className={`r-gauge${className?' ' + className:''}`} id={id} style={this.getContainerStyle()}>
        <Canvas 
          style={this.getStyle()}
          items={this.getItems()}
          rotateSetting={{direction}}
          axisPosition={{y:radius - this.sin+'px'}}
        />
      </div>
    );
  }
} 
RGauge.defaultProps = {
  range:[0,100],ranges:['100 red'],text:'',style:{angle:180,radius:50,padding:0},label:{},direction:'clockwise',thickness:10,pointer:[{value:0,color:'#000'}]
}
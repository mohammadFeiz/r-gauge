import React,{Component} from 'react';
import Canvas from 'r-canvas';
import $ from 'jquery';
export default class RGauge extends Component{
  constructor(props){
    super(props);
    this.state = {
      values:props.pointer.map((p)=>props.start),
      first:true,
      clear:this.clear.bind(this),
      update:this.update.bind(this)
    };
    this.setStatics();
  }
  static getDerivedStateFromProps(props,state){
    if(state.first){ //اولین اجرا
      state.update();
      return {
        first:false,
        values:props.pointer.map((p)=>props.start),
      };
    }
    state.clear();
    state.update();
    return null
  }
  clear(){
    clearInterval(this.interval);
  }
  update(){
    var {animate,pointer,start,end} = this.props;
    var {values} = this.state;
    var step = animate?(end - start) * 2 /100:end - start;
    values = JSON.parse(JSON.stringify(values))
    this.interval = setInterval(()=>{
      var clear = [];
      for(var i = 0; i < values.length; i++){
        var target = pointer[i].value;
        if(values[i] < target){//اگر کمتر از مقدار نهایی بود
          values[i]+=step; //اضافه کن
          if(values[i] > target){values[i] = target; clear.push(true);}
          else{clear.push(false)}
        }
        else if(values[i] > target){
          values[i]-=step; //کم کن
          if(values[i] < target){values[i] = target; clear.push(true);}
          else{clear.push(false)}
        }
        else{clear.push(true);}        
      }
      console.log(clear)
      if(clear.indexOf(false) === -1){this.clear();}
      this.setState({values})
    },20)
  }
  // update(){
  //   var {pointer} = this.props;
  //   var {values} = this.state;
  //   values = JSON.parse(JSON.stringify(values))
  //   this.interval = setInterval(()=>{
  //     var clear = [];
  //     for(var i = 0; i < values.length; i++){
  //       values[i]++;
  //       if(values[i] > pointer[i].value){
  //         values[i] = pointer[i].value;
  //         clear.push(true);
  //       }
  //       else{clear.push(false)}
        
  //     }
  //     console.log(clear)
  //     if(clear.indexOf(false) === -1){clearInterval(this.interval)}
  //     this.setState({values})
  //   },40)
  // }
  setStatics(){
    var {radius,angle} = this.props;
    this.sin = Math.sin((angle - 180) / 2 * Math.PI / 180);
    this.cos = Math.cos((180 - angle) / 2 * Math.PI / 180);
    if(angle < 180){this.width = 2 * radius * this.cos; this.height = radius;}
    else{this.width = radius * 2; this.height = radius * (this.sin + 1) + 16;}
    this.getRanges();
    this.getPins();
    this.getLabels();
    this.getCircles();
  }
  getAngleByValue(value){
    var {start,end,angle} = this.props;
    return (value - start) * angle / (end - start) + 90 - angle/2;
  }
  getStyle(){
    return {width:this.width,height:this.height};
  }
  getValue(value){
    var val;
    var {start,end} = this.props;
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
    var {start,end,pinStyle,ranges,clockwise,thickness,padding,radius} = this.props;
    this.ranges = [];
    var angleOffset = clockwise?0:180;
    for(var i = 0; i < ranges.length; i++ ){
      var [value,stroke = '#000'] = ranges[i].split(' ');
      var beforeValue = i === 0? start:this.ranges[i - 1].value;
      value = this.getValue(value);
      var s = this.getAngleByValue(beforeValue);
      var e = this.getAngleByValue(value);
      this.ranges.push({
        type:'arc',stroke,slice:[s + angleOffset,e + angleOffset],
        r:radius - thickness / 2 - padding,lineWidth:thickness,value
      });
    }
  }
  getPins(value){ 
    var {pin,start,end,clockwise,thickness,padding,radius} = this.props;
    this.pins = [];
    if(!pin){return;}
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
    var angleOffset = clockwise?0:180;
    while (value <= end) {
        var {offset,color = this.getPinColor(value),width,height} = getStyle(value);
        var r = radius - height / 2 - offset - padding;
        this.minPin = Math.min(this.minPin,r - height / 2);
        var angle = this.getAngleByValue(value);
        this.pins.push({type:'arc',x:0,y:0,stroke:color,slice:[angle - width/2 + angleOffset,angle + width / 2 + angleOffset],r,lineWidth:height});    
        value += step;
    } 
  }
  getLabels(){
    var {label,start,end,clockwise,thickness,radius,angle} = this.props;
    var {step,style} = label;
    var value = Math.round((start - step) / step) * step; 
    value = value < start ?start:value;  
    var angleOffset = clockwise?0:180;
    this.labels = [];
    while (value <= end) {
        var Style = $.extend({},{},typeof style === 'function'?style(value):style);
        var {color = '#000',fontSize=10,offset} = Style;
        offset = offset || ((this.minPin || radius - thickness) - 10);
        var ang = this.getAngleByValue(value);
        this.labels.push({
          type:'text',fill:color,text:value,fontSize,
          textBaseLine:'middle',pivot:{x:-offset,y:0},rotate:ang + angleOffset,angle:-ang + angleOffset
        });    
        value += step;
    }
    if(angle === 360 && labels[labels.length - 1].rotate === 270){//prevent meeting first and last label
      labels.pop();
    } 
  }
  getText(){
    var {title} = this.props;
    if(!title){return []}
    var {width,height} = this;
    var {text,x = 0,y = 0,color='#000',fontSize=14} = title;
    text = typeof text === 'function'?text({pointer:this.props.pointer,ranges:this.props.ranges}):text;
    return {type:'text',x,y,text,fill:color,fontSize}
  }
  getCircles(){
    var {radius,pointer} = this.props; 
    this.circles = [];
    for(var i = 0; i < pointer.length; i++){
      var {color = '#000',radius:r = radius / 20} = pointer[i];
      this.circles.push({type:'arc',r,fill:color})
    }
  }
  getHandles(){
    var {clockwise,thickness,padding,radius,pointer} = this.props; 
    var {values} = this.state;
    var handles = [];
    var angleOffset = clockwise?0:180;
    for(var i = 0; i < pointer.length; i++){
      var {width = 2,height = radius - thickness - padding,color:fill = '#000',radius:r = radius / 20,offset = 0} = pointer[i];
      handles.push({type:'line',fill,pivot:{x:-offset,y:0},
        points:[{x:0,y:0},{x:0,y:width/2},{x:height,y:0},{x:0,y:-width/2} ],
        rotate:this.getAngleByValue(values[i]) + angleOffset
      });
    }
    return handles;
  }
  getContainerStyle(style){
    return $.extend({},{
      display:'inline-flex',
      justifyContent:'center',
      alignItems:'center',
    },style);
  }
  render(){
    var {ranges = [],id,className,clockwise,radius} = this.props;
    return(
      <div className={`r-gauge${className?' ' + className:''}`} id={id} style={this.getContainerStyle()}>
        <Canvas 
          style={this.getStyle()}
          items={this.ranges.concat(this.pins,this.getHandles(),this.circles,this.labels,this.getText())}
          rotateSetting={{direction:clockwise?'clockwise':'clock'}}
          axisPosition={{y:radius - this.sin+'px'}}
        />
      </div>
    );
  }
} 
RGauge.defaultProps = {
  start:0,end:100,ranges:['100 red'],text:'',angle:180,label:{},pointer:[{value:0,color:'#000'}],clockwise:false,animate:true,thickness:10,padding:0,radius:50
}
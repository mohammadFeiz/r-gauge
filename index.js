"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rCanvas = _interopRequireDefault(require("r-canvas"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RGauge =
/*#__PURE__*/
function (_Component) {
  _inherits(RGauge, _Component);

  function RGauge(props) {
    var _this;

    _classCallCheck(this, RGauge);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RGauge).call(this, props));
    _this.state = {
      values: props.pointer.map(function (p) {
        return props.start;
      }),
      first: true,
      clear: _this.clear.bind(_assertThisInitialized(_this)),
      update: _this.update.bind(_assertThisInitialized(_this))
    };

    _this.setStatics();

    return _this;
  }

  _createClass(RGauge, [{
    key: "clear",
    value: function clear() {
      clearInterval(this.interval);
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      var _this$props = this.props,
          animate = _this$props.animate,
          pointer = _this$props.pointer,
          start = _this$props.start,
          end = _this$props.end;
      var values = this.state.values;
      var step = animate ? (end - start) * 2 / 100 : end - start;
      values = JSON.parse(JSON.stringify(values));
      this.interval = setInterval(function () {
        var clear = [];

        for (var i = 0; i < values.length; i++) {
          var target = pointer[i].value;

          if (values[i] < target) {
            //اگر کمتر از مقدار نهایی بود
            values[i] += step; //اضافه کن

            if (values[i] > target) {
              values[i] = target;
              clear.push(true);
            } else {
              clear.push(false);
            }
          } else if (values[i] > target) {
            values[i] -= step; //کم کن

            if (values[i] < target) {
              values[i] = target;
              clear.push(true);
            } else {
              clear.push(false);
            }
          } else {
            clear.push(true);
          }
        }

        console.log(clear);

        if (clear.indexOf(false) === -1) {
          _this2.clear();
        }

        _this2.setState({
          values: values
        });
      }, 20);
    } // update(){
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

  }, {
    key: "setStatics",
    value: function setStatics() {
      var _this$props2 = this.props,
          radius = _this$props2.radius,
          angle = _this$props2.angle;
      this.sin = Math.sin((angle - 180) / 2 * Math.PI / 180);
      this.cos = Math.cos((180 - angle) / 2 * Math.PI / 180);

      if (angle < 180) {
        this.width = 2 * radius * this.cos;
        this.height = radius;
      } else {
        this.width = radius * 2;
        this.height = radius * (this.sin + 1) + 16;
      }

      this.getRanges();
      this.getPins();
      this.getLabels();
      this.getCircles();
    }
  }, {
    key: "getAngleByValue",
    value: function getAngleByValue(value) {
      var _this$props3 = this.props,
          start = _this$props3.start,
          end = _this$props3.end,
          angle = _this$props3.angle;
      return (value - start) * angle / (end - start) + 90 - angle / 2;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      return {
        width: this.width,
        height: this.height
      };
    }
  }, {
    key: "getValue",
    value: function getValue(value) {
      var val;
      var _this$props4 = this.props,
          start = _this$props4.start,
          end = _this$props4.end;

      if (value === undefined) {
        val = start;
      }

      if (typeof value === 'number') {
        val = value;
      } else {
        if (value.indexOf('%') !== -1) {
          var range = end - start;
          val = range * parseFloat(value) / 100 + start;
        } else {
          val = parseFloat(value);
        }
      }

      val = val > end ? end : val;
      val = val < start ? start : val;
      return val;
    }
  }, {
    key: "getPinColor",
    value: function getPinColor(val) {
      for (var i = 0; i < this.ranges.length; i++) {
        var _this$ranges$i = this.ranges[i],
            value = _this$ranges$i.value,
            stroke = _this$ranges$i.stroke;

        if (val <= value) {
          return stroke;
        }
      }
    }
  }, {
    key: "getRanges",
    value: function getRanges() {
      var _this$props5 = this.props,
          start = _this$props5.start,
          end = _this$props5.end,
          pinStyle = _this$props5.pinStyle,
          ranges = _this$props5.ranges,
          clockwise = _this$props5.clockwise,
          thickness = _this$props5.thickness,
          padding = _this$props5.padding,
          radius = _this$props5.radius;
      this.ranges = [];
      var angleOffset = clockwise ? 0 : 180;

      for (var i = 0; i < ranges.length; i++) {
        var _ranges$i$split = ranges[i].split(' '),
            _ranges$i$split2 = _slicedToArray(_ranges$i$split, 2),
            value = _ranges$i$split2[0],
            _ranges$i$split2$ = _ranges$i$split2[1],
            stroke = _ranges$i$split2$ === void 0 ? '#000' : _ranges$i$split2$;

        var beforeValue = i === 0 ? start : this.ranges[i - 1].value;
        value = this.getValue(value);
        var s = this.getAngleByValue(beforeValue);
        var e = this.getAngleByValue(value);
        this.ranges.push({
          type: 'arc',
          stroke: stroke,
          slice: [s + angleOffset, e + angleOffset],
          r: radius - thickness / 2 - padding,
          lineWidth: thickness,
          value: value
        });
      }
    }
  }, {
    key: "getPins",
    value: function getPins(value) {
      var _this$props6 = this.props,
          pin = _this$props6.pin,
          start = _this$props6.start,
          end = _this$props6.end,
          clockwise = _this$props6.clockwise,
          thickness = _this$props6.thickness,
          padding = _this$props6.padding,
          radius = _this$props6.radius;
      this.pins = [];

      if (!pin) {
        return;
      }

      var step = pin.step,
          style = pin.style;
      var value = Math.round((start - step) / step) * step;
      value = value < start ? start : value;
      this.minPin = 1000;
      var getStyle,
          defaultStyle = {
        width: 1,
        height: 6,
        offset: thickness
      };

      if (typeof style === 'function') {
        getStyle = function getStyle(value) {
          return _jquery.default.extend({}, defaultStyle, style(value));
        };
      } else {
        var computedStyle = _jquery.default.extend({}, defaultStyle, style);

        getStyle = function getStyle() {
          return computedStyle;
        };
      }

      var angleOffset = clockwise ? 0 : 180;

      while (value <= end) {
        var _getStyle = getStyle(value),
            offset = _getStyle.offset,
            _getStyle$color = _getStyle.color,
            color = _getStyle$color === void 0 ? this.getPinColor(value) : _getStyle$color,
            width = _getStyle.width,
            height = _getStyle.height;

        var r = radius - height / 2 - offset - padding;
        this.minPin = Math.min(this.minPin, r - height / 2);
        var angle = this.getAngleByValue(value);
        this.pins.push({
          type: 'arc',
          x: 0,
          y: 0,
          stroke: color,
          slice: [angle - width / 2 + angleOffset, angle + width / 2 + angleOffset],
          r: r,
          lineWidth: height
        });
        value += step;
      }
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      var _this$props7 = this.props,
          label = _this$props7.label,
          start = _this$props7.start,
          end = _this$props7.end,
          clockwise = _this$props7.clockwise,
          thickness = _this$props7.thickness,
          radius = _this$props7.radius,
          angle = _this$props7.angle;
      var step = label.step,
          style = label.style;
      var value = Math.round((start - step) / step) * step;
      value = value < start ? start : value;
      var angleOffset = clockwise ? 0 : 180;
      this.labels = [];

      while (value <= end) {
        var Style = _jquery.default.extend({}, {}, typeof style === 'function' ? style(value) : style);

        var _Style$color = Style.color,
            color = _Style$color === void 0 ? '#000' : _Style$color,
            _Style$fontSize = Style.fontSize,
            fontSize = _Style$fontSize === void 0 ? 10 : _Style$fontSize,
            offset = Style.offset;
        offset = offset || (this.minPin || radius - thickness) - 10;
        var ang = this.getAngleByValue(value);
        this.labels.push({
          type: 'text',
          fill: color,
          text: value,
          fontSize: fontSize,
          textBaseLine: 'middle',
          pivot: {
            x: -offset,
            y: 0
          },
          rotate: ang + angleOffset,
          angle: -ang + angleOffset
        });
        value += step;
      }

      if (angle === 360 && labels[labels.length - 1].rotate === 270) {
        //prevent meeting first and last label
        labels.pop();
      }
    }
  }, {
    key: "getText",
    value: function getText() {
      var title = this.props.title;

      if (!title) {
        return [];
      }

      var width = this.width,
          height = this.height;
      var text = title.text,
          _title$x = title.x,
          x = _title$x === void 0 ? 0 : _title$x,
          _title$y = title.y,
          y = _title$y === void 0 ? 0 : _title$y,
          _title$color = title.color,
          color = _title$color === void 0 ? '#000' : _title$color,
          _title$fontSize = title.fontSize,
          fontSize = _title$fontSize === void 0 ? 14 : _title$fontSize;
      text = typeof text === 'function' ? text({
        pointer: this.props.pointer,
        ranges: this.props.ranges
      }) : text;
      return {
        type: 'text',
        x: x,
        y: y,
        text: text,
        fill: color,
        fontSize: fontSize
      };
    }
  }, {
    key: "getCircles",
    value: function getCircles() {
      var _this$props8 = this.props,
          radius = _this$props8.radius,
          pointer = _this$props8.pointer;
      this.circles = [];

      for (var i = 0; i < pointer.length; i++) {
        var _pointer$i = pointer[i],
            _pointer$i$color = _pointer$i.color,
            color = _pointer$i$color === void 0 ? '#000' : _pointer$i$color,
            _pointer$i$radius = _pointer$i.radius,
            r = _pointer$i$radius === void 0 ? radius / 20 : _pointer$i$radius;
        this.circles.push({
          type: 'arc',
          r: r,
          fill: color
        });
      }
    }
  }, {
    key: "getHandles",
    value: function getHandles() {
      var _this$props9 = this.props,
          clockwise = _this$props9.clockwise,
          thickness = _this$props9.thickness,
          padding = _this$props9.padding,
          radius = _this$props9.radius,
          pointer = _this$props9.pointer;
      var values = this.state.values;
      var handles = [];
      var angleOffset = clockwise ? 0 : 180;

      for (var i = 0; i < pointer.length; i++) {
        var _pointer$i2 = pointer[i],
            _pointer$i2$width = _pointer$i2.width,
            width = _pointer$i2$width === void 0 ? 2 : _pointer$i2$width,
            _pointer$i2$height = _pointer$i2.height,
            height = _pointer$i2$height === void 0 ? radius - thickness - padding : _pointer$i2$height,
            _pointer$i2$color = _pointer$i2.color,
            fill = _pointer$i2$color === void 0 ? '#000' : _pointer$i2$color,
            _pointer$i2$radius = _pointer$i2.radius,
            r = _pointer$i2$radius === void 0 ? radius / 20 : _pointer$i2$radius,
            _pointer$i2$offset = _pointer$i2.offset,
            offset = _pointer$i2$offset === void 0 ? 0 : _pointer$i2$offset;
        handles.push({
          type: 'line',
          fill: fill,
          pivot: {
            x: -offset,
            y: 0
          },
          points: [{
            x: 0,
            y: 0
          }, {
            x: 0,
            y: width / 2
          }, {
            x: height,
            y: 0
          }, {
            x: 0,
            y: -width / 2
          }],
          rotate: this.getAngleByValue(values[i]) + angleOffset
        });
      }

      return handles;
    }
  }, {
    key: "getContainerStyle",
    value: function getContainerStyle(style) {
      return _jquery.default.extend({}, {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
      }, style);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props10 = this.props,
          _this$props10$ranges = _this$props10.ranges,
          ranges = _this$props10$ranges === void 0 ? [] : _this$props10$ranges,
          id = _this$props10.id,
          className = _this$props10.className,
          clockwise = _this$props10.clockwise,
          radius = _this$props10.radius;
      return _react.default.createElement("div", {
        className: "r-gauge".concat(className ? ' ' + className : ''),
        id: id,
        style: this.getContainerStyle()
      }, _react.default.createElement(_rCanvas.default, {
        style: this.getStyle(),
        items: this.ranges.concat(this.pins, this.getHandles(), this.circles, this.labels, this.getText()),
        rotateSetting: {
          direction: clockwise ? 'clockwise' : 'clock'
        },
        axisPosition: {
          y: radius - this.sin + 'px'
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (state.first) {
        //اولین اجرا
        state.update();
        return {
          first: false,
          values: props.pointer.map(function (p) {
            return props.start;
          })
        };
      }

      state.clear();
      state.update();
      return null;
    }
  }]);

  return RGauge;
}(_react.Component);

exports.default = RGauge;
RGauge.defaultProps = {
  start: 0,
  end: 100,
  ranges: ['100 red'],
  text: '',
  angle: 180,
  label: {},
  pointer: [{
    value: 0,
    color: '#000'
  }],
  clockwise: false,
  animate: true,
  thickness: 10,
  padding: 0,
  radius: 50
};
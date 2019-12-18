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
    _this.maxHeight = 0;

    _this.setStatics();

    var _this$props = _this.props,
        range = _this$props.range,
        _this$props$pointer = _this$props.pointer,
        pointer = _this$props$pointer === void 0 ? [] : _this$props$pointer,
        pin = _this$props.pin,
        label = _this$props.label,
        ranges = _this$props.ranges,
        animate = _this$props.animate,
        style = _this$props.style;
    pointer = JSON.parse(JSON.stringify(pointer));
    _this.state = {
      pointer: animate ? pointer.map(function (p) {
        p.value = range[0];
        return p;
      }) : pointer,
      prevPin: JSON.stringify(pin),
      prevLabel: JSON.stringify(label),
      prevRanges: JSON.stringify(ranges),
      prevStyle: JSON.stringify(style),
      getValue: _this.getValue.bind(_assertThisInitialized(_this)),
      animate: _this.animate.bind(_assertThisInitialized(_this)),
      setStatics: _this.setStatics.bind(_assertThisInitialized(_this))
    };
    return _this;
  }

  _createClass(RGauge, [{
    key: "setStatics",
    value: function setStatics() {
      var style = this.props.style;
      var _style$padding = style.padding,
          padding = _style$padding === void 0 ? 0 : _style$padding,
          _style$angle = style.angle,
          angle = _style$angle === void 0 ? 180 : _style$angle,
          _style$radius = style.radius,
          radius = _style$radius === void 0 ? 100 : _style$radius,
          _style$direction = style.direction,
          direction = _style$direction === void 0 ? 'clockwise' : _style$direction,
          _style$thickness = style.thickness,
          thickness = _style$thickness === void 0 ? 10 : _style$thickness;
      this.direction = direction;
      this.thickness = thickness;
      this.padding = padding;
      this.angle = angle;
      this.radius = radius;
      this.sin = Math.sin((angle - 180) / 2 * Math.PI / 180);
      this.cos = Math.cos((180 - angle) / 2 * Math.PI / 180);
      this.startAngle = 90 - angle / 2;

      if (angle < 180) {
        this.width = 2 * radius * this.cos;
        this.height = radius;
      } else {
        this.width = radius * 2;
        this.height = radius * (this.sin + 1) + 16;
      }

      this.rangeRadius = radius - thickness / 2 - padding;
      this.angleOffset = direction === 'clock' ? 180 : 0;
      this.getRanges();
      this.getPins();
      this.labels = this.getLabels();
    }
  }, {
    key: "animate",
    value: function animate(val) {
      var _this2 = this;

      clearInterval(this.interVal);
      var pointer = this.state.pointer;
      var sign = pointer.map(function (p, i) {
        return Math.sign(val[i] - p.value) * Math.ceil(Math.abs(val[i] - p.value) / 40);
      });
      var newValue = pointer;
      var clear = newValue.map(function () {
        return false;
      });
      this.interval = setInterval(function () {
        for (var i = 0; i < newValue.length; i++) {
          if (clear[i]) {
            continue;
          }

          newValue[i].value += sign[i];

          if (sign[i] > 0) {
            if (newValue[i].value >= val[i]) {
              clear[i] = true;
              newValue[i].value = val[i];
              console.log(newValue);
            }
          } else {
            if (newValue[i].value <= val[i]) {
              clear[i] = true;
              newValue[i].value = val[i];
            }
          }
        }

        if (clear.indexOf(false) == -1) {
          clearInterval(_this2.interval);
        }

        _this2.setState({
          value: newValue
        });
      }, 40);
    }
  }, {
    key: "getAngleByValue",
    value: function getAngleByValue(value) {
      var range = this.props.range;

      var _range = _slicedToArray(range, 2),
          start = _range[0],
          end = _range[1];

      return (value - start) * this.angle / (end - start) + this.startAngle;
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

      var _this$props$range = _slicedToArray(this.props.range, 2),
          start = _this$props$range[0],
          end = _this$props$range[1];

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
      var _this$props2 = this.props,
          range = _this$props2.range,
          pinStyle = _this$props2.pinStyle,
          ranges = _this$props2.ranges;

      var _range2 = _slicedToArray(range, 2),
          start = _range2[0],
          end = _range2[1];

      this.ranges = [];

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
          slice: [s + this.angleOffset, e + this.angleOffset],
          r: this.rangeRadius,
          lineWidth: this.thickness,
          value: value
        });
      }
    }
  }, {
    key: "getPins",
    value: function getPins(value) {
      var _this$props3 = this.props,
          pin = _this$props3.pin,
          range = _this$props3.range;
      this.pins = [];

      if (!pin) {
        return;
      }

      var _range3 = _slicedToArray(range, 2),
          start = _range3[0],
          end = _range3[1];

      var step = pin.step,
          style = pin.style;
      var value = Math.round((start - step) / step) * step;
      value = value < start ? start : value;
      this.minPin = 1000;
      var getStyle,
          defaultStyle = {
        width: 1,
        height: 6,
        offset: this.thickness
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

      while (value <= end) {
        var _getStyle = getStyle(value),
            offset = _getStyle.offset,
            _getStyle$color = _getStyle.color,
            color = _getStyle$color === void 0 ? this.getPinColor(value) : _getStyle$color,
            width = _getStyle.width,
            height = _getStyle.height;

        var r = this.radius - height / 2 - offset - this.padding;
        this.minPin = Math.min(this.minPin, r - height / 2);
        var angle = this.getAngleByValue(value);
        this.pins.push({
          type: 'arc',
          x: 0,
          y: 0,
          stroke: color,
          slice: [angle - width / 2 + this.angleOffset, angle + width / 2 + this.angleOffset],
          r: r,
          lineWidth: height
        });
        value += step;
      }
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      var _this$props4 = this.props,
          label = _this$props4.label,
          range = _this$props4.range,
          labels = [];

      var _range4 = _slicedToArray(range, 2),
          start = _range4[0],
          end = _range4[1];

      var step = label.step,
          style = label.style;
      var value = Math.round((start - step) / step) * step;
      value = value < start ? start : value;

      while (value <= end) {
        var Style = _jquery.default.extend({}, {}, typeof style === 'function' ? style(value) : style);

        var _Style$color = Style.color,
            color = _Style$color === void 0 ? '#000' : _Style$color,
            _Style$fontSize = Style.fontSize,
            fontSize = _Style$fontSize === void 0 ? 10 : _Style$fontSize,
            offset = Style.offset;
        offset = offset || (this.minPin || this.radius - this.thickness) - 10;
        var angle = this.getAngleByValue(value);
        labels.push({
          type: 'text',
          fill: color,
          text: value,
          fontSize: fontSize,
          textBaseLine: 'middle',
          pivot: {
            x: -offset,
            y: 0
          },
          rotate: angle + this.angleOffset,
          angle: -angle + this.angleOffset
        });
        value += step;
      }

      if (this.angle === 360 && labels[labels.length - 1].rotate === 270) {
        //prevent meeting first and last label
        labels.pop();
      }

      return labels;
    }
  }, {
    key: "getText",
    value: function getText() {
      var _this$props5 = this.props,
          title = _this$props5.title,
          style = _this$props5.style;

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
        pointer: this.state.pointer,
        ranges: this.props.ranges
      }) : text;
      return {
        type: 'text',
        x: x,
        y: y,
        text: text,
        fill: color,
        fontSize: fontSize,
        rotate: this.angleOffset
      };
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var _this3 = this;

      var _this$props6 = this.props,
          pinStep = _this$props6.pinStep,
          _this$props6$ranges = _this$props6.ranges,
          ranges = _this$props6$ranges === void 0 ? [] : _this$props6$ranges;
      var pointer = this.state.pointer;
      var pins = this.pins;
      var rngs = this.ranges;
      var handle = this.getHandle();
      var labels = this.labels;
      var text = this.getText();
      var circles = pointer.map(function (p, i) {
        return {
          type: 'arc',
          x: 0,
          y: 0,
          r: _this3.handleRadius[i],
          fill: _this3.handleColor[i]
        };
      });
      return rngs.concat(pins, handle, circles, labels, text);
    }
  }, {
    key: "getHandle",
    value: function getHandle() {
      var _this4 = this;

      var range = this.props.range;
      var pointer = this.state.pointer;

      var _range5 = _slicedToArray(range, 2),
          start = _range5[0],
          end = _range5[1];

      this.handleColor = [];
      this.handleRadius = [];
      return pointer.map(function (p, i) {
        var _p$width = p.width,
            width = _p$width === void 0 ? 2 : _p$width,
            _p$height = p.height,
            height = _p$height === void 0 ? _this4.radius - _this4.thickness - _this4.padding : _p$height,
            _p$color = p.color,
            color = _p$color === void 0 ? '#000' : _p$color,
            _p$radius = p.radius,
            r = _p$radius === void 0 ? _this4.radius / 20 : _p$radius,
            _p$offset = p.offset,
            offset = _p$offset === void 0 ? 0 : _p$offset,
            value = p.value;

        _this4.handleColor.push(color);

        _this4.handleRadius.push(r);

        return {
          lineWidth: width,
          type: 'line',
          fill: color,
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
          pivot: {
            x: -offset,
            y: 0
          },
          rotate: _this4.getAngleByValue(value) + _this4.angleOffset
        };
      });
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
      var _this$props7 = this.props,
          _this$props7$ranges = _this$props7.ranges,
          ranges = _this$props7$ranges === void 0 ? [] : _this$props7$ranges,
          id = _this$props7.id,
          className = _this$props7.className;
      return _react.default.createElement("div", {
        className: "r-gauge".concat(className ? ' ' + className : ''),
        id: id,
        style: this.getContainerStyle()
      }, _react.default.createElement(_rCanvas.default, {
        style: this.getStyle(),
        items: this.getItems(),
        rotateSetting: {
          direction: this.direction
        },
        axisPosition: {
          y: this.radius - this.sin + 'px'
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (JSON.stringify(props.pointer) !== state.prevPointer) {
        state.animate(props.pointer.map(function (p) {
          return state.getValue(p.value);
        }));
        return {
          prevPointer: JSON.stringify(props.pointer)
        };
      }

      if (JSON.stringify(props.pin) !== state.prevPin || JSON.stringify(props.label) !== state.prevLabel || JSON.stringify(props.ranges) !== state.prevRanges || JSON.stringify(props.style) !== state.prevStyle) {
        state.setStatics();
        return {
          prevPin: JSON.stringify(props.pin),
          prevLabel: JSON.stringify(props.label),
          prevRanges: JSON.stringify(props.ranges)
        };
      }

      return null;
    }
  }]);

  return RGauge;
}(_react.Component);

exports.default = RGauge;
RGauge.defaultProps = {
  range: [0, 100],
  ranges: ['100 red'],
  text: '',
  style: {
    angle: 180,
    radius: 50,
    padding: 0,
    direction: 'clockwise',
    thickness: 10
  },
  label: {},
  pointer: [{
    value: 0,
    color: '#000'
  }]
};
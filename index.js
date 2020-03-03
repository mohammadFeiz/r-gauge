"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rCanvas = _interopRequireDefault(require("r-canvas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RGauger = /*#__PURE__*/function (_Component) {
  _inherits(RGauger, _Component);

  function RGauger(props) {
    var _this;

    _classCallCheck(this, RGauger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RGauger).call(this, props));

    _this.getDetails();

    return _this;
  }

  _createClass(RGauger, [{
    key: "getPercentByValue",
    value: function getPercentByValue(value, start, end) {
      return 100 * (value - start) / (end - start);
    }
  }, {
    key: "getDetails",
    value: function getDetails() {
      var _this$props = this.props,
          angle = _this$props.angle,
          start = _this$props.start,
          end = _this$props.end;
      this.startAngle = 270 - angle / 2;
      this.scales = this.getScales();
      this.labels = this.getLabels();
      this.slice = [this.getAngleByValue(start), this.getAngleByValue(end)];
      this.circles = this.getCircles();
    }
  }, {
    key: "getAngleByValue",
    value: function getAngleByValue(value) {
      var _this$props2 = this.props,
          start = _this$props2.start,
          end = _this$props2.end,
          angle = _this$props2.angle,
          offsetAngle = _this$props2.offsetAngle,
          direction = _this$props2.direction;
      var percent = this.getPercentByValue(value, start, end);
      return this.startAngle + angle / 100 * percent + offsetAngle + (direction === 'clockwise' ? 180 : 0);
    }
  }, {
    key: "getRanges",
    value: function getRanges() {
      var _this2 = this;

      var _this$props3 = this.props,
          _this$props3$ranges = _this$props3.ranges,
          ranges = _this$props3$ranges === void 0 ? [] : _this$props3$ranges,
          radius = _this$props3.radius,
          thickness = _this$props3.thickness;

      if (!thickness) {
        return [];
      }

      var Ranges = (typeof ranges === 'function' ? ranges(this.props) : ranges).map(function (r) {
        var value = r.value,
            color = r.color;
        value = parseFloat(value);
        return {
          color: color,
          angle: _this2.getAngleByValue(value)
        };
      });
      var circles = [];

      for (var i = 0; i < Ranges.length; i++) {
        var _Ranges$i = Ranges[i],
            color = _Ranges$i.color,
            angle = _Ranges$i.angle;
        var startAngle = i === 0 ? this.getAngleByValue(this.props.start) : Ranges[i - 1].angle;
        var endAngle = angle;
        circles.push({
          r: radius,
          slice: [startAngle, endAngle],
          stroke: color,
          lineWidth: thickness
        });
      }

      return circles;
    }
  }, {
    key: "getCircles",
    value: function getCircles() {
      var _this3 = this;

      var circles = this.props.circles;

      if (!circles || circles.length === 0) {
        return [];
      }

      return circles.map(function (c) {
        var _c$radius = c.radius,
            r = _c$radius === void 0 ? 20 : _c$radius,
            _c$color = c.color,
            stroke = _c$color === void 0 ? '#555' : _c$color,
            _c$lineWidth = c.lineWidth,
            lineWidth = _c$lineWidth === void 0 ? 1 : _c$lineWidth;
        return {
          r: c.radius,
          lineWidth: c.lineWidth,
          stroke: c.stroke,
          fill: c.fill,
          slice: c.slice ? _this3.slice : undefined
        };
      });
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      var _this4 = this;

      var labels = [];
      var _this$props4 = this.props,
          start = _this$props4.start,
          end = _this$props4.end,
          label = _this$props4.label,
          radius = _this$props4.radius,
          thickness = _this$props4.thickness,
          mainAngle = _this$props4.angle;
      var step = label.step,
          _label$style = label.style,
          style = _label$style === void 0 ? {} : _label$style,
          edit = label.edit;
      var Style = typeof style === 'function' ? function (value) {
        style(value, _this4.props);
      } : function () {
        return style;
      };

      if (!step) {
        return [];
      }

      var value = start;

      while (value <= end) {
        var _Style = Style(value),
            _Style$fontSize = _Style.fontSize,
            fontSize = _Style$fontSize === void 0 ? 10 : _Style$fontSize,
            offset = _Style.offset,
            _Style$color = _Style.color,
            color = _Style$color === void 0 ? '#000' : _Style$color;

        var pivot = offset ? -offset : -(radius - thickness / 2 - fontSize - 3);
        var angle = this.getAngleByValue(value);
        labels.push({
          text: edit ? edit(value) : value,
          fill: color,
          pivot: [pivot, 0],
          rotate: angle,
          angle: -angle,
          fontSize: fontSize
        });
        value += step;
      }

      if (mainAngle === 360 && labels[labels.length - 1].rotate % 90 === 0) {
        labels.pop();
      }

      return labels;
    }
  }, {
    key: "getScales",
    value: function getScales() {
      var _this5 = this;

      var scales = [];
      var _this$props5 = this.props,
          start = _this$props5.start,
          end = _this$props5.end,
          scale = _this$props5.scale,
          radius = _this$props5.radius,
          thickness = _this$props5.thickness;
      var step = scale.step,
          _scale$style = scale.style,
          style = _scale$style === void 0 ? {} : _scale$style;
      var Style = typeof style === 'function' ? function (value) {
        return style(value, _this5.props);
      } : function () {
        return style;
      };

      if (!step) {
        return [];
      }

      var value = start;

      while (value <= end) {
        var _Style2 = Style(value),
            _Style2$offset = _Style2.offset,
            offset = _Style2$offset === void 0 ? 0 : _Style2$offset,
            _Style2$color = _Style2.color,
            color = _Style2$color === void 0 ? '#000' : _Style2$color,
            width = _Style2.width,
            _Style2$height = _Style2.height,
            height = _Style2$height === void 0 ? 5 : _Style2$height;

        var angle = this.getAngleByValue(value);
        scales.push({
          stroke: color,
          points: [[0, 0], [height, 0]],
          lineWidth: width,
          pivot: [-(radius - height - thickness / 2 + offset), 0],
          rotate: angle
        });
        value += step;
      }

      return scales;
    }
  }, {
    key: "getHandles",
    value: function getHandles() {
      var _this6 = this;

      var handle = this.props.handle;

      if (!handle) {
        return [];
      }

      return Array.isArray(handle) ? handle.map(function (h) {
        return _this6.getHandle(h);
      }) : [this.getHandle(handle)];
    }
  }, {
    key: "getHandle",
    value: function getHandle(handle) {
      var _this7 = this;

      var _this$props6 = this.props,
          start = _this$props6.start,
          end = _this$props6.end,
          radius = _this$props6.radius,
          thickness = _this$props6.thickness;
      var _handle$value = handle.value,
          value = _handle$value === void 0 ? false : _handle$value,
          _handle$style = handle.style,
          style = _handle$style === void 0 ? {} : _handle$style;
      var Style = typeof style === 'function' ? function (value) {
        style(value, _this7.props);
      } : function () {
        return style;
      };

      var _Style3 = Style(value),
          _Style3$offset = _Style3.offset,
          offset = _Style3$offset === void 0 ? 0 : _Style3$offset,
          _Style3$color = _Style3.color,
          color = _Style3$color === void 0 ? '#000' : _Style3$color,
          _Style3$width = _Style3.width,
          width = _Style3$width === void 0 ? 4 : _Style3$width,
          _Style3$height = _Style3.height,
          height = _Style3$height === void 0 ? radius - thickness / 2 : _Style3$height,
          _Style3$radius = _Style3.radius,
          handleRadius = _Style3$radius === void 0 ? 4 : _Style3$radius;

      var angle = this.getAngleByValue(value);
      return {
        items: [{
          fill: color,
          points: [[0, -width / 2], [height, 0], [0, width / 2]],
          lineWidth: width,
          pivot: [-offset, 0],
          rotate: angle,
          close: true
        }, {
          r: handleRadius,
          fill: color
        }]
      };
    }
  }, {
    key: "getTexts",
    value: function getTexts() {
      var _this8 = this;

      var text = this.props.text;

      if (!text) {
        return [];
      }

      var texts = Array.isArray(text) ? text.map(function (t) {
        return _this8.getText(t);
      }) : [this.getText(text)];
      return texts;
    }
  }, {
    key: "getText",
    value: function getText(text) {
      var value = text.value,
          _text$style = text.style,
          style = _text$style === void 0 ? {} : _text$style;
      var Style = typeof style === 'function' ? style(this.props) : style;
      var _Style$top = Style.top,
          top = _Style$top === void 0 ? 20 : _Style$top,
          _Style$left = Style.left,
          left = _Style$left === void 0 ? 0 : _Style$left,
          _Style$fontSize2 = Style.fontSize,
          fontSize = _Style$fontSize2 === void 0 ? 10 : _Style$fontSize2,
          _Style$color2 = Style.color,
          color = _Style$color2 === void 0 ? '#000' : _Style$color2,
          _Style$rotate = Style.rotate,
          rotate = _Style$rotate === void 0 ? 0 : _Style$rotate;
      return {
        text: typeof value === 'function' ? value(this.props) : value,
        x: left,
        y: top,
        rotate: rotate,
        fontSize: fontSize,
        fill: color
      };
    }
  }, {
    key: "getItems",
    value: function getItems() {
      return this.props.customShapes.concat(this.circles, this.getRanges(), this.labels, this.scales, this.getTexts(), this.getHandles());
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var Style = { ...this.props.style
      };
      Style.width = Style.width || '200px';
      Style.height = Style.height || '200px';
      return Style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          dynamic = _this$props7.dynamic,
          position = _this$props7.position,
          direction = _this$props7.direction,
          id = _this$props7.id,
          className = _this$props7.className;

      if (dynamic) {
        this.getDetails();
      }

      return _react.default.createElement(_rCanvas.default, {
        className: "r-gauger".concat(className ? ' ' + className : ''),
        id: id,
        items: this.getItems(),
        style: this.getStyle(),
        axisPosition: position,
        rotateSetting: {
          direction: direction === 'clockwise' ? 'clockwise' : 'clock'
        }
      });
    }
  }]);

  return RGauger;
}(_react.Component);

exports.default = RGauger;
RGauger.defaultProps = {
  angle: 300,
  offsetAngle: 0,
  start: 0,
  end: 100,
  thickness: 10,
  radius: 70,
  label: {},
  scale: {},
  direction: 'clock',
  position: ['50%', '50%'],
  customShapes: []
};
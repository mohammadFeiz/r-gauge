"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  g1: {
    scale: {
      step: 5,
      style: function style(value) {
        if (value % 10 === 0) {
          return {
            height: 10,
            width: 1
          };
        }

        if (value % 5 === 0) {
          return {
            height: 5,
            width: 0.5
          };
        }
      }
    },
    label: {
      step: 10
    },
    start: 10,
    end: 90,
    handle: [{
      value: 80,
      style: {
        color: 'lightgreen'
      }
    }, {
      value: 50,
      style: {
        color: 'red'
      }
    }],
    ranges: [{
      value: 15,
      color: 'red'
    }, {
      value: 60,
      color: 'orange'
    }, {
      value: 90,
      color: 'green'
    }],
    text: {
      value: 'Distance(KM)',
      style: {
        top: 20,
        color: '#000',
        fontSize: 8
      }
    },
    angle: 210,
    animate: true,
    direction: 'clockwise',
    thickness: 2,
    radius: 80,
    circles: [{
      radius: 57,
      color: '#555',
      lineWidth: 1
    }, {
      radius: 90,
      lineWidth: 2
    }]
  },
  g2: {
    pin: {
      step: 5,
      style: function style(value) {
        if (value % 20 === 0) {
          return {
            height: 8,
            width: .6,
            color: '#bbb',
            offset: 13
          };
        }

        if (value % 5 === 0) {
          return {
            height: 5,
            width: .6,
            color: '#bbb',
            offset: 13
          };
        }
      }
    },
    label: {
      step: 20,
      style: {
        fontSize: 8,
        color: '#444'
      }
    },
    start: 0,
    end: 180,
    pointer: [{
      value: 124,
      width: 5,
      color: '#8EBC00'
    }],
    ranges: ['100% #eee'],
    title: {
      text: 'Speed(km/h)',
      y: 30,
      color: '#aaa',
      fontSize: 10
    },
    angle: 250,
    thickness: 10,
    padding: 5,
    radius: 80
  },
  g3: {
    label: {
      step: 50,
      style: {
        fontSize: 10,
        color: '#444'
      }
    },
    start: 0,
    end: 50,
    pointer: [{
      value: 35,
      width: 2
    }],
    ranges: ['70% #13C3C3', '100% #ddd'],
    title: {
      text: 'Speed(km/h)',
      y: 30,
      color: '#aaa',
      fontSize: 10
    },
    angle: 120,
    thickness: 30,
    radius: 80
  },
  g4: {
    pin: {
      step: 5,
      style: {
        width: 1.5,
        height: 2,
        offset: -6,
        color: '#666'
      }
    },
    label: {
      step: 20,
      style: {
        fontSize: 8,
        color: '#444',
        offset: 60
      }
    },
    range: 0,
    end: 120,
    pointer: [{
      value: 24,
      width: 4,
      color: '#777'
    }],
    ranges: ['50 #ddd', '100% #748ba7'],
    title: {
      text: 'Angle(degree)',
      y: -15,
      color: '#777',
      fontSize: 8
    },
    clockwise: true,
    angle: 320,
    thickness: 7,
    padding: 24,
    radius: 70
  },
  g5: {
    id: 'cruz',
    pin: {
      step: 5,
      style: function style(value) {
        if (value % 20 === 0) {
          return {
            height: 10,
            width: 1.6
          };
        }

        return {
          height: 5
        };
      }
    },
    label: {
      step: 20,
      style: function style(value) {
        return {
          fontSize: 8,
          color: value > 140 ? 'red' : '#ddd'
        };
      }
    },
    start: 0,
    end: 220,
    pointer: [{
      value: 124,
      width: 4,
      color: '#ddd',
      radius: 6
    }],
    ranges: ['159 #fff', '100% red'],
    title: {
      text: 'Speed ( km / h )',
      y: 10,
      color: '#ddd',
      fontSize: 8
    },
    angle: 180,
    clockwise: true,
    thickness: 0,
    padding: 24,
    radius: 100
  },
  g6: {
    pin: {
      step: 10
    },
    label: {
      step: 10,
      style: {
        fontSize: 8
      }
    },
    start: 0,
    end: 100,
    pointer: [{
      value: 50,
      width: 20,
      color: 'red',
      height: 10,
      offset: 27
    }, {
      value: 90,
      width: 20,
      color: '#ddd',
      radius: 30
    }],
    ranges: ['60 #ddd', '100% orange'],
    title: {
      text: function text(obj) {
        return obj.pointer[0].value + '%' + obj.pointer[1].value + '%';
      },
      color: '#fff',
      fontSize: 12
    },
    angle: 280,
    animate: true,
    clockwise: true,
    thickness: 10,
    padding: 30,
    radius: 100
  },
  g7: {
    thickness: 10,
    angle: 309,
    radius: 80,
    ranges: [{
      value: 50,
      color: 'red'
    }, {
      value: 100,
      color: 'blue'
    }]
  }
};
exports.default = _default;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trafic = function () {
  function Trafic() {
    _classCallCheck(this, Trafic);

    this.current = new RedLight();
  }

  _createClass(Trafic, [{
    key: 'start',
    value: function start() {
      setInterval(this.tickTock.bind(this), 1000);
    }
  }, {
    key: 'tickTock',
    value: function tickTock() {
      console.info('Time Left: ' + this.current.timeLeft);
      this.current.tickTock(this);
    }
  }, {
    key: 'setCurrentLight',
    value: function setCurrentLight(light) {
      this.current = light;
    }
  }]);

  return Trafic;
}();

var Light = function () {
  function Light() {
    _classCallCheck(this, Light);

    this.initTimeLeft();
    console.log('Current is ' + this.name() + ' light.');
  }

  _createClass(Light, [{
    key: 'name',
    value: function name() {
      throw new Error('Need to implement "name" method.');
    }
  }, {
    key: 'tickTock',
    value: function tickTock() {
      throw new Error('Need to implement "tickTock" method.');
    }
  }]);

  return Light;
}();

var GreenLight = function (_Light) {
  _inherits(GreenLight, _Light);

  function GreenLight() {
    _classCallCheck(this, GreenLight);

    return _possibleConstructorReturn(this, (GreenLight.__proto__ || Object.getPrototypeOf(GreenLight)).apply(this, arguments));
  }

  _createClass(GreenLight, [{
    key: 'initTimeLeft',
    value: function initTimeLeft() {
      this.timeLeft = 3;
    }
  }, {
    key: 'name',
    value: function name() {
      return 'Green';
    }
  }, {
    key: 'tickTock',
    value: function tickTock(traffic) {
      this.timeLeft -= 1;

      if (this.timeLeft === 0) {
        traffic.setCurrentLight(new YellowLight());
      }
    }
  }]);

  return GreenLight;
}(Light);

var YellowLight = function (_Light2) {
  _inherits(YellowLight, _Light2);

  function YellowLight() {
    _classCallCheck(this, YellowLight);

    return _possibleConstructorReturn(this, (YellowLight.__proto__ || Object.getPrototypeOf(YellowLight)).apply(this, arguments));
  }

  _createClass(YellowLight, [{
    key: 'initTimeLeft',
    value: function initTimeLeft() {
      this.timeLeft = 1;
    }
  }, {
    key: 'name',
    value: function name() {
      return 'Yellow';
    }
  }, {
    key: 'tickTock',
    value: function tickTock(traffic) {
      this.timeLeft -= 1;

      if (this.timeLeft === 0) {
        traffic.setCurrentLight(new RedLight());
      }
    }
  }]);

  return YellowLight;
}(Light);

var RedLight = function (_Light3) {
  _inherits(RedLight, _Light3);

  function RedLight() {
    _classCallCheck(this, RedLight);

    return _possibleConstructorReturn(this, (RedLight.__proto__ || Object.getPrototypeOf(RedLight)).apply(this, arguments));
  }

  _createClass(RedLight, [{
    key: 'initTimeLeft',
    value: function initTimeLeft() {
      this.timeLeft = 2;
    }
  }, {
    key: 'name',
    value: function name() {
      return 'Red';
    }
  }, {
    key: 'tickTock',
    value: function tickTock(traffic) {
      this.timeLeft -= 1;

      if (this.timeLeft === 0) {
        traffic.setCurrentLight(new GreenLight());
      }
    }
  }]);

  return RedLight;
}(Light);

var traffic = new Trafic();
traffic.start();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var ProgressBar = require('progressbar.js')
var VanillaTilt = require('vanilla-tilt')

window.onload = function () {

    VanillaTilt.init(document.querySelector("#socials-section"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    var circle = new ProgressBar.Circle('#javascript', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.6);


    circle = new ProgressBar.Circle('#java', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.6);


    circle = new ProgressBar.Circle('#git', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.75);

    circle = new ProgressBar.Circle('#nodejs', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.4);

    circle = new ProgressBar.Circle('#python', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.6);

    circle = new ProgressBar.Circle('#react', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.4);

    circle = new ProgressBar.Circle('#db', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.5);

    circle = new ProgressBar.Circle('#android', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.5);

    circle = new ProgressBar.Circle('#ps', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.8);

    circle = new ProgressBar.Circle('#ai', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.7);

    circle = new ProgressBar.Circle('#id', {
        color: '#2C3941',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 10,
    });

    circle.animate(0.6);


    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };


    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

},{"progressbar.js":4,"vanilla-tilt":11}],2:[function(require,module,exports){
// Circle shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');

var Circle = function Circle(container, options) {
    // Use two arcs to form a circle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m 0,-{radius}' +
        ' a {radius},{radius} 0 1 1 0,{2radius}' +
        ' a {radius},{radius} 0 1 1 0,-{2radius}';

    this.containerAspectRatio = 1;

    Shape.apply(this, arguments);
};

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype._pathString = function _pathString(opts) {
    var widthOfWider = opts.strokeWidth;
    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
        widthOfWider = opts.trailWidth;
    }

    var r = 50 - widthOfWider / 2;

    return utils.render(this._pathTemplate, {
        radius: r,
        '2radius': r * 2
    });
};

Circle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Circle;

},{"./shape":7,"./utils":9}],3:[function(require,module,exports){
// Line shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');

var Line = function Line(container, options) {
    this._pathTemplate = 'M 0,{center} L 100,{center}';
    Shape.apply(this, arguments);
};

Line.prototype = new Shape();
Line.prototype.constructor = Line;

Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
    svg.setAttribute('preserveAspectRatio', 'none');
};

Line.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2
    });
};

Line.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Line;

},{"./shape":7,"./utils":9}],4:[function(require,module,exports){
module.exports = {
    // Higher level API, different shaped progress bars
    Line: require('./line'),
    Circle: require('./circle'),
    SemiCircle: require('./semicircle'),
    Square: require('./square'),

    // Lower level API to use any SVG path
    Path: require('./path'),

    // Base-class for creating new custom shapes
    // to be in line with the API of built-in shapes
    // Undocumented.
    Shape: require('./shape'),

    // Internal utils, undocumented.
    utils: require('./utils')
};

},{"./circle":2,"./line":3,"./path":5,"./semicircle":6,"./shape":7,"./square":8,"./utils":9}],5:[function(require,module,exports){
// Lower level API to animate any kind of svg path

var shifty = require('shifty');
var utils = require('./utils');

var Tweenable = shifty.Tweenable;

var EASING_ALIASES = {
    easeIn: 'easeInCubic',
    easeOut: 'easeOutCubic',
    easeInOut: 'easeInOutCubic'
};

var Path = function Path(path, opts) {
    // Throw a better error if not initialized with `new` keyword
    if (!(this instanceof Path)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Default parameters for animation
    opts = utils.extend({
        delay: 0,
        duration: 800,
        easing: 'linear',
        from: {},
        to: {},
        step: function() {}
    }, opts);

    var element;
    if (utils.isString(path)) {
        element = document.querySelector(path);
    } else {
        element = path;
    }

    // Reveal .path as public attribute
    this.path = element;
    this._opts = opts;
    this._tweenable = null;

    // Set up the starting positions
    var length = this.path.getTotalLength();
    this.path.style.strokeDasharray = length + ' ' + length;
    this.set(0);
};

Path.prototype.value = function value() {
    var offset = this._getComputedDashOffset();
    var length = this.path.getTotalLength();

    var progress = 1 - offset / length;
    // Round number to prevent returning very small number like 1e-30, which
    // is practically 0
    return parseFloat(progress.toFixed(6), 10);
};

Path.prototype.set = function set(progress) {
    this.stop();

    this.path.style.strokeDashoffset = this._progressToOffset(progress);

    var step = this._opts.step;
    if (utils.isFunction(step)) {
        var easing = this._easing(this._opts.easing);
        var values = this._calculateTo(progress, easing);
        var reference = this._opts.shape || this;
        step(values, reference, this._opts.attachment);
    }
};

Path.prototype.stop = function stop() {
    this._stopTween();
    this.path.style.strokeDashoffset = this._getComputedDashOffset();
};

// Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/
Path.prototype.animate = function animate(progress, opts, cb) {
    opts = opts || {};

    if (utils.isFunction(opts)) {
        cb = opts;
        opts = {};
    }

    var passedOpts = utils.extend({}, opts);

    // Copy default opts to new object so defaults are not modified
    var defaultOpts = utils.extend({}, this._opts);
    opts = utils.extend(defaultOpts, opts);

    var shiftyEasing = this._easing(opts.easing);
    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

    this.stop();

    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this.path.getBoundingClientRect();

    var offset = this._getComputedDashOffset();
    var newOffset = this._progressToOffset(progress);

    var self = this;
    this._tweenable = new Tweenable();
    this._tweenable.tween({
        from: utils.extend({ offset: offset }, values.from),
        to: utils.extend({ offset: newOffset }, values.to),
        duration: opts.duration,
        delay: opts.delay,
        easing: shiftyEasing,
        step: function(state) {
            self.path.style.strokeDashoffset = state.offset;
            var reference = opts.shape || self;
            opts.step(state, reference, opts.attachment);
        }
    }).then(function(state) {
        if (utils.isFunction(cb)) {
            cb();
        }
    });
};

Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
    var computedStyle = window.getComputedStyle(this.path, null);
    return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
};

Path.prototype._progressToOffset = function _progressToOffset(progress) {
    var length = this.path.getTotalLength();
    return length - progress * length;
};

// Resolves from and to values for animation.
Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
    if (opts.from && opts.to) {
        return {
            from: opts.from,
            to: opts.to
        };
    }

    return {
        from: this._calculateFrom(easing),
        to: this._calculateTo(progress, easing)
    };
};

// Calculate `from` values from options passed at initialization
Path.prototype._calculateFrom = function _calculateFrom(easing) {
    return shifty.interpolate(this._opts.from, this._opts.to, this.value(), easing);
};

// Calculate `to` values from options passed at initialization
Path.prototype._calculateTo = function _calculateTo(progress, easing) {
    return shifty.interpolate(this._opts.from, this._opts.to, progress, easing);
};

Path.prototype._stopTween = function _stopTween() {
    if (this._tweenable !== null) {
        this._tweenable.stop();
        this._tweenable = null;
    }
};

Path.prototype._easing = function _easing(easing) {
    if (EASING_ALIASES.hasOwnProperty(easing)) {
        return EASING_ALIASES[easing];
    }

    return easing;
};

module.exports = Path;

},{"./utils":9,"shifty":10}],6:[function(require,module,exports){
// Semi-SemiCircle shaped progress bar

var Shape = require('./shape');
var Circle = require('./circle');
var utils = require('./utils');

var SemiCircle = function SemiCircle(container, options) {
    // Use one arc to form a SemiCircle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m -{radius},0' +
        ' a {radius},{radius} 0 1 1 {2radius},0';

    this.containerAspectRatio = 2;

    Shape.apply(this, arguments);
};

SemiCircle.prototype = new Shape();
SemiCircle.prototype.constructor = SemiCircle;

SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 50');
};

SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(
    opts,
    container,
    textContainer
) {
    if (opts.text.style) {
        // Reset top style
        textContainer.style.top = 'auto';
        textContainer.style.bottom = '0';

        if (opts.text.alignToBottom) {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
        } else {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
        }
    }
};

// Share functionality with Circle, just have different path
SemiCircle.prototype._pathString = Circle.prototype._pathString;
SemiCircle.prototype._trailString = Circle.prototype._trailString;

module.exports = SemiCircle;

},{"./circle":2,"./shape":7,"./utils":9}],7:[function(require,module,exports){
// Base object for different progress bar shapes

var Path = require('./path');
var utils = require('./utils');

var DESTROYED_ERROR = 'Object is destroyed';

var Shape = function Shape(container, opts) {
    // Throw a better error if progress bars are not initialized with `new`
    // keyword
    if (!(this instanceof Shape)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Prevent calling constructor without parameters so inheritance
    // works correctly. To understand, this is how Shape is inherited:
    //
    //   Line.prototype = new Shape();
    //
    // We just want to set the prototype for Line.
    if (arguments.length === 0) {
        return;
    }

    // Default parameters for progress bar creation
    this._opts = utils.extend({
        color: '#555',
        strokeWidth: 1.0,
        trailColor: null,
        trailWidth: null,
        fill: null,
        text: {
            style: {
                color: null,
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: 0,
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                }
            },
            autoStyleContainer: true,
            alignToBottom: true,
            value: null,
            className: 'progressbar-text'
        },
        svgStyle: {
            display: 'block',
            width: '100%'
        },
        warnings: false
    }, opts, true);  // Use recursive extend

    // If user specifies e.g. svgStyle or text style, the whole object
    // should replace the defaults to make working with styles easier
    if (utils.isObject(opts) && opts.svgStyle !== undefined) {
        this._opts.svgStyle = opts.svgStyle;
    }
    if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
        this._opts.text.style = opts.text.style;
    }

    var svgView = this._createSvgView(this._opts);

    var element;
    if (utils.isString(container)) {
        element = document.querySelector(container);
    } else {
        element = container;
    }

    if (!element) {
        throw new Error('Container does not exist: ' + container);
    }

    this._container = element;
    this._container.appendChild(svgView.svg);
    if (this._opts.warnings) {
        this._warnContainerAspectRatio(this._container);
    }

    if (this._opts.svgStyle) {
        utils.setStyles(svgView.svg, this._opts.svgStyle);
    }

    // Expose public attributes before Path initialization
    this.svg = svgView.svg;
    this.path = svgView.path;
    this.trail = svgView.trail;
    this.text = null;

    var newOpts = utils.extend({
        attachment: undefined,
        shape: this
    }, this._opts);
    this._progressPath = new Path(svgView.path, newOpts);

    if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
        this.setText(this._opts.text.value);
    }
};

Shape.prototype.animate = function animate(progress, opts, cb) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this._progressPath.animate(progress, opts, cb);
};

Shape.prototype.stop = function stop() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    // Don't crash if stop is called inside step function
    if (this._progressPath === undefined) {
        return;
    }

    this._progressPath.stop();
};

Shape.prototype.pause = function pause() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this._progressPath === undefined) {
        return;
    }

    if (!this._progressPath._tweenable) {
        // It seems that we can't pause this
        return;
    }

    this._progressPath._tweenable.pause();
};

Shape.prototype.resume = function resume() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this._progressPath === undefined) {
        return;
    }

    if (!this._progressPath._tweenable) {
        // It seems that we can't resume this
        return;
    }

    this._progressPath._tweenable.resume();
};

Shape.prototype.destroy = function destroy() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this.stop();
    this.svg.parentNode.removeChild(this.svg);
    this.svg = null;
    this.path = null;
    this.trail = null;
    this._progressPath = null;

    if (this.text !== null) {
        this.text.parentNode.removeChild(this.text);
        this.text = null;
    }
};

Shape.prototype.set = function set(progress) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this._progressPath.set(progress);
};

Shape.prototype.value = function value() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this._progressPath === undefined) {
        return 0;
    }

    return this._progressPath.value();
};

Shape.prototype.setText = function setText(newText) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this.text === null) {
        // Create new text node
        this.text = this._createTextContainer(this._opts, this._container);
        this._container.appendChild(this.text);
    }

    // Remove previous text and add new
    if (utils.isObject(newText)) {
        utils.removeChildren(this.text);
        this.text.appendChild(newText);
    } else {
        this.text.innerHTML = newText;
    }
};

Shape.prototype._createSvgView = function _createSvgView(opts) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._initializeSvg(svg, opts);

    var trailPath = null;
    // Each option listed in the if condition are 'triggers' for creating
    // the trail path
    if (opts.trailColor || opts.trailWidth) {
        trailPath = this._createTrail(opts);
        svg.appendChild(trailPath);
    }

    var path = this._createPath(opts);
    svg.appendChild(path);

    return {
        svg: svg,
        path: path,
        trail: trailPath
    };
};

Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 100');
};

Shape.prototype._createPath = function _createPath(opts) {
    var pathString = this._pathString(opts);
    return this._createPathElement(pathString, opts);
};

Shape.prototype._createTrail = function _createTrail(opts) {
    // Create path string with original passed options
    var pathString = this._trailString(opts);

    // Prevent modifying original
    var newOpts = utils.extend({}, opts);

    // Defaults for parameters which modify trail path
    if (!newOpts.trailColor) {
        newOpts.trailColor = '#eee';
    }
    if (!newOpts.trailWidth) {
        newOpts.trailWidth = newOpts.strokeWidth;
    }

    newOpts.color = newOpts.trailColor;
    newOpts.strokeWidth = newOpts.trailWidth;

    // When trail path is set, fill must be set for it instead of the
    // actual path to prevent trail stroke from clipping
    newOpts.fill = null;

    return this._createPathElement(pathString, newOpts);
};

Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathString);
    path.setAttribute('stroke', opts.color);
    path.setAttribute('stroke-width', opts.strokeWidth);

    if (opts.fill) {
        path.setAttribute('fill', opts.fill);
    } else {
        path.setAttribute('fill-opacity', '0');
    }

    return path;
};

Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
    var textContainer = document.createElement('div');
    textContainer.className = opts.text.className;

    var textStyle = opts.text.style;
    if (textStyle) {
        if (opts.text.autoStyleContainer) {
            container.style.position = 'relative';
        }

        utils.setStyles(textContainer, textStyle);
        // Default text color to progress bar's color
        if (!textStyle.color) {
            textContainer.style.color = opts.color;
        }
    }

    this._initializeTextContainer(opts, container, textContainer);
    return textContainer;
};

// Give custom shapes possibility to modify text element
Shape.prototype._initializeTextContainer = function(opts, container, element) {
    // By default, no-op
    // Custom shapes should respect API options, such as text.style
};

Shape.prototype._pathString = function _pathString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._trailString = function _trailString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
    if (!this.containerAspectRatio) {
        return;
    }

    var computedStyle = window.getComputedStyle(container, null);
    var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
    var height = parseFloat(computedStyle.getPropertyValue('height'), 10);
    if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
        console.warn(
            'Incorrect aspect ratio of container',
            '#' + container.id,
            'detected:',
            computedStyle.getPropertyValue('width') + '(width)',
            '/',
            computedStyle.getPropertyValue('height') + '(height)',
            '=',
            width / height
        );

        console.warn(
            'Aspect ratio of should be',
            this.containerAspectRatio
        );
    }
};

module.exports = Shape;

},{"./path":5,"./utils":9}],8:[function(require,module,exports){
// Square shaped progress bar
// Note: Square is not core part of API anymore. It's left here
//       for reference. square is not included to the progressbar
//       build anymore

var Shape = require('./shape');
var utils = require('./utils');

var Square = function Square(container, options) {
    this._pathTemplate =
        'M 0,{halfOfStrokeWidth}' +
        ' L {width},{halfOfStrokeWidth}' +
        ' L {width},{width}' +
        ' L {halfOfStrokeWidth},{width}' +
        ' L {halfOfStrokeWidth},{strokeWidth}';

    this._trailTemplate =
        'M {startMargin},{halfOfStrokeWidth}' +
        ' L {width},{halfOfStrokeWidth}' +
        ' L {width},{width}' +
        ' L {halfOfStrokeWidth},{width}' +
        ' L {halfOfStrokeWidth},{halfOfStrokeWidth}';

    Shape.apply(this, arguments);
};

Square.prototype = new Shape();
Square.prototype.constructor = Square;

Square.prototype._pathString = function _pathString(opts) {
    var w = 100 - opts.strokeWidth / 2;

    return utils.render(this._pathTemplate, {
        width: w,
        strokeWidth: opts.strokeWidth,
        halfOfStrokeWidth: opts.strokeWidth / 2
    });
};

Square.prototype._trailString = function _trailString(opts) {
    var w = 100 - opts.strokeWidth / 2;

    return utils.render(this._trailTemplate, {
        width: w,
        strokeWidth: opts.strokeWidth,
        halfOfStrokeWidth: opts.strokeWidth / 2,
        startMargin: opts.strokeWidth / 2 - opts.trailWidth / 2
    });
};

module.exports = Square;

},{"./shape":7,"./utils":9}],9:[function(require,module,exports){
// Utility functions

var PREFIXES = 'Webkit Moz O ms'.split(' ');
var FLOAT_COMPARISON_EPSILON = 0.001;

// Copy all attributes from source object to destination object.
// destination object is mutated.
function extend(destination, source, recursive) {
    destination = destination || {};
    source = source || {};
    recursive = recursive || false;

    for (var attrName in source) {
        if (source.hasOwnProperty(attrName)) {
            var destVal = destination[attrName];
            var sourceVal = source[attrName];
            if (recursive && isObject(destVal) && isObject(sourceVal)) {
                destination[attrName] = extend(destVal, sourceVal, recursive);
            } else {
                destination[attrName] = sourceVal;
            }
        }
    }

    return destination;
}

// Renders templates with given variables. Variables must be surrounded with
// braces without any spaces, e.g. {variable}
// All instances of variable placeholders will be replaced with given content
// Example:
// render('Hello, {message}!', {message: 'world'})
function render(template, vars) {
    var rendered = template;

    for (var key in vars) {
        if (vars.hasOwnProperty(key)) {
            var val = vars[key];
            var regExpString = '\\{' + key + '\\}';
            var regExp = new RegExp(regExpString, 'g');

            rendered = rendered.replace(regExp, val);
        }
    }

    return rendered;
}

function setStyle(element, style, value) {
    var elStyle = element.style;  // cache for performance

    for (var i = 0; i < PREFIXES.length; ++i) {
        var prefix = PREFIXES[i];
        elStyle[prefix + capitalize(style)] = value;
    }

    elStyle[style] = value;
}

function setStyles(element, styles) {
    forEachObject(styles, function(styleValue, styleName) {
        // Allow disabling some individual styles by setting them
        // to null or undefined
        if (styleValue === null || styleValue === undefined) {
            return;
        }

        // If style's value is {prefix: true, value: '50%'},
        // Set also browser prefixed styles
        if (isObject(styleValue) && styleValue.prefix === true) {
            setStyle(element, styleName, styleValue.value);
        } else {
            element.style[styleName] = styleValue;
        }
    });
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
// array
function isObject(obj) {
    if (isArray(obj)) {
        return false;
    }

    var type = typeof obj;
    return type === 'object' && !!obj;
}

function forEachObject(object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var val = object[key];
            callback(val, key);
        }
    }
}

function floatEquals(a, b) {
    return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
}

// https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
function removeChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

module.exports = {
    extend: extend,
    render: render,
    setStyle: setStyle,
    setStyles: setStyles,
    capitalize: capitalize,
    isString: isString,
    isFunction: isFunction,
    isObject: isObject,
    forEachObject: forEachObject,
    floatEquals: floatEquals,
    removeChildren: removeChildren
};

},{}],10:[function(require,module,exports){
/*! For license information please see shifty.js.LICENSE.txt */
!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("shifty",[],n):"object"==typeof exports?exports.shifty=n():t.shifty=n()}(self,(function(){return function(){"use strict";var t={720:function(t,n,e){e.r(n),e.d(n,{Scene:function(){return Xt},Tweenable:function(){return _t},interpolate:function(){return Wt},processTweens:function(){return ft},setBezierFunction:function(){return Yt},tween:function(){return yt},unsetBezierFunction:function(){return Zt}});var r={};e.r(r),e.d(r,{bounce:function(){return D},bouncePast:function(){return q},easeFrom:function(){return B},easeFromTo:function(){return Q},easeInBack:function(){return T},easeInCirc:function(){return j},easeInCubic:function(){return c},easeInExpo:function(){return w},easeInOutBack:function(){return F},easeInOutCirc:function(){return P},easeInOutCubic:function(){return l},easeInOutExpo:function(){return S},easeInOutQuad:function(){return s},easeInOutQuart:function(){return v},easeInOutQuint:function(){return d},easeInOutSine:function(){return b},easeInQuad:function(){return o},easeInQuart:function(){return h},easeInQuint:function(){return _},easeInSine:function(){return m},easeOutBack:function(){return E},easeOutBounce:function(){return M},easeOutCirc:function(){return k},easeOutCubic:function(){return f},easeOutExpo:function(){return O},easeOutQuad:function(){return a},easeOutQuart:function(){return p},easeOutQuint:function(){return y},easeOutSine:function(){return g},easeTo:function(){return N},elastic:function(){return x},linear:function(){return u},swingFrom:function(){return I},swingFromTo:function(){return A},swingTo:function(){return C}});var i={};e.r(i),e.d(i,{afterTween:function(){return Nt},beforeTween:function(){return Bt},doesApply:function(){return qt},tweenCreated:function(){return Qt}});var u=function(t){return t},o=function(t){return Math.pow(t,2)},a=function(t){return-(Math.pow(t-1,2)-1)},s=function(t){return(t/=.5)<1?.5*Math.pow(t,2):-.5*((t-=2)*t-2)},c=function(t){return Math.pow(t,3)},f=function(t){return Math.pow(t-1,3)+1},l=function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},h=function(t){return Math.pow(t,4)},p=function(t){return-(Math.pow(t-1,4)-1)},v=function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},_=function(t){return Math.pow(t,5)},y=function(t){return Math.pow(t-1,5)+1},d=function(t){return(t/=.5)<1?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)},m=function(t){return 1-Math.cos(t*(Math.PI/2))},g=function(t){return Math.sin(t*(Math.PI/2))},b=function(t){return-.5*(Math.cos(Math.PI*t)-1)},w=function(t){return 0===t?0:Math.pow(2,10*(t-1))},O=function(t){return 1===t?1:1-Math.pow(2,-10*t)},S=function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},j=function(t){return-(Math.sqrt(1-t*t)-1)},k=function(t){return Math.sqrt(1-Math.pow(t-1,2))},P=function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},M=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},T=function(t){var n=1.70158;return t*t*((n+1)*t-n)},E=function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},F=function(t){var n=1.70158;return(t/=.5)<1?t*t*((1+(n*=1.525))*t-n)*.5:.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},x=function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},A=function(t){var n=1.70158;return(t/=.5)<1?t*t*((1+(n*=1.525))*t-n)*.5:.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},I=function(t){var n=1.70158;return t*t*((n+1)*t-n)},C=function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},D=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},q=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?2-(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?2-(7.5625*(t-=2.25/2.75)*t+.9375):2-(7.5625*(t-=2.625/2.75)*t+.984375)},Q=function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},B=function(t){return Math.pow(t,4)},N=function(t){return Math.pow(t,.25)};function R(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function z(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function L(t){return(L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function U(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function V(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?U(Object(e),!0).forEach((function(n){W(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):U(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function W(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var $,G,H,J="linear",K="undefined"!=typeof window?window:e.g,X="afterTween",Y="afterTweenEnd",Z="beforeTween",tt="tweenCreated",nt="function",et="string",rt=K.requestAnimationFrame||K.webkitRequestAnimationFrame||K.oRequestAnimationFrame||K.msRequestAnimationFrame||K.mozCancelRequestAnimationFrame&&K.mozRequestAnimationFrame||setTimeout,it=function(){},ut=null,ot=null,at=V({},r),st=function(t,n,e,r,i,u,o){var a,s,c,f=t<u?0:(t-u)/i,l=!1;for(var h in o&&o.call&&(l=!0,a=o(f)),n)l||(a=((s=o[h]).call?s:at[s])(f)),c=e[h],n[h]=c+(r[h]-c)*a;return n},ct=function(t,n){var e=t._timestamp,r=t._currentState,i=t._delay;if(!(n<e+i)){var u=t._duration,o=t._targetState,a=e+i+u,s=n>a?a:n,c=s>=a,f=u-(a-s),l=t._filters.length>0;if(c)return t._render(o,t._data,f),t.stop(!0);l&&t._applyFilter(Z),s<e+i?e=u=s=1:e+=i,st(s,r,t._originalState,o,u,e,t._easing),l&&t._applyFilter(X),t._render(r,t._data,f)}},ft=function(){for(var t,n=_t.now(),e=ut;e;)t=e._next,ct(e,n),e=t},lt=Date.now||function(){return+new Date},ht=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:J,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=L(n);if(at[n])return at[n];if(r===et||r===nt)for(var i in t)e[i]=n;else for(var u in t)e[u]=n[u]||J;return e},pt=function(t){t===ut?(ut=t._next)?ut._previous=null:ot=null:t===ot?(ot=t._previous)?ot._next=null:ut=null:(G=t._previous,H=t._next,G._next=H,H._previous=G),t._previous=t._next=null},vt="function"==typeof Promise?Promise:null,_t=function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;R(this,t),this._config={},this._data={},this._delay=0,this._filters=[],this._next=null,this._previous=null,this._timestamp=null,this._resolve=null,this._reject=null,this._currentState=n||{},this._originalState={},this._targetState={},this._start=it,this._render=it,this._promiseCtor=vt,e&&this.setConfig(e)}var n,e;return n=t,(e=[{key:"_applyFilter",value:function(t){for(var n=this._filters.length;n>0;n--){var e=this._filters[n-n][t];e&&e(this)}}},{key:"tween",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;return this._isPlaying&&this.stop(),!n&&this._config||this.setConfig(n),this._pausedAtTime=null,this._timestamp=t.now(),this._start(this.get(),this._data),this._delay&&this._render(this._currentState,this._data,0),this._resume(this._timestamp)}},{key:"setConfig",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this._config;for(var r in n)e[r]=n[r];var i=e.promise,u=void 0===i?this._promiseCtor:i,o=e.start,a=void 0===o?it:o,s=e.finish,c=e.render,f=void 0===c?this._config.step||it:c,l=e.step,h=void 0===l?it:l;this._data=e.data||e.attachment||this._data,this._isPlaying=!1,this._pausedAtTime=null,this._scheduleId=null,this._delay=n.delay||0,this._start=a,this._render=f||h,this._duration=e.duration||500,this._promiseCtor=u,s&&(this._resolve=s);var p=n.from,v=n.to,_=void 0===v?{}:v,y=this._currentState,d=this._originalState,m=this._targetState;for(var g in p)y[g]=p[g];var b=!1;for(var w in y){var O=y[w];b||L(O)!==et||(b=!0),d[w]=O,m[w]=_.hasOwnProperty(w)?_[w]:O}if(this._easing=ht(this._currentState,e.easing,this._easing),this._filters.length=0,b){for(var S in t.filters)t.filters[S].doesApply(this)&&this._filters.push(t.filters[S]);this._applyFilter(tt)}return this}},{key:"then",value:function(t,n){var e=this;return this._promise=new this._promiseCtor((function(t,n){e._resolve=t,e._reject=n})),this._promise.then(t,n)}},{key:"catch",value:function(t){return this.then().catch(t)}},{key:"get",value:function(){return V({},this._currentState)}},{key:"set",value:function(t){this._currentState=t}},{key:"pause",value:function(){if(this._isPlaying)return this._pausedAtTime=t.now(),this._isPlaying=!1,pt(this),this}},{key:"resume",value:function(){return this._resume()}},{key:"_resume",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.now();return null===this._timestamp?this.tween():this._isPlaying?this._promise:(this._pausedAtTime&&(this._timestamp+=n-this._pausedAtTime,this._pausedAtTime=null),this._isPlaying=!0,null===ut?(ut=this,ot=this):(this._previous=ot,ot._next=this,ot=this),this)}},{key:"seek",value:function(n){n=Math.max(n,0);var e=t.now();return this._timestamp+n===0||(this._timestamp=e-n,ct(this,e)),this}},{key:"stop",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!this._isPlaying)return this;this._isPlaying=!1,pt(this);var n=this._filters.length>0;t&&(n&&this._applyFilter(Z),st(1,this._currentState,this._originalState,this._targetState,1,0,this._easing),n&&(this._applyFilter(X),this._applyFilter(Y))),this._resolve&&this._resolve({data:this._data,state:this._currentState,tweenable:this}),this._resolve=null,this._reject=null;var e=this._currentState,r=this._originalState,i=this._targetState;for(var u in e)r[u]=i[u]=e[u];return this}},{key:"cancel",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this._currentState,e=this._data,r=this._isPlaying;return r?(this._reject&&this._reject({data:e,state:n,tweenable:this}),this._resolve=null,this._reject=null,this.stop(t)):this}},{key:"isPlaying",value:function(){return this._isPlaying}},{key:"setScheduleFunction",value:function(n){t.setScheduleFunction(n)}},{key:"data",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return t&&(this._data=V({},t)),this._data}},{key:"dispose",value:function(){for(var t in this)delete this[t]}}])&&z(n.prototype,e),t}();function yt(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=new _t;return n.tween(t),n.tweenable=n,n}W(_t,"now",(function(){return $})),_t.setScheduleFunction=function(t){return rt=t},_t.formulas=at,_t.filters={},function t(){$=lt(),rt.call(K,t,16.666666666666668),ft()}();var dt,mt,gt=/(\d|-|\.)/,bt=/([^\-0-9.]+)/g,wt=/[0-9.-]+/g,Ot=(dt=wt.source,mt=/,\s*/.source,new RegExp("rgb\\(".concat(dt).concat(mt).concat(dt).concat(mt).concat(dt,"\\)"),"g")),St=/^.*\(/,jt=/#([0-9]|[a-f]){3,6}/gi,kt="VAL",Pt=function(t,n){return t.map((function(t,e){return"_".concat(n,"_").concat(e)}))};function Mt(t){return parseInt(t,16)}var Tt=function(t){return"rgb(".concat((n=t,3===(n=n.replace(/#/,"")).length&&(n=(n=n.split(""))[0]+n[0]+n[1]+n[1]+n[2]+n[2]),[Mt(n.substr(0,2)),Mt(n.substr(2,2)),Mt(n.substr(4,2))]).join(","),")");var n},Et=function(t,n,e){var r=n.match(t),i=n.replace(t,kt);return r&&r.forEach((function(t){return i=i.replace(kt,e(t))})),i},Ft=function(t){for(var n in t){var e=t[n];"string"==typeof e&&e.match(jt)&&(t[n]=Et(jt,e,Tt))}},xt=function(t){var n=t.match(wt).map(Math.floor),e=t.match(St)[0];return"".concat(e).concat(n.join(","),")")},At=function(t){return t.match(wt)},It=function(t,n){var e={};return n.forEach((function(n){e[n]=t[n],delete t[n]})),e},Ct=function(t,n){return n.map((function(n){return t[n]}))},Dt=function(t,n){return n.forEach((function(n){return t=t.replace(kt,+n.toFixed(4))})),t},qt=function(t){for(var n in t._currentState)if("string"==typeof t._currentState[n])return!0;return!1};function Qt(t){var n=t._currentState;[n,t._originalState,t._targetState].forEach(Ft),t._tokenData=function(t){var n,e,r={};for(var i in t){var u=t[i];"string"==typeof u&&(r[i]={formatString:(n=u,e=void 0,e=n.match(bt),e?(1===e.length||n.charAt(0).match(gt))&&e.unshift(""):e=["",""],e.join(kt)),chunkNames:Pt(At(u),i)})}return r}(n)}function Bt(t){var n=t._currentState,e=t._originalState,r=t._targetState,i=t._easing,u=t._tokenData;!function(t,n){var e=function(e){var r=n[e].chunkNames,i=t[e];if("string"==typeof i){var u=i.split(" "),o=u[u.length-1];r.forEach((function(n,e){return t[n]=u[e]||o}))}else r.forEach((function(n){return t[n]=i}));delete t[e]};for(var r in n)e(r)}(i,u),[n,e,r].forEach((function(t){return function(t,n){var e=function(e){At(t[e]).forEach((function(r,i){return t[n[e].chunkNames[i]]=+r})),delete t[e]};for(var r in n)e(r)}(t,u)}))}function Nt(t){var n=t._currentState,e=t._originalState,r=t._targetState,i=t._easing,u=t._tokenData;[n,e,r].forEach((function(t){return function(t,n){for(var e in n){var r=n[e],i=r.chunkNames,u=r.formatString,o=Dt(u,Ct(It(t,i),i));t[e]=Et(Ot,o,xt)}}(t,u)})),function(t,n){for(var e in n){var r=n[e].chunkNames,i=t[r[0]];t[e]="string"==typeof i?r.map((function(n){var e=t[n];return delete t[n],e})).join(" "):i}}(i,u)}function Rt(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function zt(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?Rt(Object(e),!0).forEach((function(n){Lt(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):Rt(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function Lt(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var Ut=new _t,Vt=_t.filters,Wt=function(t,n,e,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,u=zt({},t),o=ht(t,r);for(var a in Ut._filters.length=0,Ut.set({}),Ut._currentState=u,Ut._originalState=t,Ut._targetState=n,Ut._easing=o,Vt)Vt[a].doesApply(Ut)&&Ut._filters.push(Vt[a]);Ut._applyFilter("tweenCreated"),Ut._applyFilter("beforeTween");var s=st(e,u,t,n,1,i,o);return Ut._applyFilter("afterTween"),s};function $t(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function Gt(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function Ht(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Jt(t,n){var e=n.get(t);if(!e)throw new TypeError("attempted to get private field on non-instance");return e.get?e.get.call(t):e.value}var Kt=new WeakMap,Xt=function(){function t(){Gt(this,t),Kt.set(this,{writable:!0,value:[]});for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];e.forEach(this.add.bind(this))}var n,e;return n=t,(e=[{key:"add",value:function(t){return Jt(this,Kt).push(t),t}},{key:"remove",value:function(t){var n=Jt(this,Kt).indexOf(t);return~n&&Jt(this,Kt).splice(n,1),t}},{key:"empty",value:function(){return this.tweenables.map(this.remove.bind(this))}},{key:"isPlaying",value:function(){return Jt(this,Kt).some((function(t){return t.isPlaying()}))}},{key:"play",value:function(){return Jt(this,Kt).forEach((function(t){return t.tween()})),this}},{key:"pause",value:function(){return Jt(this,Kt).forEach((function(t){return t.pause()})),this}},{key:"resume",value:function(){return Jt(this,Kt).forEach((function(t){return t.resume()})),this}},{key:"stop",value:function(t){return Jt(this,Kt).forEach((function(n){return n.stop(t)})),this}},{key:"tweenables",get:function(){return function(t){if(Array.isArray(t))return $t(t)}(t=Jt(this,Kt))||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(t){if("string"==typeof t)return $t(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?$t(t,n):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();var t}},{key:"promises",get:function(){return Jt(this,Kt).map((function(t){return t.then()}))}}])&&Ht(n.prototype,e),t}();var Yt=function(t,n,e,r,i){var u=function(t,n,e,r){return function(i){return f=0,l=0,h=0,p=function(t){return((f*t+l)*t+h)*t},v=function(t){return(3*f*t+2*l)*t+h},_=function(t){return t>=0?t:0-t},f=1-(h=3*(u=t))-(l=3*(e-u)-h),a=1-(c=3*(o=n))-(s=3*(r-o)-c),function(t){return((a*t+s)*t+c)*t}(function(t,n){var e,r,i,u,o,a;for(i=t,a=0;a<8;a++){if(u=p(i)-t,_(u)<n)return i;if(o=v(i),_(o)<1e-6)break;i-=u/o}if((i=t)<(e=0))return e;if(i>(r=1))return r;for(;e<r;){if(u=p(i),_(u-t)<n)return i;t>u?e=i:r=i,i=.5*(r-e)+e}return i}(i,function(t){return 1/(200*t)}(1)));var u,o,a,s,c,f,l,h,p,v,_}}(n,e,r,i);return u.displayName=t,u.x1=n,u.y1=e,u.x2=r,u.y2=i,_t.formulas[t]=u},Zt=function(t){return delete _t.formulas[t]};_t.filters.token=i}},n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{}};return t[r](i,i.exports,e),i.exports}return e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e(720)}()}));

},{}],11:[function(require,module,exports){
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * Created by Sergiu Șandor (micku7zu) on 1/27/2017.
 * Original idea: https://github.com/gijsroge/tilt.js
 * MIT License.
 * Version 1.7.1
 */

var VanillaTilt = function () {
  function VanillaTilt(element) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, VanillaTilt);

    if (!(element instanceof Node)) {
      throw "Can't initialize VanillaTilt because " + element + " is not a Node.";
    }

    this.width = null;
    this.height = null;
    this.clientWidth = null;
    this.clientHeight = null;
    this.left = null;
    this.top = null;

    // for Gyroscope sampling
    this.gammazero = null;
    this.betazero = null;
    this.lastgammazero = null;
    this.lastbetazero = null;

    this.transitionTimeout = null;
    this.updateCall = null;
    this.event = null;

    this.updateBind = this.update.bind(this);
    this.resetBind = this.reset.bind(this);

    this.element = element;
    this.settings = this.extendSettings(settings);

    this.reverse = this.settings.reverse ? -1 : 1;
    this.glare = VanillaTilt.isSettingTrue(this.settings.glare);
    this.glarePrerender = VanillaTilt.isSettingTrue(this.settings["glare-prerender"]);
    this.fullPageListening = VanillaTilt.isSettingTrue(this.settings["full-page-listening"]);
    this.gyroscope = VanillaTilt.isSettingTrue(this.settings.gyroscope);
    this.gyroscopeSamples = this.settings.gyroscopeSamples;

    this.elementListener = this.getElementListener();

    if (this.glare) {
      this.prepareGlare();
    }

    if (this.fullPageListening) {
      this.updateClientSize();
    }

    this.addEventListeners();
    this.reset();
    this.updateInitialPosition();
  }

  VanillaTilt.isSettingTrue = function isSettingTrue(setting) {
    return setting === "" || setting === true || setting === 1;
  };

  /**
   * Method returns element what will be listen mouse events
   * @return {Node}
   */


  VanillaTilt.prototype.getElementListener = function getElementListener() {
    if (this.fullPageListening) {
      return window.document;
    }

    if (typeof this.settings["mouse-event-element"] === "string") {
      var mouseEventElement = document.querySelector(this.settings["mouse-event-element"]);

      if (mouseEventElement) {
        return mouseEventElement;
      }
    }

    if (this.settings["mouse-event-element"] instanceof Node) {
      return this.settings["mouse-event-element"];
    }

    return this.element;
  };

  /**
   * Method set listen methods for this.elementListener
   * @return {Node}
   */


  VanillaTilt.prototype.addEventListeners = function addEventListeners() {
    this.onMouseEnterBind = this.onMouseEnter.bind(this);
    this.onMouseMoveBind = this.onMouseMove.bind(this);
    this.onMouseLeaveBind = this.onMouseLeave.bind(this);
    this.onWindowResizeBind = this.onWindowResize.bind(this);
    this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this);

    this.elementListener.addEventListener("mouseenter", this.onMouseEnterBind);
    this.elementListener.addEventListener("mouseleave", this.onMouseLeaveBind);
    this.elementListener.addEventListener("mousemove", this.onMouseMoveBind);

    if (this.glare || this.fullPageListening) {
      window.addEventListener("resize", this.onWindowResizeBind);
    }

    if (this.gyroscope) {
      window.addEventListener("deviceorientation", this.onDeviceOrientationBind);
    }
  };

  /**
   * Method remove event listeners from current this.elementListener
   */


  VanillaTilt.prototype.removeEventListeners = function removeEventListeners() {
    this.elementListener.removeEventListener("mouseenter", this.onMouseEnterBind);
    this.elementListener.removeEventListener("mouseleave", this.onMouseLeaveBind);
    this.elementListener.removeEventListener("mousemove", this.onMouseMoveBind);

    if (this.gyroscope) {
      window.removeEventListener("deviceorientation", this.onDeviceOrientationBind);
    }

    if (this.glare || this.fullPageListening) {
      window.removeEventListener("resize", this.onWindowResizeBind);
    }
  };

  VanillaTilt.prototype.destroy = function destroy() {
    clearTimeout(this.transitionTimeout);
    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.reset();

    this.removeEventListeners();
    this.element.vanillaTilt = null;
    delete this.element.vanillaTilt;

    this.element = null;
  };

  VanillaTilt.prototype.onDeviceOrientation = function onDeviceOrientation(event) {
    if (event.gamma === null || event.beta === null) {
      return;
    }

    this.updateElementPosition();

    if (this.gyroscopeSamples > 0) {
      this.lastgammazero = this.gammazero;
      this.lastbetazero = this.betazero;

      if (this.gammazero === null) {
        this.gammazero = event.gamma;
        this.betazero = event.beta;
      } else {
        this.gammazero = (event.gamma + this.lastgammazero) / 2;
        this.betazero = (event.beta + this.lastbetazero) / 2;
      }

      this.gyroscopeSamples -= 1;
    }

    var totalAngleX = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
    var totalAngleY = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;

    var degreesPerPixelX = totalAngleX / this.width;
    var degreesPerPixelY = totalAngleY / this.height;

    var angleX = event.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero);
    var angleY = event.beta - (this.settings.gyroscopeMinAngleY + this.betazero);

    var posX = angleX / degreesPerPixelX;
    var posY = angleY / degreesPerPixelY;

    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.event = {
      clientX: posX + this.left,
      clientY: posY + this.top
    };

    this.updateCall = requestAnimationFrame(this.updateBind);
  };

  VanillaTilt.prototype.onMouseEnter = function onMouseEnter() {
    this.updateElementPosition();
    this.element.style.willChange = "transform";
    this.setTransition();
  };

  VanillaTilt.prototype.onMouseMove = function onMouseMove(event) {
    if (this.updateCall !== null) {
      cancelAnimationFrame(this.updateCall);
    }

    this.event = event;
    this.updateCall = requestAnimationFrame(this.updateBind);
  };

  VanillaTilt.prototype.onMouseLeave = function onMouseLeave() {
    this.setTransition();

    if (this.settings.reset) {
      requestAnimationFrame(this.resetBind);
    }
  };

  VanillaTilt.prototype.reset = function reset() {
    this.event = {
      clientX: this.left + this.width / 2,
      clientY: this.top + this.height / 2
    };

    if (this.element && this.element.style) {
      this.element.style.transform = "perspective(" + this.settings.perspective + "px) " + "rotateX(0deg) " + "rotateY(0deg) " + "scale3d(1, 1, 1)";
    }

    this.resetGlare();
  };

  VanillaTilt.prototype.resetGlare = function resetGlare() {
    if (this.glare) {
      this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)";
      this.glareElement.style.opacity = "0";
    }
  };

  VanillaTilt.prototype.updateInitialPosition = function updateInitialPosition() {
    if (this.settings.startX === 0 && this.settings.startY === 0) {
      return;
    }

    this.onMouseEnter();

    if (this.fullPageListening) {
      this.event = {
        clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth,
        clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight
      };
    } else {
      this.event = {
        clientX: this.left + (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width,
        clientY: this.top + (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height
      };
    }

    var backupScale = this.settings.scale;
    this.settings.scale = 1;
    this.update();
    this.settings.scale = backupScale;
    this.resetGlare();
  };

  VanillaTilt.prototype.getValues = function getValues() {
    var x = void 0,
        y = void 0;

    if (this.fullPageListening) {
      x = this.event.clientX / this.clientWidth;
      y = this.event.clientY / this.clientHeight;
    } else {
      x = (this.event.clientX - this.left) / this.width;
      y = (this.event.clientY - this.top) / this.height;
    }

    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    var tiltX = (this.reverse * (this.settings.max - x * this.settings.max * 2)).toFixed(2);
    var tiltY = (this.reverse * (y * this.settings.max * 2 - this.settings.max)).toFixed(2);
    var angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);

    return {
      tiltX: tiltX,
      tiltY: tiltY,
      percentageX: x * 100,
      percentageY: y * 100,
      angle: angle
    };
  };

  VanillaTilt.prototype.updateElementPosition = function updateElementPosition() {
    var rect = this.element.getBoundingClientRect();

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.left = rect.left;
    this.top = rect.top;
  };

  VanillaTilt.prototype.update = function update() {
    var values = this.getValues();

    this.element.style.transform = "perspective(" + this.settings.perspective + "px) " + "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " + "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " + "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";

    if (this.glare) {
      this.glareElement.style.transform = "rotate(" + values.angle + "deg) translate(-50%, -50%)";
      this.glareElement.style.opacity = "" + values.percentageY * this.settings["max-glare"] / 100;
    }

    this.element.dispatchEvent(new CustomEvent("tiltChange", {
      "detail": values
    }));

    this.updateCall = null;
  };

  /**
   * Appends the glare element (if glarePrerender equals false)
   * and sets the default style
   */


  VanillaTilt.prototype.prepareGlare = function prepareGlare() {
    // If option pre-render is enabled we assume all html/css is present for an optimal glare effect.
    if (!this.glarePrerender) {
      // Create glare element
      var jsTiltGlare = document.createElement("div");
      jsTiltGlare.classList.add("js-tilt-glare");

      var jsTiltGlareInner = document.createElement("div");
      jsTiltGlareInner.classList.add("js-tilt-glare-inner");

      jsTiltGlare.appendChild(jsTiltGlareInner);
      this.element.appendChild(jsTiltGlare);
    }

    this.glareElementWrapper = this.element.querySelector(".js-tilt-glare");
    this.glareElement = this.element.querySelector(".js-tilt-glare-inner");

    if (this.glarePrerender) {
      return;
    }

    Object.assign(this.glareElementWrapper.style, {
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%",
      "overflow": "hidden",
      "pointer-events": "none"
    });

    Object.assign(this.glareElement.style, {
      "position": "absolute",
      "top": "50%",
      "left": "50%",
      "pointer-events": "none",
      "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
      "width": this.element.offsetWidth * 2 + "px",
      "height": this.element.offsetWidth * 2 + "px",
      "transform": "rotate(180deg) translate(-50%, -50%)",
      "transform-origin": "0% 0%",
      "opacity": "0"
    });
  };

  VanillaTilt.prototype.updateGlareSize = function updateGlareSize() {
    if (this.glare) {
      Object.assign(this.glareElement.style, {
        "width": "" + this.element.offsetWidth * 2,
        "height": "" + this.element.offsetWidth * 2
      });
    }
  };

  VanillaTilt.prototype.updateClientSize = function updateClientSize() {
    this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  };

  VanillaTilt.prototype.onWindowResize = function onWindowResize() {
    this.updateGlareSize();
    this.updateClientSize();
  };

  VanillaTilt.prototype.setTransition = function setTransition() {
    var _this = this;

    clearTimeout(this.transitionTimeout);
    this.element.style.transition = this.settings.speed + "ms " + this.settings.easing;
    if (this.glare) this.glareElement.style.transition = "opacity " + this.settings.speed + "ms " + this.settings.easing;

    this.transitionTimeout = setTimeout(function () {
      _this.element.style.transition = "";
      if (_this.glare) {
        _this.glareElement.style.transition = "";
      }
    }, this.settings.speed);
  };

  /**
   * Method return patched settings of instance
   * @param {boolean} settings.reverse - reverse the tilt direction
   * @param {number} settings.max - max tilt rotation (degrees)
   * @param {startX} settings.startX - the starting tilt on the X axis, in degrees. Default: 0
   * @param {startY} settings.startY - the starting tilt on the Y axis, in degrees. Default: 0
   * @param {number} settings.perspective - Transform perspective, the lower the more extreme the tilt gets
   * @param {string} settings.easing - Easing on enter/exit
   * @param {number} settings.scale - 2 = 200%, 1.5 = 150%, etc..
   * @param {number} settings.speed - Speed of the enter/exit transition
   * @param {boolean} settings.transition - Set a transition on enter/exit
   * @param {string|null} settings.axis - What axis should be disabled. Can be X or Y
   * @param {boolean} settings.glare - What axis should be disabled. Can be X or Y
   * @param {number} settings.max-glare - the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
   * @param {boolean} settings.glare-prerender - false = VanillaTilt creates the glare elements for you, otherwise
   * @param {boolean} settings.full-page-listening - If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
   * @param {string|object} settings.mouse-event-element - String selector or link to HTML-element what will be listen mouse events
   * @param {boolean} settings.reset - false = If the tilt effect has to be reset on exit
   * @param {gyroscope} settings.gyroscope - Enable tilting by deviceorientation events
   * @param {gyroscopeSensitivity} settings.gyroscopeSensitivity - Between 0 and 1 - The angle at which max tilt position is reached. 1 = 90deg, 0.5 = 45deg, etc..
   * @param {gyroscopeSamples} settings.gyroscopeSamples - How many gyroscope moves to decide the starting position.
   */


  VanillaTilt.prototype.extendSettings = function extendSettings(settings) {
    var defaultSettings = {
      reverse: false,
      max: 15,
      startX: 0,
      startY: 0,
      perspective: 1000,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      scale: 1,
      speed: 300,
      transition: true,
      axis: null,
      glare: false,
      "max-glare": 1,
      "glare-prerender": false,
      "full-page-listening": false,
      "mouse-event-element": null,
      reset: true,
      gyroscope: true,
      gyroscopeMinAngleX: -45,
      gyroscopeMaxAngleX: 45,
      gyroscopeMinAngleY: -45,
      gyroscopeMaxAngleY: 45,
      gyroscopeSamples: 10
    };

    var newSettings = {};
    for (var property in defaultSettings) {
      if (property in settings) {
        newSettings[property] = settings[property];
      } else if (this.element.hasAttribute("data-tilt-" + property)) {
        var attribute = this.element.getAttribute("data-tilt-" + property);
        try {
          newSettings[property] = JSON.parse(attribute);
        } catch (e) {
          newSettings[property] = attribute;
        }
      } else {
        newSettings[property] = defaultSettings[property];
      }
    }

    return newSettings;
  };

  VanillaTilt.init = function init(elements, settings) {
    if (elements instanceof Node) {
      elements = [elements];
    }

    if (elements instanceof NodeList) {
      elements = [].slice.call(elements);
    }

    if (!(elements instanceof Array)) {
      return;
    }

    elements.forEach(function (element) {
      if (!("vanillaTilt" in element)) {
        element.vanillaTilt = new VanillaTilt(element, settings);
      }
    });
  };

  return VanillaTilt;
}();

if (typeof document !== "undefined") {
  /* expose the class to window */
  window.VanillaTilt = VanillaTilt;

  /**
   * Auto load
   */
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
}

module.exports = VanillaTilt;

},{}]},{},[1]);

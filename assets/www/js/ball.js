var __bind = function(fn, me) {
  return function() {
    fn.apply(me, arguments);
  };};

var ball = function(opts) {
	// Default options
	if (!opts) {
		this.options = {
			diameter: 20,
			className: 'bouncing-ball',
			container: 'ball-sack'
		};
	} else {
		this.options = opts;
	}

	// Build the element
	this.el = document.createElement('div');
	this.el.className = this.options.className;
	this.el.style.width = this.options.diameter + 'px';
	this.el.style.height = this.options.diameter + 'px';
	this.el.style.borderRadius = parseInt(this.options.diameter / 2) + 'px';
  
  this.parent = document.getElementById(this.options.container);
  if (parent)
    this.parent.appendChild(this.el);

  // Initialize acceleration values
  this.accel = {
    x: 0,
    y: 0
  }

  this.right = this.parent.clientWidth;
  this.bottom = this.parent.clientHeight;

  this.updatePos = __bind(this.updatePos, this);
}

ball.prototype.start = function() {
	document.addEventListener('accelUpdate', this.updatePos, false);
}

ball.prototype.updatePos = function(evt) {
  pos = evt.detail || {};
  if (typeof pos.x === 'undefined' || typeof pos.y === 'undefined')
    return;

  pos.x = Math.floor(pos.x);
  pos.y = Math.floor(pos.y);

  // Set the animation end state values for acceleration sign changes
  var goal = {
    x: 0,
    y: 0,
    time: 3
  }
  if (pos.x !== 0)
    goal.x = pos.x < 0 ? this.right - this.options.diameter : 0;
  if (pos.y !== 0)
    goal.y = pos.y > 0 ? this.bottom - this.options.diameter : 0;
  goal.time = Math.floor( 5 / Math.max(pos.x, pos.y) );

  this.el.style.webkitTransform = 
    'translateX('+goal.x+'px) translateY('+goal.y+'px)'
  // this.el.style.webkitTransition = 
  //   'all '+goal.time+'s'

}

ball.prototype.getTime = function() {
  return parseInt( this.el.style.webkitTransition.replace('s','') );
}
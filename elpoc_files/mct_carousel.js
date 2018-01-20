var MctCarousel = Class.create();  
  
MctCarousel.prototype = {
	
	_id: '',
	_container: null,
	_duration: 5000,
	_fadeDuration: .5,
	_currentSlide: 0,
	_slides: new Array(),
	_max: 0,
	_interval: null,
	_autoRun: false,
	
    /* 
    * INITIALIZATION - CONFIGURATION 
    */  
    initialize: function(id, autoRun) {  
    	this._id = id;
    	this._container = $(id);
    	this._slides = $$('#'+this._id+' .slide');
    	this._slides.invoke('hide');
    	this._max = this._slides.length;
    	this._autoRun = autoRun;
		
		// Nav Click
		this._container.select('.nav li.nav-slide a').invoke('observe','click',function(e){
			clearInterval(this._interval);
			var slideId = e.currentTarget.readAttribute('href').substr(1 + this._id.length + 6);
			this.showSlide(slideId);
			Event.stop(e);
		}.bind(this));
		
		// Next Click
		this._container.select('a.nav-next').invoke('observe','click',function(e){
			clearInterval(this._interval);
			this.nextSlide();
			Event.stop(e);
		}.bind(this));
		
		// prev Click
		this._container.select('a.nav-prev').invoke('observe','click',function(e){
			clearInterval(this._interval);
			this.prevSlide();
			Event.stop(e);
		}.bind(this));
    	
    	this.showSlide(1);
    },  
  
    // ShowSlide
    showSlide: function(_slideId) {          
		if(this._currentSlide) { Effect.Fade(this._id+'-slide'+this._currentSlide, { duration: this._fadeDuration }); }
		Effect.Appear(this._id+'-slide'+_slideId, { duration: this._fadeDuration });
		
		this._container.select('.nav .active').invoke('removeClassName','active');
		this._container.select('.nav a[href=#'+this._id+'-slide'+_slideId+']').invoke('addClassName','active');
		
		this._currentSlide = parseFloat(_slideId);
		
		if(this._slides.length > 1 && this._autoRun) {
			this.startInterval();
		}
    },

	// Show next Slide
	nextSlide: function() {
		var _next = this._currentSlide + 1;
		if(_next > this._max) { _next = 1; }
		this.showSlide(_next);
	},
	
	// Show previous Slide
	prevSlide: function() {
		var _prev = this._currentSlide - 1;
		if(_prev < 1) { _prev = this._max; }
		this.showSlide(_prev);
	},
	
	// Start Interval
	startInterval: function() {
		clearInterval(this._interval);
		this._interval = setInterval(function(){ this.nextSlide() }.bind(this), this._duration);
	}
}; 
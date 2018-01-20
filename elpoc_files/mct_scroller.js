var MctScroller = Class.create();  
  
MctScroller.prototype = {
	
    /* 
    * INITIALIZATION - CONFIGURATION 
    */  
    initialize: function(scroller) {  
    	this._container = scroller;
    	this._holder = this._container.down('.scroll-holder');
    	this._scroller = this._holder.down('.scroll-content');
    	this._scrollStep = this._holder.getDimensions().width;
    	this._lastItem = this._holder.down('li.item:last-child');
    	this._maxPosition = (this._lastItem.positionedOffset().left + this._lastItem.getDimensions().width + parseFloat(this._lastItem.getStyle('margin-right')) - this._scrollStep) * -1;
    	
    	this._animation;
    	this._progressAnimation;
		
		// Previous Click	
		this._container.down('a.prev').observe('click',function(e){
			this.prevSlide();
			Event.stop(e);
		}.bind(this));

		// Next Click	
		this._container.down('a.next').observe('click',function(e){
			this.nextSlide();
			Event.stop(e);
		}.bind(this));
    },
  
	// Show next Slide
	nextSlide: function() {
		var _goto = parseFloat(this._scroller.getStyle('margin-left')) - this._scrollStep;
		
		_goto = (_goto < this._maxPosition) ? this._maxPosition : _goto ;
		
		if(this._animation) this._animation.cancel();
		this._animation = new Effect.Morph(this._scroller, {
			style: 'margin-left:'+_goto+'px',
			transition: Effect.Transitions.sinoidal,
			duration: 1
		});
	},
	
	// Show previous Slide
	prevSlide: function() {
		var _goto = parseFloat(this._scroller.getStyle('margin-left')) + this._scrollStep;
		
		_goto = (_goto > 0) ? 0 : _goto ;
		
		if(this._animation) this._animation.cancel();
		this._animation = new Effect.Morph(this._scroller, {
			style: 'margin-left:'+_goto+'px',
			transition: Effect.Transitions.sinoidal,
			duration: 1
		});
	}
};

document.observe("dom:loaded", function() {
	$$('.scroll-container').each(function(scroller){
		new MctScroller(scroller);
	});
});
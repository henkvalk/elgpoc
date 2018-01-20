Event.observe(window, 'load', function() {
	Validation.add('validate-at-least-one-number', Translator.translate('Please enter a correct housenumber.'), function(v) {
		return /.*[0-9].*/.test(v)
	})

	$$('label.hide').each(function(label){
		var id = label.readAttribute('for');
		var input = label.up('form').select('input#'+id).first();
		
		if(input && !input.readAttribute('value')) {
			input.writeAttribute('value',label.innerHTML);
			input.addClassName('focus');
			input.observe('focus', function(event) { if(input.value == label.innerHTML) { input.value = ''; } });
			input.observe('blur',  function(event) { if(!input.value) { input.value = label.innerHTML; } });
		}
	})

	$$(".products-grid").each(function(el) {
		equalRowHeight(el.select(".product-name"));
		equalRowHeight(el.select("div.ratings"));
		equalRowHeight(el.select("div.price-box"));
		equalRowHeight(el.select("li.item"));
	});
	
	$$(".splash-group-grid").each(function(el) {
		equalRowHeight(el.select("li.item"));
	});
	
	equalRowHeight($$("#footer-blocks .block"));
	equalRowHeight($$(".home-blocks-container .block"));
	equalRowHeight($$(".customer-account-login .col2-set .content"));
	
	$$('.goto-anchor').invoke('observe','click', function (e) {
		var href = this.getAttribute('href');
		var pos = href.indexOf('#', 0);
		var element_id = href.substr(pos+1);
		if($(element_id).nodeName == "A") {
			$(element_id).simulate('click');
		}
		Effect.ScrollTo(element_id, { duration:'.5', offset:-20 });
		Event.stop(e);
	});
	
	$$('.goto-link').invoke('observe','click', function (e) {
		var href = this.getAttribute('href');
		var pos = href.indexOf('#', 0);
		var element_id = href.substr(pos+1);
		if($(element_id).nodeName == "A") {
			$(element_id).simulate('click');
		}
		Event.stop(e);
	});
	
	/*
	if(window.location.hash) {
		var hash = window.location.hash;
		var element_id = hash.substr(1);
		if($(element_id).nodeName == "A") {
			$(element_id).simulate('click');
		}
		Effect.ScrollTo(element_id, { duration:'.5', offset:-20 });
	}
	*/
	
	$$('.tab-container').each(function(container){
		container.select('ul.tabs li.tab a').each(function(link){
			link.observe('click', function(event){
				var currentElement = event.element();
				if(currentElement.nodeName != 'A') {
					currentElement = currentElement.up('a');
				}
				
				var tab_id 	= currentElement.readAttribute('href').substr(1);
				var tab 	= $(tab_id);
				
				// HIDE ALL TABS AND REMOVE ACTIVE CLASS
				container.select('div.tab').invoke('hide');
				container.select('ul.tabs a.active').first().removeClassName('active');
				
				// SHOW SELECTED TAB AND ADD ACTIVE
				tab.show();
				currentElement.addClassName('active');
				
				Event.stop(event);
			});	
		});
	});
	
	if($('toppers')) {
		$('toppers').down('ul.tabs a.active').simulate('click');
	}

});

function equalRowHeight(group) {
	tallest = 0;
	
	group.each(function(c) {
		paddingTop 		= parseInt(c.getStyle('padding-top'));
		paddingBottom 	= parseInt(c.getStyle('padding-bottom'));
		borderTop 		= parseInt(c.getStyle('border-top-width'));
		borderBottom 	= parseInt(c.getStyle('border-bottom-width'));

		thisHeight  = c.getHeight();
		if(paddingTop > 0) thisHeight -= parseInt(c.getStyle('padding-top'));
		if(paddingBottom > 0) thisHeight -= parseInt(c.getStyle('padding-bottom'));
		if(borderTop > 0) thisHeight -= parseInt(c.getStyle('border-top-width'));
		if(borderBottom > 0) thisHeight -= parseInt(c.getStyle('border-bottom-width'));
		
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	
	group.invoke("setStyle", {minHeight: tallest + 'px'});
	
	return  tallest;
}

// extend the RegionUpdater to hide the region field if it's not required
RegionUpdater = Class.create(RegionUpdater, {
    update: function($super) {
        $super();
        if (this.regions[this.countryEl.value]) {
            if (this.regionTextEl) {
                this.regionTextEl.up(".field").show();
            }
        } else {
            if (this.regionTextEl) {
                this.regionTextEl.value = '';
                this.regionTextEl.up(".field").hide();
            }
        }
    }
});
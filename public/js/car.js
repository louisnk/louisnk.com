(function() {

	$(document).ready(function() {

		var APP = window.APP || {}

		APP.Slider = {

			init: function() {
				$('.car').fadeTo(500,1, function() {

					$('.car_ul li:first').before($('.car_ul li:last'))
				})

				this.size();
				this._bindClickHandlers();

			},

			size: function() {

				var innerWidth = (($('.car_ul li').outerWidth() + 1) * 3) - 4

				$('.car_inner').css('width',innerWidth)

			},

			_bindClickHandlers: function() {
				var self = this

				$('.car').find('div').each(function() {
					$(this).on('click',function(e) {
						e.preventDefault();
						self.doStuff($(this))
					})
				})

				return;
			},


			doStuff: function(el) {
				var self = this
				var carLi = $('.car_ul li')
				
				if (el.hasClass('left')) {
					self.slideLeft(carLi)
					return;
				}
				else if (el.hasClass('right')) { 
					self.slideRight(carLi)
					return;
				}
				// else self._error('doStuff', 'nothing to do', el);
				return; 
			},

			slideLeft:function($el){
		    var $adult = $('.'+$el.get(0).parentNode.className),
		        itemWidth = $el.outerWidth() + 10,
		        leftIndent = parseInt($adult.css('left'),10) + itemWidth,
		        $menu = $('.car_ul'),
		        $li = $menu.find('li');

		    	$menu.not(':animated').animate({'left':leftIndent},500, function(){
		        $li.first().before($li.last());
		        $adult.css({'left':-160});
		    });
			},

			slideRight: function($el) {
				var $adult = $('.'+$el.get(0).parentNode.className),
						itemWidth = $el.outerWidth() + 10,
						leftIndent = parseInt($adult.css('left'),10) - itemWidth,
						$menu = $('.car_ul'),
						$li = $menu.find('li');


						$menu.not(':animated').animate({'left':leftIndent},500, function() {
							$li.last().after($li.first());
							$adult.css({'left': '-160px'})
						})
			},

			_error: function(context, message, el) {
				if (arguments.length === 3) {
					console.error('Error from: ' + context + ' ' + message + ' ' + el);
				}
			},


		}

		APP.Slider.init();

	});

})();
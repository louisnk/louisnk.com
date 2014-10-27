(function(){

	$(document).ready(function() {

		var APP = window.APP || {}

		APP.Lightbox = {

			imgArray: [],
			altArray: [],
			pos: 0,
			boxHeight: 0,


			init: function() {						

				var lb = APP.Lightbox

				$('.car_inner').find('a').each(function() {
					lb._PushElemsToArray(lb.imgArray,this,'href');
				});

				$('.car_inner').find('img').each(function() {
					lb._PushElemsToArray(lb.altArray,this,'alt');
				});

				$('.car_inner').find('a[rel=lrg]').each(function() {
					lb._bindClickHandlers(this, lb._showLightBox, true);
				});

				$(document).on('keydown', function(key) {				

						if (key.which == 37) {
							$('.previous, .left').trigger('click');
						}					
						else if (key.which == 39) {
							$('.next, .right').trigger('click');
						}
							
						else if (key.which == 27) {
							$('#lightbox').fadeTo(100,0,function () {
								$(this).hide();
								$('#overlay').fadeTo(250,0, function() {
									$(this).hide();
								});
							});
						}
					});

			},

			_PushElemsToArray: function(arrayName, el, property) {
				
				var lb = APP.Lightbox

				$(el).each(function() {
					arrayName.push($(el).prop(property))

				})

				return;
			},



			_bindClickHandlers: function($el, action, actOnThis) {
				
					
					$($el).on('click',function(e) {
						e.preventDefault();
						
						if (actOnThis === true) {
							action($(this))
						} else {
							action()
						}

					});

				return;

			},


			
			_showLightBox: function(imgLink) {

				var self = this,
						lb = APP.Lightbox,
						imgUrl = $(imgLink).prop('href');
						
											
				if (!$('#lightbox').hasClass('used')) {

					lb._bindClickHandlers($('.previous'),lb.previous, false);
					lb._bindClickHandlers($('.next'),lb.next, false);
					lb._bindClickHandlers($('#close-light'),lb.closeLight, false);

					$('#lightbox').addClass('used');
				} 

						
				$('#overlay').fadeTo(500,1, function() {
					$('#lightbox').fadeTo(250,1);
 				});

					lb.loadImage(imgUrl);	

					
			 	 lb.findImgLoc(imgUrl)					

			},



			loadImage: function(url) {
				var lb = APP.Lightbox,
						img = new Image();

				$(img).on('load',function() {
					$(this).hide();
					$('#light-main').empty().removeClass('loading').append(this);
					$(this).show();
				}).error(function() {
					console.error('Big Lightbox image failed to load');
				}).attr('src',url);

			},


			findImgLoc: function(imgUrl) {
				var lb = APP.Lightbox

				for (var i = 0; i < lb.imgArray.length; i++) {
					
					if (i == 0 && imgUrl == lb.imgArray[i]) {
					//	$('.previous').hide();
					//	$('.next').show();	
						lb.pos = i;
						$('.info').empty().append(lb.altArray[lb.pos]);
						
					}

					else if (lb.imgArray[i] == imgUrl 
																		&& i > 0 
																		&& i < lb.imgArray.length-1) {
					//	$('.previous').show();					
					//	$('.next').show();
						lb.pos = i;
						$('.info').empty().append(lb.altArray[lb.pos]);
						
					}

					else if (lb.imgArray[i] == imgUrl 
																		&& i == lb.imgArray.length-1) {
					//	$('.previous').show();
					//	$('.next').hide();
						lb.pos = i;		
						$('.info').empty().append(lb.altArray[lb.pos]);
							
					}
					
				}
			},



			previous: function() {
				var lb = APP.Lightbox;

				console.log('prev' + ' ----- ' + lb.pos)
				
				if (lb.pos > 0)  {
					--lb.pos
					
					$('#light-main').fadeTo(400,0,function() {
						$('#light-main').empty().addClass('loading');
						$('.info').empty().append(lb.altArray[lb.pos]);
						
					})				


					$('#light-main, .info').fadeTo(500,1,function() {
						
 						lb.loadImage(lb.imgArray[lb.pos]);
 					});

				} else if (lb.pos == 0) {
						
					lb.pos = lb.imgArray.length-1

					$('#light-main').fadeTo(400,0,function() {
						$('#light-main').empty().addClass('loading');
						$('.info').empty().append(lb.altArray[lb.pos]);
						
					})	

					$('#light-main, .info').fadeTo(500,1,function() {
						$('#light-main').addClass('loading');
 						lb.loadImage(lb.imgArray[lb.pos]);
 					});

				}

			},


			next: function() {		
				var lb = APP.Lightbox;

				console.log('next' + ' ----- ' + lb.pos)
				
				if (lb.pos < lb.imgArray.length-1) {
					++lb.pos
					
					$('#light-main').fadeTo(400,0, function() {
						$('#light-main').empty().addClass('loading');
						$('.info').empty().append(lb.altArray[lb.pos]);					
					})
					

					$('#light-main').fadeTo(500,1,function() {
						lb.loadImage(lb.imgArray[lb.pos]);
					});	

					
				} else if (lb.pos == lb.imgArray.length-1) {
					lb.pos = 0

					$('#light-main').fadeTo(400,0, function() {
						$('#light-main').empty().addClass('loading');
 						$('.info').empty().append(lb.altArray[lb.pos]);
					})
					

					$('#light-main').fadeTo(500,1,function() {
						lb.loadImage(lb.imgArray[lb.pos]);
					});	
				}							
								
			

			},


			closeLight: function() {
				$('#lightbox').fadeTo(100,0, function() {
						$(this).hide();
						$('#overlay').fadeTo(250,0, function() {
							$(this).hide();
						});
					});
			},



			_error: function(context, message, el) {
				if (arguments.length === 3) {
					console.error('Error from: ' + context + ' ' + message + ' ' + el);
				}
			},

		}

		APP.Lightbox.init();

	});

}());
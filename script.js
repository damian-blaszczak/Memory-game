	(function() {    
    var cardsCount = 16;
    var cardsPerRow = 4;
    var cards = [];
    var getCards = [];
    var gameOn = true;
    var count = 0;
    var pairs = 0;
    var images = ['images/title_1.jpg','images/title_2.jpg','images/title_3.jpg','images/title_4.jpg','images/title_5.jpg','images/title_6.jpg','images/title_7.jpg','images/title_8.jpg'];
		
    function startGameEasy() {
        cards = [];
        getCards = [];
        gameOn = true;
        count = 0;
        pairs = 0;

        var box = $('.box').empty();

        for (var i=0; i<cardsCount; i++) {
            cards.push(Math.floor(i/2));
        }

        for (i=cardsCount-1; i>0; i--) {
            var swap = Math.floor(Math.random()*i);
            var tmp = cards[i];
            cards[i] = cards[swap];
            cards[swap] = tmp;
        }

        for (i=0; i<cardsCount; i++) {
            var tile = $('<div class="card"><div class="front"></div><div class="back"></div></div>');
            box.append(tile);
            tile.data('cardType',cards[i]);
            tile.data('index', i);
            tile.css({
                left : 5+(tile.width()+5)*(i%cardsPerRow)
            });
            tile.css({
                top : 5+(tile.height()+5)*(Math.floor(i/cardsPerRow))
            });
            tile.bind('click',function() {cardClick($(this))});
        }
			
				$('.card').css({'transform' : 'rotateY(360deg)'});
			
        $('.moves').html("Score: " + count);
    }

		
		function startGameHard() {
        cards = [];
        getCards = [];
        gameOn = true;
        count = 0;
        pairs = 0;

        var box = $('.box').empty();

        for (var i=0; i<cardsCount; i++) {
            cards.push(Math.floor(i/2));
        }

        for (i=cardsCount-1; i>0; i--) {
            var swap = Math.floor(Math.random()*i);
            var tmp = cards[i];
            cards[i] = cards[swap];
            cards[swap] = tmp;
        }

        for (i=0; i<cardsCount; i++) {
            var tile = $('<div class="card"><div class="front"></div><div class="back"></div></div>');
            box.append(tile);
            tile.data('cardType',cards[i]);
            tile.data('index', i);
            tile.css({
                left : 5+(tile.width()+5)*(i%cardsPerRow)
            });
            tile.css({
                top : 5+(tile.height()+5)*(Math.floor(i/cardsPerRow))
            });
            tile.bind('click',function() {cardClick($(this))});
        }
			
				$('.card').css({'transform' : 'rotateY(360deg)'});
			
        $('.moves').html("Score: " + count);
    }
		
		
    function cardClick(element) {
        if (gameOn) {
            if (!getCards[0] || (getCards[0].data('index') != element.data('index'))) {
                getCards.push(element);
                element.css({'transform' : 'rotateY(180deg)','background' : 'lightgray url('+images[element.data('cardType')]+')','background-size' : 'cover'})    
            }

            if (getCards.length == 2) {
                gameOn = false;
                if (getCards[0].data('cardType')==getCards[1].data('cardType')) {
                    window.setTimeout(function() {
                        deleteCards();
                    }, 1000);
                } else {
                    window.setTimeout(function() {
                        resetCards();
                    }, 1000);
                }
                count++;
							
                $('.moves').html("Score: " + count)
            }
        }
    }

    function deleteCards() {
        getCards[0].css('transform','rotateY(980deg)').fadeOut(function() {
            $(this).remove();
        });
        getCards[1].css('transform','rotateY(980deg)').fadeOut(function() {
            $(this).remove();

            pairs++;
            if (pairs >= cardsCount / 2) {
                alert('You win with score: ' + count + '. Try to beat it!');
            }
            gameOn = true;
            getCards = new Array();
        });
    }

    function resetCards() {
        getCards[0].css({'transform' : 'rotateY(360deg)','background-image':'url(logo.png)'})
        getCards[1].css({'transform' : 'rotateY(360deg)','background-image':'url(logo.png)'})
        getCards = new Array();
        gameOn = true;
    }

    $(document).ready(function() {

				$('.box').hide();
				$('.level').hide();
				$('.start_game_easy, .start_game_hard').animate({
					'width' : '300px',
					'height' : '150px'
				});
        $('.start_game_easy').click(function() {
					 cardsCount = 16;
    		   cardsPerRow = 4;
					images = ['images/title_1.jpg','images/title_2.jpg','images/title_3.jpg','images/title_4.jpg','images/title_5.jpg','images/title_6.jpg','images/title_7.jpg','images/title_8.jpg'];
					
					$('.box').removeClass('boxH');
					$('.start_game_hard').hide();
					$('.moves').show();
					$('.start_game_easy').animate({
					'width' : '100px',
					'height' : '30px',
					'font-size' : '15px'
				}).html('Reset Game');
					$('.box').delay(600).slideDown(1000);
					$('.level').fadeIn(500);
            startGameEasy();
        });
			
			
			$('.start_game_hard').click(function() {
				  cardsCount = 40;
    		  cardsPerRow = 10;
				images = ['images/title_1.jpg','images/title_2.jpg','images/title_3.jpg','images/title_4.jpg','images/title_5.jpg','images/title_6.jpg','images/title_7.jpg','images/title_8.jpg','images/title_9.jpg','images/title_10.jpg','images/title_11.jpg','images/title_12.jpg','images/title_13.jpg','images/title_14.jpg','images/title_15.jpg','images/title_16.jpg','images/title_17.jpg','images/title_18.jpg','images/title_19.jpg','images/title_20.jpg'];
				
				$('.box').addClass('boxH');
					$('.start_game_easy').hide();
					$('.moves').show();
					$('.start_game_hard').animate({
					'width' : '100px',
					'height' : '30px',
					'font-size' : '15px'
				}).html('Reset Game');
					$('.box').delay(600).slideDown(1000);
					$('.level').fadeIn(500);
            startGameHard();
        });
			
			$('.level').click(function(){
				$('.box').slideUp(1000);
				$('.level').hide();
				$('.moves').hide();
				$('.start_game_easy').show().html('Easy<br>4x4').animate({
					'width' : '300px',
					'height' : '150px',
					'font-size' : '40px'
			});
				$('.start_game_hard').show().html('Hard<br>10x4').animate({
					'width' : '300px',
					'height' : '150px',
					'font-size' : '40px'
			});
			});

    })
})();
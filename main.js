const cards = $('.tarjetas');
const spanAttempts = $('#spanAttempts');
const spanFound = $('#spanFound');
const imageNames = ["tenis1.jpeg", "tenis2.jpeg", "tenis3.jpeg", "tenis4.jpeg", 
"tenis5.jpeg", "tenis6.jpeg", "tenis7.jpeg", "tenis8.jpeg", "tenis9.jpeg","tenis10.jpeg"]
const btnReset = $('#btnReset');
let flippedCard = []
let refreshedHTML;

function addFound() {
    let txtFound = spanFound.text();
    spanFound.html(parseInt(txtFound)+1);
    sleep(1000).then(() => {
        if (spanFound.text() == 10){
            alert("Has ganado! Felicidades!");
            window.location.reload();
        }
    });
}

function addAttempt() {
    let txtAttempts = spanAttempts.text();
    spanAttempts.html(parseInt(txtAttempts)+1);
}

// Creando imagenes aleatorias dentro de los diferentes divs
function shuffleArray(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function flipCards() {
    let it = 0;
    let firstCardImg = null;
    cards.each(function(index, card) {
        if ($(card).attr('target') == 'flipped'){
            it++;
            if (it==1) {
                firstCardImg = $(card);

            } else if (it==2) {
                // Las cartas son las mismas y se bloquean
                if (firstCardImg.find('img').attr('src') == $(card).find('img').attr('src')) {
                    addFound();
                    sleep(1500).then(() => {
                        firstCardImg.attr('target', 'unavailable');
                        $(card).attr('target', 'unavailable');
                        firstCardImg.find('img').css('display', 'none');
                        $(card).find('img').css('display', 'none');
                    });
                } 
                else {
                    // Las cartas no son las mismas y se esconden
                    sleep(1500).then(() => {
                        firstCardImg.attr('target', 'hidden');
                        $(card).attr('target', 'hidden');
                        firstCardImg.find('img').css('display', 'none');
                        $(card).find('img').css('display', 'none');
                    });
                }
            }
        }
    });
}


cards.on('click', function(e) {
    e.preventDefault();

    if($(this).attr('target') == 'unavailable') {
        return;
    }

    let cardVal = $(this).attr('id');
    let imgVal = $(this).find('img');
    $(this).attr('target', 'flipped');
    $(imgVal).css('display', 'block');
    
    // console.log('Card clicked is '+cardVal);
    flippedCard.push(cardVal);
    // console.log('Array: '+flippedCard);
    if (flippedCard.length === 2) {
        addAttempt();
        flippedCard.pop();
        flippedCard.pop();
        flipCards();
    }
})

btnReset.on('click', function() {
    window.location.reload();
})

// Ordenar aleatoriamente las imagenes
shuffleArray(imageNames);
// Asignar imagenes a cada div
for (let i = 0; i < cards.length; i++) {
    const imgElement = cards[i].querySelector('img');
    if (i>9){
        imgElement.src = 'imgs/'+imageNames[i-10];
    } else {
        imgElement.src = 'imgs/'+imageNames[i];
    }
}
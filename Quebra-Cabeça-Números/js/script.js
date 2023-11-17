function pieces() {
    let pieces = [], answer = [];
    let image = document.getElementById('image');
    let scoreBoard = document.getElementById('scoreboard');
    
    image.addEventListener('click', startGame, false);

    function start() {
        for (let i = 1; i < 9; i++) {
            let piece = document.getElementById('piece-' + i);
            
            piece.style.background = `url('img/${i}.png')`;
            piece.addEventListener('click', movePiece, false)

            pieces.push(piece);

        }

        pieces.push(null);

        answer = pieces;

        render();

    }

    function render() {
        for (let i in pieces) {
            let piece = pieces[i];

            if (piece) {
                piece.style.left = (i % 3) * 100 + 35 + 'px';

                if (i < 3) {
                    piece.style.top = 30 + 'px';

                } else if (i < 6) {
                    piece.style.top = 130 + 'px';

                } else {
                    piece.style.top = 230 + 'px';

                }

            }

        }

    }

    function movePiece() {
        let index = pieces.indexOf(this);

        if (index % 3 !== 0) {
            if (!pieces[index - 1]) {
                pieces[index - 1] = this;
                pieces[index] = null;

            }

        }
        
        if (index % 3 !== 2) {
            if (!pieces[index + 1]) {
                pieces[index + 1] = this;
                pieces[index] = null;

            }

        }
        
        if (index > 2) {
            if (!pieces[index - 3]) {
                pieces[index - 3] = this;
                pieces[index] = null;

            }

        }
        
        if (index < 6) {
            if (!pieces[index + 3]) {
                pieces[index + 3] = this;
                pieces[index] = null;

            }

        }

        render();

        if (checkWin()) {
            gameOver();

        }

    }

    function checkWin() {
        for (let i in pieces) {
            let piec = pieces[i];
            let answ = answer[i];

            if (piec !== answ) {
                return false;

            }

        }

        return true;

    }

    function gameOver() {
        scoreBoard.style.opacity = '1';
        scoreBoard.style.zIndex = '1';

        setTimeout(function() {
            scoreBoard.addEventListener('click', startGame, false);

        }, 500);

        setTimeout(function() {
            location.reload(true);

        }, 10000);

    }

    function randomSort(oldArray) {
        let newArray;

        do {

            newArray = [];

            while (newArray.length < oldArray.length) {
                let i = Math.floor(Math.random() * oldArray.length);

                if (newArray.indexOf(oldArray[i]) < 0) {
                    newArray.push(oldArray[i]);
                    
                }
        
            }
        
        } while(!validation(newArray));

        return newArray

    }

    function validation(array) {
        let inversions = 0;
        let lengthArray = array.length

        for (let i = 0; i < lengthArray - 1; i++) {
            for (let j = i + 1; j < lengthArray; j++) {
                if (array[i] && array[j] && array[i].dataset.value > array[j].dataset.value) {
                    inversions++;

                }

            }

        }

        return inversions % 2 === 0;

    }

    function startGame() {
        pieces = randomSort(pieces);

        this.style.opacity = '0';
        this.style.zIndex = '-1';
        this.removeEventListener('click', startGame, false);

        render();

    }

    start();

}

pieces();
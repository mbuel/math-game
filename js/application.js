// TODO: create class
class MathLogic {
    highScore = 0;
    playerScore = 0;
    timer = undefined;
    timerMax = 10;
    currentTimer = 0;
    playerAnswer = $('#player-input');
    computerAnswer = 0;
    number1 = 0;
    number2 = 0;
    operand = '+';
    base = 9; // non-zero fix

    constructor() {
        this.verifyAnswer = this.verifyAnswer.bind(this);
        this.init = this.init.bind(this);
        $('#player-input').on('click', () => {
            $('#player-input').select();
            this.startTimer();
        });
        $('#btn-answer').on('click', this.verifyAnswer);
        $(document).on('keypress', function(e) {
            if(e.originalEvent.key === 'Enter') {
                this.verifyAnswer();
            }
        }.bind(this));
        this.init();

        $('.btn-group').on('click', function() {
            setTimeout(() => {
                
                var operant = $('.btn-group').find('.active > input')[0].nextSibling.textContent.trim();
                console.log(operant);
                this.setOperand(operant);
                this.timer && clearInterval(this.timer);
            },100);
        }.bind(this));
    }

    sortNums(arr) {
        return arr.sort((a,b) => a - b);
    }

    roll(max) {
        var num1 =  Math.ceil(Math.random() * max);
        var num2 = Math.ceil(Math.random() * max);

        if (num1 > num2) { // Minus fix makes sure larger num is always on left side
            [num1, num2] = this.sortNums([num1, num2]);
        }
    


        this.computerAnswer = this.calculateAnswer(num1, num2, this.operand);
        if (this.operand === '/') {
            // Swap answer with 
        }
       
        return {
            num1 : num1,
            num2 : num2,
        }
    }

    resetTimer() {
        this.currentTimer = 0;
        this.updateDom($('#countdown'), this.timerMax);
        clearInterval(this.timer);
        this.timer = undefined;
    }

    resetNums() {
        var {num1, num2} = this.roll(this.base);

        this.number1 = num1;
        this.number2 = num2;

        this.updateDom($('#number-1'), this.number1);
        this.updateDom($('#number-2'), this.number2);
        
    }
    
    setHighScore() {
        this.highScore = this.highScore < this.playerScore ? this.playerScore : this.highScore;
        this.updateDom($('#high-score'), this.highScore);
    }

    resetPlayerScore() {
        this.playerScore = 0;
        this.updateDom($('#player-score'), this.playerScore);
    }

    init() {
        this.resetNums();
        this.setHighScore();
        this.resetPlayerScore();
        this.resetTimer();

    }

    setOperand(operant) {
        this.operand = operant;
        this.updateDom($('#operand'), this.operand);
        this.init();
    }

    calculateAnswer(num1, num2, operand) {
        switch(operand) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return Math.floor(num1 / num2);
        }
    }

    startTimer() {
        if (!this.timer) {
            this.timer = setInterval(() => {
                this.currentTimer++;
                var currentTime = this.timerMax - this.currentTimer;
                if (currentTime >= 0) {
                    this.updateDom($('#countdown'), currentTime);

                } else {
                    clearInterval(this.timer);
                    this.timer = undefined;
                    this.init();
                }
            }, 1000);

        }
    }

    verifyAnswer() {
        var answer = this.playerAnswer.val();

        if (answer == this.computerAnswer) {
            this.playerScore++;
            this.updateDom($('#player-score'), this.playerScore);
            this.resetNums();
            this.resetTimer();
            this.startTimer();
        } else {
            clearInterval(this.timer);
            this.timer = undefined;
            this.init();
        }
        $('#player-input').select();
    }

    updateDom(dom, val) {
        setTimeout((e) => {
            dom.text(val);
        }, 10);
    }
}
var game;
$(document).ready(function () {
    console.log('loading')
    game = new MathLogic();
});
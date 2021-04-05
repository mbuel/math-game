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
    base = 10;

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

    roll(max) {
        return Math.floor(Math.random() * max);
    }

    resetTimer() {
        this.currentTimer = 0;
        this.updateDom($('#countdown'), this.timerMax);
        clearInterval(this.timer);
        this.timer = undefined;
    }

    resetNums() {
        this.number1 = this.roll(this.base);
        this.updateDom($('#number-1'), this.number1);
        this.number2 = this.roll(this.base);
        this.updateDom($('#number-2'), this.number2);
        this.computerAnswer = this.calculateAnswer(this.number1, this.number2, this.operand);
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

$(document).ready(function () {
    console.log('loading')
    new MathLogic();
});
// TODO: create class
class MathLogic {
    highScore = 0;
    playerScore = 0;
    timerMax = 10;
    currentTimer = 0;

    constructor() {
        $('#player-input').on('click', function() {
            // TODO: start timer
            console.log('timer start');
            this.startTimer();
        }.bind(this));
        $('#btn-answer').on('click', this.verifyAnswer);
        $(document).on('keypress', function(e) {
            if(e.originalEvent.key === 'Enter') {
                this.verifyAnswer();
            }
        }.bind(this));
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.currentTimer++;
            console.log(this.currentTimer, this.timerMax);
            var currentTime = this.timerMax - this.currentTimer;
            if (currentTime >= 0) {
                $('#countdown').text(currentTime);

            } else {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    verifyAnswer() {
        console.log('Verifying answer!');
    }
}

$(document).ready(function () {
    console.log('loading')
    new MathLogic();
});
// TODO: iniate first random question

// TODO: track current score and high score

// TODO: determine operand
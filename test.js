let x = 6;

console.log(10 ** x);

function guessTime(x) {
    if (x < 4) {
        return 'instantly';
    }
    x -= 4;

    if (x < 1.778) {
        return `${Math.round(10 ** x * 10) / 10} seconds`;
    }
    x -= 1.778;

    if (x < 1.38) {
        return `${Math.round(10 ** x * 10) / 10} minutes`;
    }
    x -= 1.38;

    if (x < 0.845) {
        return `${Math.round(10 ** x * 10) / 10} hours`;
    }
    x -= 0.845;

    if (x < 2.562) {
        return `${Math.round(10 ** x * 10)} days`;
    }
    x -= 2.562;

    if (x < 3) {
        return `${Math.round(10 ** x * 10)} years`;
    }
    x -= 3;

    if (x < 3) {
        return `${Math.round(10 ** x * 10)} thousand years`;
    }
    x -= 3;

    if (x < 3) {
        return `${Math.round(10 ** x * 10)} million years`;
    }
    x -= 3;

    if (x < 3) {
        return `${Math.round(10 ** x * 10)} billion years`;
    }
    x -= 3;

    if (x < 3) {
        return `${Math.round(10 ** x * 10)} trillion years`;
    }
    x -= 3;

    return `never`;
}
console.log(guessTime(x));

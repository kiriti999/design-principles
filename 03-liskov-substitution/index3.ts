/* #region  Problem */
class Bird {
    fly(speed) {
        return `Flying at ${speed} km/h`;
    }
}

class Eagle extends Bird {
    dive() {
        // ...
    }

    fly(speed) {
        return `Soaring through the sky at ${speed}`;
    }
}

// LSP Violation:
class Penguin extends Bird {
    fly() {
        return new Error("Sorry, I cant fly");
    }
}
/* #endregion */

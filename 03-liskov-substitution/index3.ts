/* The Liskov Substitution Principle states that.

“Objects should be replaced with instances of their subclasses without altering the behavior.”

This means that if we have a base class, it should not extend the method to classes that
cannot or won’t accept its parent class methods. */

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

const eagle = new Eagle();
eagle.fly('100');
eagle.dive();

// LSP Violation:
class Penguin extends Bird {
    fly() {
        return new Error("Sorry, I cant fly");
    }
}
/* #endregion */


/* #region  Solution*/
class Bird2 {
    layEgg() { }
}

class FlyingBird extends Bird2 {
    fly() { }
}

class SwimmingBird extends Bird2 {
    swim() { }
}

class Eagle2 extends FlyingBird { }

class Penguin2 extends SwimmingBird { }

const penguin = new Penguin2();
penguin.swim();
penguin.layEgg();

const eagle2 = new Eagle2();
eagle2.fly();
eagle2.layEgg();
/* #endregion */


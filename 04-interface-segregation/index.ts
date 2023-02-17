/* #region  Problem */
interface Animal {
  walk(): void;
  fly(): void;
}

class Dog implements Animal {
  walk() {
    console.log("Walking");
  }

  fly() {
    throw new Error("Dogs cannot fly"); // Just to implement because of the interface
  }
}

class Duck implements Animal {
  walk() {
    console.log("Walking");
  }

  fly() {
    console.log("Flying");
  }
}
/* #endregion Problem */


/* #region  Solution */
interface AnimalCanWalk {
  walk(): void;
}

interface AnimalCanFly {
  fly(): void;
}

class Dog2 implements AnimalCanWalk {
  walk() {
    console.log("Walking");
  }
}

class Duck2 implements AnimalCanWalk, AnimalCanFly {
  walk() {
    console.log("Walking");
  }

  fly() {
    console.log("Flying");
  }
}
/* #endregion Solution */
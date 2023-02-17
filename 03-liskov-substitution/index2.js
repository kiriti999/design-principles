
/* #region  Problem */
class Rectangle1 {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    setWidth(width) {
        this.width = width
    }

    setHeight(height) {
        this.height = height;
    }

    area() {
        return this.width * this.height
    }
}

class Square1 extends Rectangle1 {
    setWidth(width) {
        this.width = width
        this.height = width;
    }

    setHeight(height) {
        this.height = height;
    }
}

const rectangle = new Rectangle1(10, 2)
const square = new Square1(5, 5)


function increaseRectangleWidth(rectangle) {
    rectangle.setWidth(rectangle.width + 1)
}
increaseRectangleWidth(rectangle) // 22
increaseRectangleWidth(square) //36

console.log(`rectangle ${rectangle.area()}`);
console.log(`square ${square.area()}`);
console.log(``)

/* #endregion */




/* #region  Good example */
class Shape {
    get area() {
        return 0;
    }
}
class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
    get area() {
        return this.length * this.width;
    }
}
class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }
    get area() {
        return this.length ** 2;
    }
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    get area() {
        return Math.PI * (this.radius ** 2);
    }
}
const shapes = [new Rectangle(1, 2), new Square(1), new Circle(2)]
for (let s of shapes) {
    console.log('area of shapes: ', s.area);
}
/* #endregion */
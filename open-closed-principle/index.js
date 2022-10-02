/* #region  Problem */
class Vehicle1 {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        return this.fuelCapacity * this.fuelEfficiency;
    }
}

const standardVehicle1 = new Vehicle1(10, 15);
console.log(standardVehicle1.getRange()); // Outputs '150'


class Vehicle2 {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        let range = this.fuelCapacity * this.fuelEfficiency;

        if (this instanceof HybridVehicle2) {
            range += this.electricRange;
        }
        return range;
    }
}

class HybridVehicle2 extends Vehicle2 {
    constructor(fuelCapacity, fuelEfficiency, electricRange) {
        super(fuelCapacity, fuelEfficiency);
        this.electricRange = electricRange;
    }
}

const standardVehicle2 = new Vehicle2(10, 15);
const hybridVehicle2 = new HybridVehicle2(10, 15, 50);

console.log(standardVehicle2.getRange()); // Outputs '150'
console.log(hybridVehicle2.getRange()); // Outputs '200'

/* This violates the open - closed principle, because whilst adding our new HybridVehicle class
we have had to go back and modify the code of our Vehicle class in order to make it work.
Going forward, every time we add a new type of vehicle that might have different parameters
for its range, we’ll have to continually modify that existing getRange function. */
/* #endregion Problem */


/* #region  Solution */
/* Instead what we could do, is to override the getRange method in the HybridVehicle class,
giving the correct output for both Vehicle types, without every modifying the original code */

class Vehicle3 {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        return this.fuelCapacity * this.fuelEfficiency;
    }
}

class HybridVehicle3 extends Vehicle3 {
    constructor(fuelCapacity, fuelEfficiency, electricRange) {
        super(fuelCapacity, fuelEfficiency);
        this.electricRange = electricRange;
    }

    getRange() {
        return (this.fuelCapacity * this.fuelEfficiency) + this.electricRange;
    }
}

const standardVehicle3 = new Vehicle3(10, 15);
const hybridVehicle3 = new HybridVehicle3(10, 15, 50);

console.log(standardVehicle3.getRange()); // Outputs '150'
console.log(hybridVehicle3.getRange()); // Outputs '200'
/* #endregion */
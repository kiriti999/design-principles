class Order {
    id: number;
    items: string[];
    shipping: string;

    // constructor

    getTotalCost(): any {
        // calculates total cost
    }

    getShippingCosts(): number {
        const totalCost = this.getTotalCost();

        if (this.shipping === "ground") {
            return totalCost > 50 ? 0 : 5.95;
        }

        if (this.shipping === "air") {
            return 10.95;
        }

        return 0;
    }
}

/* If we wanted to add a new shipping method, we would have to modify the Order class.
Following the Open / Closed Principle we can solve this by creating an interface and a class
that implements it for each shipping method. */

class Order2 {
    id: number;
    items: string[];
    shipping: Shipping;

    // constructor

    getTotalCost(): any {
        // calculates total cost
    }
}

interface Shipping {
    getShippingCosts(totalCost: number): number;
}

class Ground implements Shipping {
    getShippingCosts(totalCost: number): number {
        return totalCost > 50 ? 0 : 5.95;
    }
}

class Air implements Shipping {
    getShippingCosts(): number {
        return 10.95;
    }
}

class PickUpInStore implements Shipping {
    getShippingCosts(): number {
        return 0;
    }
}


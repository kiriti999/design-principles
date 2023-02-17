/* In the following bad example we have the OrderService class that saves orders in a database.
The OrderService class depends directly on the low level class MySQLDatabase.

If in the future we wanted to change the database that we are using we would have to modify the
OrderService class. */


/* #region  Problem */
class OrderService {
    database: MySQLDatabase;
    save(order): void {
        if (order.id === undefined) {
            this.database.insert(order);
        } else {
            this.database.update(order);
        }
    }
}

class MySQLDatabase {
    insert(order) { }
    update(order) { }
}
/* #endregion */

class OrderService2 {
    database: Database;
    save(order): void {
        this.database.save(order);
    }
}

interface Database {
    save(order): void;
}

class MySQLDatabase2 implements Database {
    save(order) {
        if (order.id === undefined) {
            // insert
        } else {
            // update
        }
    }
}
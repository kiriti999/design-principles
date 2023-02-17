/* #region  The Challenge */
/* Suppose we’re building an Error handler for a particular web application and the requirements are to perform
different types of actions based on the type of error.In this scenario, let’s just take 2 types of errors: */

/* Database Error
Connection Error
Both of the above error classes extend an abstract class called CustomError */

abstract class CustomError {
    error: Error;
    errorMessage: string;
    constructor(error: Error) {
        this.error = error;
    }
    abstract createErrorMessage(): void;
    abstract logError(): void;
}

/* Now, the ConnectionError class implements the CustomError class using a constructor and two abstract
methods —createErrorMessage and logError. */

class ConnectionError extends CustomError {
    constructor(error: Error) {
        super(error);
    }
    createErrorMessage(): void {
        this.errorMessage = `Connection error: ${this.error.message}`;
    }
    logError(): void {
        console.log(this.errorMessage);
    }
}

/* But the DatabaseError class is also implemented similarly, except forone requirement changewherein the
database error being critical in nature also needs a createAlert method. */

class DBError extends CustomError {
    constructor(error: Error) {
        super(error);
    }
    createErrorMessage(): void {
        this.errorMessage = `DB error: ${this.error.message}`;
    }
    logError(): void {
        console.log(this.errorMessage);
    }
    createAlert(): void {
        console.log("Alert Sent");
    }
}

/* Where This Fails
The above example clearly violates the Liskov Substitution principle.Using a subclass of DBError
can be an issue when you try to use it in a common error handler function: */

abstract class CustomError {
    error: Error;
    errorMessage: string;
    constructor(error: Error) {
        this.error = error;
    }
    abstract createErrorMessage(): void;
    abstract logError(): void;
}

class ConnectionError extends CustomError {
    constructor(error: Error) {
        super(error);
    }
    createErrorMessage(): void {
        this.errorMessage = `Connection error: ${this.error.message}`;
    }
    logError(): void {
        console.log(this.errorMessage);
    }
}

class DBError extends CustomError {
    constructor(error: Error) {
        super(error);
    }
    createErrorMessage(): void {
        this.errorMessage = `DB error: ${this.error.message}`;
    }
    logError(): void {
        console.log(this.errorMessage);
    }
    createAlert(): void {
        console.log("Alert Sent");
    }
}

const errorDecorator = (customError: CustomError) => {
    customError.createErrorMessage();
    customError.logError();
    if (customError instanceof DBError) {
        customError.createAlert();
    }
};

const main = () => {
    const dbError = new DBError(new Error("DB err1"));
    errorDecorator(dbError);
};

main();

/* In the above example, line 41 is a ** code - smell — ** because it requires knowing the instance type
beforehand.Extend this case to future errors of APIError, GraphError and so on, and it results in a
series of never - ending if/else cases. The problem arises because of the overgeneralization of use cases. */

/* #endregion */


/* #region  Solution */

/* Predicting the future of these types of classes is where the problem exists.It is better to be
defensive in such assumptions and go for a “has / a” ** class type instead of an “is / a” ** class
type. Let’s take a look at an example to understand this better: */

abstract class CustomError {
    error: Error;
    errorMessage: string;
    constructor(error: Error) {
        this.error = error;
    }
    abstract createErrorMessage(): void;
    abstract logError(): void;
}

class ConnectionError extends CustomError {
    constructor(error: Error) {
        super(error);
    }
    createErrorMessage(): void {
        this.errorMessage = `Connection error: ${this.error.message}`;
    }
    logError(): void {
        console.log(this.errorMessage);
    }
}

class AlertSystem {
    public sendAlert(message: string) {
        console.log("Alert sent");
    }
}

class DBError extends CustomError {
    constructor(error: Error) {
        super(error);
    }

    createErrorMessage(): void {
        this.errorMessage = `DB error: ${this.error.message}`;
    }

    logError(): void {
        console.log(this.errorMessage);
        const alert = new AlertSystem();
        alert.sendAlert(this.errorMessage);
    }
}

const errorDecorator = (customError: CustomError) => {
    customError.createErrorMessage();
    customError.logError();
};

const main = () => {
    const dbError = new DBError(new Error("DB err1"));
    errorDecorator(dbError);
};

main();
/* Considering our example of error handlers again: One approach can be to compose our logging
/* method with an alerting mechanism.The AlertSystem is now used in composition and added to
DBError’s logError instead.Another viable approach would have been to completely decouple the
AlertSystem from both the errors.When compared to our previous examples we do not have any more
if/else conditions on the type of class instance. */

/* #endregion */

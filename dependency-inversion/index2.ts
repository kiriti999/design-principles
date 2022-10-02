/* Dependency Inversion Principle
Dependency: When one class is used inside another.As a result, our class is reliant on another.
Your code should be based on abstraction rather than implementation.
Low - level modules should not be relied upon by high - level modules.
Abstractions should be used in both cases. */

/* #region  Problem */
class GooglePayService {
    gps: any;
    constructor(googlePayInstance) {
        this.gps = googlePayInstance;
    }
    pay(to, amount) { }
}
/* #endregion */

/* 10 months later, if your manager tells they want to change payment service to PhonePay
instead of GooglePay or use both, your code should be scalable for extension */

/* #region  Solution */
type PaymentTransaction = 'Success' | 'Failure' | 'Bounced'
interface IPaymentTransactionResult {
    result: PaymentTransaction;
    message?: string;
}

interface IPaymentService {
    pay(to: string, amount: number): Promise<IPaymentTransactionResult>
}

class GooglePayService2 implements IPaymentService {
    pay(to: string, amount: number): any { }
}
class PhonePayService2 implements IPaymentService {
    pay(to: string, amount: number): any { }
}
/* #endregion */

/* Then we can "Dependency Inject" it into our classes, referencing the interface
rather than one of the concrete implementations. */
class CreateUserController {
    paymentService: IPaymentService;
    constructor(paymentService: IPaymentService) {
        this.paymentService = paymentService;
    }
    proceedPayTransaction(upiId, amount): void {
        this.paymentService.pay(upiId, amount);
    }
}

/* Now, you can pay using any payment methods you like, and you can even add more payment methods. */
const phonePayService = new PhonePayService2();
const createUserController = new CreateUserController(phonePayService);
createUserController.proceedPayTransaction('upiId', 'amount');

const googlePayService = new GooglePayService2();
const createUserController2 = new CreateUserController(googlePayService);
createUserController2.proceedPayTransaction('upiId', 'amount');
/* The open-closed principle says that code should be open for extension, but closed for modification. */

class Greeter {
    public greet() {
        console.log("Hello, World!");
    }
}

const greeter = new Greeter();
greeter.greet();

class FrenchGreeter extends Greeter {
    public greet() {
        console.log("Bonjour!");
    }
}

interface GreeterService {
    greet();
}
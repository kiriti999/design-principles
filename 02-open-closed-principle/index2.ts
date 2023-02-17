class GreetingService1 {
    language: string;

    constructor(language: string) {
        this.language = language;
    }

    // Returns a greeting for the configured language
    execute(): string {
        // ❌ Violates OCP
        switch (this.language) {
            case "en": {
                return "Hello";
            }

            case "es": {
                return "Hola";
            }

            case "fr": {
                return "Bonjour";
            }

            default:
                return "";
        }
    }
}

/* This simple class expects a language argument in its constructor, which the execute() method uses to
return the associated greeting.

The flaw with this code is that every time we wish to add or remove a language from the list,
we must modify the switch statement accordingly.

That might seem harmless enough for such a simple example; however, a similar misstep in larger,
more complex applications can be painful as the code is continuously changed to keep up
with ever - changing requirements.

The constant modification adds extra effort and risk when it negatively affects dependent code,
requiring more time and effort to debug and patch errors.

As mentioned above, the key to resolving this is using abstractions. 🔑

Adding an abstraction over the language via the LanguageProvider interface makes it trivial to
extend the GreetingService with new languages. */

// Solution
interface LanguageProvider {
    greet(): string;
}

// First, we can create individual classes for each language by implementing the LanguageProvider interface.

class EnLanguageProvider implements LanguageProvider {
    // Returns a greeting in english
    greet(): string {
        return "Hello";
    }
}

class FrLanguageProvider implements LanguageProvider {
    // Returns a greeting in french
    greet(): string {
        return "Bonjour";
    }
}

/* Next, we can refactor the GreetingService to require a LanguageProvider instance and replace the problematic
switch statement with a call to the instance's greet() method. */

// OCP-Compliant ✅
class GreetingService {
    languageProvider: LanguageProvider;

    constructor(languageProvider: LanguageProvider) {
        this.languageProvider = languageProvider;
    }

    // Returns a greeting for the configured language provider
    execute(): string {
        return this.languageProvider.greet();
    }
}

const en = new EnLanguageProvider();
const enGreet = new GreetingService(en);
const result = enGreet.execute();
console.log(result);
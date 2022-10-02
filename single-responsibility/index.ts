/* #region Bad example */
class UserSettings1 {
    user: any;
    constructor(user) {
        this.user = user;
    }

    changeSettings(settings: any) {
        if (this.verifyCredentials()) {
        }
    }

    verifyCredentials(): boolean {
        return true;
    }
}
/* #endregion */

/* #region Good example*/
class UserAuth {
    user: any;
    constructor(user) {
        this.user = user;
    }

    verifyCredentials(): boolean {
        return true;
    }
}

class UserSettings {
    user: any;
    auth: UserAuth;

    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(user);
    }

    changeSettings(settings) {
        if (this.auth.verifyCredentials()) { }
    }
}
/* #endregion */
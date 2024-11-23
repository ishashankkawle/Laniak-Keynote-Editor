import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "f13a368d-01f2-4e10-a65f-ae938183df8e",
        authority: "https://keynoteauth.b2clogin.com/keynoteauth.onmicrosoft.com/B2C_1_keynote_signin",
        knownAuthorities: ["keynoteauth.b2clogin.com"],
        redirectUri: "https://kneditor.netlify.app/",//"http://localhost:3000/",
        postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        return;
                    case LogLevel.Info:
                        return;
                    case LogLevel.Verbose:
                        return;
                    case LogLevel.Warning:
                        return;
                    default:
                        return;
                }
            },
        },
    },
};


export const loginRequest = {
    scopes: ["https://keynoteauth.onmicrosoft.com/f13a368d-01f2-4e10-a65f-ae938183df8e/user-info"],
};
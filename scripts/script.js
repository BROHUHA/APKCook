console.log("[APKCook] Safe sample script loaded");

setTimeout(function () {
    Java.perform(function () {
        console.log("[APKCook] Java runtime ready; installing MainActivity.onResume hook");

        try {
            var MainActivity = Java.use("com.example.app.MainActivity");
            var origOnResume = MainActivity.onResume.overload();

            origOnResume.implementation = function () {
                console.log("[APKCook] MainActivity.onResume intercepted");
                return origOnResume.call(this);
            };

            console.log("[APKCook] Hook installed successfully");
        } catch (error) {
            console.error("[APKCook] Failed to install hook: " + error);
        }
    });
}, 500);

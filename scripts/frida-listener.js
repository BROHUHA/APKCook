console.log("[APKCook Listener] Frida gadget listener script loaded");
console.log("[APKCook Listener] Waiting for Frida client interaction via rpc.exports and message channel");

rpc.exports = {
    ping() {
        const response = "[APKCook Listener] pong - client link is alive";
        console.log(response);
        return response;
    },

    run(command) {
        const normalized = (command || "").toString().trim();
        console.log(`[APKCook Listener] rpc run() received command: ${normalized || "<empty>"}`);

        if (normalized.length === 0) {
            return "[APKCook Listener] No command provided";
        }

        if (normalized === "java-threads") {
            Java.perform(() => {
                const Thread = Java.use("java.lang.Thread");
                const current = Thread.currentThread();
                console.log("[APKCook Listener] Current Java thread: " + current.getName());
            });
            return "[APKCook Listener] java-threads command executed";
        }

        if (normalized === "version") {
            return "[APKCook Listener] APKCook Frida listener profile active";
        }

        return `[APKCook Listener] Unknown command: ${normalized}`;
    }
};

(function setupInboundChannel() {
    const channel = "apkcook:command";

    function waitNext() {
        recv(channel, function onMessage(message) {
            const payload = message && message.payload !== undefined ? message.payload : message;
            console.log("[APKCook Listener] message channel payload: " + JSON.stringify(payload));
            send({
                type: "apkcook:ack",
                status: "received",
                payload
            });
            waitNext();
        });
    }

    waitNext();
    console.log(`[APKCook Listener] Subscribed to message channel '${channel}'`);
})();

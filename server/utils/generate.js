"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by iong on 31.10.2017.
 */
function generateMessage(from, text) {
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    };
}
exports.generateMessage = generateMessage;
function generateLocationMessage(from, lat, long) {
    return {
        from: from,
        url: "https://www.google.com/maps?q=" + lat + "," + long,
        createdAt: new Date().getTime()
    };
}
exports.generateLocationMessage = generateLocationMessage;
//# sourceMappingURL=generate.js.map
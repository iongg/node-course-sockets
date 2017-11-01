"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by iong on 01.11.2017.
 */
var Users = /** @class */ (function () {
    function Users() {
        this._users = [];
    }
    Users.prototype.addUser = function (id, name, room) {
        var user = { id: id, name: name, room: room };
        this._users.push(user);
        return user;
    };
    Users.prototype.removeUser = function (id) {
        var user = this.getUser(id);
        if (user) {
            this._users = this._users.filter(function (user) { return user.id !== id; });
        }
        return user;
    };
    Users.prototype.getUser = function (id) {
        return this._users.filter(function (user) { return user.id === id; })[0];
    };
    Users.prototype.getUserList = function (room) {
        var users = this._users.filter(function (user) { return user.room === room; });
        var usersArray = users.map(function (user) { return user.name; });
        return usersArray;
    };
    return Users;
}());
exports.Users = Users;
//# sourceMappingURL=users.js.map
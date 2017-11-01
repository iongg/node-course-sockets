/**
 * Created by iong on 01.11.2017.
 */
export class Users {

    _users:any[];

    constructor () {
        this._users = [];
    }

    addUser (id, name, room) {
        let user = {id, name, room};
        this._users.push(user);
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);

        if(user) {
            this._users = this._users.filter((user) => user.id !== id);
        }
        return user;

    }

    getUser(id) {
        return this._users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        let users = this._users.filter((user) => user.room === room);
        let usersArray = users.map((user) => user.name);

        return usersArray;
    }
}
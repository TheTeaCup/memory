const {Phones} = require('../Data/CallDatabase.js');
const utils = require('./Utils.js');
const User = require('./User.js');

module.exports = class Phone {
    static async create(userID) {
        if (await Phone.hasPhone(userID)) return {result: 'error', message: 'You already have a phone number registered.'};

        let phoneNumber = await Phone.generatePhoneNumber();
        let phone = new Phones({
            _id: phoneNumber,
            userID
        });

        await phone.save();
        await User.setupPhone(userID, phoneNumber);

        return {result: 'success', message: `You have created a phone number! Your phone number is \`${phoneNumber}\``};
    }

    static async addContact(id, name, phoneNumber) {
        if (name.length > 20) return {result: 'error', message: 'The contact name can not have more than 20 characters.'};

        if (!await Phone.validatePhoneNumber(phoneNumber)) return {result: 'error', message: `The phone number \`${phoneNumber}\` doesn't exist in the phone book.`};

        let phone = await Phone.getByUserID(id);
        if (phone.contacts.some(contact => contact.phone == phoneNumber)) return {result: 'error', message: 'The contact you are trying to save already exists. Delete it using `m-removecontact`'};

        phone.contacts.push({name, phone: phoneNumber});
        await phone.save();

        return {result: 'success', message: `Saved \`${phoneNumber}\` phone number as **${name}**`};
    }

    static async removeContact(id, phoneNumber) {
        if (!await Phone.validatePhoneNumber(phoneNumber)) return {result: 'error', message: `The phone number \`${phoneNumber}\` doesn't exist in the phone book.`};

        let phone = await Phone.getByUserID(id);
        if (!phone.contacts.some(contact => contact.phone == phoneNumber)) return {result: 'error', message: 'The contact you are trying to remove is not saved in your contacts.'};

        let index = phone.contacts.findIndex(contact => contact.phone == phoneNumber);
        phone.contacts.splice(index, 1);
        await phone.save();

        return {result: 'success', message: `Removed \`${phoneNumber}\` from your contacts.`};
    }

    static async block(id, phoneNumber) {
        if (!await Phone.validatePhoneNumber(phoneNumber)) return {result: 'error', message: `The phone number \`${phoneNumber}\` doesn't exist in the phone book.`};

        let phone = await Phone.getByUserID(id);
        if (phone.blocked.includes(phoneNumber)) return {result: 'error', message: `The phone number you entered is already blocked.`};

        phone.blocked.push(phoneNumber);
        await phone.save();

        return {result: 'success', message: `Blocked \`${phoneNumber}\` successfully.`};
    }

    static async unblock(id, phoneNumber) {
        if (!await Phone.validatePhoneNumber(phoneNumber)) return {result: 'error', message: `The phone number \`${phoneNumber}\` doesn't exist in the phone book.`};

        let phone = await Phone.getByUserID(id);
        if (!phone.blocked.includes(phoneNumber)) return {result: 'error', message: `The phone number you entered is not blocked.`};

        let index = phone.blocked.indexOf(phoneNumber);
        phone.blocked.splice(index, 1);
        await phone.save();

        return {result: 'success', message: `Unblocked \`${phoneNumber}\` successfully.`};
    }

    static async toggleAnonymous(id) {
        let phone = await Phone.getByUserID(id);
        
        phone.anonymous = !phone.anonymous;
        await phone.save();

        return {result: 'success', message: `Turned **${phone.anonymous ? 'on' : 'off'}** the anonymous mode.`};
    }

    static async togglePublic(id) {
        let phone = await Phone.getByUserID(id);
        
        phone.public = !phone.public;
        await phone.save();

        return {result: 'success', message: `Turned your phone number **${phone.public ? 'public' : 'private'}**.`};
    }

    static async canCall(receiverID, callerID) {
        let ids = [receiverID, callerID];
        let [receiverPhone, callerPhone] = await Promise.all(ids.map(id => Phone.getByUserID(id)));
        return !receiverPhone.blocked.includes(callerPhone.id) || !await User.isInCall(receiverID);
    }

    static async addToHistory(id, caller, duration) {
        let phone = await Phone.getByUserID(id);

        phone.history.unshift({caller, duration, timestamp: Date.now()});
        await phone.save();
    }

    static async generatePhoneNumber() {
        let randomPhoneNumber = new Array(3).fill().map(() => utils.randomBetween(111, 999)).join('-');
        return await Phone.exists(randomPhoneNumber) ? await Phone.generatePhoneNumber() : randomPhoneNumber;
    }

    static async exists(phoneNumber) {
        let phone = await Phone.getByPhoneNumber(phoneNumber);
        return !!phone;
    }

    static async hasPhone(userID) {
        let doc = await Phone.getByUserID(userID);
        return !!doc;
    }

    static async getContact(userID, name) {
        let phone = await Phone.getByUserID(userID);
        let contact = phone.contacts.find(contact => contact.name.toLowerCase() == name.toLowerCase());
        return contact ? contact.phone : null;
    }

    static async validatePhoneNumber(phoneNumber) {
        let isValidPhoneString = new RegExp(/\d{3}-\d{3}-\d{3}/g).test(phoneNumber);
        return isValidPhoneString && await Phone.exists(phoneNumber);
    }

    static async getPublicPhoneNumbers() {
        return new Promise((resolve, reject) => {
            Phones.find({public: true}, (err, docs) => {
                if (err) return reject(err);
                resolve(docs.map(doc => doc.id));
            });
        });
    }

    static getByPhoneNumber(phoneNumber) {
        return new Promise((resolve, reject) => {
            Phones.findById(phoneNumber, (err, doc) => {
                if (err) return reject(err);
                resolve(doc);
            });
        });
    }

    static getByUserID(userID) {
        return new Promise((resolve, reject) => {
            Phones.findOne({userID}, (err, doc) => {
                if (err) return reject(err);
                resolve(doc);
            });
        });
    }
}
const user = require('./user');
const dicomList = require('./dicomList');
const account = require('./account');
const doctorHistoryList = require('./doctorHistoryList');
const letter = require('./letter');
const testImages = require('./testImages');
const TestList = require('./testList');

module.exports = {
    user: new user(),
    dicomList: new dicomList(),
    account: new account(),
    doctorHistoryList: new doctorHistoryList(),
    letter:new letter(),
    testImages:new testImages(),
    testList:new TestList(),
}
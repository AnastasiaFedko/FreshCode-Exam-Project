const constants = require('../constants');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const filePath = path.resolve(`${constants.FILES_PATH}`, './errorLogger');

export class ErrorLogger {

    constructor() {
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {
                recursive: true,
            });
        }
        this.fullFilePath = path.resolve(filePath, './errorLog.txt')
        this.setDailyLoggingTimerStart();
    }

    wrireError(err) {
        const newError = {
            message: err.message || '',
            time: Date.now(),
            code: err.code || '',
            stackTrace: {
                [err.name]: err.stack.replace(new RegExp(`${err.name}: `, 'i'), '')
            }
        };
        if (!fs.existsSync(this.fullFilePath)) {
            fs.appendFile(this.fullFilePath, '[' + JSON.stringify(newError) + ',', (err) => {
                if (err) throw err;
                console.log('New error log has been added!');
            });
        } else {
            fs.appendFile(this.fullFilePath, JSON.stringify(newError) + ', ', (err) => {
                if (err) throw err;
                console.log('New error log has been added!');
            });
        }
    }

    setDailyLoggingTimerStart() {

        const currentDateTime = moment().utcOffset(3);
        const loggerDateTime = moment().utcOffset(3).hour([`${constants.DAILY_LOGGER_HOURS}`]).minutes([`${constants.DAILY_LOGGER_MINUTES}`]);
        const diff = loggerDateTime.diff(currentDateTime);
        if (diff > 0) {
            setTimeout( this.dailyLogging, diff);
            this.setDailyLogging(diff);
        } else if (diff === 0) {
            this.dailyLogging();
            setInterval( this.dailyLogging, 86400000)
        } else {
            loggerDateTime.add(1, 'days');
            const nextDayDiff = loggerDateTime.diff(currentDateTime);
            setTimeout( this.dailyLogging, nextDayDiff);
            this.setDailyLogging(nextDayDiff);
        }
    }

    setDailyLogging(value) {
        setTimeout(() => { setInterval(this.dailyLogging, 86400000)}, value);
    }

    dailyLogging() {
        const errorFileName = Date.now().toString();
        if (fs.existsSync(this.fullFilePath)) {
            fs.readFile(this.fullFilePath, "utf8", (error, fileData) => {
                if (error) throw error;
                if (fileData && fileData.length > 0 && fileData !== '[') {
                    let dataFromFile = fileData.split('');
                    dataFromFile.splice(dataFromFile.length - 2, 1, ']')
                    dataFromFile = dataFromFile.join('');
                    const errors = JSON.parse(dataFromFile);
                    for (const errorData of errors) {
                        const data = { message: errorData.message, code: errorData.code, time: errorData.time };
                        fs.appendFile(filePath + '/' + errorFileName + '.txt', JSON.stringify(data), (err) => {
                            if (err) throw err;
                            console.log('Data has been added!');
                        });
                    }
                    fs.writeFileSync(this.fullFilePath, '[', (error, data) => {
                        if (error) throw error;
                        console.log("Error logger has been cleared");
                    });
                } else {
                    fs.appendFile(filePath + '/' + errorFileName + '.txt', 'No errors were logged in the elapsed time period', (err) => {
                        if (err) throw err;
                        console.log('Data has been added!');
                    });
                }
                console.log("Data has been read");
            });
        } else {
            fs.appendFile(filePath + '/' + errorFileName + '.txt', 'No errors were logged in the elapsed time period', (err) => {
                if (err) throw err;
                console.log('Data has been added!');
            });
        }
    }
}

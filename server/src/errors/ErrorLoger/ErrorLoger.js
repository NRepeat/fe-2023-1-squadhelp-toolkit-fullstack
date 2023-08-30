const fs = require('fs');

class ErrorLogger {
	constructor(filename) {
		this.filename = filename;
	}
	logError(message, code, stackTrace) {
		let logarr = [];
		try {
			let rawdata = fs.readFileSync(this.filename);
			logarr = JSON.parse(rawdata);
		} catch (err) {
			console.log("File doesn't exist or is not valid JSON")
		}

		const logEntry = {
			message: message || '',
			time: Date.now(),
			code: code || 500,
			stackTrace: stackTrace ? stackTrace.split('\n') : [],
		};

		logarr.push(logEntry);

		const logText = JSON.stringify(logarr, null, 2);

		fs.writeFileSync(this.filename, logText, (err) => {
			if (err) {
				console.error('Error writing to log file:', err);
			}
		});
	}
}

module.exports = ErrorLogger;

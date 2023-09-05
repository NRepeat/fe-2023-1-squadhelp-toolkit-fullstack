const fs = require('fs');
const schedule = require("node-schedule")

const sourceFilename = 'error_log.json';
const targetDir = 'backup_errors/';

function performBackup() {
  const currentDate = new Date();
  const targetFilename = `${targetDir}${currentDate.getTime()}_log.json`;
  let logarr = [];

  try {
    const  rawdata = fs.readFileSync(sourceFilename);
    logarr = JSON.parse(rawdata);
  } catch (err) {
    console.log("File doesn't exist or is not valid JSON");
    return; 
  }

	const filteredData = logarr.map(data => {
    return {
      message: data.message,
      code: data.code,
      time: data.time,
    };
  });


const orderedObj = JSON.stringify(filteredData, null, 2);

  fs.writeFileSync(targetFilename, orderedObj);

  console.log("Backup completed successfully.");
	fs.writeFileSync(sourceFilename, '[]');
}
const backupSchedule = schedule.scheduleJob('0 0 18 * * *', function() {
  performBackup();
});
module.exports = performBackup;

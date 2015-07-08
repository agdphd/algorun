var fs = require('fs');
var exec = require("child_process").exec;

module.exports = {
  run: function (input_data, callback) {
    try {
        process.chdir(process.env.CODE_HOME + 'src/');
        input_file = 'input.txt';
        fs.writeFileSync(input_file, input_data);
        command = '';
        if (process.env.EXEC_COMMAND) {
            command = process.env.EXEC_COMMAND;
            command = command.trim();
        }
        command_options = '';
        if (process.env.COMMAND_OPTIONS) {
            command_options = process.env.COMMAND_OPTIONS;
            command_options = ' ' + command_options.trim();
        }
        output_file = '';
        if (process.env.OUTPUT_FILE_NAME) {
            output_file = process.env.OUTPUT_FILE_NAME;
            output_file = output_file.trim();
            algo_command = command + ' ' + input_file + command_options;
            exec(algo_command, function (err, stdout, stderr) {
                if (!err){
                    result = fs.readFileSync(output_file, 'utf8');
                    callback(result);
                } else {
                    callback('ERROR: Cannot run the algorithm!');
                }
            });
        } else {
            output_file = 'output.txt';
            algo_command = command + ' ' + input_file + command_options + ' -f ' + output_file;
            exec(algo_command, function (err, stdout, stderr) {
                if (!err){
                    result = fs.readFileSync(output_file, 'utf8');
                    callback(result);
                } else {
                    callback('ERROR: Cannot run the algorithm!');
                }
            });
        }
    }
    catch (err) {
        return 'Are you sure you included your algorithm code in src folder?';
    }
  }
};
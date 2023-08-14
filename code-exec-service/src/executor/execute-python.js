const path = require("path");
const { exec } = require("child_process");
const { ENV, STATE } = require("../config");

const executePython = async (codeFoldPath) => {
    
    const filePath = path.join(codeFoldPath, "Main.py");
    const inputPath = path.join(codeFoldPath, "inputs.txt");
    
    const command = `cat ${inputPath} | python ${filePath}`;
    
    return new Promise((resolve, reject) => {
        
        const childProcess = exec(
            command,
            (error, stdout, stderr) => {
                
                if (error || stderr) {
                    if(error.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                        resolve({
                            status: STATE.OLE,
                            output: stdout
                        });
                    }
                    else {
                        resolve({
                            status: STATE.RUNTIME_ERROR,
                            output: stderr
                        });
                    }
                }
                else {
                    resolve({
                        status: STATE.FINISHED,
                        output: stdout
                    });
                }
            }
        );
    
        const timer = setTimeout(() => {
            childProcess.kill(); // Kill the child process
            console.log(`Time Limit Exceeded for command ${command}`);
            resolve({
                status: STATE.TLE,
                output: STATE.TLE
            });
        }, ENV.TIME_LIMIT);
    
        childProcess.on('exit', (code, signal) => {
            clearTimeout(timer); // Clear the timer
            console.log("Execution completed");
        });
    });
};

module.exports = {
    executePython,
};
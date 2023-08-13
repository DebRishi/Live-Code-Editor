const fs = require("fs");
const Queue = require("bull");
const Job = require("./models/Job");
const { executeCpp } = require("./executor/execute-cpp");
const { executeJava } = require("./executor/execute-java");
const { executePython } = require("./executor/execute-python");
const { ENV, LANGUAGE, STATE } = require("./config");

const jobQueue = new Queue("job-queue", {
    redis: {
        host: ENV.REDIS_HOST,
        port: ENV.REDIS_PORT
    }
});

jobQueue.process(ENV.REDIS_WORKERS, async ({ data }) => {
    const { id: jobId } = data;
    const job = await Job.findById(jobId);
    
    if (job === undefined) {
        throw Error("Job not found");
    }
    else {
        let output;
        try {
            job["startedAt"] = new Date();
            job["status"] = "Running";
            
            await job.save();
            
            if (job.language === LANGUAGE.CPP) {
                output = await executeCpp(job.codeFoldPath);
            }
            else if(job.language === LANGUAGE.JAVA) {
                output = await executeJava(job.codeFoldPath);
            }
            else if(job.language === LANGUAGE.PYTHON) {
                output = await executePython(job.codeFoldPath);
            }
            else {
                throw "Language is not supported"
            }
            
            job["completedAt"] = new Date();
            job["status"] = output.status;
            job["output"] = output.output;
            
            await job.save();
        } 
        catch (err) {
            job["completedAt"] = new Date();
            job["status"] = STATE.SERVER_ERROR;
            job["output"] = JSON.stringify(err);
            
            await job.save();
        }
        
        fs.rmSync(job.codeFoldPath, { recursive: true, force: true });
        return true;
    }
});

jobQueue.on("failed", (error) => {
    console.log(error.data.id, "failed", error.failedReason);
});

const addJobToQueue = async (jobId) => {
    await jobQueue.add({ id: jobId });
};

module.exports = {
    addJobToQueue,
};

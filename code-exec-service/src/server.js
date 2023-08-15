const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { generateFile } = require("./generate-file");
const { addJobToQueue } = require("./job-queue");
const { ENV, LANGUAGE } = require("./config");
const Job = require("./models/Job");

mongoose.connect(
    // `mongodb://${ENV.MONGO_HOST}:${ENV.MONGO_PORT}/code-exec-service`,
    `mongodb+srv://debaditya:${ENV.MONGO_PASS}@cluster.1i7rzwb.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Connected to MONGODB`)
    }
);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/status", async (req, res) => {
    console.log(`Status request for JobId::${req.query.id}`);
    const jobId = req.query.id;
    if (jobId === undefined) {
        return res
            .status(400)
            .json({ success: false, error: "missing id query param" });
    }
    try {
        const job = await Job.findById(jobId);
        if (job === undefined) {
            return res
                .status(404)
                .json({ success: false, error: "invalid job id" });
        }
        return res.status(200).json({ success: true, job });
    }
    catch (err) {
        return res
            .status(400)
            .json({ success: false, error: JSON.stringify(err) });
    }
});

app.post("/submit", async (req, res) => {
    console.log(`Submit request::${JSON.stringify(req.body)}`);
    const { language = LANGUAGE.CPP, code, input = "" } = req.body;
    
    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" });
    }
    
    let job;
    
    try {
        const codeFoldPath = await generateFile(language, code, input);
        job = await new Job({ language, codeFoldPath }).save();
        const jobId = job["_id"];
        addJobToQueue(jobId);
        console.log(`Job added to queue. jobId::${jobId}`);
        return res.status(201).json({ success: true, jobId });
    } 
    catch (err) {
        console.log(`Error while adding job to queue. ERROR - ${err}`);
        return res.status(500).json({ success: false, err: JSON.stringify(err) });
    }
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
});

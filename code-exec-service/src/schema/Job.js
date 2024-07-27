const { STATE, LANGUAGE } = require("../config/config");
const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
    language: {
        type: String,
        required: true,
        enum: [LANGUAGE.CPP, LANGUAGE.JAVA, LANGUAGE.PYTHON],
    },
    codeFoldPath: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    startedAt: {
        type: Date,
    },
    completedAt: {
        type: Date,
    },
    output: {
        type: String,
    },
    status: {
        type: String,
        default: STATE.SUBMITTED,
        enum: [
            STATE.SUBMITTED,
            STATE.RUNNING,
            STATE.FINISHED,
            STATE.SERVER_ERROR,
            STATE.RUNTIME_ERROR,
            STATE.TLE,
            STATE.MLE,
            STATE.OLE
        ]
    },
});

const Job = new mongoose.model("job", JobSchema);

module.exports = Job;

const ENV = {
    MONGO_PASS: "debaditya.rishi",
    MONGO_HOST: "127.0.0.1",
    MONGO_PORT: 27017,
    REDIS_HOST: "redisdb",
    REDIS_PORT: 6379,
    REDIS_WORKERS: 5,
    TIME_LIMIT: 15000
};

const STATE = {
    SUBMITTED: "Submitted",
    RUNNING: "Running",
    FINISHED: "Finished",
    RUNTIME_ERROR: "Runtime Error",
    SERVER_ERROR: "Server Error",
    TLE: "Time Limit Exceeded",
    MLE: "Memory Limit Exceeded",
    OLE: "Output Limit Exceeded",
};

const LANGUAGE = {
    CPP: "cpp",
    JAVA: "java",
    PYTHON: "python"
}

const EXTENSIONS = {
    cpp: "cpp",
    java: "java",
    python: "py"
}

module.exports = {
    ENV,
    STATE,
    LANGUAGE,
    EXTENSIONS
};
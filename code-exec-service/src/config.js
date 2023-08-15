const ENV = {
    MONGO_PASS: "enter-password",
    MONGO_HOST: "localhost",
    MONGO_PORT: 27017,
    REDIS_HOST: "localhost",
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
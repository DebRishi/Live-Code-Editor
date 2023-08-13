const ACTIONS = {
    JOIN: "join",
    JOINED: "joined",
    DISCONNECTED: "disconnected",
    CODE_CHANGE: "code-change",
    SYNC_CODE: "sync-code",
    LEAVE: "leave"
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

module.exports = {
    ACTIONS,
    STATE
};
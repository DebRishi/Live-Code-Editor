import { STATE } from "./actions"

export const getStatus = (status) => {
    if (status === STATE.RUNNING || status === STATE.RUNNING) {
        return (
            <span className={"ml-2 block w-28 font-bold text-base text-center rounded-full text-white p-1 bg-[#0088cc]"}>
                {status}
            </span>
        )
    }
    else if (status === STATE.FINISHED) {
        return (
            <span className={"ml-2 block w-28 font-bold text-base text-center rounded-full text-white p-1 bg-[#5cb85c]"}>
                {status}
            </span>
        )
    }
    else {
        return (
            <span className={"ml-2 block w-28 font-bold text-base text-center rounded-full text-white p-1 bg-red-500"}>
                {status === STATE.TLE && "TLE"}
                {status === STATE.MLE && "MLE"}
                {status === STATE.OLE && "OLE"}
                {status === STATE.SERVER_ERROR && "Server"}
                {status === STATE.RUNTIME_ERROR && "Runtime"}
            </span>
        )
    }
}

export const getOutput = (output) => {
    return (
        <pre className="px-2 py-2 font-mono text-sm ">
            {output}
        </pre>
    );
};

export const statusColor = {
    Running: '#0088cc',
};

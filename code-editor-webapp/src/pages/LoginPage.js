import { useState } from "react";
import { v4 as uuid4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate();

    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const createNewRoom = (event) => {
        event.preventDefault();
        const id = uuid4();
        setRoomId(id);
        toast.success("Created new room");
    }

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error("Room Id & Username is required");
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: { username }
        });
    }

    const handleInputEnter = (event) => {
        if (event.code === "Enter") {
            joinRoom();
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-100">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-indigo-700 uppercase">
                    Join Room
                </h1>
                <div className="my-6">
                    <div className="my-3">
                        <input
                            value={roomId}
                            onChange={(e) => { setRoomId(e.target.value) }}
                            onKeyUp={handleInputEnter}
                            placeholder="Enter Room Id"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="my-3">
                        <input
                            value={username}
                            onChange={(e) => { setUsername(e.target.value) }}
                            onKeyUp={handleInputEnter}
                            placeholder="Enter Username"
                            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="my-3">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600" onClick={joinRoom}>
                            Join
                        </button>
                    </div>
                </div>
                <p className="mt-8 text-s font-light text-center text-gray-700">
                    {" "}
                    Don't have a room Id?{" "}
                    <a className="font-medium text-indigo-600 hover:underline" onClick={createNewRoom}>
                        Create one
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
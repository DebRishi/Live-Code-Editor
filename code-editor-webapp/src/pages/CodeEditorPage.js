import React, { useState, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import CodeInput from "../components/console/CodeInput";
import CodeOutput from "../components/console/CodeOutput";
import Editor from "../components/code-editor/Editor";
import Navbar from "../components/code-editor/Navbar";
import { ACTIONS } from "../components/utils/actions";
import { initSocket } from "../components/socket/socket";
import { LANGUAGES } from "../components/utils/languages";

const CodeEditorPage = () => {

	const socketRef = useRef(null);
	const codeRef = useRef(null);
	const location = useLocation();
	const { roomId } = useParams();
	const [clients, setClients] = useState([]);
	const [language, setLanguage] = useState(LANGUAGES[0]);
	const [code, setCode] = useState("");
	const [inputs, setInputs] = useState("");
	const [output, setOutput] = useState("");
	const [status, setStatus] = useState("");
	const [toggled, setToggled] = useState(true);

	const reactNavigator = useNavigate();

	if (!location.state) {
		return <Navigate to="/" />
	}

	const leaveRoom = () => {
		reactNavigator("/", { replace: true });
	}

	useEffect(() => {

		const init = async () => {

			socketRef.current = await initSocket();

			socketRef.current.on("connect_error", (err) => handleErrors(err));
			socketRef.current.on("connect_failed", (err) => handleErrors(err));

			const handleErrors = (err) => {
				console.log('socker error', err);
				toast.error("Socket connection failed, try again later");
				reactNavigator("/");
			};

			// Joining the room
			socketRef.current.emit(ACTIONS.JOIN, {
				roomId,
				username: location.state?.username
			});

			// Listening for joined event
			socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
				if (username !== location.state?.username) {
					toast.success(`${username} joined the room`);
				}
				setClients(clients);

				// When joining a room, making sure we are syncing the code if someone is already present in the room
				socketRef.current.emit(ACTIONS.SYNC_CODE, {
					code: codeRef.current,
					socketId
				});
			});

			// Listening for disconnected event
			socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
				toast.success(`${username} left the room`);
				setClients((prev) => {
					return prev.filter(client => client.socketId !== socketId);
				});
			});
		};

		init();

		return () => {
			socketRef.current.off(ACTIONS.JOINED);
			socketRef.current.off(ACTIONS.DISCONNECTED);
			socketRef.current.disconnect();
		};

	}, []);

	const copyRoomId = async () => {
		try {
			await navigator.clipboard.writeText(roomId);
			toast.success("Room Id has been copied to your clipboard");
		}
		catch (err) {
			toast.error("Couldn't copy the Room Id");
			console.error(err);
		}
	};

	return (
		<div className="h-screen w-full">
			<div className="flex md:flex-row flex-col h-full w-full">
				<div className="flex h-full flex-col md:w-2/3 w-full ">
					<Navbar
						setLanguage={setLanguage}
						language={language}
						setOutput={setOutput}
						setStatus={setStatus}
						inputs={inputs}
						code={code}
						copyRoomId={copyRoomId}
						leaveRoom={leaveRoom}
					/>
					<hr className="bg-gray-500"></hr>
					<Editor
						socketRef={socketRef}
						roomId={roomId}
						onCodeChange={(code) => {
							codeRef.current = code;
							setCode(code)
						}}
					/>
				</div>
				<div className="md:w-1/3 border-l-1 border-gray-200 flex w-full md:flex-col flex-row-reverse h-full">
					<CodeOutput
						output={output}
						toggled={toggled}
						status={status}
					/>
					<CodeInput
						inputs={inputs}
						setInputs={setInputs}
						setToggled={setToggled}
					/>
				</div>
			</div>
		</div>
	);
};

export default CodeEditorPage;
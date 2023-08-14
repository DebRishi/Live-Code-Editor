import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faShare, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import LanguageDropdown from "./navbar-components/LanguageDropdown";
import { checkExecutionStatus, submitCode } from "../api/api";
import { useWindowSize } from "../utils/window-size";
import { Link } from "react-router-dom";

const Navbar = ({ language, setLanguage, setOutput, setStatus, inputs, code, copyRoomId, leaveRoom }) => {

	const { width } = useWindowSize(2);
	const [flag, setFlag] = useState(true);

	useEffect(() => {
		if (width > 1200) {
			setFlag(true)
		} else {
			setFlag(false);
		}
	}, [width]);

	const submitHandler = async () => {
		setStatus("Running");
		setOutput(`Code Execution Status: Running`);

		const formData = {
			language: language.id,
			code: code,
			input: inputs
		}

		const { data } = await submitCode(formData);
		const jobId = data.jobId;

		const interval = setInterval(async () => {

			const { data } = await checkExecutionStatus(jobId);
			const { job } = data;

			// console.log(data);

			if (job.status !== "Submitted" && job.status !== "Running") {
				setStatus(job.status);
				setOutput(job.output);
				clearInterval(interval);
			}
		}, 1000);
	};

	return (

		<div className="grid grid-cols-2 m-3">
			<button
				onClick={submitHandler}
				className="bg-[#5cb85c] border-[#4cae4c] border-1 text-white rounded-full w-32 text-sm md:text-base hover:border-[#398439] hover:bg-[#449d44] ">
				<FontAwesomeIcon
					icon={faPlayCircle}
					className="mr-2"
					color="white"
					size="m"
				/>
				<span>Run Code</span>
			</button>
			<div className="grid grid-cols-12 gap-2">
				<div className="col-span-6">
					<LanguageDropdown language={language} setLanguage={setLanguage} />
				</div>
				<button onClick={copyRoomId} className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded col-span-3">
					<FontAwesomeIcon
						icon={faShare}
						className={flag ? "mr-2" : ""}
						color="white"
						size="m"
					/>
					{flag && <span>Share</span>}
				</button>
				<button onClick={leaveRoom} className="bg-red-500 hover:bg-red-700 text-white font-bold rounded col-span-3 mr-1">
					<FontAwesomeIcon
						icon={faCircleXmark}
						className={flag ? "mr-2" : ""}
						color="white"
						size="m"
					/>
					{flag && <span>Leave</span>}
				</button>
			</div>
		</div>
	);
};

export default Navbar;
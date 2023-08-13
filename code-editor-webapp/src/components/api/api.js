import axios from "axios";

export const submitCode = async (formData) => {
	const options = {
		method: "POST",
		url: process.env["REACT_APP_SUBMIT_URL"],
		headers: { "Content-Type": "application/json" },
		data: formData
	};
	return await axios.request(options);
};

export const checkExecutionStatus = async (jobId) => {
	const options = {
		method: "GET",
		url: process.env["REACT_APP_STATUS_URL"],
		headers: { "Content-Type": "application/json" },
		params: { id: jobId }
	}
	return await axios.request(options);
};
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { EXTENSIONS } = require("./config");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code, input) => {
    const jobID = uuid();
    
    const codeFoldPath = path.join(dirCodes, jobID);
    const codeFileName = `Main.${EXTENSIONS[language]}`;
    const codeFilePath = path.join(codeFoldPath, codeFileName);
    const inputFilePath = path.join(codeFoldPath, "inputs.txt");
    
    fs.mkdirSync(codeFoldPath, { recursive: true });
    fs.writeFileSync(codeFilePath, code);
    fs.writeFileSync(inputFilePath, input);

    return codeFoldPath;
};

module.exports = {
    generateFile,
};

import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";

import 'codemirror/lib/codemirror.css';
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/trailingspace";
import "codemirror/keymap/emacs";
import "codemirror/mode/clike/clike";

import { useWindowSize } from "../utils/window-size";
import { ACTIONS } from "../utils/actions";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
	
	const editorRef = useRef(null);

	useEffect(() => {
		async function init() {
			
			const editorOptions = {
				mode: "text/x-java",
				indentUnit: 4,
				lineWrapping: true,
				lineNumbers: true,
				matchBrackets: true,
				autoCloseTags: true,
				autoCloseBrackets: true,
				indentWithTabs: true
			};
			
			editorRef.current = Codemirror.fromTextArea(document.getElementById("realtime-editor"), editorOptions);
			
			editorRef.current.setSize("100%", "95vh");
			
			editorRef.current.on("change", (instance, changes) => {
				
				// console.log(changes);
				
				const { origin } = changes;
				const code = instance.getValue();
				
				onCodeChange(code);
				
				if(origin !== "setValue") {
					socketRef.current.emit(ACTIONS.CODE_CHANGE, {
						roomId,
						code,
					});
				}
			});
		}
		init();
	}, []);
	
	useEffect(() => {
		if(socketRef.current) {
			socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
				
				console.log('recieving', code);
				
				if(code !== null) {
					editorRef.current.setValue(code);
				}
			});
		}
		
		return () => {
			socketRef.current.off(ACTIONS.CODE_CHANGE);
		}
		
	}, [socketRef.current]);

	return (
		<textarea id="realtime-editor" style={{ "height": "95vh", "width": "100%" } } />
	);
};

export default Editor;
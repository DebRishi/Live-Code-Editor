import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import "./App.css";
import CodeEditorPage from './pages/CodeEditorPage';
import LoginPage from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
	return (
		<>
			<div>
				<Toaster position="top-right" />
			</div>
			<BrowserRouter>
				<Routes>
					<Route path="/editor/:roomId" element={ <CodeEditorPage /> } />
					<Route path="/login" element={ <LoginPage /> } />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
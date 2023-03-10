import React from 'react';
import { Provider } from 'react-redux/es/exports';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LINKS } from './constants/routing';
import CreateCosts from './pages/CreateCosts';
import CreateDepartment from './pages/CreateDepartment';
import CreateEnterprise from './pages/CreateEnterprise';
import CreateVolumes from './pages/CreateVolumes';
import Statistics from './pages/Statistics';
import WelcomePage from './pages/WelcomePage';
import store from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<WelcomePage />} />
					<Route path={LINKS[0].route} element={<CreateEnterprise />} />
					<Route path={LINKS[1].route} element={<CreateDepartment />} />
					<Route path={LINKS[2].route} element={<CreateCosts />} />
					<Route path={LINKS[3].route} element={<CreateVolumes />} />
					<Route path={LINKS[4].route} element={<Statistics />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

import MainContent from './Components/MainContent';
import LeftSidebar from './Components/LeftSideBar';
import RightSidebar from './Components/RightSidebar';
import { useMyContext } from './context/todo';
import { useEffect } from 'react';
const App = () => {
	const { fetchTodos } = useMyContext();
	useEffect(() => {
		fetchTodos();
	}, []);
	return (
		<div className='grid grid-cols-[.6fr_2fr_1fr] overflow-hidden h-dvh max-h-dvh text-white'>
			<LeftSidebar />
			<MainContent />
			<RightSidebar />
		</div>
	);
};

export default App;

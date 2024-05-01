// LeftSidebar.tsx
import { useEffect, useState } from 'react';
import { useMyContext } from '../context/todo';

const LeftSidebar = () => {
	const {
		collections,
		addCollection,
		activeCollection,
		fetchTodos,
		setActiveCollection,
		deleteCollection,
	} = useMyContext();
	const [newCollectionInput, setNewCollectionInput] = useState('');
	const [isClicked, setIsClicked] = useState(false);

	const handleAddCollection = () => {
		if (newCollectionInput.trim() !== '') {
			addCollection(newCollectionInput.trim());
			setNewCollectionInput('');
		}
		setIsClicked(false);
	};

	useEffect(() => {
		fetchTodos();
	}, [activeCollection]);
	return (
		<div className='left-sidebar bg-[#252525] p-4 col-span-1'>
			<h1 className='font-bold text-2xl mb-12'>⚡ TaskMinder</h1>
			<div className='list-container'>
				<h2 className=' font-semibold tracking-wider'>My Lists</h2>
				<ul className='mt-4 mb-2'>
					{collections.map(collection => (
						<li
							className={`px-2 py-2 flex justify-between text-[1.05rem] cursor-pointer text-white transition-colors rounded-lg ${
								collection === activeCollection
									? 'bg-[#f6c76c] font-semibold text-black '
									: ''
							} 
            `}
							// {${isActive ? 'bg-[#f6c76c] font-semibold' : ''}}
							key={collection}
							onClick={() => setActiveCollection(collection)}>
							{collection}
							{collection === activeCollection &&
							activeCollection !== 'List1' ? (
								<span
									className='text-xl'
									onClick={deleteCollection}>
									×
								</span>
							) : (
								''
							)}
						</li>
					))}
				</ul>
			</div>
			<div>
				{isClicked ? (
					<div className='flex justify-between items-center rounded-lg overflow-hidden'>
						<input
							className='px-4 py-2 outline-none w-[95%] text-white bg-white/5'
							type='text'
							value={newCollectionInput}
							onChange={e => setNewCollectionInput(e.target.value)}
							placeholder='New collection'
						/>
						<button
							className='bg-white/5 hover:bg-white/10 border-s-2 border-white/20 px-3 py-1.5 text-center text-white/80 font-bold text-xl hover:text-white/75'
							onClick={() => handleAddCollection()}>
							+
						</button>
					</div>
				) : (
					<button
						className='block hover:bg-white/5 border border-dashed border-white/0 hover:border-white/20 px-4 py-2 mb-2 rounded-md w-full text-left text-white/50 hover:text-white/75'
						onClick={() => setIsClicked(true)}>
						+ New List
					</button>
				)}
			</div>
		</div>
	);
};

export default LeftSidebar;

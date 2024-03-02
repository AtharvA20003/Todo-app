import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between py-3 px-2 bg-slate-900 text-white w-full'>
            <div className='text-2xl font-bold'>Kaary</div>
            <ul className='text-xl cursor-pointer flex'>
                <li className='px-4 mx-4 hover:font-bold transition-all'>Home</li>
                <li className='px-4 mx-4 hover:font-bold transition-all'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar

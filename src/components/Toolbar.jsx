import React from 'react'

const Toolbar = ({ onColorChange, onClear }) => {
    return (
        <div className='fixed top-4 left-4 bg-white shadow-md rounded-xl p-3 flex gap-4 z-50'>
            <input type="color" onChange={(e) => onColorChange(e.target.value)} />
            <button onClick={onClear} className='bg-pink-800 text-white px-3 py-1 rounded '>
                Clear
            </button>
        </div>
    );
};

export default Toolbar;
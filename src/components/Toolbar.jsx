import React, { useState } from 'react';

const Toolbar = ({ onColorChange, onClear }) => {
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#000000');
    
    const handleColorChange = (newColor) => {
        setColor(newColor);
        onColorChange(newColor);
    };
    
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-6 py-3 flex items-center gap-2 z-50 border border-gray-200">
            <button
                onClick={() => setTool('pen')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    tool === 'pen' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="Pen Tool"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
            </button>
            
            <button
                onClick={() => setTool('rectangle')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    tool === 'rectangle' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="Rectangle Tool"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
            </button>
            
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            
            <div className="relative" title="Color Picker">
                <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                >
                    <input 
                        type="color" 
                        value={color}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="absolute opacity-0 cursor-pointer w-full h-full"
                    />
                </div>
            </div>
            
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            
            <button 
                onClick={onClear} 
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-all"
                title="Clear Canvas"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
            </button>
        </div>
    );
};

export default Toolbar;
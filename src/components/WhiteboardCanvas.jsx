import React, { useRef, useState } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import Toolbar from './Toolbar';


const WhiteboardCanvas = () => {
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const [color, setColor] = useState('#000');


    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = e.target.getPointerPosition();

        setLines((prevLines) => {
            const lastLine = prevLines[prevLines.length - 1];
            lastLine.points = lastLine.points.concat([point.x, point.y]);

            return [...prevLines.slice(0, -1), lastLine];
        });
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    }

    const handleClear = () => {
        setLines([]);
    };


    return (
        <>
       <Toolbar onColorChange={setColor} onClear={handleClear} />
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <Layer>
                {lines.map((lines, i) => (
                    <Line
                        key={i}
                        points={lines.points}
                        stroke={color}
                        strokeWidth={2}
                        tension={0.5}
                        lineCap='round'
                        lineJoin='round'
                        globalCompositeOperation='source-over'
                    />
                ))}
            </Layer>

        </Stage>
     </>

    );
};

export default WhiteboardCanvas;
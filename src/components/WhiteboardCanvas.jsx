import React, { useRef, useState } from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import Toolbar from './Toolbar';

const WhiteboardCanvas = () => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [color, setColor] = useState('#000');
  const [tool, setTool] = useState('pen');
  const startPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    startPos.current = pos;

    if (tool === 'pen') {
      setLines([...lines, { tool: 'pen', points: [pos.x, pos.y], stroke: color }]);
    } else if (tool === 'rectangle') {
      setLines([...lines, {
        tool: 'rectangle',
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        stroke: color
      }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    setLines((prevLines) => {
      const updatedLines = [...prevLines];
      const lastItem = updatedLines[updatedLines.length - 1];

      if (tool === 'pen' && lastItem.tool === 'pen') {
        const newLine = {
          ...lastItem,
          points: lastItem.points.concat([point.x, point.y])
        };
        updatedLines[updatedLines.length - 1] = newLine;
      } else if (tool === 'rectangle' && lastItem.tool === 'rectangle') {
        const newRect = {
          ...lastItem,
          width: point.x - lastItem.x,
          height: point.y - lastItem.y
        };
        updatedLines[updatedLines.length - 1] = newRect;
      }

      return updatedLines;
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClear = () => {
    setLines([]);
  };

  return (
    <>
      <Toolbar
        onColorChange={setColor}
        onClear={handleClear}
        setTool={setTool}
        tool={tool}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {lines.map((shape, i) => {
            if (shape.tool === 'pen') {
              return (
                <Line
                  key={i}
                  points={shape.points}
                  stroke={shape.stroke}
                  strokeWidth={2}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation="source-over"
                />
              );
            } else if (shape.tool === 'rectangle') {
              return (
                <Rect
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke={shape.stroke}
                  strokeWidth={2}
                />
              );
            } else {
              return null;
            }
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default WhiteboardCanvas;

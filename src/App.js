import React, { useState } from "react";
import WhiteBoardCanvas from "./components/WhiteBoardCanvas";
import Toolbar from "./components/Toolbar";
import './stylesheets/styles.css';

function App() {
  // Estado para color, grosor y borrador
  const [color, setColor] = useState('#000000');
  const [thickness, setThickness] = useState(2);
  const [eraser, setEraser] = useState(false);

  return (
    <div className="board-container">
      {/* Barra de herramientas al costado */}
      <Toolbar
        color={color}
        setColor={setColor}
        thickness={thickness}
        setThickness={setThickness}
        eraser={eraser}
        setEraser={setEraser}
      />
      {/* Pizarra principal */}
      <WhiteBoardCanvas
        color={color}
        thickness={thickness}
        eraser={eraser}
      />
    </div>
  );
}

export default App;

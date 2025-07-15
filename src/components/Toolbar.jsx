// Importa React para poder crear componentes funcionales
import React from 'react';
import PropTypes from 'prop-types';
// Validación de props para documentar los tipos esperados
Toolbar.propTypes = {
  color: PropTypes.string,
  setColor: PropTypes.func,
  thickness: PropTypes.number,
  setThickness: PropTypes.func,
  eraser: PropTypes.bool,
  setEraser: PropTypes.func,
};


/**
 * Componente Toolbar
 *
 * Esta barra de herramientas permite al usuario:
 * - Seleccionar el color del lápiz
 * - Cambiar el grosor del lápiz
 * - Activar el modo borrador (para borrar partes del dibujo con el mouse)
 *
 * Props:
 * - color: string, color actual del lápiz
 * - setColor: función para cambiar el color
 * - thickness: number, grosor actual del lápiz
 * - setThickness: función para cambiar el grosor
 * - eraser: boolean, indica si el borrador está activado
 * - setEraser: función para activar/desactivar el borrador
 */
export default function Toolbar({ color, setColor, thickness, setThickness, eraser, setEraser }) {
  return (
    <div className="toolbar-container">
      {/* Selector de color: permite elegir el color del lápiz usando un input tipo color */}
      <label>
        Color:
        {/* Input tipo color, muestra el color actual y permite cambiarlo */}
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)} // Actualiza el color al seleccionar uno nuevo
        />
      </label>

      {/* Selector de grosor: permite ajustar el grosor del lápiz con un slider */}
      <label>
        Grosor:
        {/* Input tipo range, permite seleccionar el grosor entre 1 y 20 */}
        <input
          type="range"
          min="1"
          max="20"
          value={thickness}
          onChange={e => setThickness(Number(e.target.value))} // Actualiza el grosor al mover el slider
        />
        {/* Muestra el valor actual del grosor en px */}
        <span>{thickness}px</span>
      </label>

      {/* Botón para activar/desactivar el modo borrador */}
      <button
        className={eraser ? 'active' : ''} // Clase 'active' si el borrador está activado
        onClick={() => setEraser(!eraser)} // Cambia el estado del borrador al hacer click
      >
        {/* El texto cambia según si el borrador está activado o no */}
        {eraser ? 'Borrador activado' : 'Borrador'}
      </button>
    </div>
  );
}

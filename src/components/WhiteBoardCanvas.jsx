
// Importa React y hooks para manejar el estado y el ciclo de vida
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import '../stylesheets/styles.css';

/**
 * WhiteBoardCanvas
 * Componente funcional que muestra una pizarra colaborativa en tiempo real usando p5.js y WebSocket (STOMP).
 * Cada usuario puede dibujar y los trazos se sincronizan entre todos los clientes conectados.
 *
 * Props:
 *   - color: color del trazo
 *   - thickness: grosor del trazo
 *   - eraser: modo borrador
 */
// URL del backend Spring Boot desplegado en Azure
const SOCKET_URL = 'https://pizarrawebsocket-back-g9avhaeba6e0efcu.brazilsouth-01.azurewebsites.net/ws';

function WhiteBoardCanvas({ color = '#000000', thickness = 2, eraser = false }) {
  // Referencia al div donde p5.js insertará el canvas
  const canvasRef = useRef(null);
  // Referencia a la instancia de p5.js
  const p5Instance = useRef(null);
  // Referencia al cliente STOMP
  const stompClient = useRef(null);

  // Al montar el componente, inicializa p5.js y la conexión WebSocket
  useEffect(() => {
    // Inicializa p5.js
    p5Instance.current = new p5((p) => {
      let drawing = false;
      let lastX = null;
      let lastY = null;

      // Dibuja el canvas
      p.setup = () => {
        p.createCanvas(800, 500).parent(canvasRef.current);
        p.background(255);
      };

      // Cuando el mouse se presiona, comienza a dibujar
      p.mousePressed = () => {
        drawing = true;
        lastX = p.mouseX;
        lastY = p.mouseY;
      };

      // Cuando se suelta el mouse, deja de dibujar
      p.mouseReleased = () => {
        drawing = false;
        lastX = null;
        lastY = null;
      };

      // Se ejecuta muchas veces por segundo
      p.draw = () => {
        // Solo envía el trazo si el mouse está presionado y dentro del canvas
        if (drawing && p.mouseX >= 0 && p.mouseX <= 800 && p.mouseY >= 0 && p.mouseY <= 500) {
          // Determina el color y grosor
          const strokeColor = eraser ? 255 : color;
          // Envía el trazo al backend para que todos los usuarios lo dibujen
          sendDrawEvent({
            fromX: lastX,
            fromY: lastY,
            toX: p.mouseX,
            toY: p.mouseY,
            color: strokeColor,
            thickness,
          });
          lastX = p.mouseX;
          lastY = p.mouseY;
        }
      };

      // Función para dibujar una línea recibida de otro usuario
      p.externalDraw = (drawData) => {
        p.stroke(drawData.color);
        p.strokeWeight(drawData.thickness);
        p.line(drawData.fromX, drawData.fromY, drawData.toX, drawData.toY);
      };

      // Función para borrar el canvas
      p.clearCanvas = () => {
        p.background(255);
      };
    });

    // Inicializa la conexión WebSocket/STOMP
    const socket = new SockJS(SOCKET_URL);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        // Se suscribe al canal de la pizarra
        stompClient.current.subscribe('/topic/pizarra', (message) => {
          const drawData = JSON.parse(message.body);
          // Si el mensaje es de tipo 'clear', borra el canvas
          if (drawData && drawData.type === 'clear') {
            if (p5Instance.current) {
              p5Instance.current.clearCanvas();
            }
          } else if (drawData && typeof drawData.fromX === 'number' && typeof drawData.fromY === 'number') {
            // Solo dibuja si el mensaje es un trazo válido
            if (p5Instance.current) {
              p5Instance.current.externalDraw(drawData);
            }
          }
        });
      },
    });
    stompClient.current.activate();

    // Limpia recursos al desmontar
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
    // Solo se ejecuta una vez al montar
    // eslint-disable-next-line
  }, []);

  // Envía un evento de dibujo al backend
  const sendDrawEvent = (drawData) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: '/app/draw',
        body: JSON.stringify(drawData),
      });
    }
  };

  // Borra el canvas localmente y emite un evento para que todos los clientes borren
  const handleClearCanvas = () => {
    if (p5Instance.current) {
      p5Instance.current.clearCanvas();
    }
    // Envía un evento especial de borrado a todos los clientes
    if (stompClient.current?.connected) {
      stompClient.current.publish({
        destination: '/app/draw',
        body: JSON.stringify({ type: 'clear' }),
      });
    }
  };

  /**
   * Renderiza el componente:
   * - Un div donde se inserta el canvas
   * - Un botón para borrar el canvas
   */
  return (
    <div className="whiteboard-container">
      {/* Aquí p5.js insertará el canvas */}
      <div ref={canvasRef}></div>
      {/* Botón para borrar el canvas */}
      <button className="whiteboard-button" onClick={handleClearCanvas}>
        Borrar
      </button>
    </div>
  );
}

export default WhiteBoardCanvas;

 # Pizarra Realtime
 
 Este proyecto es una pizarra colaborativa en tiempo real desarrollada con React (frontend) y Spring Boot (backend). Permite que varios usuarios dibujen simultáneamente y vean los trazos de los demás en tiempo real.
 
 ## Tecnologías utilizadas
 - **Frontend:** React, p5.js, SockJS, STOMP.js
 - **Backend:** Spring Boot, WebSocket (STOMP)
 - **Despliegue Backend:** Azure App Service
 
 ## ¿Cómo funciona?
 - El frontend muestra una pizarra donde los usuarios pueden dibujar.
 - Cada vez que un usuario dibuja, el trazo se envía al backend mediante WebSocket.
 - El backend retransmite el trazo a todos los clientes conectados, logrando la sincronización en tiempo real.
 
 ## Instalación y ejecución local
 
 ### 1. Clona el repositorio
 ```bash
 # Clona el proyecto
 https://github.com/tu-usuario/pizarra-realtime.git
 ```
 
 ### 2. Instala dependencias del frontend
 ```bash
 cd Pizarra real time
 npm install
 ```
 
 ### 3. Configura la URL del backend
 En `src/components/WhiteBoardCanvas.jsx` asegúrate que la constante `SOCKET_URL` apunte a tu backend:
 ```js
 const SOCKET_URL = 'https://pizarrawebsocket-back-g9avhaeba6e0efcu.brazilsouth-01.azurewebsites.net/ws';
 ```
 
 ### 4. Ejecuta el frontend
 ```bash
 npm start
 ```
 
 ### 5. Accede desde varios navegadores o dispositivos
 Abre la aplicación en diferentes navegadores para probar la sincronización en tiempo real.
 
 ## Despliegue
 Puedes desplegar el frontend en servicios como Vercel, Netlify, Azure Static Web Apps, etc. Solo asegúrate que el backend permita conexiones desde el dominio del frontend (CORS).
 
 ## Estructura del proyecto
 ```
 Pizarra real time/
 ├── public/
 ├── src/
 │   ├── components/
 │   │   └── WhiteBoardCanvas.jsx
 │   ├── stylesheets/
 │   │   └── styles.css
 │   ├── App.js
 │   └── index.js
 ├── package.json
 └── README.md
 ```
 
 ## Personalización
 - Puedes modificar el color, grosor y modo borrador desde el componente `Toolbar`.
 - El backend puede ser extendido para agregar autenticación y seguridad usando Spring Security.
 
 ## Créditos y contacto
 Desarrollado por [Tu Nombre].
 
 ---
 
 ¿Dudas o sugerencias? ¡Contáctame!


# GT Technical Test

## Instrucciones para ejecutar la aplicación en local

1. Clonar el repositorio en la carpeta de trabajo deseada. Para ello utilizar el comando `git clone https://github.com/franmerlini/gt-technical-test.git`.
2. Dirigirse a la carpeta raíz del proyecto e instalar las dependencias. Para ello ejecutar el comando `npm i` (o `pnpm i` si es de preferencia).
3. Dado que la aplicación utiliza una base de datos SQL, se deberá iniciar un contenedor docker con la imagen de mysql que albergue la instancia de la base de datos. Ya existe un archivo docker-compose que se encargará de crear dicho contenedor. Solo es necesario ejecutar el comando `npx nx run api-database:docker-compose:up` .
4. Una vez inicializada la instancia de la base de datos, se procede a correr la migración inicial (ya existe un archivo provisto que se encarga de ejecutar las sentencias sql). Solo es necesario ejecutar el comando `npx nx run api-database:migration:run`.
5. En dos terminales distintas ejecutar los comandos para crear un servidor local para cada aplicación (frontend y backend).
   1. Para el front: `npx nx serve front`.
   2. Para el back: `npx nx serve back`.
6. Una vez inicializados ambos servidores, abrir una nueva ventana en el navegador y dirigirse a la página principal de la aplicación pegando en la barra de navegación la url [`http://localhost:4200/`](http://localhost:4200/)

## Tecnologías utilizadas

- Transversales
  - Git
  - TypeScript
  - Nx
- Frontend
  - Angular (v17)
  - DaisyUI
  - NgRx
  - RxJs
  - TailwindCSS
- Backend
  - NestJS
  - TypeORM
  - MySQL

## Justificación de decisiones tomadas en cada requerimiento

### General

> “Crea un nuevo proyecto de Node.js con TypeScript”

El proyecto backend fue desarrollado con NestJS, como una alternativa más robusta a Express.js. Ambos frameworks se utilizan para desarrollar aplicaciones con JavaScript del lado del servidor (NodeJS).

> “Configura un archivo de configuración de TypeScript (`tsconfig.json`).”

Cada proyecto/libreria utiliza su propio archivo de configuración de TypeScript, extendiendo la configuración de un archivo base llamado `tsconfig.base.json`.

> “Utiliza npm o yarn para gestionar las dependencias del proyecto.”

En este caso se utilizó pnpm como alternativa. Es un administrador de paquetes de NodeJS similar a npm, pero optimizado para mayor velocidad y menor uso de almacenamiento.

> “Utiliza Create React App u otras herramientas según tu preferencia.”

En este caso se utilizó Nx. Es una herramienta que permite crear proyectos bajo el enfoque de “monorepositorios”, además de brindar una variedad de comandos y herramientas integradas que simplifican el desarrollo de software.

> “Utiliza buenas prácticas de desarrollo en React.”

En este caso se optó por utilizar Angular (versión 17). Cabe aclarar que la posición a postular es desarrollador fullstack Angular/NodeJS. Se utilizó la última versión publicada a la fecha del framework, aplicando las últimas características. En particular con Angular, algunas de las prácticas recomendadas que se aplicaron:

- utilización del paradigma de programación declarativa sustentado en programación reactiva. Esto con el fin de clarificar la lectura y facilitar el mantenimiento del codigo, simplificar el manejo asíncrono de datos y ayudar al manejo eficiente del estado de la aplicación.
- muy relacionado con el punto anterior, aplicación del patrón smart-dumb components (también conocido como componentes contenedores y de presentación). Esta arquitectura tiene como principal objetivo separar las responsabilidades para así lograr componentes más cohesivos y menos acoplados. En la siguiente imagen se ilustra:
  ![Smart/dumb component architecture](/img/smart-dumb.png)
- uso de `track` en bloques @for, para optimizar el cálculo al momento de diferenciar elementos en una colección.
- lazy loading (carga peresoza), para evitar la carga de módulos/funcionalidades que el usuario no utiliza y así mejorar la carga de la aplicación.
- prevencion de memory leaks al utilizar suscripciones.
- estrategia OnPush para la detección de cambios, para controlar de manera mas eficiente la cantidad de veces que debe volver a renderizarse un componente.
- uso de funciones y pipes puros en el html, para optimizar performance.
- Convenciones de sintaxis y nombramientos de archivos según Angular.
- uso de características de ES6, ej: arrow functions, template literals, spread operator, estructuring assignment, etc.

> “Utiliza TypeScript para escribir el código.”

Todo el proyecto utiliza TypeScript cuya principal característica es la de agregar tipado estático, lo que ayuda a detectar errores comunes durante el desarrollo, lo que a su vez conduce a un código más robusto y menos propenso a errores.

> “Asegúrate de definir tipos/interfaces para las entidades y utilizar tipado en toda la aplicación.”

Se prefiere el uso de tipos en lugar de interfaces. No porque haya ventajas/desventajas en usar uno u otro, sino más bien por preferencia.

### Backend

> “Implementa un middleware personalizado que registre cada solicitud recibida y la hora en que se realizó.”

Se decidió implementar un logger global sencillo, el cual muestra por consola la fecha en que se realizan las peticiones http, junto con el método y la ruta accedida.

> “Crea una función en TypeScript que tome un array de objetos y devuelva un nuevo
> array con solo ciertos campos de cada objeto (filtrado por el nombre del campo).”

> “Implementa un manejo de errores robusto en la API REST creada. Asegúrate de
> manejar errores comunes y devolver respuestas HTTP apropiadas.”

Cada endpoint del backend implementa un mecanismo de validación de los parametros recibidos. Para ello se utiliza el patrón DTO (Data Transfer Object) para definir la interfaz que deben respetar los datos que viajan desde el cliente al servidor. Se adjuntan unas imágenes para ilustrar las validaciones:

- Creación de un recurso de manera exitosa:
  ![API response success](/img/api-response-success.png)
- Creación de un recurso con error:
  ![API response failure](/img/api-response-failure.png)

> “Escribe pruebas para asegurarte de que el manejo de errores funciona correctamente.”

No se realizaron tests en el backend (tema pendiende por perfeccionar). Sin embargo, sí se realizo testing para determinados componentes y métodos en el front.

### Frontend

> “Crea un componente que reciba una lista de entidades como prop y las muestre en una lista.”

Se optó por complejizar un poco más el requerimiento para una mejor experiencia visual. En lugar de una lista, se utiliza una tabla para el renderizado de las entidades. Las entidades principales del proyecto son **expenses** (gastos cotidianos).

![Expenses table](/img/expenses-table.png)

> “Cada entidad debe mostrar un texto descriptivo y un botón para su edicion.”

En la tabla se muestran los datos principales de las **expenses**, y hay una columna con las acciones de “eliminar” y “editar”.

> “Al hacer clic en el botón debes permitir al usuario editar sus atributos principales.”

Los botones “New expense” y el de editar permiten al usuario registrar un nuevo gasto y editar uno ya existente, respectivamente. Estas funcionalidades se implmentan en un componente y ruta diferentes respecto a la página donde se muestra la tabla.

> “Utiliza las técnicas que creas conveniente para dar la mejor experiencia al usuario”

Algunas técnicas que se han utilizado para brindar una mejor UX:

- uso de spinners para indicar que la información está tardando en actualizarse.
- uso de mensajes tipo “toast” (emergentes) para informar la correcta ejecución de las acciones que ejecuta el usuario, o para notificar eventuales errores.
- uso de componentes modales para confirmar acciones, así evitar una acción no deseada.
- implementación de mensajes de error en campos de formularios, para indicar al usuario cómo debería proporcionar los datos.
- diseño responsivo, para adaptar la disposicion de los elementos visuales dependiendo desde el dispositivo que acceda el usuario.
- utilizacion de un manejador de estado global de la aplicación, para poder cachear información y optimizar la consulta de esta al backend (se optimiza la cantidad de peticiones). Si bien la aplicación es muy pequeña para justificar la utilización de una librería de tercero, se decidió agregar NgRx a modo de demostrar otros conocimientos. Aquí se ilustra el flujo de información:
  ![NgRx Architecture](/img/ngrx-architecture.png)

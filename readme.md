# Petrolcarbon

Este es un projecto generado con [Webpack](https://webpack.js.org/) version 5

## Servidor de desarrollo

Corre `ng serve` o  `npm start` para tener un servidor de desarrollo. Navega a `http://localhost:8080/`. Alli estara la aplicación y recargará automáticamente con cada cambio.

## build producción

Corre `ng build` para crear la versión de producción del proyecto. Los artefactos de compilación se almacenarán en el directorio `dist/` que son el sitio web que se debería poner en funcionamiento en el hosting.

## Sitio desplegado

Para ver sl sitio web desplegado puedes hacer [click aqui](https://web-site-petrolcarbon.vercel.app/) y revisar el sitio.

# Composición del proyecto

Este proyecto se creo con un empaquetador de modulos con el fin de mejorar la facilidad y escalabilidad de el mismo sitio web para sus mejoras y versiones posteriores.

## Stack

Las tecnologías usadas en este proyecto son la mencionada al inicio del proyecto y las siguentes:

- [pug](https://pugjs.org/api/getting-started.html).
- [sass](https://sass-lang.com/).
- [tailwindcss](https://tailwindcss.com/docs/installation).

## Distribución de carpetas

El proyecto esta creado para mantener una organizacion entre sus archivos asi como también una coorelación entre ellos, y los temás encontrados en cada una de ellas junto con los archivos que existen en la carpeta SRC son necesarios para su existencia y mantenimiento.

    - assets -> Imagenes usuadas en el sitio web y también las usadas en cada una de las secciones del projecto
    - documents -> Carpeta donde estan los documentos en PDF de la web como catálogos y demás
    - js -> Carpeta con los archivos de javascript
    - styles -> Carpeta con los archivos de estilos
    - views -> Carpeta con los archivos de estilos
    - content.json -> Archivo con la información del sitio web, que después es usada para crear dinamicamente la información en el sitio web, cualquier cambio que sea meramente de texto o en algunos casos de imagen, se hará aquí teniendo en cuenta la sección y se vera reflejado en el sitio local.
        - menu -> item donde estan los elementos que conforman el menú.
        - brand -> item donde se encuentra una referencia a la img del logo, aunque ahora no es necesaria porque las imagenes se traen dinámicamente con js
        - Home -> información de la sección inicial de la pagina
        - Quienes somos -> información de la sección quienes somos
        - Representadas -> información de la sección Representadas y alizanzas
        - Productos y servicios -> información de la sección Actividades
        - Clientes -> información de la sección clientes
        - Footer -> información de la sección footer que esta en el home


    - environment.js -> archivo con la información requerida para conexión con el servicio de validación y de bases de datos.

## Nota
    - Es recomentable tener paquetes grandes de cambios para el proyecto y verlos primero en local.

    - Los cambios que requieran un rediseño o un cambio en la vista si tendran que ser códificados, aunque con el estado del proyecto sería mucho más ágil el proceso.

    - Al terminar los cambios la versión que se sube al hosting es la resultante del build hecho con anterioridad.

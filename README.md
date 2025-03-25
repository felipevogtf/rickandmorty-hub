# RickandmortyHub

RickandmortyHub es una aplicación web desarrollada con Angular que permite explorar personajes, ubicaciones y episodios de la serie **Rick and Morty** utilizando la API pública de [Rick and Morty](https://rickandmortyapi.com/).

## Características

- **Exploración de personajes**: Visualiza información detallada de los personajes, incluyendo su estado, especie, género, origen y ubicación.
- **Filtrado avanzado**: Filtra personajes por nombre, estado y género.
- **Favoritos**: Marca un personaje como favorito para un acceso rápido.
- **Integración con GraphQL y REST**: Soporte para consumir datos desde la API usando GraphQL o REST.
- **Interfaz moderna**: Diseñada con Angular Material para una experiencia de usuario atractiva y responsiva.

## Configuración del entorno

El proyecto utiliza un archivo de configuración de entornos para definir las URLs de las APIs y el modo de consumo (GraphQL o REST). Puedes encontrar esta configuración en:

- **Entorno de desarrollo**: [`src/environments/environment.development.ts`](src/environments/environment.development.ts)
- **Entorno de producción**: [`src/environments/environment.ts`](src/environments/environment.ts)

Ejemplo de configuración:

```typescript
export const environment = {
  REST_API: 'https://rickandmortyapi.com/api',
  GRAPHQL_API: 'https://rickandmortyapi.com/graphql',
  useGraphql: false, // Cambia a true para usar GraphQL
};
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/rickandmorty-hub.git
   cd rickandmorty-hub
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Servidor de desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm start
```

Luego, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente al realizar cambios en el código fuente.

## Construcción

Para construir el proyecto para producción, ejecuta:

```bash
npm run build
```

Los archivos generados estarán en el directorio `dist/`.

### Linter

Ejecuta el linter para verificar el estilo del código:

```bash
npm run lint
```

## Despliegue

El proyecto incluye un flujo de trabajo de GitHub Actions para desplegar la aplicación en GitHub Pages. El archivo de configuración se encuentra en:

- [`.github/workflows/main.yaml`](.github/workflows/main.yaml)

Para desplegar, asegúrate de que la rama principal esté actualizada y realiza un push. La aplicación se desplegará automáticamente en la rama `gh-pages`.

## Dependencias principales

- **Angular**: Framework principal para el desarrollo de la aplicación.
- **Apollo Angular**: Cliente GraphQL para Angular.
- **Angular Material**: Biblioteca de componentes UI.
- **RxJS**: Programación reactiva.

## Estructura del proyecto

```plaintext
src/
├── app/
│   ├── components/       # Componentes reutilizables
│   ├── models/           # Modelos de datos
│   ├── pages/            # Páginas principales
│   ├── services/         # Servicios para consumir APIs
│   ├── app.component.*   # Componente raíz
│   └── app.routes.ts     # Configuración de rutas
├── environments/         # Configuración de entornos
├── main.ts               # Punto de entrada de la aplicación
└── styles.scss           # Estilos globales
```

## Recursos adicionales

- [Documentación de Angular](https://angular.io/docs)
- [API de Rick and Morty](https://rickandmortyapi.com/documentation)
- [Angular Material](https://material.angular.io/)

## Licencia

Este proyecto está bajo la licencia MIT.
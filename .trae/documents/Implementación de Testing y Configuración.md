Perfecto, continuamos con la implementación de la infraestructura de calidad.

### 📝 Pasos a ejecutar ahora:

1.  **Crear `.npmignore`**:
    *   Excluiremos `src/`, `tsconfig.*`, `vitest.config.ts`, y archivos de logs para que el paquete publicado sea ligero y limpio.

2.  **Configurar Vitest**:
    *   **`vitest.config.ts`**: Configuración básica para React y JSDOM.
    *   **`src/test/setup.ts`**: Archivo crítico para simular (mock) `IntersectionObserver`, ya que esta API del navegador no existe nativamente en el entorno de pruebas.

3.  **Implementar Pruebas (`src/__tests__/ImageLazy.test.tsx`)**:
    *   Test 1: Renderizado inicial (sin cargar imagen si no está visible).
    *   Test 2: Carga de imagen al entrar en el viewport (simulando intersección).
    *   Test 3: Manejo de errores y fallback (verificar que se muestra la imagen alternativa).

4.  **Actualizar `package.json`**:
    *   Añadir el script `"test": "vitest"`.

5.  **Crear `CHANGELOG.md`**:
    *   Documentar los cambios de la versión 1.5.0 (Correcciones de bugs, mejoras Next.js).

Procedo inmediatamente con la creación de estos archivos.
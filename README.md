# AnxerStudios

---

> [!NOTE]
> La aplicación está en constante desarrollo, por lo que es posible que encuentres errores o fallos.

> [!CAUTION]
> La aplicación no contiene anuncios dentro de ella más que los laterales que son propios de la web, no se ha incluido ningún tipo de publicidad invasiva.
> Si te encuentas algún otro anuncio dentro de la app no es parte de nosotros si no de los proveedores de contenido.
> No nos hacemos responsables de los enlaces de terceros que se encuentren dentro de la app, si se te abre un popup cierralo inmediatamente.

# Guía de Instalación de AnxerStudios
A continuación te presentamos las instrucciones oficiales para instalar la aplicación en todos los sistemas operativos, junto al manejo de codecs según tu distribución de Linux.

---

## Windows (.msi / .exe)
* **Peso aproximado:** ~35 MB - 50 MB
* **¿Soporta Video Nativo?** Sí, 100%. (Utiliza el motor *WebView2* de Microsoft Edge, el cual trae formatos `mp4` y `.m3u8` cubiertos por defecto).

**Instalación:**
1. Descarga el archivo `AnxerStudios_X.X.X_x64-setup.exe` o el instalador `.msi` desde la sección de **Releases** en GitHub.
2. Ejecuta el archivo haciendo doble clic.
3. Sigue los pasos del asistente tradicional y busca "AnxerStudios" en tu menú de inicio. ¡Listo para ver anime y series!

**Desinstalación:**

*Opción A — Desde Configuración del sistema (recomendada):*
1. Abre **Configuración → Aplicaciones → Aplicaciones instaladas**.
2. Busca "AnxerStudios" en la lista.
3. Haz clic en los tres puntos `···` → **Desinstalar** y sigue el asistente.

*Opción B — Desde el Panel de Control (Windows 10 y anteriores):*
1. Abre **Panel de Control → Programas → Desinstalar un programa**.
2. Localiza "AnxerStudios", haz clic derecho y selecciona **Desinstalar**.

*Opción C — Desde el menú de inicio:*
1. Busca "AnxerStudios" en el menú de inicio.
2. Haz clic derecho sobre el icono → **Desinstalar**.

---

## 🐧 Ubuntu / Debian / Linux Mint (.deb)
* **Peso aproximado:** ~40 MB
* **¿Soporta Video Nativo?** Sí. Al ser paquete local se salta el aislamiento estricto y usa los plugins multimedia y reproductores incrustados directamente dentro de tu sistema operativo nativo (Tu propio libwebkit2gtk con sus GStreamers preinstalados).

**Instalación:**
1. Asegúrate de tener los decodificadores estándar recomendados de Ubuntu instalados: `sudo apt install ubuntu-restricted-extras gstreamer1.0-plugins-bad gstreamer1.0-libav`.
2. Descarga nuestro archivo `AnxerStudios_X.X.X_amd64.deb` desde GitHub Releases.
3. Ejecuta en la terminal en la carpeta de descargas: 
   ```bash
   sudo dpkg -i AnxerStudios_X.X.X_amd64.deb
   sudo apt-get install -f  # (Solo si hace falta instalar alguna librería que falte)
   ```
4. ¡Inicia AnxerStudios de la misma forma en que abres cualquier otra aplicación del sistema!

**Desinstalación:**
```bash
# Elimina la aplicación conservando tus archivos de configuración
sudo apt remove anxer-studios

# O si deseas una eliminación completa incluyendo configuración del sistema
sudo apt purge anxer-studios

# Limpia dependencias huérfanas que ya no sean necesarias
sudo apt autoremove
```
---

## 🎩 Fedora (.rpm)
* **Peso aproximado:** ~40 MB
* **¿Soporta Video Nativo?** Sí. Al igual que el paquete Debian `.deb`, la construcción de Fedora `.rpm` utiliza tu propio motor base. Asegúrate de tener `gstreamer1-plugins-bad-free` y `gstreamer1-libav`.

**Instalación:**
1. Descarga el archivo de instalación RPM `AnxerStudios-X.X.X.x86_64.rpm` desde GitHub Releases.
2. Ejecuta el siguiente comando para instalarlo localmente:
   ```bash
   sudo dnf localinstall AnxerStudios-X.X.X.x86_64.rpm
   ```
3. Ejecútalo desde el dashboard de utilidades principal de Fedora.

**Desinstalación:**
```bash
# Desinstala el paquete
sudo dnf remove anxer-studios

# Limpia paquetes huérfanos si lo deseas
sudo dnf autoremove
```

---

## Arch Linux 
* **Peso aproximado:** ~80 MB (.AppImage empaquetado)
* **¿Soporta Video Nativo?** Por diseño y licencias, el AppImage de Tauri **no** puede distribuir los plugins propietarios (`H.264`, `MP4`, `.m3u8`). Si deseas usarlos, dispones de varias opciones avanzadas dependiendo de tu estilo:

**Opción 1: Extraer el Paquete Nativo de otra Distro (Recomendado)**
Puedes utilizar la herramienta `debtap` de AUR para instalar el paquete `.deb` de Ubuntu como un paquete local nativo de Pacman. Esto forzará al programa a correr con el `webkit2gtk` de Arch y a detectar los gstreamers de tu computadora.

```bash
# 1. Instalar debtap y actualizar su base de datos
git clone https://aur.archlinux.org/debtap.git
cd debtap
makepkg -sic
# Puedes borrar la carpeta clonada despues
cd ..
rm -rf debtap
# Actualiza la base de datos de debtap
sudo debtap -u

# 2. Descargar AnxerStudios_X.X.X_amd64.deb y convertirlo
# Al ejecutar el siguiente comando, debtap te hará dos preguntas:
# - "Enter Packager name:": Escribe tu nombre o simplemente presiona Enter para saltarlo.
# - "Enter Package license:": Escribe "MIT" o "Custom", o presiona Enter para saltarlo.
# Alternativamente, puedes usar "debtap -q AnxerStudios..." para que no te pregunte nada.
debtap AnxerStudios_X.X.X_amd64.deb

# 3. Instalarlo con Pacman usando el archivo resultante
# Nota: Si pacman dice "no se pudo resolver «gtk»", significa que debtap se confundió de nombre (Arch usa gtk3).
# Simplemente ignora la dependencia añadiendo la bandera -Udd, ya que seguro ya tienes gtk3 instalado.
sudo pacman -Udd anxer-studios-X.X.X-1-x86_64.pkg.tar.zst
```
> [!TIP]
> Puedes ejecutarlo tambien desde la termial como `app`
> ejemplo `app --server &` para iniciar el servidor y `app --stop` para detenerlo.

**Opción 2: Modo Servidor Universal (.AppImage)**
Ejecutar el AppImage de forma inteligente enviando todo al background y usar tu navegador favorito (Firefox, Thorium, Brave), el cual sí trae integradas bibliotecas super costosas para decodificar videos sin fallas:
```bash
# Lanza el backend local pre-configurado
./AnxerStudios_X.X.X_amd64.AppImage --server

# Entra en tu navegador a http://localhost:1234 y disfruta
# Cuando termines apaga todo escribiendo: 
./AnxerStudios_X.X.X_amd64.AppImage --stop
```

**Opción 3 (Experimental): Forzado de Inyección AppImage**
Al igual que inyectas el `LD_PRELOAD` para los gráficos de Wayland, puedes forzar al WebKit cerrado del AppImage a **buscar e inyectar sus librerías fuera de la estructura AppImage apuntando hacia la librería de codecs que ya instalaste local (`sudo pacman -S gst-plugins-bad gst-plugins-ugly gst-libav`)**.

Intenta ordenarle que agregue los "Paths" de GStreamer de tu sistema a su interior:
```bash
GST_PLUGIN_SYSTEM_PATH_1_0=/usr/lib/gstreamer-1.0 GST_PLUGIN_PATH_1_0=/usr/lib/gstreamer-1.0 LD_PRELOAD=/usr/lib/libwayland-client.so ./AnxerStudios_X.X.X_amd64.AppImage
```
*Nota: Es un truco muy avanzado. Ocasionalmente, el framework Gstreamer adentro del AppImage tiene versiones de binarios distanciadas a tu ArchLinux moderno actual. Si tu consola escupe el error `(NULL) pointer instance` por incompatibilidad de Glab, detente aquí y utiliza mejor el `.deb` convertido (Opción 1) o el servidor local (Opción 2).*

**Desinstalación:**

*Si instalaste mediante Opción 1 (debtap / Pacman):*
```bash
# Desinstala el paquete nativo de Pacman
sudo pacman -R anxer-studios

# O con borrado de dependencias huérfanas que instaló junto con él
sudo pacman -Rs anxer-studios
```

*Si usaste Opción 2 o 3 (AppImage):*
```bash
# El AppImage es un archivo autónomo, simplemente elimínalo
rm ~/Descargas/AnxerStudios_X.X.X_amd64.AppImage
# O desde donde lo hayas guardado
```

---

## 🐳 Docker & CasaOS (BETA)
Para aquellos con sus servidores multimedia domésticos listos, AnxerStudios aloja en la raíz oficial del respositorio su Docker:
*  **Plataformas:** PC / Raspberry Pi / Servidores Locales y Contenedores (AMD64 / ARM)
*  **Uso Inmediato:** Descarga el archivo de aprovisionamiento `docker-compose.yml` que acabamos de sumar esta versión o impórtalo directo en CasaOS e instala; tu propia plataforma multimedia Anxer alojada permanentemente en el ecosistema bajo `http://<IP_DE_TU_SERVER>:1234`.

**Desinstalación:**

*Con Docker Compose (recomendado):*
```bash
# Detén y elimina los contenedores definidos en el compose
docker compose down

# Si además quieres eliminar los volúmenes de datos persistentes
docker compose down -v

# Elimina la imagen descargada para liberar espacio en disco
docker rmi $(docker images | grep anxer | awk '{print $3}')
```

*Desde CasaOS:*
1. Abre la interfaz web de CasaOS en `http://<IP_DE_TU_SERVER>`.
2. Ve a la sección **Apps**.
3. Localiza la tarjeta de **AnxerStudios**, haz clic en los tres puntos `···` y selecciona **Uninstall**.
4. Confirma si deseas eliminar también los datos asociados.

---
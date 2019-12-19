# vuejs-aspnet-mvc
Template de Projeto MVC .NET en el Backend con VueJS, Vuex y Vue Router en el Frontend

Simplemente descarga las dependencias con
```
npm install
```
Compila con
```
npm run dev
```

Y dentro de Visual Studio ya puedes dar a Ejecutar.

Es un simple proyecto que hace funcionar Vuejs con su Router y un simple login con un backend ASP.NET MVC.

# Estructura
En el momento de ejecucion se renderiza de la siguiente manera:
```
_Layout.cshtml
    |
    --- index.cshtml
        |
        --- <app></app> (Aqui comienza la estructura de Vue)
                |
                --- App.vue 
                    |
                    --- ROUTERS -- [root] -- home.vue
                                            |
                                            --- dashboard-layout.vue
                                                    |
                                                    --- dashboard-ficha.vue
                                                    --- dashboard-historico.vue
                                -- [login] -- login.vue
                                -- [logout] -- logout.vue
```
# Detalles

*Keyboard Shortcuts Support*

Dentro de home.vue esta el soporte donde puedes ir añadiendo shortcuts. Dentro de mounted() se crea el listener que llama a la 
siguiente funcion:

```
            shortcuts: function (ctrl, key) {
                if (!ctrl && key == "F2") {
                    router.push('/logout');
                }
                if (!ctrl && (key == "m" || key == "M")) {
                    var focused = document.activeElement;
                    if (focused == document.body) { // Revisamos si algun boton o input no esta focus
                        this.bus.$emit('hideSidebarToggle');
                    }
                }
            }
```

Dentro del template ya vienen dos opciones: Cerrar session (F2) y abir menu (M)


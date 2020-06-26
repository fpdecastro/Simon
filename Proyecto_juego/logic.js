//getElementById lo que hace es tener como referencia el elemento en html que tiene ese id
    const rojo = document.getElementById('rojo')
    const verde = document.getElementById('verde')
    const amarillo = document.getElementById('amarillo')
    const celeste = document.getElementById('celeste')
    const btnEmpezar = document.getElementById('btnEmpezar')
    const countLevel = document.getElementById('countLevel')
    const ULTIMO_NIVEL = 10

    class Juego{
        //Son funciones que me delimitan las características de la clase Juego
        constructor(){
            this.inicializar();
            this.generarSecuencia();
            this.siguienteNivel()
            }

        inicializar(){
            this.togglebtnEmpezar()
            this.nivel = 1
            this.colores = {
                celeste, verde, amarillo, rojo
            }
            this.elegirColor = this.elegirColor.bind(this)
        }

        togglebtnEmpezar(){
            if(btnEmpezar.classList.contains('hide')){
                btnEmpezar.classList.remove('hide')
            }else{
                btnEmpezar.classList.add('hide')
            }

        }

        generarSecuencia(){
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.round(100 * Math.random()) % 4 +1)
        }

        siguienteNivel(){
            this.iluminarSecuencia()
            this.eventoClick()
            this.actualizarNivel()
            //La propiedad subNivel=0 solo existe en la función siguienteNivel()
            this.subNivel = 0
        }
// Esta función forma parte del prototype de juego

        transformarNumero(numero){
            switch(numero){
                case 1:
                    return 'celeste'
                case 2:
                    return 'verde'
                case 3:
                    return 'amarillo'
                case 4:
                return 'rojo'
            }
        }

        transformarColor(color){
            switch(color){
                case 'celeste':
                    return 1
                case 'verde':
                    return 2
                case 'amarillo':
                    return 3
                case 'rojo':
                return 4
            }
        }

//ILLUMINAMOS LA SECUENCIA

        iluminarSecuencia(){         
            for(var i = 0; i < this.nivel; i++){
//color será igual al color que direcciones el array con números aleatorios creado
                let color = this.transformarNumero(this.secuencia[i])
// Solo queda usar let y var por que sino el color pasa a la siguiente función con un único valor
                setTimeout(() => this.iluminarColor(color), 1000 * i)
            }
        }

        iluminarColor(color){
            this.colores[color].classList.add('light')
            setTimeout(() => this.apagarColor(color),350)
        }

        apagarColor(color){
            this.colores[color].classList.remove('light')
        }

//INTERACTUAMOS CON EL USUARIO - LE PEDIMOS QUE NOS DE SU SECUENCIA
//Colocamos addEventListener(tipo, Listener)
//tipo: click, load or error hay muchos más (mousedown, mouseup, keydown, keypress, keyup)
//¿Qué hace la función eventClick no recibe ningún parámetro y al haber un click en los div que tienen
//celeste, verde, amarillo, rojo se ejecuta la función elegirColor?
        eventoClick(){
            this.colores.celeste.addEventListener('click',this.elegirColor)
            this.colores.verde.addEventListener('click',this.elegirColor)
            this.colores.amarillo.addEventListener('click',this.elegirColor)
            this.colores.rojo.addEventListener('click',this.elegirColor)
        }
        eliminarEventosClick(){
            this.colores.celeste.removeEventListener('click',this.elegirColor)
            this.colores.verde.removeEventListener('click',this.elegirColor)
            this.colores.amarillo.removeEventListener('click',this.elegirColor)
            this.colores.rojo.removeEventListener('click',this.elegirColor)    
        }

//CONFIRMAMOS SI EL USUARIO APRETO BIEN O MAL
//El target es el componente de html donde se hizo click que desato el evento
        elegirColor(ev){
            const color = ev.target.dataset.color
            const numero = this.transformarColor(color)
            setTimeout(() => this.iluminarColor(color), 0)
            if(numero === this.secuencia[this.subNivel]){
                this.subNivel ++
                // swal(`Perfecto pasaste al nivel ${this.subNivel}`)
                if(this.subNivel === this.nivel){
                    this.nivel ++
                    this.eliminarEventosClick()
                    if(this.nivel === (ULTIMO_NIVEL + 1)){
                        swal('GANASTE','Felicidades pasaste los 10 niveles', 'success')
                        this.inicializar()
                    }
                    else{
                        setTimeout(this.siguienteNivel.bind(this), 1500) 
                    }
                }
            }else{
                swal('PERDISTE', 'Lo siento intentalo de nuevo', 'error')
                this.inicializar()
                this.eliminarEventosClick()
            }
        }

        actualizarNivel(){
            countLevel.value = `Nivel: ${this.nivel}`
        }

    }
    function Empezarjuego(){
        window.juego = new Juego
    }
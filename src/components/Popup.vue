<template>
    <div class="popup flex">
        <div class="card flex">
            <i class="fa-solid fa-xmark close" @click="$emit('closePopup')"></i>
            <div class="card__content flex">
                <h2>{{ title }}</h2>
                <div class="card__content-detail">
                    {{ detail }}
                </div>

                <div 
                v-if="title === '¡BINGO!'"
                class="form_winner flex"
                style="flex-direction: column; gap:1rem;">
                    <Input 
                        v-if="!input_dni"
                        type="password" 
                        placeholder="Contraseña"
                        @newWinnerDNI="showInputDNI" 
                    />
    
                    <Input 
                        v-if="input_dni"
                        type="text" 
                        placeholder="Ingresa DNI del colaborador"
                        @newWinnerDNI="obtainDNI"
                        @valueDNI="obtainValueDNI"
                    />

                    <Button
                        v-if="input_dni && !showSpinner"
                        title="confirmar"
                        @click="insertWinner()"
                        class="button-accept"
                    />
                </div>
                
                <Button
                    v-if="title !== '¡BINGO!'"
                    title="aceptar"
                    @click="$emit('closePopup')"
                    class="button-accept"
                />

              <SpinnerComponent v-if="showSpinner"/>

                
            </div>
        </div>
    </div>
</template>

<script>
    import WinnerService from "@/services/winner.service.js";
    import Button from "@/components/Button.vue";
    import Input from "@/components/Input.vue";
    import Swal from "sweetalert2";
    import SpinnerComponent from "@/components/SpinnerComponent.vue";

    export default {
        data() {
            return {
                input_dni: false,
                dni: '',
                valueDNI: '',
                responseWinner: {},
                showSpinner: false,
                winnerService: new WinnerService()
            }
        },
        name: "Popup",
        components: {
          SpinnerComponent,
            Button,
            Input
        },
        props: {
            title: {
                type: String
            },
            detail: {
                type: String
            }
        },
        methods: {
            showInputDNI: function() {
                this.input_dni = true;
            },
            insertWinner: async function() {
              const token = localStorage.getItem('token');
              if(!token) {
                await Swal.fire({
                  title: 'Ha ocurrido un error',
                  text: 'No se pudo realizar el registro del ganador',
                  icon: 'error'
                })
                return;
              }

              this.showSpinner = !this.showSpinner;
              try {
                const response = await this.winnerService.insertWinner(token, this.valueDNI);

                if(response.status === 201) {
                  const htmlResponse = `
                 <p>${response.data.nombres}<br>${response.data.estacion}<br>${response.data.puesto}</p>
                  `
                  await Swal.fire({
                    title: '¡Felicidades!',
                    html: htmlResponse,
                    icon: 'success'
                  });
                  this.$emit('closePopup');

                }else if(response.status === 400) {
                  await Swal.fire({
                    title: '¡Alerta!',
                    text: 'El número de documento ingresado no es correcto, posiblemente se trate de un trabajador no activo',
                    icon: 'warning'
                  });
                }else {
                  throw new Error();
                }
              }catch(e) {
                await Swal.fire({
                  title: 'Ha ocurrido un error',
                  text: 'No se pudo realizar el registro del ganador',
                  icon: 'error'
                });
                this.$emit('closePopup');
              }

              this.valueDNI = '';
              this.showSpinner = !this.showSpinner;
            },
            obtainDNI: function(dni) {
              this.dni = dni;
            },
            obtainValueDNI: function(data) {
              this.valueDNI = data;
            }
        }
    }
</script>

<style scoped>
    .popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;        
    }

    .card {
        background-color: #fff;
        border-radius: 10px;
        margin: 2rem;
        flex-direction: column;
        position: relative;
    }

    .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: .5rem 1rem 0 0;
        font-size: 2rem;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }

    .close:hover {
        opacity: .7;
    }

    .card__content {
        padding: 1.5rem;
        flex-direction: column;
        gap: 2rem;
        text-align: center;
        max-width: 520px; 
    }

    .card__content h2 {
        font-weight: bold;
    }

    .button-accept {
        margin: 0
    }
</style>
<script setup>
    import { generate_ball, animation_numbers_random } from '../services/animation-balls.js'
    defineProps({
        title: {
            type: String,
            required: true
        },
        noNumbers: {
            type: Boolean
        },
        background: {
            type: String,
            default: '#222222'
        },
        fontColor: {
            type: String,
            default: '#fff'
        }
    });
</script>

<script>
    export default {
        name: 'Button',
        methods: {
            onClick() {
                if(this.title === "girar" && !this.noNumbers) {
                    let number = generate_ball()
                    if(!number) this.$emit('noNumbers')
                
                    let data = [number];

                    for(let i=0; i<100; i++) {
                        let number = animation_numbers_random();
                        data.push(number);
                    }
                    this.$emit('emitNumber', data);   
                }else if(this.title === "restablecer") {
                    this.$emit('resetNumbers')
                }
            }
        }
    }
</script>

<template>
    <div class="button">
        <div class="button__content" @click="onClick" :style="{backgroundColor: background, color: fontColor}">{{ title }}</div>
    </div>
</template>


<style scoped>
.button {
  background-color: #222222;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: all .3s ease-in-out;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.6rem;
  text-align: center;
  width: 100%;
  user-select: none;
  border: 3px solid #222222;
}

.button__content {
  background: none;
  border: none;
  padding: .8rem 1rem;
  font: inherit;
  color: inherit;
  font-weight: lighter;
  width: 100%;
  text-align: center;
  cursor: pointer;
}


@media screen and (max-width: 1020px) {
    .button {
        margin-bottom: 5rem;
    }
}
</style>
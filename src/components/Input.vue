<template>
    <div class="input-container">
      <input 
        :type="type" 
        v-model="data" 
        @input="onInput" 
        @focus="focused = true" 
        @blur="checkFocus"
        class="input-field"
        id="input-field"
      >
      <label 
        for="input-field" 
        :class="['input-label', { 'label-float': focused || data.length > 0 }]"
      >
        {{ placeholder }}
      </label>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: '',
        focused: false
      }
    },
  
    name: 'Input',
    props: {
      placeholder: {
        type: String
      },
      type: {
        type: String,
        required: true
      },
      login: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onInput: function() {
        if(this.data.toLowerCase() === import.meta.env.VITE_PASSWORD && this.type === "password") {
          this.$emit('newWinnerDNI', this.data);
        }
        if(!this.login) this.$emit('valueDNI', this.data)
        else {
          this.$emit('valueText', this.data)
        }
      },
      checkFocus: function() {
        this.focused = this.data.length > 0;
      }
    }
  }
  </script>
  
  <style scoped>
  .input-container {
    position: relative;
    width: 100%;
    margin-top: 1.5rem;
  }
  
  .input-field {
    width: 100%;
    height: 3.5rem;
    border-radius: .2rem;
    border: 1px solid #a7a9bd;
    padding: 0 1rem;
    font-size: 1.2rem;
    outline: none; 
    transition: all .3s ease-in-out;
    background-color: #fff;
    color: #000;
  }
  
  .input-field:focus {
    border-color: #000;
    box-shadow: 0 0 0 1px #000;
  }
  
  .input-label {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #6e6e6e;
    pointer-events: none;
    transition: all 0.2s ease-out;
    background-color: #fff;
    padding: 0 0.3rem;
  }
  
  .label-float {
    top: 0;
    font-size: 0.8rem;
    transform: translateY(-50%);
    color: #000;
  }
  </style>
<script>
import Button from "@/components/Button.vue";

export default {
  name: "PopupBallWinner",
  components: {Button},
  props: {
    letter: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    outerCircle: {
      type: String,
      default: "#FFBD59"
    },
    innerCircle: {
      type: String,
      default: "#FF9100"
    }
  }
}
</script>

<template>
  <div class="popup flex">
    <div class="card flex">

      <div class="card__content flex">
        <div class="card__content-detail">
          <div class="flex">
            <h2 class="letter">{{ letter }}</h2>
            <div class="circle">
              <div class="outer-circle flex" :style="{ backgroundColor: outerCircle }"></div>
              <div class="inner-circle" :style="{ backgroundColor: innerCircle }">
                <span>{{number}}</span>
              </div>
            </div>
          </div>
        </div>
        <Button
            title="aceptar"
            @click="$emit('closePopupBallWinner')"
            class="button-accept"
        />
      </div>
    </div>

  </div>
</template>

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
  border-radius: 24px;
  margin: 2rem;
  flex-direction: column;
  position: relative;
  width: 320px;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: .5rem .5rem 0 0;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.close:hover {
  opacity: .7;
}

.card__content {
  padding: 1.5rem;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  max-width: 520px;
}

.card__content h2 {
  font-weight: bold;

}

.button-accept {
  margin: 0
}

.letter, .ball {
  font-size: 5rem;
  font-weight: bold;
}

.circle {
  width: 170px;
  height: 170px;
  position: relative;
}

.outer-circle, .inner-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}

.outer-circle {
  background-color: #FFBD59;
}

.inner-circle {
  width: 80%;
  height: 80%;
  background-color: #FF9100;
  margin: 10%;
}

.inner-circle span {
  font-size: 5rem;
  font-weight: bold;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
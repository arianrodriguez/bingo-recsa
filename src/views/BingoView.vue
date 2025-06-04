<script>
import Main from "@/components/Main.vue";

export default {
  name: "BingoView",
  components: {Main}
}
</script>

<template>
  <section class="main-section flex">
    <!--<img src="../assets/img/REGLAS.png" alt="Logo Primax" class="reglas">-->
    <div class="bingo-header flex">
      <img src="/src/assets/img/bingo-logo-otp.png" alt="Bingo">
    </div>
    <Main class="main-wrapper"/>
  </section>
</template>

<style scoped>
.bingo-header img {
  width: 50%;
  user-select: none;
}

.main-section {
  height: 100vh;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
}

.main-wrapper {
  height: 100%;
}

.logo {
  width: 200px;
  position: absolute;
  right: 0;
  top: 0;
}

.reglas {
  width: 350px;
  position: absolute;
  left: 1%;
  top: 5%;
}

@media screen and (max-width: 1050px) {
  .main-section {
    height: auto;
  }
}
</style>
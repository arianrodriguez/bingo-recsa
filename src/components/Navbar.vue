<template>
    <nav class="navbar flex">
        <div class="navbar__content flex"></div>
    </nav>
</template>

<style scoped>
    .navbar__content {
        background-image: url(/src//assets/img/navbar.png);
        width: 20%;
        height: 80px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        min-width: 600px;
    }

    @media screen and (max-width: 620px) {
        .navbar__content {
            width: 100%;
            min-width: 0;
            height: 70px;
        }
    }

    @media screen and (max-width: 390px) {
        .navbar__content {
            height: 40px;
        }
    }
</style>
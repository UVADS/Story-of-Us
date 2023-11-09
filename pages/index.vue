<script setup></script>

<template>
  <div
    class="main-content flex flex-col items-center justify-center h-screen width-full"
  >
    <h1 class="home-text">
      To&nbsp;<span class="build-text">build</span> &nbsp;a school
      <span class="break" /> without walls
    </h1>
    <div class="home-subtext">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur
      veritatis omnis facilis quibusdam odit sequi ratione aliquam atque veniam
      beatae, fugit debitis, unde id incidunt reiciendis officiis consequatur
      minima saepe.
    </div>
    <a href="/chapters"
      ><button class="btn-yellow">View Digital Exhibition</button></a
    >
  </div>
</template>

<style scoped>
@import url('https://use.typekit.net/kma2wyt.css');
h1 {
  display: flex;
  flex-wrap: wrap;
}

.home-text {
  font-family: 'franklin-gothic-urw', 'Franklin Gothic', 'ITC Franklin Gothic',
    Arial, sans-serif;
  font-size: 100px;
  font-weight: 300;
  line-height: 96px;
  letter-spacing: 0em;
  color: #fff;
  max-width: 800px;
  display: flex;
  justify-content: center;
  color: white;
}
.build-text {
  font-family: 'franklin-gothic-urw', 'Franklin Gothic', 'ITC Franklin Gothic',
    Arial, sans-serif;
  font-size: 100px;
  font-weight: 600;
  line-height: 96px;
  letter-spacing: 0em;
  text-align: center;
  color: #fdda24;
  max-width: fit-content;
}
.home-subtext {
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  max-width: 600px;
  padding: 30px 60px;
}

.break {
  flex-basis: 100%;
  height: 0;
}

.build-text {
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #fff;
  animation:
    type 3.5s steps(35, end),
    cursor 1s step-end infinite;
}
@keyframes type {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes cursor {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #fff;
  }
}
</style>

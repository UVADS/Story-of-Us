<script setup>
const hasrun = ref(0)
const words = ["Build",
"Champion",
"Create",
"Cultivate",
"Design",
"Develop",
"Envision",
"Establish",
"Foster",
"Imagine",
"Inspire",
"Promote"]
</script>

<template>

    <video id="homeVideo" src="/videos/rotunda.mp4" autoplay muted loop></video>
    <div class="homepage-content-wrapper">
    <div class="homepage-content flex flex-col items-center justify-center">
      <h1 class="home-text">
        To&nbsp;<span class="build-text">build</span> &nbsp;a school
        <span class="break" /> without walls
      </h1>
      <div class="home-subtext">
        It began as an idea then evolved into an institute before ultimately transforming into the first data science school in the country. In this exhibition you’ll learn how this improbable story unfolded and hear from the people who turned a vision into reality.
      </div>
      <a href="/chapters"
        ><button class="btn-yellow">View Digital Exhibition</button></a
      >
  </div>
  </div>


</template>

<style scoped>

h1 {
  display: flex;
  flex-wrap: wrap;
}

#homeVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  opacity: 0.5;
  object-fit: cover;

}
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;

}
.homepage-content {
  height: 100%;

}
.homepage-content-wrapper{
  background-image: url('assets/images/databurst.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1000px;
  height:100%;
  width:100%;
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
  align-items: center;
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
h1
{
  line-height: 48px;
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

@media (max-width: 768px) {

h1
{
  color: #FFF;
  text-align: center;
  font-size: 44px;
  font-style: normal;
  font-weight: 300;
  line-height: 48px; /* 109.091% */

}
  .home-text {
    color: #FFF;
text-align: center;
font-size: 44px;
font-style: normal;
font-weight: 300;
line-height: 48px; /* 109.091% */
  }
  .build-text {
    font-size: 44px;
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid #fff;
    line-height: 48px;
    animation:
    type 3.5s steps(35, end),
    cursor 1s step-end infinite;
}
  .home-subtext {
    color: #FFF;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 26px; /* 144.444% */
  }
}

</style>

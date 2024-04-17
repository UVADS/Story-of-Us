<script setup>
const words = ref([
  'Build',
  'Champion',
  'Create',
  'Cultivate',
  'Design',
  'Develop',
  'Envision',
  'Establish',
  'Foster',
  'Imagine',
  'Inspire',
  'Promote'
])
</script>

<template>
  <video id="homeVideo" src="/videos/rotunda.mp4" autoplay muted loop></video>
  <div class="homepage-content-wrapper">
    <div class="homepage-content">
      <h1 class="home-text homepage-text">
        <span class="nowrap"
          >To
          <span class="build-text"></span>
          a school</span
        ><span class="break" /> without walls
      </h1>
      <div class="home-subtext homepage-text">
        <p class="text-1">
          It began as an idea then evolved into an institute before ultimately
          transforming into the first data science school in the country.
        </p>
        <p class="text-2">
          In this exhibition you’ll learn how this improbable story unfolded and
          hear from the people who turned a vision into reality.
        </p>
      </div>
      <a href="/chapters"
        ><button class="btn-yellow enter">View Digital Exhibition</button></a
      >
      <h1 class="typing"></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/css/typed.scss';

.text-1 {
  animation-name: fadeIn;
  animation-duration: 7s;
}
.text-2 {
  animation-name: fadeIn;
  animation-duration: 12s;
}
.text-1,
.text-2 {
  line-clamp: 2;
}
h1 {
  display: flex;
  flex-wrap: wrap;
}
.nowrap {
  white-space: nowrap;
  text-align: center;
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
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.homepage-content-wrapper {
  background-image: url('assets/images/databurst.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1000px;
  height: 100%;
  width: 100%;
}
.btn-yellow {
}
.btn-yellow:hover {
  animation: glowing 5s ease-in-out infinite;
  background-color: #e4c748e7;
}

.homepage-text {
  animation: fadeIn 2s;
}
.home-text {
  font-family: 'franklin-gothic-urw', 'Franklin Gothic', 'ITC Franklin Gothic',
    Arial, sans-serif;
  font-size: 100px;
  font-weight: 300;
  line-height: 96px;
  letter-spacing: 0em;
  color: #fff;
  max-width: 1200px;
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
h1 {
  line-height: 48px;
}
.home-subtext {
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  max-width: 700px;
  padding: 30px 60px;
}

.break {
  flex-basis: 100%;
  height: 0;
}
$speeds: (
  type: 0.2,
  pause-typed: 2,
  delete: 0.08,
  pause-deleted: 1
);
$options: (
  name: 'homepage-typing-text',
  caret: true,
  caret-speed: 0.75,
  caret-width: 2px,
  caret-color: currentColor,
  caret-space: 1px,
  delay: 4,
  iterations: 1,
  end-on: 'Build'
);
.build-text {
  @include typed(
    'Build',
    'Champion',
    'Create',
    'Cultivate',
    'Design',
    'Develop',
    'Envision',
    'Establish',
    'Foster',
    'Imagine',
    'Inspire',
    'Promote',
    $speeds,
    $options
  );
  text-transform: lowercase;
  overflow: hidden;
  white-space: nowrap;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  h1 {
    color: #fff;
    text-align: center;
    font-size: 44px;
    font-style: normal;
    font-weight: 300;
    line-height: 48px; /* 109.091% */
  }
  .home-text {
    color: #fff;
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
    line-height: 48px;
  }
  .home-subtext {
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 144.444% */
  }
}
</style>

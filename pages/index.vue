<script setup>
/* const words = ref([
  'Build',
  'Inspire',
  'Develop',
  'Cultivate',
  'Imagine',
  'Promote',
  'Create',
  'Champion',
  'Establish',
  'Foster',
  'Design',
  'Envision',
]) */
</script>

<template>
  <!-- vue/no-multiple-template-root -->
  <div>
    <video id="homeVideo" width="100%" height="100%" preload="auto" autoplay loop muted playsinline>
      <source 
        src="/videos/homepage_video.webm" 
        type="video/webm">
      <source 
        src="/videos/homepage_video.mp4" 
        type='video/mp4'>
    </video>
    <div class="homepage-content-wrapper">
      <div class="homepage-content">
        <h1 class="home-text homepage-text">
          <span class="nowrap"
            >To
            <span class="build-text" />
            <span class="mobile-break"> a school</span></span
          ><span class="break" /> without walls
        </h1>
        <div class="home-subtext homepage-text">
          <p class="text-1">
            It began as an idea then evolved into an institute before ultimately
            transforming into the first data science school in the country.
          </p>
          <p class="text-2">
            In this exhibition you’ll learn how this improbable story unfolded
            and hear from the people who turned a vision into reality.
          </p>
        </div>
        <a class="btn-yellow enter" href="/chapters">View Digital Exhibition</a>
        <!-- <h1 class="typing" /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.homepage-container {
  header.story-header {
    background-color: transparent;
    justify-content: center;
    .about {
      display: none;
    }

    @media (max-width: 450px) {
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }
  }
  .main-content {
    background-image: url('assets/images/databurst.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    height: 100%;
    width: 100%;
  }
}
</style>

<style scoped lang="scss">
@import '@/assets/css/typed.scss';

.mobile-break {
  @media (max-width: 450px) {
    display: block;
  }
  @media (min-width: 768px) and (max-width: 1020px) {
    display: block;
  }
}
.text-1 {
  animation: fadeIn 2s 1.5s var(--ease-authentic) forwards;
}
.text-2 {
  animation: fadeIn 2s 1.55s var(--ease-authentic) forwards;
}
.text-1,
.text-2 {
  line-clamp: 2;
  margin-inline: auto;
  max-width: 65ch;
  opacity: 0;
  text-wrap: balance;
}
h1 {
  display: flex;
  flex-wrap: wrap;
  margin-block: 0 2rem;
}

p {
  padding-bottom: 0;
}

.nowrap {
  white-space: nowrap;
  text-align: center;
}
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
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

.homepage-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.homepage-content-wrapper {
  // background-image: url('assets/images/databurst.svg');
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: contain;
  // height: 100%;
  // width: 100%;
}
.btn-yellow.enter {
  font-size: 18px;
}
.home-text {
  animation: fadeIn 0.5s 0.2s forwards;
  font-family: 'franklin-gothic-urw', 'Franklin Gothic', 'ITC Franklin Gothic',
    Arial, sans-serif;
  font-size: 100px;
  font-weight: 300;
  line-height: 96px;
  letter-spacing: 0em;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  opacity: 0;

  @media (max-width: 450px) {
    margin-bottom: 0;
  }
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
  padding: 2rem;
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
    'Inspire',
    'Develop',
    'Cultivate',
    'Imagine',
    'Promote',
    'Create',
    'Champion',
    'Establish',
    'Foster',
    'Design',
    'Envision',
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
  100% {
    opacity: 1;
  }
}

@media (max-width: 767px) {
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
    line-height: 24px; /* 144.444% */
    padding: 10px 1rem;
  }
  .story-logo {
    line-height: 60px;
    display: grid;
  }
  .homepage-content {
    justify-content: unset;
  }
}
</style>

<template>
  <header class="story-header">
    <nuxt-link to="https://datascience.virginia.edu" class="story-logo">
      <vectors-logo></vectors-logo
    ></nuxt-link>
    <div class="separator"></div>
    <div class="header-title">
      <a href="/" class="story-logo" title="Story of Us" load="eager"
        >The Story of Us</a
      >
    </div>
    <div class="about">
      <nuxt-link to="/about" class="ibm-plex-mono about"
        >About this project</nuxt-link
      >
    </div>
  </header>
</template>
<style scoped lang="scss">
header {
  display: flex;

  flex-direction: row;
  background: #1a2835;
  height: 60px;
  padding: 0 60px;
  position: fixed;
  width: 100%;
  z-index: 10;
}
.about {
  color: #fff;
  text-align: right;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 60px; /* 107.692% */
  text-transform: none;
  align-self: center;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  padding-right: 60px;
}
.header-title {
  font-family: 'franklin-gothic-ext-comp-urw', 'sans-serif';
  text-transform: uppercase;
  line-height: 60px;
  padding-left: 15px;
  color: #fff;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.separator {
  width: 1px;
  height: 30px;
  background: #fff;
  margin-top: 15px;
}
.story-logo svg {
  color: #fff;
  height: 60px;
  line-height: 60px;
  padding-right: 15px;
}
.story-header {
  color: #fff;
  font-family: 'franklin-gothic-urw', 'Franklin Gothic', 'ITC Franklin Gothic',
    Arial, sans-serif;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 60px; /* 115.385% */
  letter-spacing: 2px;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  header {
    display: flex;

    flex-direction: row;
    background: #1a2835;
    width: 100%;
    align-items: center;
    padding: 0 21px;
    justify-content: center;
    font-family: 'franklin-gothic-ext-comp-urw', 'sans-serif';

    .story-header {
      color: #fff;
      font-family: 'franklin-gothic-urw', 'Franklin Gothic',
        'ITC Franklin Gothic', Arial, sans-serif;
      color: #fff;
      text-align: center;
      font-family: 'FranklinGothic URW Comp';
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 111.111% */
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .story-logo svg {
      color: #fff;
      height: 15px;
      line-height: 60px;
      padding-right: 15px;
      max-width: 171px;
    }
    .separator {
      display: none;
    }
    .about {
      position: absolute;
      text-align: center;
      bottom: 30px;
    }
  }
}
</style>

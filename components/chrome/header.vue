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
  position: absolute;
  z-index: 10;
  justify-self: center;
  width: calc(100% - 120px);
  padding: 0 60px;
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

.about {
  color: #fff;
  text-align: right;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 60px; /* 107.692% */
  text-transform: none;
  flex: 1 1 auto;
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
  .story-logo,
  a.story-logo,
  a.story-logo:visited {
    color: #fff;
    text-decoration: none;
  }
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

@media (max-width: 768px) {
  header {
    display: flex;

    flex-direction: row;
    background: #1a2835;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-family: 'franklin-gothic-ext-comp-urw', 'sans-serif';
    position: unset;
    z-index: unset;
    width: 100%;
    padding: 0;
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
      display: none;
    }
  }
}
</style>

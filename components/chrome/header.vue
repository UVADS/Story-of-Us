<template>
  <header class="story-header">
    <nuxt-link to="/" class="story-logo">
      <vectors-logo></vectors-logo
    ></nuxt-link>
    <div class="separator"></div>
    <div class="header-title">The Story of Us</div>
  </header>
</template>
<style scoped>
header {
  display: flex;

  flex-direction: row;
  background: #1a2835;
  height: 60px;
  padding: 0 60px;
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
</style>

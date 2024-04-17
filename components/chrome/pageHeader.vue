<template>
  <div class="header-container">
    <div class="header-name">
      <h1>{{ title }}</h1>
      <div
        v-if="description"
        class="header-description"
        v-html="description"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['object'])
const title = ref('About This Project')
const description = ref(null)

if (props.object) {
  title.value = props.object.name
  description.value = props.object.description
}
</script>

<style lang="scss">
.header-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #fff;
  padding-bottom: 30px;
  justify-content: space-between;
  overflow: hidden;

  .header-name {
    align-self: flex-start;
  }
  .header-description {
    padding: 20px 0;
  }
  .header-title {
    color: #fff;
    font-family:
      IBM Plex Mono,
      monospace;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 112.5% */
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 20px 0;
  }
  .header-headshot {
    border-radius: 215px;

    flex: 0 0 auto;
    img {
      border-radius: inherit;
      max-width: 215px;
      height: 215px;
      object-fit: cover;
    }
  }
}
@media (max-width: 768px) {
  .header-container {
    width: 100%;
    flex-direction: column-reverse;

    .header-name {
      h1 {
        color: #fff;
        text-align: center;
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 40px; /* 111.111% */
      }
      flex: unset;
      color: #fff;
      text-align: center;
      font-family: 'FranklinGothic URW';
      font-size: 36px;
      font-style: normal;
      font-weight: 600;
      line-height: 40px; /* 111.111% */
    }
    .header-description {
      max-width: 100%;
      padding: 20px 0;
      color: #fff;
      text-align: center;
      font-family: 'FranklinGothic URW';
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px; /* 144.444% */
    }
    .header-title {
      color: #fff;
      text-align: center;
      font-family:
        IBM Plex Mono,
        monospace;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px; /* 128.571% */
      letter-spacing: 2px;
      text-transform: uppercase;
      max-width: 100%;
    }
    .header-headshot {
      border-radius: 215px;
      order: 1;
      flex: unset;
      padding: 20px 0;
      align-self: center;
      img {
        border-radius: inherit;
        max-width: 215px;
        height: 215px;
        object-fit: cover;
      }
    }
  }
}
</style>

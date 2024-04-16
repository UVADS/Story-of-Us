<template>
  <div class="person-container">
    <div class="person-name">
      <h1>{{ person.name }}</h1>
      <div v-if="person.fields.person_title" class="person-title">
        {{ person.fields.person_title }}
      </div>
      <div
        v-if="person.description"
        class="person-description"
        v-html="person.description"
      ></div>
    </div>
    <div class="person-headshot">
      <img class="" :src="`${person.fields.headshot.url}`" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['person'])
</script>

<style lang="scss">
.person-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #fff;
  padding-bottom: 30px;
  justify-content: space-between;

  .person-name {
    align-self: flex-start;
  }
  .person-description {
    max-width: 640px;
    padding: 20px 0;
  }
  .person-title {
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
    max-width: 640px;
    padding: 20px 0;
  }
  .person-headshot {
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
  .person-container {
    width: 100%;
    max-width: 100%;
    flex-direction: column-reverse;
    .person-name {
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
      font-size: 36px;
      font-style: normal;
      font-weight: 600;
      line-height: 40px; /* 111.111% */
    }
    .person-description {
      width: unset;
      max-width: 100%;
      padding: 20px 0;
      color: #fff;
      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px; /* 144.444% */
    }
    .person-title {
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
    .person-headshot {
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

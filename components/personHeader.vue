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
  width: 960px;
  .person-name {
    align-self: flex-start;
    flex: 1 1 auto;
  }
  .person-description {
    max-width: 480px;
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
    max-width: 480px;
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
</style>

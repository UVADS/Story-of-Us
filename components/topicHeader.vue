<template>
  <div class="topic-container">
    <div class="topic-name">
      <h1>{{ topic.name }}</h1>
      <div
        v-if="topic.description && topic.description.length > 0"
        class="topic-description"
      >
        {{ topic.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['topic'])
</script>

<style lang="scss">
.topic-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #fff;
  padding-bottom: 30px;
  justify-content: space-between;
  .topic-name {
    align-self: flex-start;
  }
  .topic-description {
    padding: 20px 0;
  }
  .topic-title {
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
  .topic-headshot {
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
  .topic-container {
    width: 100%;
    flex-direction: column-reverse;

    .topic-name {
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
    .topic-description {
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
    .topic-title {
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
    .topic-headshot {
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

<template>
  <div
    v-for="chapter in chapters"
    :key="`chapter_${chapter.field_chapter_number}`"
    class="chapter-info"
  >
    <div class="chapter-number">
      0{{ chapter.field_chapter_number }}
    </div>
    <div class="chapter-name">
      <nuxt-link class="cover-link" :to="`/chapters/${titleUrl(chapter.name)}`">
        <span class="cover-link__inner">{{ chapter.name }}</span>
      </nuxt-link>
      <span class="arrow" />
    </div>
    <div class="chapter-years padding-top-20">
      {{ yearRange(chapter.field_years) }}
    </div>
  </div>
</template>

<script setup>
defineProps(['chapters'])
function yearRange(years) {
  return years && years.includes('-') ? years : years + ' - ONWARDS'
}
</script>

<style lang="scss">
a,
div a {
  color: #fff;
  text-decoration: none !important;
}
.chapters {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  overflow: hidden;
}

.chapter-info {
  border-bottom: solid 1px #fff;
  display: grid;
  grid-template-columns: 120px auto;
  align-items: center;
  align-content: center;
  clear: both;
  grid-row: 1/3;
  padding-block: 3rem;
  position: relative;
  transition: 0.3s var(--ease-authentic);
}

#chaptersPage {
  .chapter-info {
    @media (max-width: 450px) {
      display: block;

      .chapter-name {
        margin-top: 0.5rem;
      }
    }
    @media (max-width: 600px) {
      padding-block: 2rem;

      &:first-child {
        padding-top: 0;
      }

      .chapter-number {
        font-size: 32px;
      }
      .chapter-name {
        font-size: 32px;
      }
    }
  }
}

.chapter-name {
  align-self: center;
  font-size: 54px;
  font-family: 'franklin-gothic-urw', 'Franklin Gothic', 'ITC Franklin Gothic',
    'franklin-gothic-ext-comp-urw', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: 0.9;
  transition: 0.3s var(--ease-authentic);
}

.chapter-years {
  font-size: 24px;
  font-family: Digital-7;
  line-height: 1;
  grid-column: 2;
  animation: 2s;
  transition: 0.3s var(--ease-authentic);
}

.chapter-number {
  color: #fdda24 !important;
  font-family: Digital-7;
  font-size: 90px;
  font-style: normal;
  font-weight: 400;
  line-height: 0.75;
  width: 100px;
  min-width: 100px;
  padding-top: 0.175em;
}

.chapter-info:last-child {
  border: none;
}
@media (max-width: 768px) {
  .chapter-info {
    grid-template-columns: 100px auto;
  }
  .chapter-name {
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
  }
  .chapter-number {
    font-size: 75px;
  }
  .sections-page .chapter-info {
    border-bottom: solid 1px #fff;
    display: grid;
    grid-template-columns: 100px auto;
    vertical-align: flex-start;
    align-items: center;
    align-content: center;
    clear: both;
  }
  .chapter-years {
    font-size: 20px;
  }
}
@media (min-width: 1200px) {
  .chapter-name {
    font-size: 72px;
  }
  .chapter-number {
    font-size: 90px;
  }
  .chapter-years {
    font-size: 24px;
  }
}

@media (min-width: 1360px) {
  .chapter-name {
    font-size: 90px;
  }
  .chapter-years {
    padding-top: 1rem;
  }
}
</style>

<style lang="scss">
#chaptersPage {
  .chapter-info {
    grid-row: 1/3;
  }
  .chapter-name::after {
    content: '\00bb';
    display: none;
    position: absolute;
    left: auto;
    opacity: 0;
    z-index: 10;
    color: #fdda24;
    transition: 0.3s var(--ease-authentic);
    transform: translateX(10px);

    @media (min-width: 768px) {
      display: inline-block;
    }
  }

  .chapter-info:has(.chapter-name a:hover),
  .chapter-info:has(.chapter-name a:focus) {
    .chapter-name,
    .chapter-years,
    .chapter-name a {
      color: #fdda24;
    }

    .chapter-name::after {
      opacity: 1;
    }

    @media (min-width: 768px) {
      .chapter-years,
      .chapter-name::after {
        transform: translateX(20px);
      }
      .chapter-name .cover-link__inner {
        padding-left: 20px;
      }
    }
  }
}
.cover-link__inner {
  transition: padding 0.3s var(--ease-authentic);
}
.cover-link::after {
  z-index: 1;
}
</style>

<template>
  <div class="menu-wrapper">
    <div class="menu-chapters">
      <div
        v-for="chapter in chapters"
        :key="`${chapter.tid}`"
        :class="`menu-chapter-item ${sections && Number(chapter.tid) === Number(chapterId) ? 'active-item' : ''}`"
      >
        <div class="menu-chapter-name">
          <a :href="`/chapters/${titleUrl(chapter.name)}`">{{
            chapter.name
          }}</a>
        </div>
        <ul
          v-if="!hideYears && sections && Number(chapter.tid) === chapterId"
          class="year-menu-list"
        >
          <li
            v-for="year in getChapterYears()"
            :key="year"
            class="year-menu-item"
          >
            <NuxtLink :to="`#anchor_${year}`">
              {{ year }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const store = useChaptersStore()
const chapters = store.getChapters
const props = defineProps({
  sections: {
    type: Array,
    required: false,
    default: null,
  },
  chapterId: {
    type: Number,
    required: false,
    default: null,
  },
  hideYears: {
    type: Boolean,
    required: false,
    default: false,
  },
})
function getChapterYears() {
  return [
    ...new Set(
      props.sections.map(item => item.fields.year_range[0].start_year),
    ),
  ]
}
</script>

<style lang="scss" scoped>
.menu-chapters {
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 114.286% */
  font-family: 'ibm-plex-mono', 'Helvetica';
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  padding-top: 30px;
  position: fixed;
  .menu-chapter-item {
    padding: 30px 0;
  }

  .menu-chapter-item:first-of-type {
    padding-top: 0;
  }
  .menu-dot {
    /*display: none;*/
    position: relative;
    margin: -20px;
    padding: 0;
  }
  .active-item::before {
    content: url('assets/images/dot.svg');
    margin-left: -20px;
    float: left;
  }
  .year-menu-list {
    font-family: ibm-plex-mono, 'Helvetica';
    font-size: 13px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
    color: #fff;
  }
}
</style>

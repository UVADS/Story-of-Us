<template>
  <div class="menu-wrapper">
    <div class="menu-chapters">
      <div
        v-for="chapter in chapters"
        :key="`${chapter.tid}`"
        class="menu-chapter-item"
      >
        <VectorsDot
          v-if="sections && chapter.tid === chapterId"
          class="menu-dot"
        >
        </VectorsDot>
        <div class="menu-chapter-name">
          <a :href="`/chapters/${chapter.tid}`">{{ chapter.name }}</a>
        </div>
        <ul v-if="sections && chapter.tid === chapterId" class="year-menu-list">
          <li
            v-for="section in sections"
            :key="section.id"
            class="year-menu-item"
          >
            {{ section.year_start }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const store = useChaptersStore()
store.fetchChapters()
const chapters = store.getChapters
defineProps({
  sections: {
    type: Object,
    required: false,
    default: null
  },
  chapterId: {
    type: Number,
    required: false,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.menu-chapters {
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 114.286% */
  font-family: 'ibm-plex-mono', 'Helvetica';
}
.menu-chapter-name {
  padding: 30px 0;
}
.menu-chapter-name:first-of-type {
  padding-top: 0;
}
</style>

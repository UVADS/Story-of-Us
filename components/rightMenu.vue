<template>
  <div :class="[menuActive ? 'active' : '', 'menu-wrapper']">
    <button 
      aria-label="Toggle chapters navigation"
      aria-controls="menu-chapters"
      :aria-expanded="menuActive"
      class="btn btn-menu"
      @click="toggleMenu"
    >
      <svg aria-hidden="true" class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="88" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="88" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="88" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="44" cy="64" r="12"/><circle cx="44" cy="128" r="12"/><circle cx="44" cy="192" r="12"/></svg>
      <svg aria-hidden="true" class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
      Chapters
    </button>
    <nav id="menu-chapters" class="menu-chapters">
      <h2 class="sr-only">Navigate to Chapter</h2>
      <div
        v-for="chapter in chapters"
        :key="`${chapter.tid}`"
        :class="`menu-chapter-item ${sections && Number(chapter.tid) === Number(chapterId) ? 'active-item' : ''}`"
      >
        <div class="menu-chapter-name">
          <NuxtLink :href="`/chapters/${titleUrl(chapter.name)}`">{{
            chapter.name
          }}</NuxtLink>
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
    </nav>
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

const menuActive = ref(false)
function toggleMenu() {
  menuActive.value = !menuActive.value
}

// Close menu on escape key
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menuActive.value = false
    }
  })
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
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  min-width: 240px;
  padding-top: 2rem;
  position: relative;

  // @media (min-width: 880px) {
  //   position: fixed;
  // }

  a {
    transition: color 0.1s;
  }

  .menu-chapter-item {
    padding: 1rem 0;

    @media (max-width: 767px) {
      padding-bottom: 0;
    }
  }

  .menu-chapter-name {
    line-height: 1.35;
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
    margin-left: -1rem;
    float: left;
  }
  .year-menu-list {
    font-family: 'ibm-plex-mono', monospace;
    font-size: 13px;
    font-weight: 400;
    line-height: 2;
    letter-spacing: 0em;
    text-align: left;
    color: #fff;
    margin-bottom: 0;
    margin-top: 0.5rem;
    padding-left: 1.5rem;
  }
}


.btn-menu {
  align-items: center;
  background-color: var(--color-dark-blue);
  border-radius: 50px;
  box-shadow: 0px 0.6px 2.2px rgba(0, 0, 0, 0.02), 0px 1.3px 5.3px rgba(0, 0, 0, 0.028), 0px 2.5px 10px rgba(0, 0, 0, 0.035), 0px 4.5px 17.9px rgba(0, 0, 0, 0.042), 0px 8.4px 33.4px rgba(0, 0, 0, 0.05), 0px 20px 80px rgba(0, 0, 0, 0.07);
  display: flex;
  color: white;
  font-family: "ibm-plex-mono", "Helvetica";
  font-size: 1rem;
  font-weight: 500;
  gap: 0.5rem;
  justify-content: center;
  letter-spacing: -0.25px;
  line-height: 1;
  margin-bottom: 1rem;
  padding: 0.5rem 2rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1;

  svg {
    fill: currentColor;
    flex-shrink: 0;
    max-width: 24px;
    width: 100%;
  }

  @media (min-width: 768px) {
    right: 2rem;
    top: 60px;
  }

  @media (min-width: 1340px) {
    right: 1rem;
  }

  @media (min-width: 1460px) {
    display: none;
  }

  &:hover,
  &:focus-visible {
    color: var(--color-yellow);
  }

  .close-icon {
    display: none;
  }

  .menu-icon {
    display: inline-block;
  }
}

.menu-wrapper {
  display: flex;
  flex-flow: column;
  padding: 0;
  position: fixed;
  height: 100%;
  right: 0;
  top: 60px;

  &.active {
    
    .menu-chapters {
      transform: translateX(-100%);

      @media (min-width: 1460px) {
        transform: translateX(0);
      }
    }
    
    .close-icon {
      display: inline-block;
    }
    
    .menu-icon {
      display: none;
    }
  }

  @media (min-width: 1460px) {
    right: auto;
  }
}

.menu-chapters {
  background-color: rgba(0, 0, 0, 0.95);
  box-shadow: 0px 0.6px 2.2px rgba(0, 0, 0, 0.02), 0px 1.3px 5.3px rgba(0, 0, 0, 0.028), 0px 2.5px 10px rgba(0, 0, 0, 0.035), 0px 4.5px 17.9px rgba(0, 0, 0, 0.042), 0px 8.4px 33.4px rgba(0, 0, 0, 0.05), 0px 20px 80px rgba(0, 0, 0, 0.07);
  content: '';
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  max-width: 300px;
  padding: 6rem 1rem 1rem 3rem;
  position: absolute;
  top: 0;
  transform: translateX(100%);
  transition: transform 0.3s var(--cubic-wipe);
  width: 280px;

  @media (min-width: 768px) {
    padding-top: 150px;
  }

  @media (min-width: 1460px) {
    background-color: transparent;
    box-shadow: none;
    padding: 60px 0 0 0;
    position: relative;
    transform: translateX(0);
  }
}
</style>

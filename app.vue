<script setup>
import { useMouse } from '@vueuse/core'

const description =
  'To Build A School Without Walls. It began as an idea then evolved into an institute before ultimately transforming into the first data science school in the country. In this exhibition you’ll learn how this improbable story unfolded and hear from the people who turned a vision into reality.'
const title = 'Story of Us - UVa School of Data Science'
const url = useRoute().routeName

useHead({
  title: 'Story of Us - UVa School of Data Science',
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Story of Us` : title
  },
  meta: [
    {
      name: 'description',
      content: description
    },

    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Story of Us - UVa School of Data Science'
    },
    { hid: 'og:url', property: 'og:url', content: url },
    { hid: 'og:description', property: 'og:description', content: description },
    // { hid: 'og:image', property: 'og:image', content: process.env.baseUrl + ogImage},

    // twitter card
    { hid: 'twitter:title', name: 'twitter:title', content: title },
    { hid: 'twitter:url', name: 'twitter:url', content: url },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    }
    //  { hid: "twitter:image", name: "twitter:image", content: process.env.baseUrl + ogImage},
  ],
  link: [{ hid: 'canonical', rel: 'canonical', href: url }]
})
const router = useRouter()
const currentRoute = router.currentRoute
const routeName = currentRoute.value.name
const pageClass = routeName === 'index' ? 'homepage' : routeName
//const { x, y } = useMouse()
const outer = ref([])
</script>
<template>
  <div>
    <div
      id="roundCursor"
      class="cursor pointer-events-none"
      :style="{ top: `${y - 50}px`, left: `${x - 50}px` }"
    ></div>
    <ChromeHeader></ChromeHeader>
    <div class="outer" id="outer" ref="outer">
      <div class="container gridline" id="grid" ref="grid">
        <div id="main-content" :class="`main-content ${pageClass}`">
          <NuxtPage />
        </div>
      </div>
    </div>
    <ChromeFooter></ChromeFooter>
  </div>
</template>

<style>
.cursor {
  position: absolute;
  width: 100px;
  height: 100px !important;
  border-radius: 50%;
  z-index: 15;
  background-color: #fdda24;
  pointer-events: none;
  opacity: 0.3;
  filter: blur(60px);
}

.pointed {
  position: absolute;
  width: 7px;
  height: 7px !important;
  background-color: white;
  border-radius: 50%;
}

body {
  background: rgb(16, 24, 31);
  color: #fff;
  height: 100%;
}
body.modal-open {
  overflow: hidden;
}
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 60px;
  height: 100%;
}

.gridline {
  height: 100vh;
  background-image: repeating-linear-gradient(
    90deg,
    #cccccc25 0 1px,
    transparent 1px 100%
  );
  background-size: 120px 1px;
  background-repeat: repeat;
  min-height: 100%;
  top: 0;
  bottom: 0;
  height: fit-content;
}
.main-content {
  color: #fff;
  max-width: 1440px;
  padding: 50px 0px;
  height: calc(100vh - 60px);
}
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-enter-active,
.page-leave-active {
  transition: all 2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 2s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
  .main-content {
    color: #fff;
    padding: 0px 21px !important;
  }
  .gridline {
    background-image: none;
  }
}
</style>

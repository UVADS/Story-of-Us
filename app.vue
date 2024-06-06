<script setup>
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

const outer = ref([])
</script>

<template>
  <div
    id="appContainer"
    :class="`app-wrapper  ${pageClass === 'homepage' ? 'homepage-container' : ''}`"
  >
    <ChromeHeader />
    <div id="outer" ref="outer" class="outer">
      <div ref="grid" class="container gridline">
        <div id="main-content" :class="`main-content ${pageClass}`">
          <NuxtPage />
        </div>
      </div>
    </div>
    <ChromeFooter />
  </div>
</template>

<style>
#appContainer {
  min-height: 100%;
  min-width: 400px;
}
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
.outer {
  position: relative;
  height: 100%;
  width: 100%;
  padding-bottom: 80px;
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
  height: 100%;
  background-image: repeating-linear-gradient(
    90deg,
    #cccccc25 0 1px,
    transparent 1px 100%
  );
  background-size: 120px 1px;
  background-repeat: repeat;
  min-height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  position: relative;
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.main-content {
  color: #fff;
  max-width: 1440px;
  height: 100%;
  margin-bottom: 60px;
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
    padding-top: 0px;
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

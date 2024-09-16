<script setup>
const description =
  'To Build A School Without Walls. It began as an idea then evolved into an institute before ultimately transforming into the first data science school in the country. In this exhibition you’ll learn how this improbable story unfolded and hear from the people who turned a vision into reality.'
const title = 'Story of Us - UVa School of Data Science'
const url = useRoute().routeName

useHead({
  htmlAttrs: {
    lang: 'en',
  },
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
      name: 'theme-color',
      content: '#1A2835'
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
  <a href="#main-content" class="visually-hidden" >
    Skip to content
  </a>
  <div
    id="appContainer"
    :class="`app-wrapper  ${pageClass === 'homepage' ? 'homepage-container' : ''}`"
  >
    <ChromeHeader />
    <div id="outer" ref="outer" class="outer">
      <div class="container gridline"></div>
      <div class="container">
        <div id="main-content" :class="`main-content ${pageClass}`">
          <NuxtPage />
        </div>
      </div>
    </div>
    <ChromeFooter />
  </div>
</template>

<style lang="scss">
#appContainer {
  display: grid;
  gap: 3rem;
  grid-template-rows: 60px auto 60px;
  min-height: 100%;
  overflow-y: auto;
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
  padding-inline: 1rem;
  padding-bottom: 4rem;

  @media (min-width: 768px) {
    padding-bottom: 0;
    padding-inline: 2rem;
  }

  @media (min-width: 1280px) {
    padding-inline: 0;
  }

  @media (min-width: 1440px) {
    padding-inline: 120px;
  }
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
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

.gridline {
  height: 100%;
  background-image: repeating-linear-gradient(
    90deg,
    #cccccc25 0 1px,
    transparent 1px 100%
  );
  background-size: 25% 1px;
  background-repeat: repeat;
  border-right: 1px solid #2A3237;
  min-height: 100%;
  top: 0;
  left: 1rem;
  right: 0;
  z-index: -1;
  position: fixed;
  pointer-events: none;
  width: calc(100% - 2rem);
  margin-inline: 0;

  @media (min-width: 600px) {
    left: 2rem;
    width: calc(100% - 4rem);
  }

  @media (min-width: 1280px) {
    background-size: 120px 1px;
    left: 50%;
    margin-inline: auto;
    max-width: 1200px;
    transform: translateX(-50%);
  }
}
.main-content {
  color: #fff;
  max-width: 1440px;
  height: 100%;
}
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
  .main-content {
    color: #fff;
  }
  .gridline {
    background-image: none;
    border: none;
  }
}
</style>

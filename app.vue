<script setup>
definePageMeta({
  pageTransition: {
    name: 'fade',
    mode: 'out-in' // default
  }
})
useHead({
    title: "Story of Us - UVa School of Data Science",
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Story of Us` : title
      }
})
const router = useRouter();
const currentRoute = router.currentRoute;
const routeName = currentRoute.value.name
const pageClass = routeName === 'index' ? 'homepage' : routeName
</script>
<template>
  <div>
    <ChromeHeader></ChromeHeader>
    <div class="outer">
      <div class="container gridline">
        <div id="main-content"  :class="`main-content ${ pageClass }`">
          <NuxtPage/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style>
body {
  background: rgb(16, 24, 31);
  color: #fff;
  height:100%
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
  height:100vh;
  background-image: repeating-linear-gradient(
    90deg,
    #cccccc25 0 1px,
    transparent 1px 100%
  );
  background-size: 120px 1px;
  background-repeat: repeat;
  min-height: 100%;
  top:0;
  bottom:0;
  height:fit-content;

}
.main-content {

  color: #FFF;
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
@media (max-width: 768px) {
    .container
    {
      max-width: 100%;
    }
    .main-content {

color: #FFF;
padding: 0px 21px !important;

}
.gridline
 {
  background-image:none;
 }
}
</style>

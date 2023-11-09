<script setup>

useHead({
    title: "Story of Us - UVa School of Data Science",
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Story of Us` : title    
      }
})
</script>
<template>
  <div>
<NuxtLayout>
<NuxtPage></NuxtPage>
</NuxtLayout>
  </div>
</template>


<template>
<div></div>
</template>

<script setup>
const route = useRoute()
let k = "12"
const { data } = await useAPIFetch(`/api/topic/${k}`, {
  key: k
})
let current = null
const sections = ref([])



</script>
<style lang="scss">
.topic-page {
  display: flex;
  flex-direction: row;
  .page-left {
    max-width: 1080px;
  }
  .page-right {
    max-width: 240px;
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    padding-left: 120px;
  }
}
@media (max-width:768px) {
  .topic-page {
    .page-right
    {
      display: none;
    }
  }
}
</style>

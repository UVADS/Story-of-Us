<template>
  <div class="person-page">
    <div class="page-left">
      <div>
        <PersonHeader :person="person"></PersonHeader>
      </div>

      <div class="section-teasers">
        <SectionTeaser
          v-for="section in sections"
          :key="section.id"
          :section="section"
        ></SectionTeaser>
      </div>
    </div>
    <div class="page-right">
      <RightMenu></RightMenu>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data } = await useAPIFetch(`/api/person/${route.params.id}`, {
  key: route.params.id
})
const person = data.value.person
const sections = data.value.sections
defineProps(['person', 'sections']) // computed
</script>
<style lang="scss">
.person-page {
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
</style>

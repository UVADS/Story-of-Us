<template>
  <div>
    <SectionTeaser
      v-show="!showDetails"
      :id="`section_teaser_${section.nid}`"
      :section="section"
      @click="showSectionDetails(section.nid)"
    ></SectionTeaser>
    <SectionDetail
      v-show="showDetails"
      :id="`section_detail_${section.nid}`"
      :section="section"
      class="section-detail-component"
      @visible="closeDetails"
    ></SectionDetail>
  </div>
</template>

<script setup>
const showDetails = ref(false)
const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})

// watchEffect(() => (showDetails.value = false))
const emits = defineEmits(['closeOthers'])

function showSectionDetails(sectionId) {
  //  console.log('show section details', sectionId)
  showDetails.value = true

  emits('closeOthers')
}
function closeDetails(visible) {
  //  console.log('close details', visible)
  showDetails.value = false
}
// section = props.section
</script>

<style></style>

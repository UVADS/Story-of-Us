<template>
  <div class="section-container">
    <div v-if="anchor">
      <a :id="`anchor_${section.fields.year_range[0].start_year}`" />
    </div>
    <div @click="showSectionDetails(section.id, true)">
      <slot name="audioPlayer" />
    </div>
    <SectionTeaser
      v-show="!showDetails"
      :id="`section_teaser_${section.id}`"
      :ref="`section_teaser_${section.id}`"
      :section="section"
      :index="index"
      class="section-teaser-component"
      @click="showSectionDetails(section.id)"
    />
    <SectionDetail
      v-show="showDetails"
      :id="`section_detail_${section.id}`"
      :ref="`section_detail_${section.id}`"
      :section="section"
      :index="index"
      class="section-detail-component"
      @visible="closeDetails(section.id)"
    >
      <slot name="audioPlayerMobile" />
    </SectionDetail>
  </div>
</template>

<script setup>
const showDetails = ref(false)
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  anchor: {
    type: Boolean,
    default: false,
  },
})
const id = ref(props.section.id)

defineExpose({ showDetails, id })
const emits = defineEmits(['closeOthers'])
function showSectionDetails(sectionId) {
  emits('closeOthers')
  nextTick(() => {
    const sectionDetail = document.getElementById(`section_detail_${sectionId}`)

    sectionDetail.scrollIntoView({ behavior: 'smooth' })
  })
  showDetails.value = true
}
function closeDetails(id) {
  const audioPlayer = document.getElementById(`audio_${id}`)

  audioPlayer && audioPlayer.classList.add('hidden-audio')
  showDetails.value = false
}
</script>

<style>
.section-detail-component {
  animation: show_div 2s;
}
.section-detail-component-close {
  animation: hide_div 2s;
}
.hidden {
  animation: hide_div 2s;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
@media screen and (max-width: 768px) {
  .audio-container {
    display: none;
  }
}

@keyframes show_div {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes hide_div {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

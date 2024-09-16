<template>
  <div class="section-container">
    <div v-if="anchor">
      <a :id="`anchor_${section.fields.year_range[0].start_year}`" />
    </div>
    <div @click="showSectionDetails(section.id, true)">
      <slot name="audioPlayer" />
    </div>
    <SectionTeaser
      :aria-label="`Expand content for ${ section.title }`"
      :aria-expanded="showDetails"
      :aria-controls="`section_detail_${section.id}`"
      v-show="!showDetails"
      :id="`section_teaser_${section.id}`"
      :ref="`section_teaser_${section.id}`"
      :section="section"
      :index="index"
      class="section-teaser-component"
      tabindex="0"
      @click="showSectionDetails(section.id)"
      v-on:keyup.enter="showSectionDetails(section.id)"
    />
    <SectionDetail
      :aria-labelledby="`section_teaser_${section.id}`"
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

<style lang="scss">
.section-detail-component {
  > :not(.section-top-container) {
    animation: show_div 0.3s;
  }
}
.section-detail-component-close {
  > :not(.section-top-container) {
    animation: hide_div 0.5s;
  }
}
.hidden {
  animation: hide_div 0.5s;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: var(--ease-authentic);
}
@media screen and (max-width: 768px) {
  .audio-container {
    display: none;
  }
}

@keyframes show_div {
  0% {
    opacity: 0;
    transform: translateY(1rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
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

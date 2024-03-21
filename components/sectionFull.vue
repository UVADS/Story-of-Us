<template>
  <div class="section-container ">
    <div v-if="anchor">
      <a :id="`anchor_${section.fields.year_range[0].start_year}`" />
    </div>
    <AudioPlayer v-if="hasAudio(section)" :section="section" :ref="player"  @click="showSectionDetails(section.id, true)" class="audio-container">

</AudioPlayer>
    <SectionTeaser
      v-show="!showDetails"
      :id="`section_teaser_${section.id}`"
      :section="section"
      :index="index"
      class="section-teaser-component"
      :ref="`section_teaser_${section.id}`"
      @click="showSectionDetails(section.id)"
    ></SectionTeaser>
    <SectionDetail
      v-show="showDetails"
      :id="`section_detail_${section.id}`"
      :section="section"
      :index="index"
      :ref="`section_detail_${section.id}`"
      class="section-detail-component"
      @visible="closeDetails(section.id)"
    ></SectionDetail>
  </div>
</template>

<script setup>
const years = ref([]);
const showDetails = ref(false);
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  showDetails: {
    type: Boolean,
    default: false,
  },
  anchor: {
    type: Boolean,
    default: false,
  },
});
function yearAnchor(year) {
  if (!years.value.includes(year)) {
    years.value.push(year);
    return true;
  }
  return false;
}
defineExpose({ showDetails });
const emits = defineEmits(["closeOthers"]);

function showSectionDetails(sectionId, audio = false) {
  if (!audio) {
  emits("closeOthers");
  }
  nextTick(() => {
    const sectionDetail = document.getElementById(
      `section_detail_${sectionId}`
    );
    if(!audio) {
      sectionDetail.scrollIntoView({ behavior: "smooth" });
    }
  });
  showDetails.value = true;
}
function closeDetails(id) {
  const sectionDetail = document.getElementById(`section_detail_${id}`);
  showDetails.value = false;
}
function toggleDetails(visible) {
  //console.log('toggle details', visible)
  showDetails.value = !showDetails.value;
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
	transition-duration: .5s;
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

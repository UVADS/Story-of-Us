<template>
  <div>
    <div v-if="anchor">
      <a :id="`anchor_${section.fields.year_range[0].start_year}`" />
    </div>
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
const hasrun = ref(0);
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

function showSectionDetails(sectionId) {
  emits("closeOthers");
  nextTick(() => {
    const sectionDetail = document.getElementById(
      `section_detail_${sectionId}`
    );
    sectionDetail.scrollIntoView({ behavior: "auto" });
  });
  showDetails.value = true;
}
function closeDetails(id) {
  const sectionDetail = document.getElementById(`section_detail_${id}`);
  //sectionDetail.style.opacity = "0"
  // sectionDetail.style.transition = "opacity 0.5s ease-out"
  //console.log("closing section", sectionDetail, id)
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
}

.section-play {
  position: relative;
  z-index: 8;
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

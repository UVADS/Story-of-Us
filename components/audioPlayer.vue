<template>
  <div class="section-play">
    <div>
    <audio :id="`audioFile_${section.id}`" :src="audio.url"></audio>
    <Icon icon="gridicons:play" height="50" width="50" class="play-icon"  @click="playAudio(section.id)" :id="`audio_icon_${section.id}`" v-if="!visible"></Icon>
    <Icon v-if="visible" icon="gridicons:pause" height="50" width="50" class="pause-icon"  @click="playAudio(section.id)" :id="`audio_icon_${section.id}`"></Icon>
    </div>
    <div class="duration">
      Listen <br>
      {{ duration }}
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
const props = defineProps({
  section: {
    type: Object,
  },
})
const audio = props.section.fields.audio[0]
const duration = ref(0)
const visible = ref(false)
onMounted(()=>{
  const audioElement = document.getElementById(`audioFile_${props.section.id}`)
  duration.value = secondsToMinutes(audioElement.duration)

});
function playAudio(id) {
  const audioElement = document.getElementById(`audioFile_${id}`)
  if (audioElement.paused) {
    audioElement.play()
    visible.value = true
  } else {
    visible.value = false
    audioElement.pause()
  }
}
function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
</script>

<style>
.section-play {
  max-height: 0px;
  position: relative;
  z-index: 4;
  top: 120px;
  display: flex;
  flex-direction: row;
  font-family: "ibm-plex-mono", monospace;
  font-size: 13px;
  line-height: 18px;
}
.duration
{
  padding-left: 30px;
}
@media (max-width: 768px){
  .section-play {
    z-index:0;

    max-height: unset;
    position: unset;
    margin: 30px 0;
  }
}
</style>
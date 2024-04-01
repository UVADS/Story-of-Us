<template>
  <div class="section-play">
    <div>
      <audio :id="`audioFile_${section.id}`" :src="audio.url"></audio>
      <Icon
        icon="gridicons:play"
        height="50"
        width="50"
        class="play-icon"
        @click="playAudio(section.id)"
        :id="`audio_icon_${section.id}`"
        v-if="!visible"
      ></Icon>
      <Icon
        v-if="visible"
        icon="gridicons:pause"
        height="50"
        width="50"
        class="pause-icon"
        @click="playAudio(section.id)"
        :id="`audio_icon_${section.id}`"
      ></Icon>
    </div>
    <div class="duration">
      Listen <br />
      <div :id="`duration_${section.id}`"  :key="duration">{{ secondsToMinutes(duration) }}</div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const props = defineProps({
  section: {
    type: Object
  },
  isPlaying: {
    type: Boolean,
    default: false
  }
})

const id = props.section.id
const audio = props.section.fields.audio[0]
const visible = ref(false)
const audioDuration = ref(0)
const duration = ref(0)
const playerStore = useAudioState
const { isPlaying } = storeToRefs(playerStore)
const emits = defineEmits(['isPlaying', 'visible', 'id'])

// Remove the existing declaration of 'emits'
// const emits = defineEmits(['visible'])
//const isPlaying = useState('isPlaying', false)
//const currentlyPlaying = useState('currentlyPlaying', null)

 onMounted(() => {
 const audioElement =  document.getElementById(`audioFile_${props.section.id}`)

   audioElement.onloadedmetadata = ()=> {
    audioDuration.value = audioElement.duration
    //console.log('duration: ' + audioElement.duration, audioDuration.value)
    duration.value = audioElement.duration

      const durationElement =  document.getElementById(`duration_${props.section.id}`)

  durationElement.innerHTML = secondsToMinutes(audioElement.duration)
    //console.log(    'duration: ' + durationElement.innerHTML)
     }

})
onUnmounted(() => {
  playerStore.currentlyPlaying = null
})
function playAudio(id) {
  const audioElement = document.getElementById(`audioFile_${id}`)
  if (audioElement.paused) {

    if(playerStore.currentlyPlaying) {
      console.log("isplaying-stopping", playerStore.currentlyPlaying)
      stopAudio()
    }
    audioElement.play()
    console.log("playing", playerStore.currentlyPlaying)
    console.log("this", this)
    playerStore.currentlyPlaying.value = this

    console.log("playing", playerStore.currentlyPlaying)
    visible.value = true
  } else {
    stopAudio()
  }
}
function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.round(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}
function stopAudio() {
  const id = playerStore.currentlyPlaying.id
  playerStore.currentlyPlaying.visible = null
  const audioElement = document.getElementById(`audioFile_${id}`)
  audioElement.pause();
  playerStore.currentlyPlaying = null;
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
  font-family: 'ibm-plex-mono', monospace;
  font-size: 13px;
  line-height: 18px;
}
.duration {
  padding-left: 30px;
}
@media (max-width: 768px) {
  .section-play {
    z-index: 0;

    max-height: unset;
    position: unset;
  }
}
</style>

<template>
  <div
    class="section-play"
    @click="playAudio(section.id, $event)"
    :key="`section_${section.id}`"
  >
    <div>
      <audio :id="`audioFile_${section.id}`" :src="audio.url"></audio>
      <Icon
        icon="gridicons:play"
        height="50"
        width="50"
        :class="{ iconVisible: isPlaying }"
        :id="`audio_play_${section.id}`"
        v-show="!visible"
        ref="play"
      ></Icon>
      <Icon
        icon="gridicons:pause"
        height="50"
        width="50"
        :class="{ iconVisible: isPlaying }"
        v-show="visible"
        :id="`audio_pause_${section.id}`"
        ref="pause"
      ></Icon>
    </div>
    <div class="duration">
      Listen <br />
      <div :id="`duration_${section.id}`" :key="duration">
        {{ playTimer }}/{{ secondsToMinutes(duration) }}
      </div>
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
    default: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const id = props.section.id
const audio = props.section.fields.audio[0]
const visible = ref(false)
const audioDuration = ref(0)
const duration = ref(0)
const playTimer = ref(secondsToMinutes(0) || 0)
const playerStore = useAudioState
const emits = defineEmits(['isPlaying', 'visible', 'id'])
const isPlaying = ref(false)
defineExpose({ visible, isPlaying, id })

onMounted(setDuration)

async function setDuration() {
  const audioElement = document.getElementById(`audioFile_${props.section.id}`)
  audioElement.addEventListener('timeupdate', function (ev) {
    playTimer.value = secondsToMinutes(audioElement.currentTime)
  })
  audioElement.onloadedmetadata = () => {
    audioDuration.value = audioElement.duration
    duration.value = audioElement.duration

    const durationElement = document.getElementById(
      `duration_${props.section.id}`
    )

    durationElement.innerHTML = secondsToMinutes(audioElement.duration)
  }
}
function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.round(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

function playAudio(id, event) {
  const audioElement = document.getElementById(`audioFile_${id}`)
  if (audioElement.paused) {
    if (playerStore.currentlyPlaying) {
      stopAudio()
    }
    visible.value = true
    isPlaying.value = true
    audioElement.play()

    playerStore.currentlyPlaying = this || id.value
  } else {
    stopAudio()
  }
}

function stopAudio() {
  const id =
    playerStore.currentlyPlaying.id === undefined
      ? playerStore.currentlyPlaying
      : playerStore.currentlyPlaying.id
  const audioElement = document.getElementById(`audioFile_${id}`)
  isPlaying.value = false
  audioElement.pause()
  visible.value = false
  playerStore.currentlyPlaying = null
}
</script>

<style>
.iconVisible {
  visibility: visible;
}
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
@media (min-width: 769px) {
  .section-play.mobile-audio {
    display: none;
  }
}
@media (max-width: 768px) {
  .section-play {
    max-height: 0px;
    position: relative;
    z-index: 4;
    top: unset;
    display: flex;
    flex-direction: row;
    font-family: 'ibm-plex-mono', monospace;
    font-size: 13px;
    line-height: 18px;
    padding-bottom: 30px;
  }
  .section-play.full-audio {
    display: none;
  }
}
</style>

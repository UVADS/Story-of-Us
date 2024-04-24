<template>
  <div
    class="section-play"
    @click="playAudio(section.id, $event)"
    :key="`section_${section.id}${isResponsiveId()}`"
  >
    <div>
      <audio
        :id="`audioFile_${section.id}${isResponsiveId()}`"
        :src="audio.url"
      ></audio>
      <Icon
        icon="gridicons:play"
        height="50"
        width="50"
        class="icon-play icon"
        :id="`audio_play_${section.id}${isResponsiveId()}`"
        v-show="!visible"
        ref="play"
      ></Icon>
      <Icon
        icon="gridicons:pause"
        height="50"
        width="50"
        class="icon-pause icon"
        v-show="visible"
        :id="`audio_pause_${section.id}${isResponsiveId()}`"
        ref="pause"
      ></Icon>
    </div>
    <div class="duration">
      Listen <br />
      <div
        :id="`duration_${section.id}${isResponsiveId()}`"
        :key="`duration_${isResponsiveId()}`"
      >
        {{ playTimer }}/{{ duration }}
      </div>
      <div class="audio-progress">
        <progress
          :id="`audio_progress_${section.id}${isResponsiveId()}`"
          :value="timer"
          :max="floatDuration"
        ></progress>
      </div>
      <div class="audio-controls">
        <Icon
          icon="material-symbols-light:replay-10"
          height="35"
          width="35"
          class="icon-replay icon"
          :id="`audio_replay_${section.id}${isResponsiveId()}`"
          ref="rewind"
          @click=""
        ></Icon>

        <Icon
          icon="material-symbols-light:forward-10"
          height="35"
          width="35"
          class="icon-forward icon"
          :id="`audio_forward_${section.id}${isResponsiveId()}`"
          ref="forward"
          @click=""
        ></Icon>
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
  },
  isResponsive: {
    type: Boolean,
    default: false
  }
})

const id = props.section.id
const audio = props.section.fields.audio[0]
const visible = ref(false)
const duration = ref(secondsToMinutes(0))
const floatDuration = ref(0)
const playTimer = ref(secondsToMinutes(0)) || ref(0)
const timer = ref(0)
const playerStore = useAudioStore
const emits = defineEmits(['isPlaying', 'visible', 'id'])
const isPlaying = ref(false)
defineExpose({ visible, isPlaying, id })

onMounted(setDuration)

async function setDuration() {
  const audioElement = document.getElementById(
    `audioFile_${props.section.id}${isResponsiveId()}`
  )
  audioElement.onloadedmetadata = () => {
    floatDuration.value = audioElement.duration
    duration.value =
      secondsToMinutes(audioElement.duration) || audioElement.duration
    audioElement.addEventListener('timeupdate', function (ev) {
      timer.value = audioElement.currentTime
      playTimer.value = secondsToMinutes(audioElement.currentTime)
    })
    if (timer.value === floatDuration.value) {
      stopAudio()
    }
  }
  const durationElement = document.getElementById(
    `duration_${props.section.id}${isResponsiveId()}`
  )
  durationElement.innerHTML = playTimer.value + '/' + duration.value
}
function secondsToMinutes(seconds = 0) {
  if (seconds === 0 || seconds === '0:00') return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.round(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}
function isResponsiveId() {
  return props.isResponsive ? '_responsive' : ''
}
function playAudio(id, event) {
  if (
    event.target.id.includes('replay') ||
    event.target.id.includes('forward')
  ) {
    console.log(event.target.id)
    return moveAudioTimer(id, event)
  }
  const audioElement = document.getElementById(
    `audioFile_${id}${isResponsiveId()}`
  )
  if (audioElement.paused) {
    if (playerStore.currentlyPlaying) {
      stopAudio()
    }
    visible.value = true
    isPlaying.value = true
    audioElement.play()
    playerStore.currentlyPlaying = id
    playerStore.currentElement = audioElement
  } else {
    stopAudio()
  }
}

function getAudioElement() {
  return document.getElementById(`audioFile_${id}${isResponsiveId()}`)
}
function moveAudioTimer(id, event) {
  const audioElement = getAudioElement()
  let timeChange = 0
  if (event.target.id.includes('replay')) {
    timeChange = -10
  } else {
    timeChange = 10
  }
  audioElement.currentTime = audioElement.currentTime + timeChange
}
function stopAudio() {
  const id = playerStore.currentlyPlaying

  const audioElement = playerStore.currentElement
  isPlaying.value = false
  audioElement.pause()
  visible.value = false
  playerStore.currentlyPlaying = null
}
</script>

<style>
.audio-controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  z-index: 25;
}
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
  width: 240px;
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

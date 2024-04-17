<template>
  <div class="person-page">
    <div class="page-left">
      <div>
        <PersonHeader :person="person"></PersonHeader>
      </div>
      <div class="sections-list">
        <SectionFull
          v-for="(section, index) in personSections"
          :key="section.id"
          :id="`section_${section.id}`"
          ref="sections"
          class="section"
          :section="section"
          @close-others="closeAll(section.id)"
          :index="index"
        >
          <template v-slot:audioPlayer>
            <AudioPlayer
              :id="`audio_${section.id}`"
              v-if="hasAudio(section)"
              :section="section"
              ref="audioPlayers"
              :isResponsive="false"
              @click="audiodetails(section.id)"
              class="full-audio"
            ></AudioPlayer>
          </template>
          <template v-slot:audioPlayerMobile>
            <AudioPlayer
              :id="`audio_${section.id}_responsive`"
              v-if="hasAudio(section)"
              :isResponsive="true"
              :section="section"
              ref="audioPlayers"
              @click="audiodetails(section.id)"
              class="mobile-audio"
            ></AudioPlayer
          ></template>
        </SectionFull>
      </div>
    </div>
    <div class="page-right">
      <RightMenu :sections="personSections" :hide-years="true"></RightMenu>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTopicsStore } from '~/stores/topics'
const route = useRoute()
const store = usePeopleStore()
const { fetchPeople } = store
const { getPerson } = store
await store.fetchPeople()
const urlID = route.params.id
const people = store.getPeople

const id =
  people[people.findIndex((person) => titleUrl(person.name) === urlID)].id
const { data } = await useAPIFetch(`/api/person/${id}`, {
  key: route.params.id
})
let current = null
const sections = ref([])
const audioPlayers = ref([])
const person = data.value.person
const personSections = data.value.sections

function audiodetails(id) {
  audioPlayers.value.forEach((player) => {
    if (player.id !== id) player.visible = false
  })
}
function closeAll(id) {
  const sectionDetail = document.getElementById(`section_detail_${id}`)
  sections.value.forEach((section) => {
    //sectionDetail.classList.toggle('hidden')
    section.showDetails = false
    if (section.id === id) {
      sectionDetail.focus()
    }
  })
  nextTick(() => {
    const sectionDetail = document.getElementById(`section_detail_${id}`)
  })
  current = id
}
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
@media (max-width: 768px) {
  .person-page {
    .sections-list {
      display: flex;

      flex-direction: column;
      justify-content: space-evenly;
      width: 100%;
      max-width: 100%;
    }
    .page-left {
      max-width: unset;
      width: 100%;
    }
    .page-right {
      display: none;
    }
  }
}
</style>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { urlParams } from './components/utils'
import CreateQAPage from './components/CreateQAPage.vue'
import QuestionPage from './components/QuestionPage.vue'
import AnsweredPage from './components/AnsweredPage.vue'

const currentPage = ref<'createQA' | 'question' | 'answered'>('createQA')
provide('currentPage', currentPage)

onMounted(() => {
  if (urlParams.q && urlParams.correct && urlParams.wrong) {
    currentPage.value = 'question'
  }
})

function createNew(): void {
  currentPage.value = 'createQA'
  urlParams.q = ''
  urlParams.correct = ''
  urlParams.wrong = ''
}
</script>

<template>
  <button
    class="invisible-button"
    @click="createNew"
  >
    Невидимка
  </button>
  <CreateQAPage v-if="currentPage === 'createQA'" />
  <QuestionPage v-if="currentPage === 'question'" />
  <AnsweredPage v-if="currentPage === 'answered'" />
</template>

<style lang="scss">
body {
  background-color: $color-main;
}
</style>

<style scoped lang="scss">
.invisible-button {
  position: absolute;
  right: 1rem;
  top: 1rem;
  opacity: 0;
  padding: 0.25rem 0.5rem;
  border: 2px solid $color-pink;
  border-radius: 0.5rem;

  &:hover {
    opacity: 0.25;
    cursor: pointer;
  }
}
</style>

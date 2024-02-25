<script setup lang="ts">
import { inject } from 'vue'
import { urlParams } from './utils'

const currentPage = inject('currentPage')

function addValueToUrlParams(inputTarget: HTMLInputElement, paramName: 'q' | 'correct' | 'wrong') {
  urlParams[paramName] = inputTarget.value
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href)
  alert('Скопировано!')
}
</script>

<template>
  <div class="create">
    <div class="create__inputs-container">
      <div class="create__input-container">
        <label class="create__label">Чо спросить?</label>
        <input
          class="create__input"
          placeholder="Сюда вопрос"
          :value="urlParams.q"
          @input="(e: Event) => addValueToUrlParams(e.target as HTMLInputElement, 'q')"
        />
      </div>
      <div class="create__input-container">
        <label class="create__label">Верный ответ:</label>
        <input
          class="create__input"
          placeholder="Сюда ответ"
          :value="urlParams.correct"
          @input="(e: Event) => addValueToUrlParams(e.target as HTMLInputElement, 'correct')"
        />
      </div>
      <div class="create__input-container">
        <label class="create__label">Неверный ответ:</label>
        <input
          class="create__input"
          placeholder="Сюда не кликнет"
          :value="urlParams.wrong"
          @input="(e: Event) => addValueToUrlParams(e.target as HTMLInputElement, 'wrong')"
        />
      </div>
    </div>
    <div class="create__button-container">
      <button
        class="create__button"
        :disabled="!(urlParams.q && urlParams.correct && urlParams.wrong)"
        @click="(currentPage = 'question')"
      >
        Создать
      </button>
      <button
        class="create__button"
        :disabled="!(urlParams.q && urlParams.correct && urlParams.wrong)"
        @click="copyLink"
      >
        Копировать ссылку для друга
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__inputs-container {
    display: flex;
    gap: 1rem;
  }

  &__input-container {
    position: relative;
  }

  &__label {
    position: absolute;
    left: 0.75rem;
    top: -0.75rem;
    padding: 0px 0.5rem;
    color: $color-pink;
    border-radius: 1rem;
    border: 1px solid $color-pink;
    border-bottom: none;
    background-color: $color-main;
  }

  &__input {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: 2px solid $color-pink;
    cursor: text;
    color: $color-pink;
    font-size: 18px;
  }

  &__button-container {
    margin-top: 2rem;
    display: flex;
    gap: 0.5rem;
  }

  &__button {
    @extend %button;
  }
}
</style>

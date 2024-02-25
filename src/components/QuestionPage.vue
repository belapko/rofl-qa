<script setup lang="ts">
import { onMounted, ref, nextTick, inject } from 'vue'
import { urlParams } from './utils'

const currentPage = inject('currentPage')

const buttonPosition = ref<{ fromTop: number; fromLeft: number }>({ fromTop: 0, fromLeft: 0 })
const screenSize = ref<{ width: number; height: number }>({ width: 0, height: 0 })

const movableButtonRef = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  nextTick(() => {
    screenSize.value.width = window.innerWidth - 100 - (movableButtonRef.value?.offsetWidth ?? 0)
    screenSize.value.height = window.innerHeight - 100 - (movableButtonRef.value?.offsetHeight ?? 0)
  })
})

function generateRandomCords(): { left: number; top: number } {
  return {
    left: Math.floor(Math.random() * screenSize.value.width),
    top: Math.floor(Math.random() * screenSize.value.height),
  }
}

function setButtonCords(cords: ReturnType<typeof generateRandomCords>): void {
  buttonPosition.value.fromTop = cords.top
  buttonPosition.value.fromLeft = cords.left
}
</script>

<template>
  <div class="question">
    <img class="question__image" src="/question.jpg" />
    <p class="question__title">{{ urlParams.q.endsWith('?') ? urlParams.q : urlParams.q + '?' }}</p>
    <div class="question__buttons-container">
    <button class="question__button" @click="currentPage = 'answered'">{{ urlParams.correct }}</button>
    <button
      class="question__button"
      :class="{'question__button-movable': buttonPosition.fromLeft || buttonPosition.fromTop}"
      ref="movableButtonRef"
      :style="{ top: buttonPosition.fromTop + 'px', left: buttonPosition.fromLeft + 'px' }"
      @mouseover="setButtonCords(generateRandomCords())"
    >
      {{ urlParams.wrong }}
    </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.question {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__image {
    border-radius: 1rem;
  }

  &__title {
    font-size: 3rem;
    font-weight: 600;
    color: $color-pink;
  }

  &__buttons-container {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
  }

  &__button {
    @extend %button;

    &-movable {
      position: absolute;
      transition: all ease-in-out 0.1s;
      &:hover {
        cursor: not-allowed;
        background-color: $color-blue;
      }
    }
  }
}
</style>

<script setup lang="ts"></script>

<template>
  <div class="answered">
    <img
      class="answered__gif"
      src="/answered.gif"
    />
  </div>
</template>

<style scoped lang="scss">
.answered {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__gif {
    width: 500px;
    border-radius: 1rem;
    -webkit-animation: grow 2200ms ease;
  }

  @-webkit-keyframes grow {
    0% {
      -webkit-transform: scale(0.0001) rotateZ(360deg);
    }
    100% {
      -webkit-transform: scale(1) rotateZ(-360deg);
    }
  }
}

@media screen and (max-width: 425px) {
  .answered {
    padding: 0px 1rem;
    &__gif {
      width: 100%;
    }
  }
}
</style>

<template>
  <transition name="modal">
    <div v-if="showModal" class="fixed inset-0 flex justify-center items-center px-4 z-50">
      <!-- mask -->
      <div class="absolute inset-0 bg-black bg-opacity-50 -z-1" />
      <!-- panel -->
      <div class="w-full h-full flex py-6 overflow-auto" @click="onMaskClick">
        <div class="w-full lg:px-6 m-auto" :class="size" @click.stop>
          <slot name="panel">
            <div class="modal-panel w-full bg-white text-black rounded-3xl overflow-hidden">
              <!-- 标题 -->
              <div class="flex items-center relative px-6 py-4 min-h-10">
                <h1 v-if="title" class="lg:text-lg text-center">
                  {{ title }}
                </h1>

                <!-- 关闭按钮 -->
                <button v-if="closable" class="absolute right-6" @click="close">
                  <IconClose class="w-3.5 lg:w-4" />
                </button>
              </div>
              <!-- content -->
              <div class="relative overflow-hidden">
                <slot />
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    show: boolean
    title?: string
    closable?: boolean
    maskClosable?: boolean
    size?: string
    hideAll?: boolean
  }>(),
  {
    title: '',
    size: 'max-w-[30rem]'
  }
)
const emit = defineEmits<{ (event: 'update:show', show: boolean): void }>()

const showModal = computed({
  set(val: boolean) {
    emit('update:show', val)
  },
  get() {
    return props.show
  }
})

const toggleClass = () => {
  if (props.hideAll) {
    document.body.classList[props.show ? 'add' : 'remove']('overflow-hidden')
  }
}
// 控制 body 滚动条显示 / 隐藏
onMounted(() => {
  if (props.show) {
    toggleClass()
  }
})
onUnmounted(() => {
  toggleClass()
})
watch(
  () => props.show,
  () => {
    toggleClass()
  }
)
const close = () => {
  showModal.value = false
  // console.log('close modal', showModal.value)
}
const onMaskClick = () => {
  if (props.maskClosable) {
    close()
  }
}
</script>

<style lang="less">
// modal transition
.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}

.modal-enter-from .modal-panel {
  @apply transform translate-y-4;
}

.modal-leave-to .modal-panel {
  @apply transform -translate-y-4;
}

.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity duration-150 ease-in-out;

  .modal-panel {
    @apply transition-transform duration-150 ease-in-out;
  }
}
</style>

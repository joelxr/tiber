<template>
  <div class="flex">
    <button type="button" class="text-green-500">
      <div class="pointer-events-none flex items-center">
        <svg class="fill-current h-6 w-6" viewBox="0 0 24 24">
          <g>
            <g>
              <path
                d="M12,2C6.486,2,2,6.486,2,12c0,5.515,4.486,10,10,10s10-4.485,10-10C22,6.486,17.514,2,12,2z M12,20
			c-4.411,0-8-3.589-8-8s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z"
              />
              <polygon
                points="13,7 11,7 11,11 7,11 7,13 11,13 11,17 13,17 13,13 17,13 17,11 13,11"
              />
            </g>
          </g>
        </svg>
      </div>
    </button>
    <input
      type="text"
      class="block appearance-none leading-tight p-2 bg-gray-900 text-green-500 placeholder-green-500 focus:outline-none"
      placeholder="Adicionar item"
      @keypress.enter="newItem"
    />
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    return {
      newItem: (event) => {
        emit('new', event.target.value)
        event.target.value = ''
      },
    }
  },
}
</script>

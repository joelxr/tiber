<template>
  <div
    v-if="name === 'trash'"
    class="pointer-events-none flex items-center px-4"
  >
    <svg class="fill-current h-6 w-6" viewBox="0 0 24 24">
      <g>
        <path
          d="M5,20c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8H5V20z M7,10h10l0.001,10H7V10z"
        />
        <polygon points="15,5 15,3 9,3 9,5 3,5 3,7 21,7 21,5" />
        <rect x="9" y="12" width="2" height="6" />
        <rect x="13" y="12" width="2" height="6" />
      </g>
    </svg>
  </div>
  <div
    v-else-if="name === 'pencil'"
    class="pointer-events-none flex items-center px-2"
  >
    <svg class="fill-current h-6 w-6" viewBox="0 0 24 24">
      <g>
        <path
          d="M20.821,3.18c-0.761-0.76-1.771-1.178-2.847-1.178c-1.074,0-2.086,0.418-2.846,1.179L3.72,14.59
		c-0.128,0.128-0.22,0.289-0.263,0.464l-1.427,5.705c-0.084,0.34,0.016,0.702,0.264,0.948c0.247,0.249,0.608,0.349,0.949,0.264
		l5.705-1.427c0.175-0.043,0.336-0.135,0.464-0.263L20.82,8.872c0.76-0.76,1.178-1.772,1.179-2.846c0-1.076-0.418-2.087-1.179-2.847
		L20.821,3.18z M9.077,16.338l7.471-7.471l0.727,0.725l-7.955,7.955L9.077,16.338z M7.663,14.923l-1.209-0.241l7.956-7.955
		l0.725,0.726L7.663,14.923z M5.166,16.464l1.976,0.395l0.396,1.977l-3.163,0.791L5.166,16.464z M15.823,5.313l0.72-0.718
		c0.766-0.764,2.1-0.764,2.864,0l-0.002-0.001c0.765,0.765,0.765,2.099,0,2.864l-0.718,0.72L15.823,5.313z"
        />
      </g>
    </svg>
  </div>
  <div
    v-else-if="name === 'plus-circle'"
    class="pointer-events-none flex items-center px-4"
  >
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
  <div
    v-else-if="name === 'calendar'"
    class="pointer-events-none flex items-center px-4"
  >
    <svg class="fill-current h-6 w-6" viewBox="0 0 24 24">
      <g>
        <g>
          <path
            d="M21,3h-3V1h-2v6h2V5h3v15H3V5h2V3H3C1.896,3,1,3.896,1,5v15c0,1.104,0.896,2,2,2h18c1.104,0,2-0.896,2-2V5 C23,3.896,22.104,3,21,3z"
          />
          <polygon points="8,5 15,5 15,3 8,3 8,1 6,1 6,7 8,7" />
          <rect x="5" y="9" width="4" height="4" />
          <rect x="10" y="9" width="4" height="4" />
          <rect x="15" y="9" width="4" height="4" />
          <rect x="5" y="14" width="4" height="4" />
          <rect x="10" y="14" width="4" height="4" />
        </g>
      </g>
    </svg>
  </div>

  <div
    v-else-if="name === 'times'"
    class="pointer-events-none flex items-center px-4"
  >
    <svg class="fill-current h-6 w-6" viewBox="0 0 24 24">
      <g>
        <polygon
          points="20.707,4.707 19.293,3.293 12,10.586 4.707,3.293 3.293,4.707 10.586,12 3.293,19.293 
		4.707,20.707 12,13.414 19.293,20.707 20.707,19.293 13.414,12 	"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

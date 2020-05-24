<template>
  <LeftSidePanel>
    <template #header>
      <h1 class="m-0 px-4 py-1 text-3xl font-semibold">
        {{ task.description }}
      </h1>
    </template>

    <template #actions>
      <button
        type="button"
        class="text-gray-500 hover:text-blue-500"
        @click="state.edit = !state.edit"
      >
        <Icon size="sm" :name="state.edit ? 'file' : 'pencil'" />
      </button>
    </template>
    <template #content>
      <textarea
        v-if="state.edit"
        class="w-full h-full m-0 py-1 px-4 bg-gray-900 font-mono focus:outline-none"
        style="resize: none;"
        v-model="task.note"
        placeholder="Insira suas anotações aqui"
        @keypress.ctrl.enter.exact="state.edit = false"
      >
      </textarea>

      <div
        v-else
        class="markdown w-full h-full overflow-auto m-0 p-0 bg-gray-900"
        v-html="state.noteTemplate"
      >
      </div>
    </template>
  </LeftSidePanel>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItEmoji from 'markdown-it-emoji'
import markdownItContainer from 'markdown-it-container'
import hljs from 'highlight.js'
import Icon from './Icon.vue'
import LeftSidePanel from './LeftSidePanel.vue'

import 'highlight.js/styles/tomorrow-night-eighties.css'

export default {
  components: { LeftSidePanel, Icon },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props, context, a) {
    const markdownIt = MarkdownIt({
      html: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: 'language-',
      linkify: false,
      typographer: true,
      quotes: '“”‘’',
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>'
            )
          } catch (err) {
            console.log('highlight error')
          }
        }

        return (
          '<pre class="hljs"><code>' +
          markdownIt.utils.escapeHtml(str) +
          '</code></pre>'
        )
      },
    })

    markdownIt.use(markdownItEmoji)
    markdownIt.use(markdownItContainer, 'warning')
    markdownIt.use(markdownItContainer, 'info')
    markdownIt.use(markdownItContainer, 'danger')
    markdownIt.use(markdownItContainer, 'success')

    const state = reactive({
      edit: false,
      noteTemplate: computed(() => markdownIt.render(props.task.note)),
    })

    onMounted(() => {
      state.edit = !props.task.note
    })

    return {
      state,
    }
  },
}
</script>

<style lang="scss" scoped>
.markdown {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply mt-0 mb-2 font-semibold;
  }

  h1 {
    @apply text-4xl;
  }

  h2 {
    @apply text-3xl;
  }

  h3 {
    @apply text-2xl;
  }

  h4 {
    @apply text-xl;
  }

  h5 {
    @apply text-lg;
  }

  h6 {
    @apply text-base;
  }

  p {
    @apply mt-0 mb-2;
  }

  hr {
    @apply mx-0 my-4 opacity-25 border border-current bg-current;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ol,
  ul {
    @apply pl-8;
  }

  ol,
  ul,
  dl {
    @apply mt-0 mb-4;
  }

  ol ol,
  ul ul,
  ol ul,
  ul ol {
    @apply mb-0;
  }

  dt {
    @apply font-bold;
  }

  dd {
    @apply mb-2 ml-0;
  }

  blockquote {
    @apply bg-gray-800 border-l-2 border-gray-600 my-2 mx-2 p-2;
  }

  blockquote p {
    display: inline;
  }

  b,
  strong {
    @apply font-extrabold;
  }

  small {
    @apply text-xs;
  }

  mark {
    @apply p-1 bg-yellow-200;
  }

  sub,
  sup {
    @apply relative text-sm;

    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  a {
    @apply text-blue-500 underline;

    &:hover {
      @apply text-blue-300;
    }

    &:not([href]),
    &:not([href]):hover {
      color: inherit;
      text-decoration: none;
    }
  }

  pre,
  code,
  kbd,
  samp {
    @apply font-mono text-base;
  }

  pre {
    @apply block mt-0 mb-4 overflow-auto text-sm;

    code {
      font-size: inherit;
      color: inherit;
      word-break: normal;
    }
  }

  code {
    @apply text-sm text-pink-500 break-all;
  }

  a > code {
    color: inherit;
  }

  kbd {
    @apply px-2 py-1 text-sm text-white bg-gray-700 rounded;

    kbd {
      @apply p-0 text-base font-bold;
    }
  }

  %container {
    @apply border-l-8 text-black px-2 py-1 mx-2 my-4;
  }

  .warning {
    @extend %container;
    @apply border-yellow-600 bg-yellow-300;
  }

  .info {
    @extend %container;
    @apply border-blue-600 bg-blue-300;
  }

  .danger {
    @extend %container;
    @apply border-red-600 bg-red-300;
  }

  .success {
    @extend %container;
    @apply border-green-600 bg-green-300;
  }
}
</style>

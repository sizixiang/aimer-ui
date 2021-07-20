import { computed, toRefs } from 'vue'
export default {
  name: 'AimerInput',
  props: {
    type: String,
    disabled: {
      type: Boolean,
      default: false
    },
    readyOnly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, null, undefined],
      default: ''
    }
  },
  setup(props) {
    const type = computed(() => {
      const { type } = toRefs(props)
      return type.value
    })
    return() => {
      return (
        <div>
           <input
            type={type.value}
            class="aimer-input-inner"
           />
         </div>
      )
    }
  }
}
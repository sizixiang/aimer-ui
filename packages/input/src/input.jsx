import { ref, computed, toRefs } from 'vue'
export default {
  name: 'AimerInput',
  props: {
    // Base type, Input the following properties will apply
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readyOnly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    // Primary attributes
    maxLength: {
      type: [String, Number],
      default: ''
    },
    minLength: {
      type: [String, Number],
      default: ''
    },
    clearCache: Boolean,
    // If the input field type is equal to the password, it will not take effect
    showPassword: {
      type: Boolean,
      default: false
    },
    // If the input field type is equal to the textarea, it will not take effect
    rows: String,
    resize: {
      type: String,
      default: 'inherit' // Optional attribute: none / both / horizontal / vertical, default
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    // If the input field type is not equal to the textarea, It will not take effect
    size: {
      type: String,
      default: 'normal'  // Optional attribute: giant / big / normal / small / mini
    },
    prefixIcon: String,
    suffixIcon: String
  },
  setup(self) {
    const visiblePassword = ref(false)
    const attribute = computed(() => {
      let classNameInput = ''
      let [prefix, suffix] = ['', '']
      const { type: inputType, showPassword, rows, resize, showWordLimit,  maxLength, prefixIcon, suffixIcon} = toRefs(self)
      // size
      let type = ref(inputType.value)
      let attributeConfig = {}
      let attributeDiv = {}
      if (type.value === 'password') {
        if (showPassword) {
          classNameInput = 'is-show-password'
          suffix = <aimer-icon name="eye"/>
          type.value = !visiblePassword.value ? 'password' : 'text'
        }
      } else if (type.value === 'textarea') {
        attributeConfig = {
          rows: rows.value,
          resize: resize.value,
        }
        if (showWordLimit) {
          attributeDiv = {limit: `0/${maxLength || 0}`}
        }
      } else {
        // 11111
      }
      if (prefixIcon.value) { prefix = <aimer-icon name={prefixIcon.value}/> }
      if (suffixIcon.value) { suffix = <aimer-icon name={suffixIcon.value}/> }
      return {
        attributeInput: { type: type.value, ...attributeConfig },
        attributeDiv: {...attributeDiv},
        classNameInput,
        suffix,
        prefix
      }
    })
    const attr = attribute.value
    return() => {
      return (
        <div
          class="aimer-form-item-input"
         {...attr.attributeDiv}
        >
          { attr.prefix }
           <input
            {...attr.attributeInput}
            class={`aimer-input-inner ${attr.classNameInput}`}
           />
           { attr.suffix }
         </div>
      )
    }
  }
}
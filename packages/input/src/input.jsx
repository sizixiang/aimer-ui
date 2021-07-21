import { computed, toRefs, ref, watchEffect } from 'vue'
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
    readonly: {
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
      default: 'inherit' // Optional attribute: none / both / horizontal / vertical, default value is inherit
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
  setup(prop) {
    const showPasswordFlag = ref(false)
    const prefix = ref('')
    const suffix = ref('')
    const attributeInput = computed(() => {
      const { type, value, maxLength, minLength, readonly, disabled } = toRefs(prop)
      // prefixIcon, suffixIcon, size
      let className = ''
      let attributeObj = {}
      if (disabled.value) {
        className += ' aimer-input_disabled'
        attributeObj.disabled = disabled.value
      } else if (readonly.value) {
        className += ' aimer-input_readonly'
        attributeObj.readonly = readonly.value
      }
      return {
        type: type.value,
        value: value.value,
        maxLength: maxLength.value,
        minLength: minLength.value,
        class: className,
        ...attributeObj
      }
    })

    watchEffect(() => {
      const { type, showPassword, suffixIcon, prefixIcon } = toRefs(prop)
      if (type.value === 'password' && showPassword.value) {
        showPasswordFlag.value = false
        suffix.value = 'eye'
      } else if (suffixIcon.value || prefixIcon.value) {
        prefix.value = prefixIcon.value
        suffix.value = suffixIcon.value
      }
    })

    const handlerIcon = () => {
      showPasswordFlag.value = !showPasswordFlag.value
      suffix.value = showPasswordFlag.value ? 'eye-close' : 'eye'
    }

    return() => (
      <div class="aimer-input">
        {
          prefix.value
          ? <span class="aimer-input-icon aimer-input-icon_prefix"><aimer-icon name={prefix.value}/></span>
          : ''
        }
        <input
          class={`aimer-input_inner`}
          {...attributeInput.value}
        />
        {
          suffix.value
          ? <span
              class={`aimer-input-icon aimer-input-icon_suffix`}
            >
              <aimer-icon
                name={suffix.value}
                onclick={attributeInput.value.type === 'password' && handlerIcon}
              />
           </span>
          : ''
        }
      </div>
    )
  }
}

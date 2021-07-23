import { computed, toRefs, ref, watchEffect } from 'vue'
// import { indexOf } from '../../utils/lib'
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
      default: 'large'  // Optional attribute: giant / large / medium / small / mini
    },
    prefixIcon: String,
    suffixIcon: String,
    modelValue: String
  },
  setup(prop, ctx) {
    console.log('attr: ', ctx);
    console.log(prop, ':::prop')
    const showPasswordFlag = ref(false)
    const prefix = ref('')
    const suffix = ref('')
    const attributeInput = computed(() => {
      const { type, value, maxLength, minLength, readonly, disabled } = toRefs(prop)
      // prefixIcon, suffixIcon, size
      const attributeObj = ref({})
      if (disabled.value) {
        attributeObj.value.disabled = disabled.value
      } else if (readonly.value) {
        attributeObj.value.readonly = readonly.value
      }

      return {
        type: type.value,
        value: value.value,
        maxLength: maxLength.value,
        minLength: minLength.value,
        ...attributeObj.value,
        onkeyup: (e) => handlerChange(e)
      }
    })

    const attributeDiv = computed(() => {
      const { type, readonly, disabled, size } = toRefs(prop)
      const className = ref([])
      if (type.value !== 'textarea' && size.value !== 'large') {
        className.value.push(`aimer-input-${size.value}`)
      }
      if (disabled.value) {
        className.value.push('is-disabled')
      } else if (readonly.value) {
        className.value.push('is-readonly')
      }
      return {
        class: className.value
      }
    })

    const handlerChange = (event) => {
      attributeInput.value.value = event.target.value
    }

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
      const booleanVal = showPasswordFlag.value
      attributeInput.value.type = booleanVal ? 'password' : 'text'
      suffix.value = booleanVal ? 'eye' : 'eye-close'
      showPasswordFlag.value = !booleanVal
    }

    return() => (
      <div
        class={`aimer-input`}
        {...attributeDiv.value}
      >
        {
          prefix.value
          ? <span class="aimer-input-icon aimer-input-icon_prefix"><aimer-icon name={prefix.value}/></span>
          : ''
        }
        <input
          class={`aimer-input_inner`}
          {...attributeInput.value}
          class={''}
        />
        {
          suffix.value
          ? <span
              class={`aimer-input-icon aimer-input-icon_suffix`}
            >
              <aimer-icon
                name={suffix.value}
                onclick={prop.showPassword && handlerIcon}
              />
            </span>
          : ''
        }
      </div>
    )
  }
}



import { h, toRefs } from 'vue'

export default {
  name: 'AimerForm',
  props: {
    class: {
      type: String,
      default: ''
    },
    // main key
    id: {
      type: String,
      default: ''
    }
  },
  render(self) {
    const { class: className, id } = toRefs(self)
    return h(
      'div',
      {
        key: `${id.value}From`,
        'class': `aimer-form ${className.value}`
      },
      self.$slots.default()
    )
  }
}
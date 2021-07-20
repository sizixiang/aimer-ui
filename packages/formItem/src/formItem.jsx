import { toRefs } from 'vue'

export default {
  name: 'AimerFormItem',
  inject: ['aimerForm'],
  props: {
    label: String,
    prop: String,
    labelWidth: [Number, String]
  },
  render(self) {
    const { labelWidth } = toRefs(self)
    let style = {}
    if (labelWidth.value) {
      style = { width: labelWidth.value }
    }
    return (
      <div class="aimer-form-item">
        <label style={style} class="aimer-form-item-label">
          {self.label}
        </label>
        {
          self.$slots.default
          ? self.$slots.default()
          : self.$slots
        }
      </div>
    )
  }
}
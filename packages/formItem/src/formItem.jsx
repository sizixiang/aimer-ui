import { toRefs, computed, ref } from 'vue'

export default {
  name: 'AimerFormItem',
  inject: ['aimerForm'],
  props: {
    label: String,
    prop: String,
    labelWidth: [Number, String]
  },
  setup(props, { slots }) {
    const attribute = computed(() => {
      const { labelWidth, label } = toRefs(props)
      const style = ref({})
      if (labelWidth.value) {
        style.value = { width: labelWidth.value }
      }
      return {
        style: style.value,
        label: label.value,
        slots: slots.value
      }
    })
    return { ...attribute.value }
  },
  render() {
    return (
      <div class="aimer-form-item">
        <label style={this.style} class="aimer-form-item-label">
          {this.label}
        </label>
        {
          this.$slots.default
          ? this.$slots.default()
          : this.$slots
        }
      </div>
    )
  }

}
import { toRefs, computed, ref, inject, provide } from 'vue'
// import { indexOf } from '../../utils/lib'
export default {
  name: 'AimerFormItem',
  provide: {
    'aimerFormItem': this
  },
  props: {
    label: String,
    prop: String,
    labelWidth: [Number, String]
  },
  setup(props, { slots }) {
    const aimerForm = inject('aimerFormAttr')
    const attribute = computed(() => {
      const { labelWidth, label } = toRefs(props)
      const w = aimerForm.labelWidth
      const style = ref({})
      const controlStyle = ref({})
      if (labelWidth.value || w) {
        let width = (labelWidth.value || w).replace(/px/g, '')
        style.value = { width: width + 'px' }
        controlStyle.value = { marginLeft: width + 'px' }
      }
      return {
        style: style.value,
        label: label.value,
        controlStyle: controlStyle.value
      }
    })
    provide('aimerFormItemAttr', {...attribute.value })
    return { ...attribute.value, slots: slots.value }
  },
  render() {
    return (
      <div class="aimer-form-item clearfix">
        <label style={this.style} class="aimer-form-item-label">
          {this.label}
        </label>
        <div class="aimer-form-item_control" style={this.controlStyle}>
          {
            this.$slots.default
            ? this.$slots.default()
            : this.$slots
          }
        </div>
      </div>
    )
  }

}
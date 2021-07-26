import { toRefs, computed } from 'vue'
import { prefix, prefixLowerCase } from '../../utils/config/prefix'

export default {
  name: prefix + 'Col',
  props: ['col'],
  setup(props, { slots }) {
    const attribute = computed(() => {
      const { col } = toRefs(props)
      // judge col argument is Number<string>`
      // 判断参数col是否是数字<字符串数字>
      const flag = Boolean((+col.value))
      if (!flag) {
        throw new Error('! The col argument takes a string number or a number ')
      }
      return {
        col,
        flag,
        slots
      }
    })
    return {...attribute.value}
  },
  render() {
    return (
      this.flag
      ? <div class={`${prefixLowerCase}-col ${prefixLowerCase}-col-${this.col}`}>
        <div class={`${prefixLowerCase}-col-item`}>
          {
            this.slots.default
            ? this.slots.default()
            : this.slots
          }
        </div>
      </div>
      : null
    )
  }
}
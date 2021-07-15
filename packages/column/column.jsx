import { toRefs } from 'vue'

export default {
  name: 'AimerCol',
  props: ['col'],
  render(self) {
    const { col } = toRefs(this)
    // judge col argument is Number<string>`
    const flag = Boolean((+col.value))
    if (!flag) {
      throw new Error('! The col argument takes a string number or a number ')
    }
    let template = null
    if (flag) {
      template = (
        <div class={`aimer-col aimer-col-${col.value}`}>
          <div class={`aimer-col-item`}>
            {
              self.$slots.default
              ? self.$slots.default()
              : self.$slots
            }
          </div>
        </div>
      )
    }
    return template
  }
}
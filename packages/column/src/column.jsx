import { toRefs, computed } from 'vue'

export default {
  name: 'AimerCol',
  props: ['col'],
  setup(props, { slots }) {
    const attribute = computed(() => {
      const { col } = toRefs(props)
      // judge col argument is Number<string>`
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
      ? <div class={`aimer-col aimer-col-${this.col}`}>
        <div class="aimer-col-item">
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
import { toRefs, h } from 'vue'

export default {
  name: 'AimerCol',
  props: ['col'],
  render() {
    console.log(123123123)
    const { col } = toRefs(this)
    console.log('col: ', col);
    console.log('col.value: ', +col.value);
    // judge col argument is Number<string>
    const flag = Boolean((+col.value))

    console.log('flag: ', flag);
    if (!flag) {
      throw new Error('! The col argument takes a string number or a number ')
    }
    let template = null
    if (flag) {
      template = h(
        'div',
        {
          'class': `aimer-col-${col.value}`
        }
      )
    }
    return template
  }
}

import { toRefs } from 'vue'

export default {
  name: 'AimerForm',
  props: {
    class: {
      type: String,
      default: ''
    },
    // major key
    id: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => [
        {
          prop: 'a1',
          label: 'a1'
        },
        {
          prop: 's2',
          label: 'a2'
        },
        {
          prop: 's3',
          label: 'a3'
        }
      ]
    }
  },
  render(self) {
    const { class: className, id, data } = toRefs(self)
    // Set default value, To prevent error
    let template = null
    // Detection slots is empty
    // If slots is empty, Use array As a template
    // If slots and data is all Not empty, Will take slots and data common use as a template
    if ((self.$slots && self.$slots.default) && data.value.length) {
      template = bothTemplate(self.$slots.default(), data.value)
    } else if(self.$slots.default) {
      console.log(1)
    } else if (data.value.length) {
      console.log(2)
    }
    return (
      <div key={`${id.value}From`} class={`aimer-form ${className.value}`}>
        {template}
      </div>
    )
  }
}

// If both exist, As a data first render
// Each data, If slot there are params.linkLabel, This slot is inserted after the data loop
const bothTemplate = (vNode, data) => {
  let template = []

  let vNodeLen = vNode.length
  let dataLen = data.length
  // find slots params.linkLabel
  const hashMap = {}
  // Unordered slots
  const disorderly = []
  for (let i = 0; i < vNodeLen; i++) {
    const label = vNode[i].props.linkLabel
    if (label) {
      hashMap[label] = vNode[i]
    } else {
      disorderly.push(vNode[i])
    }
  }
  let KEY = 0
  for (let i = 0;i < dataLen ; i++) {
    const { label, col } = data[i]
    if (hashMap[label]) {
      console.log(label)
      template.push(
        createElement({ label, KEY, col })
      )
      console.log('hashMap[label]: ', hashMap[label]);
      KEY += 1
      // Prevent too many props to be set
      delete hashMap[label].props.linkLabel
      hashMap[label].key = `form-item-${KEY}`
      template.push(hashMap[label])
    } else {
      template.push(
        <aimer-col col={col || '24'} key={`form-item-${KEY}`}>
          { label }
        </aimer-col>
      )
      console.log(data[i], 'data[i]')
    }
    KEY += 1
  }
  template = [...template, ...disorderly]
  console.log('template: ', template);
  return ( template )
}



const createElement = ({col, KEY, label}) => {
  return (
    <aimer-col col={col || '24'} key={`form-item-${KEY}`}>
      { label }
    </aimer-col>
  )
}
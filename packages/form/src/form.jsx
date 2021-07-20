
import { toRefs } from 'vue'
import { isSymbol } from '../../utils/lib'

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
          type: 'text',
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
  provide() {
    return {
      aimerForm: this
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
      // createSlotsTemplate(self.$slots.default())
      template = self.$slots.default()
    } else if (data.value.length) {
      console.log(2)
      console.log(data.value)
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
  // Preventing annotations is also considered a combination of the two, by determining whether Symbol is commented or not
  // find slots params.linkLabel
  const hashMap = {}
  // Unordered slots
  const disorderly = []
  for (let i = 0; i < vNodeLen; i++) {
    if (!isSymbol(vNode[i].type)) {
      const label = vNode[i].props.linkLabel
      if (label) {
        hashMap[label] = vNode[i]
      } else {
        disorderly.push(vNode[i])
      }
    }
  }
  let KEY = 0
  for (let i = 0;i < dataLen ; i++) {
    const { label, col, ...props } = data[i]
    if (hashMap[label]) {
      template.push( createElement({ label, KEY, col, ...props }) )
      KEY += 1
      // Prevent too many props to be set
      delete hashMap[label].props.linkLabel
      hashMap[label].key = `form-item-${KEY}`
      template.push(hashMap[label])
    } else {
      template.push( createElement({ label, KEY, col, ...props}) )
    }
    KEY += 1
  }
  template = [...template, ...disorderly]
  return ( template )
}

const createElement = ({col, KEY, label, ...props}) => {
  return (
    <aimer-col col={col || '24'} key={`form-item-${KEY}`}>
      <aimer-form-item {...props} label={label}>
        { createInput(props.type || 'text')(props) }
      </aimer-form-item>
    </aimer-col>
  )
}

const createInput = (type) => {
  const inputType = {
    text: function(props) {
      return (<aimer-input type={props.type || 'text'}/>)
    },
    dellProps: function(props) {
      return inputType[type](props)
    }
  }
  return (props) => inputType.dellProps(props)
}

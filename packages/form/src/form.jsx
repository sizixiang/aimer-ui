
import { toRefs, computed } from 'vue'
import { isSymbol, generatingRandom } from '../../utils/lib'

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
  setup(prop, { slots }) {
    // const { data } =
    const attribute = computed(() => {
      const { class: className, id } = toRefs(prop)
      // let template = null
      return { id: id.value, className: className.value }
    })
    const template = computed(() => {
      const { data } = toRefs(prop)
      let template = null
      // Detection slots is empty
      // If slots is empty, Use array As a template
      // If slots and data is all Not empty, Will take slots and data common use as a template
      if ((slots && slots.default) && data.value.length) {
        template = bothTemplate(slots.default(), data.value)
      } else if(slots.default) {
        template = slots.default()
      } else if (data.value.length) {
        //  1111
      }
      return template
    })
    return {
      template: template.value,
      ...attribute.value
    }
  },
  render() {
    return (
      <div key={`${this.id}From`} class={`aimer-form ${this.className}`}>
        {this.template}
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

  for (let i = 0;i < dataLen ; i++) {
    const { label, col, ...props } = data[i]
    if (hashMap[label]) {
      template.push( createElement({ label, key: generatingRandom()[0], col, ...props, }) )
      // Prevent too many props to be set
      delete hashMap[label].props.linkLabel
      hashMap[label].key = `form-item-${generatingRandom()[0]}`
      template.push(hashMap[label])
    } else {
      template.push( createElement({ label, key: generatingRandom()[0], col, ...props}) )
    }
  }
  template = [...template, ...disorderly]
  return ( template )
}

const createElement = ({col, key, label, ...props}) => {
  return (
    <aimer-col col={col || '24'} key={`form-item-${key}`}>
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

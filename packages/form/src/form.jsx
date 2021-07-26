
import { toRefs, computed, provide, ref } from 'vue'
import { isSymbol, generatingRandom } from '../../utils/lib'
import { prefix, prefixLowerCase } from '../../utils/config/prefix'

export default {
  name: prefix + 'Form',
  props: {
    class: {
      type: String,
      default: ''
    },
    // major key
    // 主键
    id: {
      type: String,
      default: ''
    },
    labelWidth: [String, Number],
    data: {
      type: Array,
      default: () => [
        {
          type: 'text',
          prop: 'a1',
          label: 'a1',
          readonly: true,
          size: 'mini'
        },
        {
          type: 'password',
          prop: 's2',
          label: 'a2',
          showPassword: true,
          size: 'medium'
        },
        {
          prop: 's3',
          label: 'a3',
          disabled: true,
          prefixIcon: 'login',
          size: 'giant'
        },
        {
          prop: 's4',
          label: 'a4',
          disabled: true,
          prefixIcon: 'login',
          size: 'small'
        }
      ],
    },
    model: {
      type: Object,
      default:() => ({})
    }
  },
  setup(prop, { slots, emit }) {
    console.log('emit: ', emit);
    const id = ref(prop.id)
    const className = ref(prop.className)
    const attribute = computed(() => {
      const { labelWidth } = toRefs(prop)
      return { labelWidth: labelWidth.value || '' }
    })

    const template = computed(() => {
      const { data } = toRefs(prop)
      let template = null
      // Detection slots is empty
      // If slots is empty, Use array As a template
      // If slots and data is all not empty, Will take slots and data common use as a template

      // 检测插槽是否为空
      // 如果插槽为空，则使用array作为模板
      // 如果插槽和data都不为空，将以插槽和data为常用模板
      if ((slots && slots.default) && data.value.length) {
        template = bothTemplate(slots.default(), data.value)
      } else if(slots.default) {
        template = slots.default()
      } else if (data.value.length) {
        //  1111
      }
      return template
    })
    provide('aimerFormAttr', attribute.value)
    return() => (
      <div key={`${id.value}From`} class={`${prefixLowerCase}-form ${className.value}`}>
        {template.value}
      </div>
    )
  }
}

// If both exist, As a data first render
// 如果两个都存在的话, 以data做为模板, 先渲染
// Each data, If slot there are params.linkLabel, This slot is inserted after the data loop
// 循环data数据的时候, 如果插槽上存在参数linkLabel, 检测到循环data的label一致的加入到后面把这个插槽数据
const bothTemplate = (vNode, data) => {
  let template = []
  let vNodeLen = vNode.length
  let dataLen = data.length
  // Preventing annotations is also considered a combination of the two, by determining whether Symbol is commented or not
  // 插槽循环通过判断类型是否为symbol来判断是否已经被注释了, 防止在循环的时候, 把注释也添加进去
  // find slots params.linkLabel
  // 找到所有插槽是否有参数linkLabel
  const hashMap = {}
  // Unordered slots
  // 没有参数linkLabel的插槽数据
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
      // 防止在标签上出现过多的属性
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
      return (<aimer-input type={props.type || 'text'} {...props}/>)
    },
    password: function(props) {
      return (<aimer-input type={props.type} {...props}/>)
    },
    dellProps: function(props) {
      return inputType[type](props)
    }
  }
  return (props) => inputType.dellProps(props)
}

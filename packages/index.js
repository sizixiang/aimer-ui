import AimerButton from "./button"
import AimerSelect from "./select"
import AimerIcon from "./icon"
import AimerForm from './form'
import AimerCol from './column'
import AimerFormItem from './formItem'
import AimerInput from './input'

import './style/common.less'

const components = [
    AimerButton,
    AimerSelect,
    AimerIcon,
    AimerForm,
    AimerFormItem,
    AimerCol,
    AimerInput
]

const install = Vue => {
    if (install.installed) return
    install.installed = true
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
}

import AimerButton from "./button"
import AimerIcon from "./icon"
import AimerForm from './form'
import AimerCol from './column'

import './style/common.less'

const components = [
    AimerButton,
    AimerIcon,
    AimerForm,
    AimerCol
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
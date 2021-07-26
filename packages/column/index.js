import Col from './src/column'
Col.install = Vue => {
    Vue.component(Col.name, Col)
}
export default Col
import { computed } from 'vue'
export default{
    name: 'AimerSelect',
    props: {
        mode: {
            type: String,
            default: 'default' // default tag
        }
    },
    setup() {
        const defaultAimerBtnClass = `aimer-select`
        const classes = computed(() => {
            return{
                [defaultAimerBtnClass]: true,
            }
        })
        const selectProps = {
            class: [
                classes.value
            ]
        }
        const selectNode = (
            <div {...selectProps}></div>
        )
        return selectNode
    }
}
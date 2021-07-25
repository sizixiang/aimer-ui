import { computed } from 'vue'
import { prefixLowerCase, prefix } from '~/utils/config/prefix'
export default{
    name: `${prefix}Select`,
    props: {
        mode: {
            type: String,
            default: 'default' // default tag
        }
    },
    setup() {
        const defaultAimerBtnClass = `${prefixLowerCase}-select`
        const classes = computed(() => {
            return{
                [defaultAimerBtnClass]: true
            }
        })
        const selectProps = {
            class: [
                classes.value
            ]
        }
        const iconNode = () => {
            const iconProps = {
                class: [
                    `icon-down`
                ]
            }
            return (
                <i {...iconProps}></i>
            )
        }
        console.log(selectProps)
        const selectNode = (
            <div {...selectProps}>
                <div class={`${defaultAimerBtnClass}-value`}>
                    <span></span>
                </div>
                <div class={`${defaultAimerBtnClass}-icon`}>
                    {iconNode()}
                </div>
            </div>
        )
        return () => {
            return selectNode
        }
    }
}
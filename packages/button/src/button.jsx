import { computed, toRefs } from 'vue'
export default {
    name: 'AimerButton',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        icon: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { slots, attrs }) {
        const classes = computed(() => {
            const { type,loading } = toRefs(props)
            const defaultAimerBtnClass = `aimer-btn`
            return {
                [defaultAimerBtnClass]: true,
                [`${defaultAimerBtnClass}-${type.value}`]: type.value,
                [`${defaultAimerBtnClass}-loading`]: loading.value
            }
        })

        return () => {
            const { disabled } = toRefs(props)
            const { loading, icon } = props
            let iconNode = ''
            const buttonProps = {
                ...attrs,
                disabled: disabled.value,
                class: [
                    classes.value,
                    attrs.class
                ]
            }
            if(loading || icon){
                iconNode = (<i class={loading ? `icon-loading` : `icon-${icon}`}></i>)
            }

            const buttonNode = (
                <button {...buttonProps}>
                    {iconNode}
                    {slots.default?.()}
                </button>
            )
            return buttonNode
        }
    }
}
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
    slots: ['icon'],
    setup(props, { slots, attrs }) {
        const classes = computed(() => {
            const { type } = toRefs(props)
            const defaultAimerBtnClass = `aimer-btn`
            return {
                [defaultAimerBtnClass]: true,
                [`${defaultAimerBtnClass}-${type.value}`]: type.value
            }
        })

        return () => {
            const { disabled } = toRefs(props)
            console.log(attrs)
            const buttonProps = {
                ...attrs,
                disabled: disabled.value,
                class: [
                    classes.value,
                    attrs.class
                ]
            }

            const buttonNode = (
                <button {...buttonProps}>
                    {slots.default?.()}
                </button>
            )
            return buttonNode
        }
    }
}
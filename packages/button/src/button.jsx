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
        }
    },
    slots: ['icon'],
    render() {
        const classes = computed(() => {
            const { type } = toRefs(this)
            return {
                [`aimer-btn`]: `aimer-btn`,
                [`aimer-${type.value}`]: type.value
            }
        })

        const buttonProps = {
            class: [
                classes.value
            ]
        }

        const buttonNode = (
            <button {...buttonProps}>
                {this.$slots.default?.()}
            </button>
        )
        return buttonNode
    }
}
export default {
    name: 'AimerIcon',
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    emits: {
      click: null
    },
    setup(props, ctx){
        return () => {
            const iconProps = {
                class: [
                    `icon-${props.name}`
                ],
                onClick: () => {
                  console.log(props)
                  ctx.emit('click')
                }
            }
            return (
                <i {...iconProps}></i>
            )
        }
    }
}
export default {
    name: 'AimerIcon',
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    setup(props){
        return () => {
            const iconProps = {
                class: [
                    `icon-${props.name}`
                ]
            }
            return (
                <i {...iconProps}></i>
            )
        }
    }
}
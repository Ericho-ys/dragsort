<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        index: {
            type: Number,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
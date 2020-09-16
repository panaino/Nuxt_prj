<template>
    <div>
        <label :for="inputTextInfo.tagId">{{ inputTextInfo.text }}</label>
        <input type="text" :id="inputTextInfo.tagId" :list="inputTextInfo.list" v-model="text" @change="$emit('change-text', text)">
    </div>
</template>

<script>
export default {
    props:['inputTextInfo'],
    data() {
        return {
            text:""
        }
    }
}
</script>
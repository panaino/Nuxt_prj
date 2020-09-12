<template>
    <div>
        <label :for="inputTextInfo.tagId">{{ inputTextInfo.text }}</label>
        <input :id="inputTextInfo.tagId" type="text">
    </div>
</template>

<script>
export default {
    props:['inputTextInfo']
}
</script>
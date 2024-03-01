<template>

</template>

<script>
    export default {
        name: "logout",
        mounted() {
            /*if(ap){
                ap.showLoading();
            }*/
            let query = this.$route.query;
            localStorage.clear();
            setTimeout(()=>{
                if(ap){
                    ap.hideLoading();
                }
                this.$router.push({name:'login',query:query})
            },300)
        }
    }
</script>

<style scoped>

</style>
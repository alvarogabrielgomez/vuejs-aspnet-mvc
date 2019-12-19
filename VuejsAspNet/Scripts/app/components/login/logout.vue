<template>

        <div id="main-login-container">
            <!--<router-link to="/home">Home</router-link>-->

            <div id="main-login">
                <transition name="fade">
                    <div id="loading-overlay">
                        <div class="loader-small-container">
                            <div class="loader-small">Loading...</div>
                        </div>
                    </div>
                </transition>
            </div>

        </div>

       
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'logout-index',
        data() {
            return {
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },
        created() {
            // reset login status
            
            this.logout();
        },
        updated() {

        },
        methods: {
            ...mapActions('account', ['login', 'logout']),
        }
    }
</script>
<style lang="scss" scoped>
    #main-login-container {
        display: flex;
        min-height: 70vh;
        width: 100%;
        margin: auto;
        max-width: 1000px;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
        box-sizing: border-box;
    }
    #main-login {
        width: 100%;
        height: 65vh;
        min-width: 200px;
        max-width: 377px;
        border: 1px solid #eaeced;
        overflow: hidden;
        min-height: 109px;
        padding: 10px 10px 55px;
        background-color: #fff;
        margin: auto;
        border-radius: 5px !important;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        align-items: center;
    }
</style>
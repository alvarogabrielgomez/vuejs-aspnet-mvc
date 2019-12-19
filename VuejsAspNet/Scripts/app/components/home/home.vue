<template>  
        <dashboard-layout :bus="bus"></dashboard-layout>       
</template>
<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex'
    import { router } from '../../helpers';

    export default {
        name: 'home-index',
        props: {
            userdata: {
                //required: true,
            }
        },
        data() {
            return {
                bus: new Vue()
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        created() {
            this.getAllDataUser();
        },
        methods: {
            ...mapActions('users', {
                getAllDataUser: 'getAllDataUser',
                //deleteUser:'delete'
            }),

            shortcuts: function (ctrl, key) {
                if (!ctrl && key == "F2") {
                    router.push('/logout');
                }
                if (!ctrl && (key == "m" || key == "M")) {
                    var focused = document.activeElement;
                    if (focused == document.body) { // Revisamos si algun boton o input no esta focus
                        this.bus.$emit('hideSidebarToggle');
                    }
                }
            }
        },
        mounted() {
            let _this = this; 
            window.addEventListener('keyup', function (ev) {
                _this.shortcuts(ev.ctrlKey, ev.key);
            });
        }
    }
</script>
<style lang="css" scoped>
    #main-container {
        display: flex;
        position: relative;
        flex-direction: column;
        flex-wrap: nowrap;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
</style>
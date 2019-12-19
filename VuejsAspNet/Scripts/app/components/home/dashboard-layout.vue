<template>

    <div id="dashboard-clipper">
        <div style="display:none;">
            {{ idle }}
        </div>
        <div id="dashboard-action-bar">
            <div id="btn-show-menu" class="btn-action-bar btn-action-icon" @click='hideSidebarToggle()'><i class="fas fa-bars"></i></div>
            <div id="user-data-container">
                <div id="user-sigla">{{account.user.SIGLA}}</div>
                <div id="user-NOMBRE">Operador: {{account.user.NOMBRE}}</div>
            </div>
            <router-link to="/logout" id="btn-logout" class="btn-action-bar btn-action-primary red" tabindex="-2">Sair do Operador (F2)</router-link>
        </div>
        <div id="main-container" class="dashboard-container">
            <dialog id="sidebar-dashboard" v-bind:class="{'sidebar-detached-hide': hideSidebar}">
                <nav class="sidebar-menu">
                    <ul>
                        <li>

                            <a id="link1" href="#" v-on:click="changeModulo(1); hideSidebarToggle()" tabindex="10">
                                <div class="sidebar-icon"><i class="fas fa-search"></i></div>
                                <div class="sidebar-label">Ficha Produção</div>
                            </a>
                            <div class="sidebar-menu-hover"></div>
                        </li>
                        <li>
                            <a id="link2" href="#" v-on:click="changeModulo(2); hideSidebarToggle()" tabindex="11">
                                <div class="sidebar-icon"><i class="fas fa-clock"></i></div>
                                <div class="sidebar-label">Historico Apontamento</div>
                            </a>
                            <div class="sidebar-menu-hover"></div>
                        </li>
                    </ul>
                </nav>
            </dialog>
            <div id="dashboard-main" class="dashboard-main" v-bind:class="{'main-dashboard-fullsize': hideSidebar, 'main-dashboard-spacesidebar':!hideSidebar}">

                <transition name="fade">
                    <div class="card-dashboard" v-if="modulo == 1">
                        <dashboard-ficha></dashboard-ficha>
                    </div>
                </transition>

                <transition name="fade">

                    <dashboard-historico v-if="modulo == 2"></dashboard-historico>

                </transition>


            </div>
        </div>
    </div>



</template>
<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex'
    import IdleVue from 'idle-vue';
    const eventsHub = new Vue()
    const options = {
        eventEmitter: eventsHub,
        idleTime: 25000
    };

    Vue.use(IdleVue, options)

    export default {
        name: 'dashboard-layout',
        props: ['bus'],
        data() {
            return {
                loadingMss: false,
                modulo: 1,
                hideSidebar: true,
                configmodule: 1,
                idle:false
            }
        },
        onIdle() {
            this.idle = true;
            this.logout();
        },
        onActive() {
            this.idle = false;
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },
        updated() {
            if (this.hideSidebar) {
                return;
            }
        },
        mounted() {
            this.bus.$on('hideSidebarToggle', this.hideSidebarToggle); // Buss para emit de Open Menu 
        },
        methods: {
            ...mapActions('account', ['logout']),

            changeModulo(numero) {
                this.modulo = numero;
            },
            hideSidebarToggle: function () {
                var sidebar = document.getElementById('sidebar-dashboard');
                var dashboardMain = document.getElementById('dashboard-main');
                if (sidebar.open) {
                    sidebar.close();
                } else {
                    sidebar.show();
                }
                this.hideSidebar = !this.hideSidebar;

                document.getElementById('link' + this.modulo+'').focus();




            },
        }
    }
</script>
<style lang="css" scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.2s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .15s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateY(10px);
        opacity: 0;
    }


</style>
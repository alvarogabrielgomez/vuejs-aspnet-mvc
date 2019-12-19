<template>
    <div class="content-modulo">
             <span>Funciona Modulo Ficha!</span>
             <button @click="toastTest">Test Toast</button>
        </div>
</template>
<script>

    import { mapState, mapActions, mapGetters } from 'vuex';

    export default {
        name: 'dashboard-ficha',
        data() {
            return {
                loadingMss: false,
            }
        },

        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all,
                databaseOnline: state => state.database.online,
                dataHoraServer: state => state.database.dataHoraServer
            }),

        },
        updated() {

        },
        mounted() {
        },
        methods: {
            ...mapActions('database', ['checkDataHora']), // Metodos para traer datos al state.

            toggleLoading: function (state = undefined) {
                if (state == undefined) {
                    this.loadingMss = this.loadingMss ? true : false;
                } else {
                    this.loadingMss = state;
                }
            },

            caseDecimals(value, cases) {
                let val = value.toFixed(cases).replace(".", ",");
                return val;
            },

            toastTest: function () {
                custom.toast.msg('Esto es un Test que dura 10 segundos', 10000);
            }
        }

        }
    
</script>
<style lang="scss" scoped>


</style>
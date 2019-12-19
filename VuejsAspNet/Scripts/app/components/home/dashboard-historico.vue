<template>
    <div id="dashboard-historico-component" class="card-dashboard">
        <span>
            Funciona Modulo Historico!
        </span>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: 'dashboard-historico',
        data() {
            return {

            }
        },
        components: {
        },
        computed: {
            ...mapState({
                account: state => state.account,
                databaseOnline: state => state.database.online,
                dataHoraServer: state => state.database.dataHoraServer,
            }),
        },
        mounted() {
        },
        updated() {
        },
        methods: {

            caseDecimals(value, cases) {
                let val = value.toFixed(cases).replace(".", ",");
                return val;
            },

            toggleLoadingTable: function (state = undefined) {
                if (state == undefined) {
                    this.loadingMssDataTable = this.loadingMssDataTable ? true : false;
                } else {
                    this.loadingMssDataTable = state;
                }
            },
        }
    }
</script>
<style lang="scss" scoped>

</style>
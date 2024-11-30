<template>
    <div>
        <VAppBar class="appbar" id="appbartitle" title="Dashboard" style="background-color: #083049ff;">
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn id="btn-p" flat v-bind="props" variant="outlined" size="small" prepend-icon="mdi-menu-down">
                        <span>Profile</span>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item density="compact" class="menu-item" v-for="(item, index) in items" :key="index">
                        <v-list-item-title size="small" @click="handleLogout">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </VAppBar>
    </div>
</template>
<script>
import {
    mapActions
} from 'vuex';
import {
    mapGetters
} from 'vuex';
export default {
    data() {
        return {
            items: [{
                title: 'Logout'
            }],
        };
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'user'], ['hasPermission']),

        // appBarTitle() {
        //     // Derive the title based on the selected tab
        //     switch (this.selectedTab) {
        //         case 'dashboard':
        //             return 'Dashboard';
        //         case 'student-management':
        //             return 'Student Management';
        //         case 'listStudent':
        //             return 'Student List';
        //         case 'roomDetails':
        //             return 'Rooms Detail';
        //         case 'hostelMess':
        //             return 'Hostel Mess';
        //         default:
        //             return 'Dashboard';
        //     }
        // },
    },
    methods: {
        ...mapActions('auth', ['logout']),
        async handleLogout() {
            try {
                await this.$store.dispatch('auth/logout');
                const token = this.$store.getters['auth/token'];
                localStorage.removeItem('token', token);
                localStorage.removeItem('authenticated');

                this.$router.push({
                    name: 'login'
                }); // Redirect to the login page
            } catch (error) {
                console.error('Logout failed', error);
                // Handle logout failure if needed
            }
        }
    }
}
</script>
<style scoped>
.appbar {
    margin: 10px;
    border-radius: 15px;
}
#appbartitle {
    color: whitesmoke;
}
#btn-p {
    right: 2%;
    margin-right: 30px;
    background-color: #04724dff;
    border: none;
    color: rgba(5, 20, 40, 0.404);
}

#btn-p:hover {
    background-color: rgb(4, 13, 119);
}

#btn-p::v-deep(.v-btn__overlay) {
    background-color: #020D47;
    position: relative;
}

#btn-p::v-deep(.v-btn__content) {
    color: whitesmoke;
    position: relative;
}

#btn-p::v-deep(.v-btn__prepend) {
    color: whitesmoke;
    position: relative;
}
.menu-item {
    cursor: pointer;
}

.menu-item:hover {
    background-color: rgb(4, 13, 119);
}
</style>
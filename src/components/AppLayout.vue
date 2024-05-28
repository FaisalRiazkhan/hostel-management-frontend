<template>
    <VApp class="rounded rounded-md">
        <!-- Navigation Side Bar -->
        <VNavigationDrawer  v-model="drawer" :rail="!rail" permanent @click="rail = true"
            style="background-color: #083049ff;">
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" :title="userName"
                :subtitle="userEmail" nav style="color: #f8f9fa;">
                <template v-slot:append>
                    <VBtn id="toggle-nav" variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></VBtn>
                </template>
            </v-list-item>
            <v-divider />

            <NavBar /> 
        </VNavigationDrawer>

        <!-- Header bar -->
        <VAppBar class="appbar" id="appbartitle" :title="appBarTitle" style="background-color: #083049ff;">
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

        <!-- Main content area -->
        <VMain class="d-flex align-center justify-center" style="min-height: 250px; background-color: #e3dfffff;">
            <slot></slot>
        </VMain>
    </VApp>
</template>

<script>
import NavBar from '@/components/Navigation/NavBar.vue';

import {
    mapActions
} from 'vuex';
import {
    mapGetters
} from 'vuex';

export default {
    data() {
        return {
            // isAdmin: false,
            // isUser: false,
            drawer: true,
            showDropdown: false,
            rail: true,
            selectedTab: 'dashboard', // Default selected tab
            items: [{
                title: 'Logout'
            }],
            locations: [
                'bottom',
            ],
        };
    },
    components: {
        NavBar
    },
    // created() {
    //     this.checkUserRole();
    // },
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'user'], ['hasPermission']),
        userName() {
            if (this.isAuthenticated && this.user) {
                return `${this.user.user.first_name} ${this.user.user.last_name}`; // Update property access

            } else {
                return 'undefined username';
            }
        },
        userEmail() {
            return this.isAuthenticated ? this.user.user.email : '';
        },

        appBarTitle() {
            // Derive the title based on the selected tab
            switch (this.selectedTab) {
                case 'dashboard':
                    return 'Dashboard';
                case 'student-management':
                    return 'Student Management';
                case 'listStudent':
                    return 'Student List';
                case 'roomDetails':
                    return 'Rooms Detail';
                case 'hostelMess':
                    return 'Hostel Mess';
                default:
                    return 'Dashboard';
            }
        },
    },
    methods: {
        ...mapActions('auth', ['logout']),

        selectTab(tab) {
            this.selectedTab = tab;
        },

        // checkUserRole() {
        //     const user = JSON.parse(localStorage.getItem('user'));
        //     if (user && user.role && user.role.length > 0) {
        //         this.isAdmin = user.role.some(role => role === 'admin');
        //         this.isUser = user.role.some(role => role === 'user');
        //     } else {
        //         // Handle scenario where user object or roles are missing
        //         console.warn('User data or roles not found in localStorage');
        //     }
        // },

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
};
</script>

<style scoped>
#toggle-nav {
    color: rgba(5, 20, 40, 0.404);
}

#toggle-nav::v-deep(.v-btn__content) {
    color: whitesmoke;
}

#toggle-nav::v-deep(.v-btn__overlay) {
    background-color: #022250ff;
    color: red;
}

#appbartitle {
    color: whitesmoke;
}

.appbar {
    margin: 10px;
    border-radius: 15px;
}

.menu-item {
    cursor: pointer;
}

.menu-item:hover {
    background-color: rgb(4, 13, 119);
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

.active-tab {
    background-color: #022250ff;
}
</style>

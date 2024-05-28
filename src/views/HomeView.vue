<template>
<h1>Home Page</h1>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import DashboardComp from '@/components/Dashboard/DashboardComp.vue';
import AdmissionForm from '@/components/Students/AdmissionForm.vue';
import ListStudents from '@/components/Students/ListStudents.vue';
import RoomDetails from '@/components/RoomManagement/RoomDetails.vue';
import RoomManagement from '@/views/RoomManagement.vue';
import HostelMess from '@/components/MessManagement/HostelMess.vue';
import {
    mapActions
} from 'vuex';
import {
    mapGetters
} from 'vuex';

export default {
    data() {
        return {
            isAdmin: false,
            isUser: false,
            drawer: true,
            showDropdown: false,
            rail: true,
            selectedTab: 'dashboard', // Default selected tab
            items: [{
                title: 'Logout'
            },],
            locations: [
                'bottom',
            ],
        };
    },
    created() {
        this.checkUserRole();
    },
    components: {
        DashboardComp,
        AdmissionForm,
        RoomDetails,
        HostelMess,
        ListStudents,
        RoomManagement
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated', 'user'], ['hasPermission']),
        userName() {
            // console.log('User object:', this.user);
            // console.log('username:', this.user.user.first_name); // Update property access
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
                case 'addStudent':
                    return 'Add Student';
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

        checkUserRole() {
            const user = JSON.parse(localStorage.getItem('user'));
            // console.log('user data:', user);

            if (user && user.role && user.role.length > 0) {
                this.isAdmin = user.role.some(role => role === 'admin');
                // console.log("check role",this.isAdmin);
                this.isUser = user.role.some(role => role === 'user');
            } else {
                // Handle scenario where user object or roles are missing
                console.warn('User data or roles not found in localStorage');
            }
        },

        // async handleLogout() {
        //     try {
        //         await this.$store.dispatch('auth/logout');
        //         const token = this.$store.getters['auth/token'];
        //         localStorage.removeItem('token', token);
        //         localStorage.removeItem('authenticated');

        //         this.$router.push({
        //             name: 'login'
        //         }); // Redirect to the login page
        //     } catch (error) {
        //         console.error('Logout failed', error);
        //         // Handle logout failure if needed
        //     }
        // }
    }
};
</script>

<style scoped>
/* 
#toggle-nav:hover {
    background-color: #022250ff;
} */
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

/* .v-toolbar__content.v-toolbar-title */
#appbartitle {
    color: whitesmoke;
}

#list-group {
    /* background-color: #083049ff; */
    font-size: small;
    margin-left: -3px;
}

#list-group {
    background-color: #083049ff;
    color: rgba(5, 20, 40, 0.404);
}

#list-group:hover {
    background-color: rgb(4, 13, 119);
    margin-left: 2px;
    /* margin-top: 8px; */
}

#list-group::v-deep(.v-list-item__append) {
    color: whitesmoke;
}

#list-group::v-deep(.v-list-item__prepend) {
    color: whitesmoke;
}

#list-group::v-deep(.v-list-item__content) {
    color: whitesmoke;
}

#list-group::v-deep(.v-list-item__overlay) {
    background-color: #022250ff;
    position: relative;
}

#list-group ::v-deep(.v-list-item__spacer) {
    width: 15px;
}

#nav-list-group {
    background-color: #083049ff;
    color: whitesmoke;
}

#nav-list-group #nav-item ::v-deep(.v-list-item-title) {
    font-size: larger;
}

.nav-list {
    background-color: #083049ff;
    color: whitesmoke;
}

.appbar {
    margin: 10px;
    border-radius: 15px;
}

.menu-item {
    cursor: pointer;
    /* Change cursor to pointer on hover */
}

.menu-item:hover {
    background-color: rgb(4, 13, 119);

    /* Change the background color on hover */
}

#nav-item {
    font-size: xx-small;
    color: rgba(5, 20, 40, 0.404);
}

#nav-item:hover {
    /* background-color: #219ebc; */
    background-color: rgb(4, 13, 119);
    left: 2px;
    /* top: 3px; */
}

#nav-item::v-deep(.v-list-item-title) {
    font-size: small;
}

#nav-item::v-deep(.v-list-item__prepend) {
    color: whitesmoke;
}

#nav-item::v-deep(.v-list-item__content) {
    color: whitesmoke;
}

#nav-item::v-deep(.v-list-item__overlay) {
    /* Targets overlay within a specific component */
    /* Custom styles here */
    background-color: #219ebc;
    position: relative;
}

#nav-item::v-deep(.v-list-item__spacer) {
    width: 15px;
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
    /* Set the background color for active tab */
    /* color: whitesmoke; */
    /* Set text color for active tab */
}
</style>

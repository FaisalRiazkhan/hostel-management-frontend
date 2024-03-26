<template>
<VApp class="rounded rounded-md">
    <!-- Navigation Side Bar -->
    <VNavigationDrawer v-model="drawer" :rail="rail" permanent @click="rail = false" style="background-color: #083049ff;">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="Faisal riaz" subtitle="Faisal_riaz@gmailcom" nav style="color: #f8f9fa;">
            <template v-slot:append>
                <VBtn id="toggle-nav" variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></VBtn>
            </template>
        </v-list-item>
        <v-divider />

        <v-list density="compact" nav class="nav-list">
            <v-list-item id="nav-item" @click="selectTab('dashboard')" prepend-icon="mdi-home-city" title="Dashboard" value="dashboard" :class="{ 'active-tab': selectedTab === 'dashboard'}"></v-list-item>
            <v-list-group id="list-group" value="studentdetails">
                <template v-slot:activator="{ props }">
                    <v-list-item id="nav-item1" v-bind="props" prepend-icon="mdi-account-multiple-plus" title="Student Management" :class="{ 'active-tab': selectedTab === 'addStudent' ||  selectedTab === 'listStudent' }"></v-list-item>
                </template>

                    <v-list nav id="nav-list-group" density="compact">
                        <v-list-item  id="nav-item" @click="selectTab('addStudent')" prepend-icon="mdi-account-plus-outline" title="Add Student" value="addStudent" :class="{ 'active-tab': selectedTab === 'addStudent'}"></v-list-item>
                        <v-list-item  id="nav-item" @click="selectTab('listStudent')" prepend-icon="mdi-face-man" title="List Students" aria-valuemax="listStudent" :class="{ 'active-tab': selectedTab === 'listStudent'}"></v-list-item>
                    </v-list>

            </v-list-group>
            <!-- <VListItem id="nav-item" @click="selectTab('addStudent')" prepend-icon="mdi-account-plus" title="Add Student" value="addStudent"></VListItem> -->
            <v-list-item id="nav-item" @click="selectTab('roomDetails')" prepend-icon="mdi-account" title="Room Management" value="roomDetails" :class="{ 'active-tab': selectedTab === 'roomDetails'}"></v-list-item>
            <v-list-item id="nav-item" @click="selectTab('hostelMess')" prepend-icon="mdi-account-group-outline" title="Mess Management" value="hostelMess" :class="{ 'active-tab': selectedTab === 'hostelMess'}"></v-list-item>
        </v-list>
    </VNavigationDrawer>
<!-- header bar -->
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

    <VMain class="d-flex align-center justify-center" style="min-height: 250px; background-color: #e3dfffff;">
        <!-- Conditional rendering based on selected tab -->
        <template v-if="selectedTab === 'dashboard'">
            <!-- Content for Home tab -->
            <DashboardComp />
        </template>
        <template v-else-if="selectedTab === 'addStudent'">
            <!-- Content for Add Student tab -->
            <AdmissionForm />
        </template>
        <template v-else-if="selectedTab === 'listStudent'">
            <!-- Content for Add Student tab -->
            <ListStudents />
        </template>
        <template v-else-if="selectedTab === 'roomDetails'">
            <!-- Content for roomDetails tab -->
            <RoomDetails />
        </template>
        <template v-else-if="selectedTab === 'hostelMess'">
            <!-- Content for hostelMess tab -->
            <HostelMess />
        </template>

    </VMain>

</VApp>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import DashboardComp from '@/components/Dashboard/DashboardComp.vue';
import AdmissionForm from '@/components/Students/AdmissionForm.vue';
import ListStudents from '@/components/Students/ListStudents.vue';
import RoomDetails from '@/components/RoomManagement/RoomDetails.vue';
import HostelMess from '@/components/MessManagement/HostelMess.vue';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            drawer: true,
            showDropdown: false,
            rail: true,
            selectedTab: 'dashboard', // Default selected tab
            items: [{
                title: 'Logout'
            }, ],
            locations: [
                'bottom',
            ],
        };
    },
    components: {
        DashboardComp,
        AdmissionForm,
        RoomDetails,
        HostelMess,
        ListStudents
    },
    computed: {
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
        async handleLogout() {
        try {
            // Dispatch the 'logout' action with the token
            await this.logout(this.$store.getters['auth/token']);
            
            // Clear any user-related data in your component
            // Redirect to the login page or do any other necessary actions
            this.$router.push({ name: 'login' }); // Redirect to the login page
        } catch (error) {
            console.error('Logout failed', error);
            // Handle logout failure if needed
        }
    }
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

<template>
    <div>
        <v-list density="compact" nav class="nav-list">
                <router-link to="/dashboard" custom v-slot="{ href, navigate, isActive }">
                    <v-list-item id="nav-item" :href="href" @click="navigate" prepend-icon="mdi-apps"
                        title="Dashboard" :class="{ 'active-tab': isActive }">
                    </v-list-item>
                </router-link>

                <router-link v-if="isAdmin" to="/student-management" custom v-slot="{ href, navigate, isActive }">
                    <v-list-item id="nav-item" :href="href" @click="navigate" prepend-icon="mdi-account-circle-outline"
                        title="Student Management" :class="{ 'active-tab': isActive }">
                    </v-list-item>
                </router-link>

                <router-link v-if="isAdmin || isUser" to="/room-management" custom v-slot="{ href, navigate, isActive }">
                    <v-list-item id="nav-item" :href="href" @click="navigate" prepend-icon="mdi-bed-outline "
                        title="Room Management" :class="{ 'active-tab': isActive }">
                    </v-list-item>
                </router-link>

                <router-link v-if="isAdmin || isUser" to="/mess-management" custom v-slot="{ href, navigate, isActive }">
                    <v-list-item id="nav-item" :href="href" @click="navigate" prepend-icon="mdi-food-outline"
                        title="Mess Management" :class="{ 'active-tab': isActive }">
                    </v-list-item>
                </router-link>
            </v-list>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isAdmin: false,
            isUser: false,
        };
    },
    created() {
        this.checkUserRole();
    },
    methods: {
        checkUserRole() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role && user.role.length > 0) {
                this.isAdmin = user.role.some(role => role === 'admin');
                this.isUser = user.role.some(role => role === 'user');
            } else {
                // Handle scenario where user object or roles are missing
                console.warn('User data or roles not found in localStorage');
            }
        }
    }
}
</script>
<style scoped>

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

#nav-item {
    font-size: xx-small;
    color: rgba(5, 20, 40, 0.404);
}

#nav-item:hover {
    background-color: rgb(4, 13, 119);
    left: 2px;
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
    background-color: #219ebc;
    position: relative;
}

#nav-item::v-deep(.v-list-item__spacer) {
    width: 15px;
}

</style>
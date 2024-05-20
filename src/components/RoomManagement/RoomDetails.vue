<template>
<v-container class="room-container">
    <v-row>
        <v-col cols="12" md="3" style="display: flex;">
            <v-text-field density="compact" clearable variant="outlined" v-model="room_no" label="Room No" required></v-text-field>
        </v-col>
        <v-col cols="12" md="3" style="display: flex;">
            <v-text-field density="compact" clearable variant="outlined" v-model="seat_available" label="Seat Available" required></v-text-field>
        </v-col>
        <v-col cols="12" md="3" style="display: flex;">
            <v-text-field density="compact" clearable variant="outlined" v-model="reserve_seat" label="Reserved Seat" required></v-text-field>
        </v-col>
        <v-btn class="search-button" prepend-icon="mdi-text-search-variant" variant="outlined" elevation="10" size="small" rounded="lg">Search</v-btn>
    </v-row>
    <v-row>
        <v-col cols="12" md="12" style="display: flex;">
            <AddRoomComp  />
        </v-col>
    </v-row>

    <!-- <v-sheet class="table-sheet">
        <v-data-table :headers="headers" :items="items" item-key="name" class="data-table" density="compact" items-per-page="5" height="220px" fixed-header>
            <template v-slot:top>
            </template>
        </v-data-table>
    </v-sheet> -->
</v-container>
</template>

<script>
import AddRoomComp from './AddRoomComp.vue'; 
import { mapGetters } from 'vuex';
export default {
    components: {
        AddRoomComp
    },

    data() {
        return {
            room_no: '',
            seat_available: '',
            reserve_seat: '',
        };

    },
    computed: {
       ...mapGetters('auth', ['hasPermission']),
    },
    methods: {

    }
};
</script>

<style scoped>

.v-row {
    /* margin: -7px; */
    padding-top: 12px;
}

.v-text-field {
    margin-right: 30px;
}

.search-button {
    margin-top: 17px;
    margin-left: 20px;
    background-color: #083049ff;
    color: rgba(5, 20, 40, 0.404);
}

.search-button:hover {
    background-color: rgb(4, 13, 119);
}

.search-button::v-deep(.v-btn__content) {
    color: whitesmoke;
    position: relative;

}

.search-button::v-deep(.v-btn__prepend) {
    color: whitesmoke;
    position: relative;

}

.search-button::v-deep(.v-btn__overlay) {
    background-color: #022250ff;
    position: relative;
}
</style>

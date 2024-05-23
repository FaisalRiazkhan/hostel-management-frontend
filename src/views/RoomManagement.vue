<template>
    <AppLayout>
        <div>
            <RoomDetails />
        </div>
    </AppLayout>
</template>
<script>
import AppLayout from '@/components/AppLayout.vue';
import RoomDetails from '@/components/RoomManagement/RoomDetails.vue';
export default {
    components: {
        AppLayout,
        RoomDetails
    }
}
</script>

<style scoped></style>
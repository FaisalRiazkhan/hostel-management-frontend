<template>
    <AppLayout>
        <div>
            <ListStudents />
        </div>
    </AppLayout>
</template>
<script>
import AppLayout from '@/components/AppLayout.vue';
import ListStudents from '@/components/Students/ListStudents.vue';

export default {
    components: {
        AppLayout,
        ListStudents
    },
}
</script>
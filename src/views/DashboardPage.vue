<template>
    <AppLayout>
        <div>
            <DashboardComp />
        </div>
    </AppLayout>
</template>
<script>
import AppLayout from '@/components/AppLayout.vue';
import DashboardComp from '@/components/Dashboard/DashboardComp.vue';

export default {
    components: {
        AppLayout,
        DashboardComp
    },
}
</script>
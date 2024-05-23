<template>
    <AppLayout>
        <div>
          <HostelMess />
        </div>
    </AppLayout>

</template>
<script>
import AppLayout from '@/components/AppLayout.vue';
import HostelMess from '@/components/MessManagement/HostelMess.vue';

export default {
    components: {
        AppLayout,
        HostelMess
    },
}
</script>
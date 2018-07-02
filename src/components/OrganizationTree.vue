<template>
    <Tree @on-select-change="selectTree" :data="data1"></Tree>
</template>

<script>
import OrgApi from '@/api/organization';

export default {
    data() {
        return {
            data1: [],
        };
    },
    created() {
        this.getList();
    },
    props: {
    },
    methods: {
        async getList() {
            const res = await OrgApi.getOrganizationList();
            this.data1 = this.parseDataList(res.data.data);
            this.$emit('loaded', this.data1);
        },
        selectTree(list) {
            if (list.length > 0) {
                // this.getNowDetails(list[0].id);
                this.$emit('on-select', list[0].id);
            }
            // else {
            //     this.form.parentId = 0;
            //     this.nowSelect = {};
            // }
        },
        parseDataList(list) {
            const dataList =  list.map((item) => {
                item.title = item.name;
                item.expand = true;
                if (item.children && item.children.length > 0) {
                    item.children = this.parseDataList(item.children);
                }
                return item;
            });
            return dataList;
        },
    }
}
</script>


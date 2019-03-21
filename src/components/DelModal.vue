<template>
    <Modal :value="value" @on-visible-change="visibleChange" width="360">
        <p slot="header" class="delete-modal-header">
            <Icon type="ios-information-circle"></Icon>
            <span>删除提醒</span>
        </p>
        <div style="text-align:center">
            <p>该操作将删除&nbsp;{{ delName }}&nbsp;</p>
            <p>您是否要删除?</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="del_loading" @click="deleteItem()">删除</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    data () {
        return {
            del_loading: false,
        }
    },
    model: {
        prop: 'value',
        event: 'visible-change'
    },
    props: {
        delName: {
            type: String,
            default: ''
        },
        deleteMethod: {
            type: Function
        },
        delId: {
            tyep: [Number, String]
        },
        value: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        async deleteItem() {
            this.del_loading = true
            console.log('delId', this.delId);
            await this.deleteMethod(this.delId)
            this.del_loading = false
            this.$emit("visible-change", false)
            this.$emit("deleteSuccess")
        },
        visibleChange(value) {
            this.$emit("visible-change", value)
        }
    }
}
</script>


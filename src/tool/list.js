export default (listApi, fn) => {
    return {
        async getList() {
            this.loading = true
            const { data } = await listApi(this.params)
            this.data1 = data.data.list
            this.total = data.data.count
            this.loading = false
            fn()
        },
        searchList() {
            this.params.pageNumber = 1
            this.params.pageSize = 10
            this.params.keyword = this.keyword
            this.getList()
        },
        resetList() {
            this.params.pageNumber = 1
            this.params.pageSize = 10
            this.params.keyword = ''
            this.keyword = ''
            this.getList()
        }
    }
}

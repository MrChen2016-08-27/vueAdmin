<template>
    <div id="content-detail">
        <header-title icon="person-stalker">编辑内容</header-title>
        <Form ref="form" style="margin-top: 20px; margin-bottom: 100px;" :model="form" :rules="formRules" :label-width="80">
            <Row>
                <Col span="24">
                <FormItem label="标题">
                    <Input v-model="form.title" placeholder="标题"></Input>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="描述">
                    <Input v-model="form.description" placeholder="描述"></Input>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="封面图">
                    <Upload :action="uploadImgAction" name="file" :headers="getTokenHeader" :format="['jpg','jpeg','png']" :on-success="uploadSucess" :on-remove="removeLogo" :on-format-error="fileFormatError">
                        <Button icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="内容">
                    <quill-editor class="content-editor" v-model="form.content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)">
                    </quill-editor>
                </FormItem>
                </Col>
            </Row>
        </Form>
        <div style="text-align: center;" class="page-action-footer">
            <Button @click="submitContent" type="primary">提交</Button>
            <Button>取消</Button>
        </div>
    </div>
</template>

<script>
import { uploadImgAction } from '@/api/upload'
import contentApi from '@/api/content'
import HeaderTitle from '@/components/HeaderTitle';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    data () {
        return {
            form: {},
            editorOption: {},
            uploadImgAction,
            content: '',
            formRules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入描述', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入描述', trigger: 'blur' }
                ],
            },
        }
    },
    components: {
        quillEditor,
        HeaderTitle
    },
    computed: {
        getDetailId () {
            return this.$router.id;
        },
        getTokenHeader () {
            let Authorization = localStorage.getItem('token');
            return { Authorization }
        }
    },
    methods: {
        uploadSucess (res, file) {
            console.log('upload success', res.data);
        },
        removeLogo (file) {

        },
        fileFormatError (file) {

        },
        onEditorChange ({ quill, html, text }) {
            console.log('editor change!', html)
            this.content = html
        },
        async submitContent (refForm) {
            let params = this.form;
            if (this.getDetailId) {
                params.id = this.getDetailId;
                await contentApi.updateContent(params);
            } else {
                await contentApi.addContent(params);
            }
            this.$router.push({ name: 'Content/ContentList' });
        }
    }
}
</script>

<style lang="less" scoped>
#content-detail {
}
.content-editor {
    height: 500px;
}
</style>



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
        <Upload :headers="getTokenHeader" style="dispaly: none;" ref="quillUpload" :action="getQuillUploadUrl" :on-success="uploadQuillFile">
            <Button ref="quillUpload-btn" type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
    </div>
</template>

<script>
import { uploadImgAction, uploadFileAction } from '@/api/upload'
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
            addRange: null,
            quillUploadType: '',
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
    mounted () {
        this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
        this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)
    },
    computed: {
        getDetailId () {
            return this.$router.id;
        },
        getTokenHeader () {
            let Authorization = localStorage.getItem('token');
            return { Authorization }
        },
        getQuillUploadUrl () {
            if (this.quillUploadType == 'img') {
                return uploadImgAction;
            } else {
                return uploadFileAction;
            }
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
        },
        imgHandler (state) {
            this.addRange = this.$refs.myQuillEditor.quill.getSelection()
            if (state) {
                let fileInput = this.$refs['quillUpload-btn'].$el;
                fileInput.click() // 加一个触发事件
            }
            this.quillUploadType = 'img';
        },
        videoHandler (state) {
            this.addRange = this.$refs.myQuillEditor.quill.getSelection()
            if (state) {
                let fileInput = document.getElementById('imgInput')
                fileInput.click() // 加一个触发事件
            }
            this.quillUploadType = 'video';
        },
        // 上传富文本内的文件
        uploadQuillFile (response, file, fileList) {
            const { data } = response;
            console.log(data);
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



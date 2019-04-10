<template>
    <div id="content-detail">
        <header-title icon="person-stalker">{{ getDetailId ? '审核内容' : '审核内容' }}</header-title>
        <Form ref="form" style="margin-top: 20px; margin-bottom: 100px;" :model="reviewForm" :rules="getFormRules" :label-width="80">
            <Row>
                <Col span="24">
                <FormItem label="标题" prop="title">
                    <Input readonly v-model="form.title" placeholder="标题"></Input>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="描述" prop="description">
                    <Input readonly v-model="form.description" placeholder="描述"></Input>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="关键字">
                    <Input readonly v-model="form.keywords" placeholder="关键词"></Input>
                    <Alert>词语之间用 | 号分隔, 如: 玩具|儿童</Alert>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem style="display: inline-block;" label="选择栏目" prop="columnId">
                    <Select disabled @on-change="changeColumnId()" v-model="form.columnId" style="width:200px">
                        <Option value="">请选择</Option>
                        <Option v-for="item in columnList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem style="display: inline-block; margin-left: -70px;" prop="columnTypeId">
                    <Select disabled v-if="form.columnId && columnTypeList && columnTypeList.length > 0" v-model="form.columnTypeId" style="width:200px">
                        <Option value="">请选择</Option>
                        <Option v-for="item in columnTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem style="display: inline-block;" label="选择类型">
                    <Select disabled v-if="typeList && typeList.length > 0" v-model="form.typeId" style="width:200px">
                        <Option value="">请选择</Option>
                        <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="封面图" prop="icon">
                    <div v-if="form.icon" class="upload-column-list">
                        <div>
                            <img :src="FILE_SERVER + form.icon" />
                            <div class="upload-cover">
                                <!-- <Icon size="26" type="ios-trash-outline" @click.native="removeIconImg()"></Icon> -->
                            </div>
                        </div>
                    </div>
                    <Upload disabled style="display: inline-block;" ref="uploadIcon" :show-upload-list="false" :before-upload="beforeUploadImg" :action="uploadImgAction" name="file" :headers="getTokenHeader" :format="['jpg','jpeg','png']" :on-success="uploadSucess" :on-remove="removeIconImg">
                        <div class="upload-icon-box">
                            <Icon class="upload-icon" type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                </Col>
                <Col span="24">
                <FormItem label="来源类型" prop="sourceType">
                    <RadioGroup v-model="form.sourceType">
                        <Radio disabled :label="0">
                            <span>自定义</span>
                        </Radio>
                        <Radio disabled :label="1">
                            <span>链接</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                </Col>
                <Col v-show="!form.sourceType" span="24">
                <FormItem label="内容" prop="content">
                    <quill-editor disabled class="content-editor" v-model="form.content" ref="myQuillEditor" :options="editorOption" @change="onEditorChange($event)">
                    </quill-editor>
                </FormItem>
                </Col>
                <Col v-show="form.sourceType" span="24">
                <FormItem label="链接" prop="source">
                    <Input readonly v-model="form.source" placeholder="来源链接"></Input>
                </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="审核意见" prop="source">
                        <Input v-model="reviewForm.opinion" type="textarea" :row="3" ></Input>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="备注" prop="source">
                        <Input v-model="reviewForm.remark" type="textarea" :row="3" ></Input>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <div style="text-align: center;" class="page-action-footer">
            <Button @click="submitContent(-1)" type="error" >拒绝通过</Button>
            <Button @click="submitContent(2)" type="primary">通过审核</Button>
            <Button>返回</Button>
        </div>
        <Upload :show-upload-list="false" :before-upload="brefoQuillUpload" :headers="getTokenHeader" style="display: none;" ref="quillUpload" :action="getQuillUploadUrl" :on-success="uploadQuillFile">
            <Button ref="quillUpload-btn" icon="ios-cloud-upload-outline" ghost>Upload files</Button>
        </Upload>
    </div>
</template>

<script>``
import { uploadImgAction, uploadFileAction } from '@/api/upload';
import columnApi from '@/api/column';
import typeApi from '@/api/type';
import reviewApi from '@/api/review'
import HeaderTitle from '@/components/HeaderTitle';
import { beforeUploadImg, beforeUploadFile } from '@/tool/uploadValidate';
import { quillEditor } from 'vue-quill-editor';
import Quill from 'quill';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


export default {
    data () {
        return {
            form: {
                title: "",
                description: "",
                icon: "",
                content: "",
                keywords: "",
                columnId: null,
                columnTypeId: null,
                typeId: null,
                source: "",
                sourceType: 0
            },
            reviewForm: {
                status: 1,
                opinion: '',
                remark: ''
            },
            columnList: [],
            typeList: [],
            columnTypeList: [],
            editorOption: {},
            uploadImgAction,
            addRange: null,
            quillUploadType: '',
        }
    },
    components: {
        quillEditor,
        HeaderTitle
    },
    async created () {
        this.getColumnList();
        this.getTypeList();
        if (this.getDetailId) {
            await this.getContentDetail(this.getDetailId)
            this.getColumnTypeList();
        }
    },
    mounted () {
        this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
        this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler);
    },
    computed: {
        getDetailId () {
            return this.$route.query.id;
        },
        getTokenHeader () {
            let Authorization = localStorage.getItem('token');
            return { Authorization }
        },
        getQuillUploadUrl () {
            if (this.quillUploadType == 'image') {
                return uploadImgAction;
            } else {
                return uploadFileAction;
            }
        },
        getFormRules () {
            let formRules = {
                opinion: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '请输入备注', trigger: 'blur' }
                ],
            };
            return formRules;
        }
    },
    methods: {
        beforeUploadImg,
        async changeColumnId () {
            if (!this.form.columnId) {
                this.columnTypeList = [];
                return;
            }
            this.getColumnTypeList();
        },
        async getColumnTypeList () {
            const { data } = await typeApi.getTypeList({
                pageNumber: 1,
                pageSize: 9999999,
                columnId: this.form.columnId
            });
            this.columnTypeList = data.data.list;
        },
        async getColumnList () {
            const { data } = await columnApi.getColumnList({
                pageNumber: 1,
                pageSize: 9999999
            });
            this.columnList = data.data.list;
        },
        async getTypeList () {
            const { data } = await typeApi.getTypeList({
                pageNumber: 1,
                pageSize: 9999999
            });
            this.typeList = data.data.list;
        },
        async getContentDetail (id) {
            const { data } = await reviewApi.getReviewContent(id);
            let form = Object.assign(this.form, data.data);
            this.$set(this, 'form', form);
        },
        removeIconImg () {
            this.form.icon = '';
        },
        uploadSucess (res, file) {
            const { data } = res;
            this.form.icon = data.fileName;
        },
        brefoQuillUpload (file) {
            if (this.quillUploadType == 'image') {
                return beforeUploadImg.call(this, file)
            } else {
                return beforeUploadFile.call(this, file)
            }
        },
        removeLogo (file) {

        },
        fileFormatError (file) {

        },
        onEditorChange ({ quill, html, text }) {
            this.content = html
        },
        async submitContent (status) {
            let params = this.reviewForm;
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    if (this.getDetailId) {
                        params.status = status;
                        params.contentId = this.getDetailId;
                        await reviewApi.addReviewContent(params);
                    }
                    this.$router.push({ name: 'Review/ContentList' });
                }
            })
        },
        imgHandler (state) {
            this.addRange = this.$refs.myQuillEditor.quill.getSelection()
            if (state) {
                let fileInput = this.$refs['quillUpload-btn'].$el;
                fileInput.click() // 加一个触发事件
            }
            this.quillUploadType = 'image';
        },
        videoHandler (state) {
            this.addRange = this.$refs.myQuillEditor.quill.getSelection()
            if (state) {
                let fileInput = this.$refs['quillUpload-btn'].$el;
                fileInput.click() // 加一个触发事件
            }
            this.quillUploadType = 'video';
        },
        // 上传富文本内的文件
        uploadQuillFile (response, file, fileList) {
            this.addRange = this.$refs.myQuillEditor.quill.getSelection()
            const { data, meta } = response;
            if (meta.code == 200) {
                let value = this.FILE_SERVER + data.fileName;
                this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.  index + 1 : 0, this.quillUploadType, value, Quill.sources.USER);
            }
        }
    }
}
</script>

<style lang="less" scoped>
#content-detail {
}
.content-editor {
}
</style>

<style lang="less">
.ql-editor {
    height: 400px;
}
</style>




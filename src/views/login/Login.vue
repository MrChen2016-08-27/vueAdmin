<template>
    <div id="login" >
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="userName">
                <Input type="text" v-model="formInline.userName" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="passWord">
                <Input type="password" v-model="formInline.passWord" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import JSEncrypt from 'jsencrypt';
    import { getKey, login } from '@/api/user';
    export default {
        name: 'Login',
        data () {
            return {
                myEncrypt: '',
                formInline: {
                    userName: '',
                    passWord: ''
                },
                ruleInline: {
                    userName: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: 'Please fill in the passWord.', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            getKey().then((res) => {
                const { key } = res.data.data;
                this.myEncrypt = new JSEncrypt();
                this.myEncrypt.setPublicKey(key);
            });
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loginUser();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            loginUser() {
                if (!this.myEncrypt) {
                    return;
                }
                const passWord = this.myEncrypt.encrypt(this.formInline.passWord);
                const form = {
                    userName: this.formInline.userName,
                    passWord
                }
                login(form)
                    .then((res) => {
                        if (res.data.meta.code === 200) {
                            this.$Message.success('登录成功');
                        }
                    })
            }
        }
    }
</script>


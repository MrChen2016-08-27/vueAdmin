<template>
    <div id="login" >
        <img class="logo" src="" />
        <Form class="login-form" ref="formInline" :model="formInline" :rules="ruleInline">
            <h3>账号登陆</h3>
            <FormItem prop="username">
                <Input type="text" v-model="formInline.username" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button long class="signBtn" type="primary" @click="handleSubmit('formInline')">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import JSEncrypt from 'jsencrypt';
    import { getKey, login } from '@/api/user';
    import { mapMutations } from 'vuex';
    export default {
        name: 'Login',
        data () {
            return {
                myEncrypt: '',
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
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
            ...mapMutations({
                setUserName: 'user/setUserName'
            }),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loginUser();
                    } else {
                        this.$Message.error('信息格式有误!');
                    }
                })
            },
            loginUser() {
                if (!this.myEncrypt) {
                    return;
                }
                const password = this.myEncrypt.encrypt(this.formInline.password);
                const form = {
                    username: this.formInline.username,
                    password
                }
                login(form)
                    .then((res) => {
                        if (res.data.meta.code === 200) {
                            this.$router.push('/home/index');
                            this.setUserName(form.username);
                        }
                    })
            }
        },
        computed: {
            
        }
    }
</script>

<style lang="less" scoped>
#login{
    display: flex;
    height: 100%;
    position: relative;
    background: url(../../assets/back.png) no-repeat;
    background-size: 100% 100%;
    justify-content: space-around;
    align-items: center;
    .logo{
        position: relative;
    }
}
.login-form{
    @form-height: 360px;
    display: flex;
    width:  @form-height;
    background-color: #fff;
    position: relative;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    h3{
        margin: 5px;
        text-align: center;
        font-size: 18px;    
    }
}
.signBtn{
    
}
</style>



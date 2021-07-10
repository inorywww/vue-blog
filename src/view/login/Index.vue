<template>
    <div class="login">
        <div class="login-form">
            <div class="logo-wrapper">
                <span class="icon-logo"></span>
            </div>
            <div class="input-wrapper">
                <input
                    required
                    type="text"
                    autocomplete="off"
                    class="form-input"
                    v-model="formData.account"
                    @keyup.enter="login"
                />
                <div class="underline"></div>
                <label class="input-title">Account</label>
            </div>
            <div class="input-wrapper">
                <input
                    required
                    type="password"
                    autocomplete="off"
                    class="form-input"
                    v-model="formData.password"
                    @keyup.enter="login"
                />
                <div class="underline"></div>
                <label class="input-title">Password</label>
            </div>
            <div class="submit-wrapper">
                <div class="submit-btn" @click="login">Login</div>
            </div>
        </div>
    </div>
</template>

<script>
import { alertInfo } from "@/utils/index";
import { encode } from "@/utils/auth";
import { login } from "@/api/admin";
export default {
    name: "login",
    data() {
        return {
            formData: {
                account: "",
                password: "",
            },
        };
    },
    methods: {
        authLoginInfo() {
            if (this.formData.account.length === 0) {
                alertInfo("账号不能为空哦~", "error");
                return false;
            }
            if (this.formData.password.length === 0) {
                alertInfo("密码不能为空哦~", "error");
                return false;
            }
            return true;
        },
        login() {
            if (this.authLoginInfo()) {
                // 加密密码
                this.formData.password = encode(this.formData.password);
                login(this.formData)
                    .then(() => {
                        this.$router.push('/dashboard');
                    })
                    .catch((err) => {
                        err;
                    });
            }
        },
    },
};
</script>

<style scoped>
.login {
    width: 100vw;
    height: 100vh;
    background: url("/static/image/login-bg.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-form {
    width: 350px;
    height: 70vh;
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
        0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
        0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px) saturate(150%);
    transition: all 0.3s ease;
    transform-origin: center;
}
.login-form:hover {
    box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157),
        0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28),
        0 7.3px 11px rgba(0, 0, 0, 0.346), 0 20px 30px rgba(0, 0, 0, 0.5);
}
.logo-wrapper {
    width: 100%;
    height: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    font-weight: 800;
    color: #fff;
}
.icon-logo {
    background: url("/logo.png") no-repeat;
    width: 128px;
    height: 128px;
}
.input-wrapper {
    position: relative;
    flex: 0 0 40px;
    width: 80%;
    margin: 0 auto 45px;
}
.form-input {
    padding: 0;
    position: relative;
    width: 100%;
    border: none;
    border-bottom: 2px solid #fff;
    background-color: transparent !important;
    height: 100%;
    font-size: 16px;
    color: #fff !important;
    outline: none;
}

.form-input:focus ~ .underline {
    transform: scaleX(1);
}
.form-input:focus ~ .input-title,
.form-input:valid ~ .input-title {
    transform: translateY(-16px);
    font-size: 20px;
}
.underline {
    position: absolute;
    width: 100%;
    height: 3px;
    left: 0;
    bottom: 0;
    transform: scaleX(0);
    transform-origin: center;
    background: #0ab9e6;
    transition: transform 0.3s ease;
}
.input-title {
    position: absolute;
    left: 0;
    bottom: 10px;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: transform 0.3s ease;
    font-family: Microsoft YaHei;
}
.submit-wrapper {
    flex: 0 0 40px;
    width: 60%;
    margin: 0 auto 8px;
}
.submit-btn {
    position: relative;
    display: flex;
    height: 100%;
    border: 2px solid #fff;
    padding: 4px 0;
    font-size: 25px;
    color: #fff;
    cursor: pointer;
    transition: transform 0.3s ease;
    justify-content: center;
    font-family: Microsoft YaHei;
}
.submit-btn:hover {
    transform: scale(0.9);
}
</style>
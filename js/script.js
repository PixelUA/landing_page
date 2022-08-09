const userName = document.getElementById('username')
const userPassword = document.getElementById('password')
const loginBtn = document.getElementById('login_btn')
const logoutBtn = document.getElementById('logout')
const userInfo = [...document.getElementsByClassName('user_info')]
const userNameReg = document.getElementById('reg_username')
const userPasswordReg = document.getElementById('reg_password')
const registerBtn = document.getElementById('register_btn')
const getUserInfo = [...document.getElementsByClassName('get_user_info')]

registerBtn.addEventListener('click', setUserInfo)
registerBtn.addEventListener('click', signUpValidation)
loginBtn.addEventListener('click', loginization)
loginBtn.addEventListener('click', loginValidation)
logoutBtn.addEventListener('click', logout)
document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        loginBtn.click()
    }
    if(e.key === 'Escape') {
        document.getElementById('close_btn').click()
    }
  });


$(document).ready(function(){
    checkIsLogined()

    $('.burger_menu').click(function(event){
        $('.burger_menu,.header_nav').toggleClass('active');
    });
    $('.main, footer').click(function(){
        $('.burger_menu, .header_nav').removeClass('active');
    });
    
    $('.login_btn').click(function(event){
        $('.login_form_cont').addClass('active');
        $('.login_form, .signup_form').removeClass('visibility');
    });

    $('.signup_btn').click(function(event){
        $('.login_form_cont').addClass('active');
        $('.login_form, .signup_form').addClass('visibility');
        
    });

    $('.cross').click(function(){
        inputNullStyles()
    });
});

function inputNullStyles() {
    $('#error_msg').removeClass('active');
    $('#error_login').removeClass('active')
    $('.login_form_cont').removeClass('active');

    getUserInfo.forEach(input => {
        input.style.border = '2px #828282 solid'
        input.value = ''
    })
    userInfo.forEach(input => {
        input.style.border = '2px #828282 solid'
        input.value = ''
    })
}

function setUserInfo() {
    if(userNameReg.value.length && userPasswordReg.value.length) {
        localStorage.setItem('user' + localStorage.length, JSON.stringify({
            username: userNameReg.value,
            password: userPasswordReg.value
        }))
    }
}

function signUpValidation() {
    const valuesLength = []

    getUserInfo.forEach(input => {
    const inputLength = input.value.length
        if (inputLength === 0) {
            input.style.border = '2px solid red'
            $('#error_msg').addClass('active');
        } else {
            input.style.border = '2px #828282 solid'
        }
        valuesLength.push(inputLength)
    })

    if (valuesLength.includes(0)) return

    inputNullStyles()
}

function loginValidation() {
    const userLength = []

    userInfo.forEach(check => {
    const inputValid = check.value.length
        if(inputValid === 0) {
            check.style.border = '2px solid red'
            $('#error_login').addClass('active')
        } else {
            check.style.border = '2px #828282 solid'
        }
        userLength.push(inputValid)
    })
    if (userLength.includes(0)) return
    
}

function loginization() {
    const userStore = []

    for(let id = 0; id < localStorage.length; id++) {
        userStore.push(JSON.parse(localStorage.getItem('user' + id)));
    }

    userStore.forEach(user => {
        if (userName.value === user.username) {
            if (userPassword.value === user.password) {
                localStorage.setItem('isLogined', JSON.stringify(true))
                $('.signup_btn, .login_btn').addClass('visible')
                $('.user_logo').addClass('active')
                const addLogo = document.querySelector('.search_login')
                let helloText = document.createElement('h4')
                helloText.setAttribute("id", "hello_user")
                helloText.textContent = 'Hello, ' + user.username
                addLogo.appendChild(helloText)
                document.location.reload()
                inputNullStyles()
                loginValidation()
            }
        }
    })
}

function checkIsLogined () {
    const isLogined = JSON.parse(localStorage.getItem('isLogined'))
    if (isLogined) {
        $('.signup_btn, .login_btn').addClass('visible')
        $('.user_logo').addClass('active')
        const addLogo = document.querySelector('.search_login')
        let helloText = document.createElement('h4')
        helloText.setAttribute("id", "hello_user")
        helloText.textContent = 'Hello'
        addLogo.appendChild(helloText)
    }
}


function logout () {
    localStorage.setItem('isLogined', JSON.stringify(false))
    $('.signup_btn, .login_btn').removeClass('visible')
    $('.user_logo').removeClass('active')
    document.getElementById('hello_user').remove()
    document.location.reload()
}


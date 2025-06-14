//눈 아이콘
document.addEventListener("DOMContentLoaded", function () {
    function setupPasswordToggle(inputId, openId, closeId) {
        const input = document.getElementById(inputId);
        const openIcon = document.getElementById(openId);
        const closeIcon = document.getElementById(closeId);

        openIcon.addEventListener("click", () => {
            input.type = "text";
            openIcon.style.display = "none";
            closeIcon.style.display = "inline";
        });

        closeIcon.addEventListener("click", () => {
            input.type = "password";
            closeIcon.style.display = "none";
            openIcon.style.display = "inline";
        });
    }

    // 두 개의 필드에 대해 각각 설정
    setupPasswordToggle("password", "ic_eye_open1", "ic_eye_close1");
    setupPasswordToggle("confirmpassword", "ic_eye_open2", "ic_eye_close2");
    });


//회원가입 유효성 검사
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmpassword');
const loginButton = document.querySelector('button[type="submit"]');

//오류 메시지 DOM요소 생성+삽입 , <div>에 추가됨
function createErrorMessage(input, message) {
    let error = input.nextElementSibling; //input 다음 형제 요소(태그 기준)
    if (!error || !error.classList.contains('error-message')){
        error = document.createElement('div');
        error.className = 'error-message';
        input.insertAdjacentElement('afterend', error);
    }
    error.textContent = message;
    error.style.color = 'var(--red)';
    input.style.border = '2px solid #f74747';
}

//오류 메시지 DOM요소 삭제 , <div>에 제거됨
function clearErrorMessage(input) {
    let error = input.nextElementSibling;
    if(error && error.classList.contains('error-message')) {
        error.remove();
    }
    input.style.border = '';
}

//올바른 이메일 형식 검사
function validateEmail(showMessage = true) {
    const value = emailInput.value.trim(); //trim : 공백 제거
    if(!value) {
        if (showMessage) createErrorMessage(emailInput, '이메일을 입력해주세요.');
        return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //정규 표현식
    if(!regex.test(value)) {
        if (showMessage) createErrorMessage(emailInput, '잘못된 이메일 형식입니다.');
        return false;
    }
    clearErrorMessage(emailInput); //입력 유효 에러 메시지 삭제
    return true;
}

//올바른 비밀번호 형식 검사
function validatePassword(showMessage = true) {
    const value = passwordInput.value.trim();
    if(!value) {
        if (showMessage) createErrorMessage(passwordInput, '비밀번호를 입력해주세요.');
        return false;
    }
    if(value.length < 8) {
        if (showMessage) createErrorMessage(passwordInput, '비밀번호를 8자 이상 입력해주세요.');
        return false;
    }
    clearErrorMessage(passwordInput);
    return true;
}

//올바른 비밀번호 확인 형식 검사
function validateConfirmPassword(showMessage = true) {
    const passwordValue = passwordInput.value.trim();
    const confirmValue = confirmPasswordInput.value.trim();

    if(!confirmValue) {
        if (showMessage) createErrorMessage(confirmPasswordInput, '비밀번호를 입력해주세요.');
        return false;
    }
    if(passwordValue !== confirmValue) {
        if (showMessage) createErrorMessage(confirmPasswordInput, '비밀번호를 일치하지 않습니다.');
        return false;
    }
    clearErrorMessage(confirmPasswordInput);
    return true;
}

//로그인 버튼 비활성화,활성화
function checkFormValidity(showMessage = true) {
    const isEmailValid = validateEmail(false);
    const isPasswordValid = validatePassword(false);
    const isConfirmPassword = validateConfirmPassword(false);
    loginButton.disabled = !(isEmailValid && isPasswordValid && isConfirmPassword);

    if (loginButton.disabled) {
        loginButton.style.backgroundColor = 'var(--gray400)';
    } else {
        loginButton.style.backgroundColor = 'var(--blue)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // blur: 입력 후 focus 빠졌을 때 메시지 표시
    emailInput.addEventListener('blur', () => {
        validateEmail(true);
        checkFormValidity();
    });

    passwordInput.addEventListener('blur', () => {
        validatePassword(true);
        checkFormValidity();
    });

    confirmPasswordInput.addEventListener('blur', () => {
        validateConfirmPassword(true);
        checkFormValidity();
    });

    // input 중에는 메시지 표시 X → showMessage = false
    emailInput.addEventListener('input', () => {
        validateEmail(false);
        checkFormValidity();
    });

    passwordInput.addEventListener('input', () => {
        validatePassword(false);
        checkFormValidity();
    });

    confirmPasswordInput.addEventListener('input', () => {
        validateConfirmPassword(false);
        checkFormValidity();
    });

    // submit 시는 항상 메시지 표시
    document.querySelector('form.login').addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateEmail(true) && validatePassword(true) && validateConfirmPassword(true)) {
            window.location.href = "/items";
        }
    });
});

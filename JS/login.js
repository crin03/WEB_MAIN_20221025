function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}

addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

const idsave_check = document.getElementById('idSaveCheck');

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('floatingInput');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");
    if(get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check(); // 세션 유무 검사
}

// 10주차 응용문제

function login_count() {
    let count = parseInt(getCookie("login_cnt"))|| 0;
    count++; 
    setCookie("login_cnt", count, 1);
}
  
function logout_count() {
    let count = parseInt(getCookie("logout_cnt")) || 0;
    count++;
    setCookie("logout_cnt", count, 1);
}

function logout() {
    session_del(); // 세션 삭제 
    clearTimeout(logoutTimer); // 14주차 연습문제 자동 로그아웃 타이머 정리
    location.href='../index.html';
    logout_count();
}
    
// 10주차 연습문제
function login_failed() {
    let fail_count = parseInt(getCookie("login_failed")) || 0;
    fail_count++;
    setCookie("login_failed", fail_count, 1);
    if (fail_count > 3) {
        alert("로그인 가능 횟수를 초과했습니다. 4분 간 로그인 할 수 없습니다.");
        document.getElementById('login_btn').disabled = true; // 로그인 횟수를 초과하면 로그인 시도를 할 수 없도록 제한
    } else {
        alert(fail_count + "회 로그인 실패(로그인 시도 3회 초과시 로그인이 제한됩니다.)");
    }
    return fail_count;
}

function init_logined(){
    if(sessionStorage) {
        decrypt_text(); // 복호화 함수
        startLogoutTimer(); // 14주차 연습문제
    } else {
        alert("세션 스토리지 지원 x");
    }
}

// 14주차 연습문제 (자동 로그아웃)
let logoutTimer; // 자동 로그아웃 타이머

function startLogoutTimer() {
    logoutTimer = setTimeout(function() {
        logout(); // 5분 후에 자동 로그아웃
        alert("자동 로그아웃 되었습니다.");
    }, 5 * 60 * 1000); // 5분 = 5 * 60 * 1000 밀리초
    // 5분 전에 팝업 표시
    setTimeout(function() {
        showPopup(); // 팝업 표시
    }, 4.5 * 60 * 1000); // 4.5분 = 4.5 * 60 * 1000 밀리초
}

function showPopup() {
    window.open("../popup/logoutPopup.html", "팝업테스트", "width=400, height=300, top=10, left=10");
}

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('floatingInput');
    const passwordInput = document.getElementById('floatingPassword');

    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    /*
    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }
    if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;
    }
    */
    // 8주차 응용문제 길이 제한 ( 테스트 편의상 주석처리 )
    /*
    if (emailValue.length > 10) {
        alert('아이디는 10글자 이하 입력해야 합니다.');
        return false;
    }
    if (passwordValue.length > 15) {
        alert('비밀번호는 반드시 15글자 이하 입력해야 합니다.');
        return false;
    }
    */

    // 응용문제 세글자 이상 반복 제한
    if (/(.{3,}).*\1/.test(emailValue)) {
        alert('아이디에는 3글자 이상의 반복 패턴을 사용할 수 없습니다.');
        login_failed();
        return false;
    }

    // 응용문제 연속된 숫자 2개이상 제한
    if (/^\d{2}/.test(emailValue)) {
        alert('아이디에는 연속된 숫자 2개 이상을 사용할 수 없습니다.');
        login_failed();
        return false;
    }
    
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;     
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        login_failed();
        return false;
    }

    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null; 
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        login_failed();
        return false;
    }
    
    const check_xss = (input) => {
        // DOMPurify 라이브러리 로드 (CDN 사용)
        const DOMPurify = window.DOMPurify;
        // 입력 값을 DOMPurify로 sanitize
        const sanitizedInput = DOMPurify.sanitize(input);
        // Sanitized된 값과 원본 입력 값 비교
        if (sanitizedInput !== input) {
            // XSS 공격 가능성 발견 시 에러 처리
            alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
            return false;
        }
        // Sanitized된 값 반환
        return sanitizedInput;
    };

    const sanitizedPassword = check_xss(passwordValue);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
    // check_xss 함수로 비밀번호 Sanitize

    if (!sanitizedEmail) {
        // Sanitize된 비밀번호 사용
        return false;
    }
    if (!sanitizedPassword) {
        // Sanitize된 비밀번호 사용
        return false;
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue); 

    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }
    else
    { // 아이디 체크 x
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
    }

    session_set(); // 세션 생성   
    loginForm.submit();
    
    login_count();

    startLogoutTimer();
};
    
document.getElementById("login_btn").addEventListener('click', check_input);
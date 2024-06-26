/*
function session_set() { //세션 저장
    let session_id = document.querySelector("#typeEmailX");
    let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색
    if (sessionStorage) {
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_Pass", en_text);
    } else {
        alert("로컬 스토리지 지원 x");
    }
}
*/

function session_set(){ //세션 저장(객체)    
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let random = new Date(); // 랜덤 타임스탬프
    
    const obj = { // 객체 선언
        id : id.value,
        otp : random
    }
    
    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}


function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_encrypted");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_object")) {
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html'; // 로그인된 페이지로 이동
    }
}

function session_del() {//세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_encrypted");
        sessionStorage.removeItem("Session_Storage_object");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_join_set(){ //세션 저장(객체)    
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let b_day = document.querySelector("#birthdayDate").value;
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress").value;
    let p_number = document.querySelector("#phoneNumber").value;
    let class_check = document.querySelector(".select form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프
    
    const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName); // John Doe
    console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890
    
    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_new_user", objString);
        sessionStorage.setItem("Session_Storage_new_user_encryted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    } 
}

// 14주차 응용문제
function session_join_get() { 
    if (sessionStorage) {
        const encryptedData = sessionStorage.getItem("Session_Storage_new_user_encryted");
        if (encryptedData) {
            const decryptedData = decrypt_text_join(encryptedData);
            console.log(decryptedData); // 복호화된 데이터 직접 출력
        } else {
            console.log("암호화된 데이터가 없습니다.");
        }
    } else {
        alert("세션 스토리지 지원 안됨");
    }
}

// 보강주 응용 문제
function login_check(event) {
    const sessionData = sessionStorage.getItem('Session_Storage_object');
    if (sessionData) {
        const userData = JSON.parse(sessionData);
        const userId = userData.id;
        if (!userId || userId !== 'clli0726@sungkyul.ac.kr') {
            event.preventDefault(); // 클릭동작 막기
            alert('접근 권한이 없습니다.');
            location.href = '../login/index_login.html';
        }
    } else {
        event.preventDefault();
        alert('로그인이 필요합니다.');
        location.href = '../login/login.html';
    }
}
// 링크 클릭 시 로그인 체크
const profileLink = document.querySelector('a.nav-link[href="login/profile.html"]');
if (profileLink) { 
    profileLink.addEventListener('click', function(event) {
        login_check(event); // 로그인 체크 수행
    });
}
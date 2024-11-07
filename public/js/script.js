function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUf4541fe0ab3ec57487ae76bbb39d948cb441447bdbf4fd34c93cd8a79b182dd7156a6a627311d7f543a76005bfcd4123' // ใส่ Application Key ที่ถูกต้อง
        },
        body: JSON.stringify({ "UserName": username, "PassWord": password })
    })
    .then(response => response.json())
    .then(data => {
        const popupMessage = document.getElementById('message'); // ใช้ 'message' เป็น element แสดงผลด้านล่างปุ่ม
        if (data.status) {
            // แสดงชื่อและคณะที่ดึงมาจาก API
            popupMessage.innerHTML = `
                <strong>Success</strong><br>
                <strong>ชื่อ:</strong> ${data.displayname_th}<br>
                <strong>คณะ:</strong> ${data.faculty}
            `;
            popupMessage.style.display = 'block';
        } else {
            alert("Error: ไม่สามารถ Login ได้สำเร็จ");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const popupMessage = document.getElementById('message');
        popupMessage.innerText = "An error occurred. Please try again.";
        popupMessage.style.display = 'block';
        popupMessage.style.color = 'red';
    });
}

function sHowpass() {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

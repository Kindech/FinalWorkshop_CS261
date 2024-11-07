const express = require('express');
const path = require('path');
const axios = require('axios'); // เพิ่ม axios สำหรับการเรียกใช้ API
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// กำหนดหน้าแรกให้แสดง index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ฟังก์ชันสำหรับตรวจสอบการล็อกอิน
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // เรียกใช้ TU API เพื่อเช็คการล็อกอิน
        const response = await axios.post('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
            UserName: username,
            PassWord: password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'YOUR_APPLICATION_KEY' // แทนที่ YOUR_APPLICATION_KEY ด้วย Application-Key ของคุณ
            }
        });

        const data = response.data;

        if (data.status) {
            // ล็อกอินสำเร็จ - ส่งข้อมูลไปแสดงใน main.html
            res.json({ success: true, message: "Login successful", userData: data });
        } else {
            // ล็อกอินไม่สำเร็จ - แสดงข้อความ error
            res.json({ success: false, message: data.message });
        }
    } catch (error) {
        // แสดงข้อความ error หากเกิดข้อผิดพลาด
        res.json({ success: false, message: "Error logging in" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

## 🚀 ระดับกลาง:

### เว็บแอปพลิเคชันแชร์สูตรอาหาร

**เป้าหมาย**: สร้างแพลตฟอร์มแบ่งปันสูตรอาหารพร้อมระบบยืนยันตัวตนผู้ใช้และฟังก์ชันการค้นหา

**ข้อกำหนด**:

- ผู้ใช้สามารถสร้างบัญชีและเข้าสู่ระบบได้ (อีเมล/รหัสผ่าน)
- สร้าง แก้ไข ลบ และแบ่งปันสูตรอาหารพร้อมส่วนผสม ขั้นตอน และรูปภาพ
- ค้นหาและกรองสูตรอาหารตามประเภทอาหาร ข้อจำกัดด้านอาหาร และเวลาทำอาหาร
- ให้คะแนนและรีวิวสูตรอาหารจากผู้ใช้รายอื่น
- อินเทอร์เฟซเว็บแบบตอบสนอง

## ✅ เฟสแรก (MVP) ที่ “ต้องมี”

1. **Authentication & User System**
   - สมัคร/เข้าสู่ระบบด้วยอีเมล + รหัสผ่าน
   - โปรไฟล์ผู้ใช้ (ชื่อ, รูป, bio เล็ก ๆ)

2. **Recipe Management**
   - CRUD สูตรอาหาร (สร้าง/แก้ไข/ลบ)
   - เก็บข้อมูล: ชื่อเมนู, ส่วนผสม, ขั้นตอน, เวลา, รูปภาพ

3. **Search & Filter**
   - ค้นหาตามชื่อเมนู
   - ฟิลเตอร์เบื้องต้น: ประเภทอาหาร (เช่น ของหวาน, อาหารเช้า), เวลาทำ

4. **Basic Engagement**
   - ระบบรีวิว + ให้คะแนน (⭐ 1-5)

5. **UI/UX**
   - เว็บ responsive ใช้งานง่ายทั้งมือถือและคอม

# 🗺️ User Journey Flow – MVP: เว็บแอปแชร์สูตรอาหาร

### 👤 1. ผู้ใช้ใหม่ (New User)

1. **Landing Page** → เห็นข้อความต้อนรับ + ปุ่ม "สมัคร / เข้าสู่ระบบ"
2. **Sign Up** → กรอกอีเมล + รหัสผ่าน → บันทึกข้อมูล → ไปหน้าโปรไฟล์
3. **Profile Setup (Optional)** → เพิ่มชื่อเล่น, รูปโปรไฟล์สั้น ๆ

---

### 🔑 2. ผู้ใช้ปัจจุบัน (Returning User)

1. **Login** → เข้าสู่ระบบด้วยอีเมล/รหัสผ่าน
2. **Dashboard (Home Feed)** →
   - แสดง “สูตรล่าสุด”
   - แสดง “สูตรยอดนิยม”
   - ปุ่ม “+ เพิ่มสูตรอาหารใหม่”

---

### 🍳 3. การจัดการสูตรอาหาร

- **Create Recipe**
  1. คลิก “+ เพิ่มสูตรอาหารใหม่”
  2. กรอก: ชื่อเมนู, ส่วนผสม, ขั้นตอน, เวลา, อัปโหลดรูปภาพ
  3. กด “บันทึก” → สูตรอาหารเผยแพร่

- **Edit/Delete Recipe**
  - เข้าไปที่สูตรที่ตนเองสร้าง → ปุ่มแก้ไข/ลบ

---

### 🔍 4. การค้นหา & กรอง

1. ผู้ใช้กรอกชื่อเมนู → ระบบแสดงผลลัพธ์ที่ตรง
2. ใช้ Filter → เช่น ประเภทอาหาร (ของหวาน, อาหารเช้า), เวลาในการทำ

---

### ⭐ 5. การมีส่วนร่วม

- **Review Recipe**
  - เข้าไปที่สูตรของคนอื่น → ให้คะแนน (⭐1–5) + รีวิวสั้น ๆ

- **ดูรีวิวของคนอื่น** → ช่วยตัดสินใจก่อนลองทำ

---

## 🧭 Flow สรุป (Text-based Diagram)

```
[Landing Page]
   → [Sign Up / Login]
       → [Dashboard]
           → [Search Recipes]
           → [View Recipe] → [Rate & Review]
           → [Create Recipe] → [Save Recipe]
           → [Edit/Delete Own Recipe]
```

## 🪅 Wireframe Flow

<?xml version='1.0' encoding='utf-8'?>

<mxfile host="app.diagrams.net"><diagram name="Wireframe Flow"><mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0"><root><mxCell id="0" /><mxCell id="1" parent="0" /><mxCell id="2" value="Landing Page&#10;[สมัคร / เข้าสู่ระบบ]" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="300" y="50" width="160" height="80" as="geometry" /></mxCell><mxCell id="3" value="Sign Up&#10;(อีเมล + รหัสผ่าน)" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="50" y="200" width="160" height="80" as="geometry" /></mxCell><mxCell id="4" value="Login&#10;(อีเมล + รหัสผ่าน)" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="500" y="200" width="160" height="80" as="geometry" /></mxCell><mxCell id="5" value="Dashboard&#10;สูตรล่าสุด / สูตรยอดนิยม / +เพิ่มสูตร" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="300" y="350" width="160" height="80" as="geometry" /></mxCell><mxCell id="6" value="Create Recipe&#10;(ชื่อ, ส่วนผสม, ขั้นตอน, เวลา, รูป)" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="50" y="500" width="160" height="80" as="geometry" /></mxCell><mxCell id="7" value="View Recipe&#10;(รายละเอียด + รีวิว)" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="300" y="500" width="160" height="80" as="geometry" /></mxCell><mxCell id="8" value="Search/Filter&#10;(ชื่อเมนู, ประเภท, เวลา)" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="550" y="500" width="160" height="80" as="geometry" /></mxCell><mxCell id="9" value="Rate &amp; Review&#10;(⭐1–5 + รีวิว)" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="300" y="700" width="160" height="80" as="geometry" /></mxCell><mxCell id="10" value="Edit/Delete Recipe" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1" attrib_extra="{'vertex': '1'}"><mxGeometry x="50" y="700" width="160" height="80" as="geometry" /></mxCell><mxCell id="11" edge="1" parent="1" source="2" target="3" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell><mxCell id="12" edge="1" parent="1" source="2" target="4" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell><mxCell id="13" edge="1" parent="1" source="3" target="5" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell><mxCell id="14" edge="1" parent="1" source="4" target="5" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell><mxCell id="15" edge="1" parent="1" source="5" target="6" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell><mxCell id="16" edge="1" parent="1" source="5" target="7" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell><mxCell id="17" edge="1" parent="1" source="5" target="8" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell><mxCell id="18" edge="1" parent="1" source="6" target="10" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell><mxCell id="19" edge="1" parent="1" source="7" target="9" style="endArrow=block;rounded=0;"><mxGeometry relative="1" as="geometry" /></mxCell></root></mxGraphModel></diagram></mxfile>

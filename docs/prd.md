# 📑 เอกสารความต้องการผลิตภัณฑ์ (PRD) – RecipeWire

## 1. 🎯 วิสัยทัศน์ & เป้าหมาย

สร้าง **แพลตฟอร์มแบ่งปันสูตรอาหาร** ที่ใช้งานง่าย ครอบคลุมทั้งการสร้าง แก้ไข และค้นหาสูตร พร้อมระบบรีวิวและการมีส่วนร่วมจากผู้ใช้ เป้าหมายคือการเป็น **ชุมชนด้านอาหาร** ที่เชื่อมต่อคนทำอาหารทั้งมือใหม่และมืออาชีพ

---

## 2. 👥 กลุ่มผู้ใช้เป้าหมาย

* **ผู้ใช้ทั่วไป/มือใหม่ทำอาหาร** → ต้องการสูตรที่ง่ายและค้นหาไว
* **ผู้ที่ชื่นชอบการทำอาหาร (Food Enthusiasts)** → ต้องการแบ่งปันสูตรและสร้างแบรนด์ส่วนตัว
* **ผู้ใช้ที่มีข้อจำกัดด้านอาหาร** → ต้องการกรองสูตร เช่น มังสวิรัติ, ไร้กลูเตน

---

## 3. 💡 คุณค่า (Value Proposition)

* **ใช้งานง่าย** → สร้าง/แชร์สูตรได้รวดเร็ว
* **ค้นหาสูตรตรงใจ** → Search + Filter
* **มีชุมชน** → ระบบรีวิวและการให้คะแนนเพิ่มความน่าเชื่อถือ
* **Responsive UX** → รองรับมือถือและเดสก์ท็อป

---

## 4. 📦 ขอบเขต MVP (0–3 เดือน)

* ✅ ระบบผู้ใช้ (สมัคร, เข้าสู่ระบบ, โปรไฟล์)
* ✅ การจัดการสูตรอาหาร (CRUD)
* ✅ ค้นหาและกรอง (ชื่อเมนู + ฟิลเตอร์พื้นฐาน)
* ✅ ระบบรีวิว + การให้คะแนน
* ✅ Responsive UI/UX

**Milestone:** เปิด **Beta Launch** เชิญ Early Adopters 100–200 คน

---

## 5. 🧭 User Flow (MVP)

### ผู้ใช้ใหม่ (New User)

1. Landing Page → สมัครสมาชิก
2. Sign Up → กรอกอีเมล/รหัสผ่าน → ตั้งค่าโปรไฟล์ (Optional)
3. Dashboard → เริ่มใช้งาน

### ผู้ใช้เดิม (Returning User)

1. Login → Dashboard
2. Dashboard แสดงสูตรล่าสุด / สูตรยอดนิยม

### Core Actions

* Create Recipe → Save → View/Edit/Delete
* Search/Filter Recipe → View Recipe → Rate & Review

---

## 6. 🛠️ ฟีเจอร์หลัก

### 6.1 Authentication & User System

* สมัคร/เข้าสู่ระบบด้วยอีเมล + รหัสผ่าน
* โปรไฟล์ผู้ใช้ (ชื่อ, รูป, bio)

### 6.2 Recipe Management

* CRUD สูตรอาหาร
* เก็บข้อมูล: ชื่อเมนู, ส่วนผสม, ขั้นตอน, เวลา, รูปภาพ

### 6.3 Search & Filter

* ค้นหาตามชื่อเมนู
* ฟิลเตอร์: ประเภทอาหาร, เวลา

### 6.4 Review & Rating

* ผู้ใช้สามารถรีวิวสูตรและให้คะแนน (⭐1–5)

### 6.5 Responsive UI/UX

* รองรับมือถือและเดสก์ท็อป
* ใช้งานง่าย (ตาม Wireframe Concept)

---

## 7. 🎨 UX & Wireframe Highlights

* **Landing Page** → Hero Section + สูตรเด่น
* **Dashboard** → Latest / Popular recipes + Search bar
* **Recipe Form** → Dynamic ingredient/step input + Preview
* **Recipe View** → Ingredients, Steps, Reviews
* **Search Page** → Filters (ประเภท, เวลา, ข้อจำกัดอาหาร)

---

## 8. 🗺️ Roadmap

* **Phase 1 (0–3 เดือน)** → MVP + Beta Launch
* **Phase 2 (4–6 เดือน)** → Social features, advanced dietary filters, personalized feed
* **Phase 3 (7–12 เดือน)** → Gamification, AI recipe suggestion, scaling infra
* **Phase 4 (12+ เดือน)** → Marketplace, Premium features, Partnerships

---

## 9. 📊 ตัวชี้วัดความสำเร็จ (Success Metrics)

* จำนวนผู้ใช้ใหม่ต่อเดือน
* จำนวนสูตรที่ถูกสร้าง/แชร์ต่อวัน
* เวลาเฉลี่ยต่อ session
* Retention Rate ≥ 40% ภายใน 30 วัน

---

## 10. ⚠️ ความเสี่ยงหลัก

* การแข่งขันสูง (Cookpad, Food52)
* คุณภาพ Content อาจไม่น่าเชื่อถือ
* Scalability หากมีผู้ใช้เพิ่มขึ้นเร็วเกินไป

---

## 11. 📌 ข้อสมมติ (Assumptions)

* ผู้ใช้พร้อมสร้าง Content ตั้งแต่ช่วง Beta
* ผู้ใช้คุ้นเคยกับการสมัคร/เข้าสู่ระบบด้วยอีเมล
* MVP เพียงพอในการดึงดูด Early Adopters
import express from 'express';
import { users } from "../data.js";

const router = express.Router();

// 1. عرض كل المستخدمين أو مستخدم واحد (GET)
router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id == id);
    if (!user) return res.status(404).json({ message: "user not found" });
    res.json({ message: "user found", user });
});

// 2. إضافة مستخدم جديد (POST)
router.post('/', (req, res) => {
    const newId = users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1;
    const newUser = { id: newId, ...req.body };
    users.push(newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
});

// 3. تحديث الباسورد (PATCH)
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);

    if (index === -1) return res.status(404).json({ message: "user not found" });

    // التحقق من البيانات (Validation) بقى أسهل بكتير
    if (typeof req.body.password !== "string") {
        return res.status(400).json({ message: "password is required" });
    }

    users[index].password = req.body.password;
    res.json({ message: "User password updated successfully", user: users[index] });
});

// 4. حذف مستخدم (DELETE)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);

    if (index === -1) return res.status(404).json({ message: "user not found" });

    const deletedUser = users.splice(index, 1)[0];
    res.json({ message: "user deleted", user: deletedUser });
});

export default router;
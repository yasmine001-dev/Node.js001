import express from 'express';
import { categories } from "../data.js";

const router = express.Router();

// 1. عرض كل الفئات (GET)
// الـ '/' هنا تعادل '/api/categories'
router.get('/', (req, res) => {
    res.json(categories); 
});

// 2. إضافة فئة جديدة (POST)
router.post('/', (req, res) => {
    try {
        let newId = 1;
        if (categories.length > 0) {
            const lastCategory = categories[categories.length - 1];
            newId = Number(lastCategory.id) + 1;
        }

        // البيانات جاهزة في req.body بفضل express.json()
        const newCategory = { id: newId, ...req.body };
        categories.push(newCategory);

        res.status(201).json({
            message: "Category created successfully",
            category: newCategory,
        });
    } catch (error) {
        res.status(400).json({ message: "Invalid JSON data" });
    }
});

export default router;
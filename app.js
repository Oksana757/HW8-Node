import express from 'express';
import Book from './models/book.js'; 

const app = express();
const PORT = 3000;

// Middleware для работы с JSON (обязательно для POST и PUT запросов)
app.use(express.json());



// 1. GET /books — Получить список всех книг
app.get('/books', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении списка книг" });
    }
});

// 2. POST /books — Создать новую запись о книге
app.post('/books', async (req, res) => {
    try {
        // Данные приходят в req.body (title, author, year)
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        console.error("ОШИБКА SEQUELIZE:", error);
        res.status(400).json({ error: "Не удалось создать книгу. Проверьте данные." });
    }
});

// 3. PUT /books/:id — Обновить данные книги по ID
app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // update возвращает массив, где первый элемент — количество измененных строк
        const [updated] = await Book.update(req.body, {
            where: { id: id }
        });

        if (updated) {
            const updatedBook = await Book.findByPk(id);
            res.json({ message: "Книга обновлена", book: updatedBook });
        } else {
            res.status(404).json({ error: "Книга не найдена" });
        }
    } catch (error) {
        res.status(500).json({ error: "Ошибка при обновлении" });
    }
});

// 4. DELETE /books/:id — Удалить книгу по ID
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.json({ message: "Книга успешно удалена" });
        } else {
            res.status(404).json({ error: "Книга не найдена" });
        }
    } catch (error) {
        res.status(500).json({ error: "Ошибка при удалении" });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер библиотеки запущен: http://localhost:${PORT}`);
});
import fs from 'fs';

const filePath = "./pages/api/apartment.json"
const allowedMethods = ['GET', 'POST', 'DELETE'];

export default function handler(req, res) {
    if (req.method in allowedMethods) {
        // res.status(405).end(); // Method Not Allowed
        res.status(405).json({
            message: `Method ${req.method} Not Allowed`
        })
        return
    }

    try {
        switch (req.method) {
            case 'GET':
                const data = fs.readFileSync(filePath, {
                    encoding: 'utf-8'
                });
                res.status(200).json(JSON.parse(data));
                break
            case 'POST':
                break
            case 'DELETE':
                break
        }
    } catch (e) {
        res.status(500).json({
            message: e.message,
        })
        return
    }
}
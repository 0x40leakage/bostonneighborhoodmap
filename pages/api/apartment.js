import fs from 'fs';

const filePath = "./pages/api/apartment.json"
const allowedMethods = ['GET', 'POST'];

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
                if (data) {
                    const apartments = JSON.parse(data)
                    console.log('apartments', apartments.length)
                    res.status(200).json(apartments);
                } else {
                    res.status(200).json([]);
                }
                break
            case 'POST':
                const newApartment = req.body
                let fileContent = fs.readFileSync(filePath, {
                    encoding: 'utf-8',
                })
                if (!fileContent) {
                    fileContent = "[]"
                }
                const savedApartments = JSON.parse(fileContent)
                const idx = savedApartments.findIndex(({ lat, lng }) => lat === newApartment.lat && lng === newApartment.lng)

                let action
                if (idx === -1) {
                    action = 'add'
                    savedApartments.push(newApartment)
                } else {
                    action = 'remove'
                    // delete savedApartments[idx]
                    savedApartments.splice(idx, 1)
                }
                fs.writeFileSync(filePath, JSON.stringify(savedApartments))
                res.status(200).json(`${action} success`)
                break
        }
    } catch (e) {
        res.status(500).json({
            message: e.message,
        })
        return
    }
}
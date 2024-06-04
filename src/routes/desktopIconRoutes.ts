import { Router, Request, Response } from 'express'
import multer from 'multer'
import { DesktopIcon } from '../models/image'

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/upload', upload.single('image'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.')
    }    

    const { originalname, buffer,  mimetype } = req.file

    const newImage = new DesktopIcon({
        filename: originalname,
        contentType: mimetype,
        imageData: buffer,
    })    

    try{
        await newImage.save()
        res.status(201).send(newImage)
    } catch (e) {
        console.error(e);
        res.status(500).send(e)
    }
})

router.get('/get/:id', async (req: Request, res: Response) => {
    try{

        const image = await DesktopIcon.findById(req.params.id)
        
        if (!image) {
            return res.status(404).send('Image not found')
        }
        
        res.set('Content-Type', image.contentType)
        
        res.send(image.imageData)
    } catch (e) {
        console.error('Error retrieving image', e)
        res.status(500).send('Error retrieving image')
    }
})

export default router
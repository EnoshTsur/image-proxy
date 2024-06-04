import { Schema, model, Document } from 'mongoose'

export interface IImage extends Document {
    readonly filename: string
    readonly contentType: string
    readonly imageData: Buffer
}

const imageSchema = new Schema<IImage>({
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    imageData: {
        type: Buffer,
        required: true,
    }
})

export const BackgroundWallpaper = model<IImage>('backgruond-wallpapers', imageSchema)
export const DesktopIcon = model<IImage>('desktop-icons', imageSchema)


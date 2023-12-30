import {z} from "zod";

export const editLocationSchema = z.object({
    location: z.string(),
})

export const editDescriptionSchema = z.object({
    description: z.string(),
})

export const editMessageSchema = z.object({
    messages_content: z.string().array().optional(),
    messages_senderId: z.string().array().optional(),
    messages_senderName: z.string().array().optional(),
})
import * as z from "zod"


export const eventFormSchema = z.object({
    
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
  location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters'),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url()
  })

export const orderFormSchema = z.object({
  whatsappNumber: z.string().min(1, 'WhatsApp number is required'),
  totalAmount: z.string().min(1, 'Total amount is required'),
  eventId: z.string().min(1, 'Event ID is required'),
  buyerName: z.string().min(1, 'Buyer name is required'),
  buyerNumber: z.string().min(1, 'Buyer number is required'),
  buyerEmail: z.string().email('Invalid email address'),
  status: z.enum(['pending', 'processing', 'completed', 'cancelled', 'refunded'], {
    required_error: 'Status is required'
  }),
  createdAt: z.string().min(1, 'Creation date is required'),
})
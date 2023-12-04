import * as z from "zod"

export const signInSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido",
  }),
  password: z.string().min(3, {
    message: "Senha é obrigatória"
  })
})

export const signUpSchema = z.object({
  name: z.string().min(4, {
    message: "Nome é obrigatório"
  }),
  cpf: z.string().min(11, {
    message: "CPF inválido",
  }).max(11, {
    message: "CPF inválido"
  }),
  phoneNumber: z.string().min(11, {
    message: "Celular deve conter no mínimo 11 caracteres"
  }),
  email: z.string().email({
    message: "E-mail inválido",
  }),
  password: z.string().min(3, {
    message: "Senha é obrigatória"
  }),
  confirmPassword: z.string().min(3, {
    message: "Confirmação de senha é obrigatória"
  })
})

export const productSchema = z.object({
  name: z.string().min(4, {
    message: "Nome é obrigatório"
  }),
  description: z.string().min(4, {
    message: "Nome é obrigatório"
  }),
  price: z.string().min(1, {
    message: "Preço é obrigatório"
  }),
  image: z.string().min(10, {
    message: "Imagem é obrigatória"
  })
})

export const addressSchema = z.object({
  street: z.string().min(2, {
    message: "Rua é obrigatório"
  }),
  number: z.string().min(1, {
    message: "Número é obrigatório"
  }),
  zipcode: z.string().min(8, {
    message: "CEP é obrigatório"
  }),
  neighborhood: z.string().min(2, {
    message: "Bairro é obrigatório"
  }),
  city: z.string().min(2, {
    message: "Cidade é obrigatório"
  }),
  state: z.string().min(2, {
    message: "Estado é obrigatório"
  }),
  complement: z.string().min(0)
})




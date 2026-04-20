export const regs = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]*$/,
  fileImage: /\.(png|jpeg|jpg|avif|webp)$/,
} as const

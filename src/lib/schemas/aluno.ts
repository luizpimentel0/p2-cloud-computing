import { z } from 'zod';

export const alunoSchema = z.object({
  nome_completo: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(150, 'Nome muito longo'),

  usuario_acesso: z
    .string()
    .min(1, 'Usuário é obrigatório')
    .min(3, 'Usuário deve ter pelo menos 3 caracteres')
    .max(50, 'Usuário muito longo')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Apenas letras, números e ._-'),

  senha: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha muito longa'),

  email_aluno: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .max(150, 'Email muito longo'),

  observacao: z
    .string()
    .max(300, 'Observação muito longa')
    .optional()
    .or(z.literal('')),
});

export type AlunoSchema = z.infer<typeof alunoSchema>;

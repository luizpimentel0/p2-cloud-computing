import { prisma } from '@/lib/db/prisma';
import { AlunoSchema } from '@/lib/schemas/aluno';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

interface CreateAlunoResponse {
  message: string;
  aluno?: {
    id_aluno: string;
    nome_completo: string;
    usuario_acesso: string;
    email_aluno: string;
  };
}

/**
 * Cria um novo aluno no banco de dados
 * @param data - Dados do aluno validados pelo schema Zod
 * @returns Objeto com mensagem de sucesso e dados do aluno criado
 * @throws Error se houver duplicação de usuário/email ou erro de banco
 */
export async function createAluno(
  data: AlunoSchema
): Promise<CreateAlunoResponse> {
  try {
    const senha_hash = await bcrypt.hash(data.senha, 10);
    const id_aluno = uuidv4();
    const aluno = await prisma.aluno.create({
      data: {
        id_aluno,
        nome_completo: data.nome_completo,
        usuario_acesso: data.usuario_acesso,
        senha_hash,
        email_aluno: data.email_aluno,
        observacao: data.observacao || null,
      },
      select: {
        id_aluno: true,
        nome_completo: true,
        usuario_acesso: true,
        email_aluno: true,
      },
    });

    return {
      message: 'Aluno cadastrado com sucesso!',
      aluno,
    };
  } catch (error: any) {
    console.error('❌ Erro no service:', error);

    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      if (field === 'usuario_acesso') {
        throw new Error('Nome de usuário já cadastrado');
      }
      if (field === 'email_aluno') {
        throw new Error('Email já cadastrado');
      }
      throw new Error('Usuário ou email já cadastrado');
    }

    if (error.code === 'P1001') {
      throw new Error('Não foi possível conectar ao banco de dados');
    }

    if (error.code?.startsWith('P')) {
      throw new Error(`Erro no banco de dados: ${error.message}`);
    }

    throw new Error('Erro ao cadastrar aluno');
  }
}

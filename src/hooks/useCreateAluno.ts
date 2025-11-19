import { useMutation } from '@tanstack/react-query';
import { AlunoSchema } from '@/lib/schemas/aluno';

interface CreateAlunoResponse {
  message: string;
  aluno?: {
    id_aluno: string;
    nome_completo: string;
    usuario_acesso: string;
    email_aluno: string;
  };
}

async function createAluno(data: AlunoSchema): Promise<CreateAlunoResponse> {
  const response = await fetch('/api/alunos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Erro ao cadastrar aluno');
  }

  return result;
}

export function useCreateAluno() {
  return useMutation({
    mutationFn: createAluno,
    onSuccess: (data) => {
      console.log('Mutation success:', data);
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error.message);
    },
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { createAluno } from '@/lib/api/alunoService';
import { alunoSchema } from '@/lib/schemas/aluno';

export async function POST(req: NextRequest) {
  try {
    console.log('Recebendo requisição POST /api/alunos');

    const body = await req.json();
    console.log('Body recebido:', body);

    const validationResult = alunoSchema.safeParse(body);

    if (!validationResult.success) {
      console.log('❌ Validação falhou:', validationResult.error);
      return NextResponse.json(
        {
          message: 'Dados inválidos',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    console.log('Validação passou, chamando service...');

    const result = await createAluno(validationResult.data);

    console.log('Aluno criado com sucesso:', result.aluno?.id_aluno);

    return NextResponse.json(result, { status: 201 });

  } catch (error: any) {
    console.error('Erro na API:', error);
    console.error('Mensagem:', error.message);
    console.error('Stack:', error.stack);

    if (error.message.includes('já cadastrado')) {
      return NextResponse.json(
        { message: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        message: 'Erro interno no servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

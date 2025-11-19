import { NextRequest, NextResponse } from 'next/server';
import { createAluno } from '@/lib/api/alunoService';
import { alunoSchema } from '@/lib/schemas/aluno';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationResult = alunoSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Dados inválidos',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const result = await createAluno(validationResult.data);
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

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { alunoSchema, AlunoSchema } from '@/lib/schemas/aluno';
import { useCreateAluno } from '@/hooks/useCreateAluno';
import FormInput from './form-input.component';
import FormTextarea from './form-textarea.component';
import Toast from './toast.component';

export default function AlunoForm() {
  const createAlunoMutation = useCreateAluno();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AlunoSchema>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome_completo: '',
      usuario_acesso: '',
      senha: '',
      email_aluno: '',
      observacao: '',
    },
  });

  const onSubmit = (data: AlunoSchema) => {
    createAlunoMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center tracking-tight">
              Cadastro de Aluno
            </h2>
            <p className="text-blue-100 text-center text-sm mt-2">
              Preencha os dados para criar uma nova conta
            </p>
          </div>

          <div className="px-8 py-6">
            {createAlunoMutation.isSuccess && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <Toast
                  message="Aluno cadastrado com sucesso!"
                  variant="success"
                  onClose={() => createAlunoMutation.reset()}
                />
              </div>
            )}

            {createAlunoMutation.isError && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                <Toast
                  message={createAlunoMutation.error.message}
                  variant="error"
                  onClose={() => createAlunoMutation.reset()}
                />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormInput
                name="nome_completo"
                label="Nome Completo"
                type="text"
                control={control}
                error={errors.nome_completo}
                placeholder="Ex: João Silva"
              />

              <FormInput
                name="usuario_acesso"
                label="Usuário de Acesso"
                type="text"
                control={control}
                error={errors.usuario_acesso}
                placeholder="Ex: joao.silva"
              />

              <FormInput
                name="senha"
                label="Senha"
                type="password"
                control={control}
                error={errors.senha}
                placeholder="Mínimo 6 caracteres"
              />

              <FormInput
                name="email_aluno"
                label="Email"
                type="email"
                control={control}
                error={errors.email_aluno}
                placeholder="Ex: joao@exemplo.com"
              />

              <FormTextarea
                name="observacao"
                label="Observação (opcional)"
                control={control}
                placeholder="Adicione comentários adicionais..."
              />

              <button
                type="submit"
                disabled={createAlunoMutation.isPending}
                className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <span className="relative flex items-center justify-center gap-2">
                  {createAlunoMutation.isPending ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Cadastrar
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-4 border-t border-slate-200">
            <p className="text-center text-sm text-slate-600">
              Todos os campos marcados são obrigatórios
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

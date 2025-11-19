import { Control, Controller } from 'react-hook-form';
import { AlunoSchema } from '@/lib/schemas/aluno';

interface FormTextareaProps {
  name: keyof AlunoSchema;
  label: string;
  control: Control<AlunoSchema>;
  placeholder?: string;
}

export default function FormTextarea({
  name,
  label,
  control,
  placeholder,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700 tracking-wide"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            placeholder={placeholder}
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
          />
        )}
      />
    </div>
  );
}

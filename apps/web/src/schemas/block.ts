import { z } from 'zod';

export const blockFormSchema = z.object({
  userId: z
    .string()
    .min(1, 'ユーザーIDを入力してください')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'ユーザーIDは英数字とアンダースコアのみ使用できます',
    )
    .max(50, 'ユーザーIDは50文字以内で入力してください'),
  description: z
    .string()
    .max(200, '説明は200文字以内で入力してください')
    .optional(),
});

export type BlockFormData = z.infer<typeof blockFormSchema>;

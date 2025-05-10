import { z } from 'zod';

export const blockFormSchema = z.object({
  userId: z
    .string()
    .min(1, 'ユーザーIDを入力してください')
    .max(20, 'ユーザーIDは20文字以内で入力してください')
    .regex(/^\d+$/, 'ユーザーIDは数字のみ入力可能です'),
  description: z
    .string()
    .max(500, '備考は500文字以内で入力してください')
    .optional(),
});

export type BlockFormData = z.infer<typeof blockFormSchema>;

import z from 'zod';

export const settingsResponseSchema = z.object({
  providers: z.array(
    z.object({
      key: z.string(),
      name: z.string(),
    })
  ),
});

export type SettingsResponseType = z.infer<typeof settingsResponseSchema>;

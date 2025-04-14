import { expect, test } from 'vitest';
import { z } from 'zod';
import { env } from 'cloudflare:test';

test('validate bindings', async () => {
	// had to switch from z.object() to z.interface() after moving to Zod 4
	// because z.function() can't be used in objects for some reason??
	const DOBindingSchema = z.object({
		get: z.function(),
		idFromName: z.function(),
		idFromString: z.function(),
	});

	const BindingsSchema = z.object({
		MY_DURABLE_OBJECT: DOBindingSchema,
	});

	// not trying to extract the DO binding using Zod, I just want to validate
	// that the shape looks more or less correct

	expect(BindingsSchema.safeParse(env).success).toBe(true); // should be true, but doesn't work in zod 4

	expect(() => BindingsSchema.parse(env)).not.toThrow();
});

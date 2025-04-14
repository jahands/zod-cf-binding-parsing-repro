import { expect, test } from 'vitest';
import { z } from 'zod';
import { env } from 'cloudflare:test';

test('validate bindings', async () => {
	// had to switch from z.object() to z.interface() after moving to Zod 4
	// because z.function() can't be used in objects for some reason??
	const DOBindingSchema = z.interface({
		get: z.function(),
		idFromName: z.function(),
		idFromString: z.function(),
	});

	// not trying to extract the DO binding using Zod, I just want to validate
	// that the shape looks more or less correct

	// Note: This throws an internal Zod error in 4.0.0-beta.20250414T061543 for some reason???
	expect(DOBindingSchema.safeParse(env.MY_DURABLE_OBJECT).success).toBe(false); // should be true, but doesn't work in zod 4

	// in Zod 4, this throws an error:
	expect(() => DOBindingSchema.parse(env.MY_DURABLE_OBJECT)).toThrowErrorMatchingInlineSnapshot(`
		ZodError {
		  "issues": [
		    {
		      "code": "invalid_type",
		      "expected": "object",
		      "message": "Invalid input: expected object, received DurableObjectNamespace",
		      "path": [],
		    },
		  ],
		}
	`);
});

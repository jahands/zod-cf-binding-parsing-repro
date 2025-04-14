import { describe, it, expect, test } from "vitest"
import { z } from "zod"
import { env } from "cloudflare:test"

test("validate bindings", async () => {
  // had to switch from z.object() to z.interface() after moving to Zod 4
  // because z.function() can't be used in objects for some reason??
  const DOBindingSchema = z.interface({
    get: z.function(),
    idFromName: z.function(),
    idFromString: z.function(),
  })

  const BindingsSchema = z.interface({
    MY_DURABLE_OBJECT: DOBindingSchema,
  })

  // not trying to extract the DO binding using Zod, I just want to validate
  // that the shape looks more or less correct

  expect(BindingsSchema.safeParse(env)).toBe(false) // should be true, but doesn't work in zod 4

  // here's the error we get:
  expect(() => BindingsSchema.parse(env)).toMatchInlineSnapshot()
})

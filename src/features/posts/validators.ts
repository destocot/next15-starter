import * as v from "valibot";

export const CreatePostSchema = v.object({
  title: v.pipe(
    v.string("Title must be a string."),
    v.nonEmpty("Please enter a title."),
    v.minLength(6, "Title must have 6 characters or more."),
    v.maxLength(100, "Title must have 100 characters or less."),
    v.trim(),
  ),
  content: v.pipe(
    v.string("Content must be a string."),
    v.nonEmpty("Please enter content."),
    v.minLength(10, "Content must have 10 characters or more."),
    v.maxLength(1000, "Content must have 1000 characters or less."),
    v.trim(),
  ),
});

export const UpdatePostSchema = v.pipe(
  v.object({
    ...v.partial(CreatePostSchema).entries,
    id: v.pipe(
      v.string("ID must be a string."),
      v.nonEmpty("ID must not be empty."),
      v.cuid2("ID must be a valid CUID."),
    ),
  }),
  v.forward(
    v.check((input) => {
      return Object.keys(input).length > 0;
    }, "Please enter a title or content."),
    ["content"],
  ),
);

export type CreatePostInput = v.InferInput<typeof CreatePostSchema>;
export type CreatePostOutput = v.InferOutput<typeof CreatePostSchema>;

export type UpdatePostInput = v.InferInput<typeof UpdatePostSchema>;
export type UpdatePostOutput = v.InferOutput<typeof UpdatePostSchema>;

import { protectedProcedure, publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateGiftSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const GiftRouter = router({
  createOne: protectedProcedure
    .input(ZCreateGiftSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.gift.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.gift.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.gift.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.gift.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateGiftSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.gift.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: ZCreateBaseServiceSchema.partial().extend({
          data: ZCreateGiftSchema.partial(),
          type: z.literal("gift").default("gift"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.gift.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.gift.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.gift.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});

"use client";

import Loading from "@/app/loading";
import type { Database } from "@/lib/database.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
});

const ResetPassword = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${location.origin}/auth/reset-password/confirm`,
      });

      if (error) {
        setMessage("エラーが発生しました。" + error.message);
        return;
      }

      setMessage("パスワードリセットに必要なメールを送信しました。");

    } catch (error) {
      setMessage("エラーが発生しました。" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <div className="text-center font-bold text-xl mb-10">
        パスワードを忘れた場合
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">メールアドレス</div>
          <input
            type="email"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            placeholder="メールアドレス"
            id="email"
            {...register("email", { required: true })}
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.email?.message}
          </div>
        </div>

        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              送信
            </button>
          )}
        </div>
      </form>

      {message && (
        <div className="my-5 text-center text-sm text-red-500">{message}</div>
      )}
    </div>
  );
};

export default ResetPassword;

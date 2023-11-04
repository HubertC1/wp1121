"use client";

import { useRef } from "react";

import { ChevronDown } from "lucide-react";

import GrowingTextarea from "@/components/GrowingTextarea";
import UserAvatar from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import { useRouter,usePathname,useSearchParams } from "next/navigation";

export default function SearchBar() {
  const { username, handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet, loading } = useTweet();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handleAddTweet = async () => {
    const params = new URLSearchParams(searchParams);
    params.set("username", username!);
    params.set("handle", handle!);
    params.set("editing", "true");
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleSearch = async () => {
    const searchName = textareaRef.current?.value;
    const params = new URLSearchParams(searchParams);
    params.set("searching", searchName!);
    router.push(`${pathname}?${params.toString()}`)
    textareaRef.current!.value="";
  }

  const handleChangeName = async () => {
    const params = new URLSearchParams(searchParams);
    params.set("username", "");
    params.set("handle", "");
    params.set("editing", "false");
    router.push(`${pathname}?${params.toString()}`);
  }
  // const handleTweet = async () => {
  //   const content = textareaRef.current?.value;
  //   if (!content) return;
  //   if (!handle) return;

  //   try {
  //     await postTweet({
  //       handle,
  //       content,
  //     });
  //     textareaRef.current.value = "";
  //     // this triggers the onInput event on the growing textarea
  //     // thus triggering the resize
  //     // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
  //     textareaRef.current.dispatchEvent(
  //       new Event("input", { bubbles: true, composed: true }),
  //     );
  //   } catch (e) {
  //     console.error(e);
  //     alert("Error posting tweet");
  //   }
  //   const params = new URLSearchParams(searchParams);
  //   params.set("username", username!);
  //   params.set("handle", handle!);
  //   params.set("editing", "false");
  //   router.push(`${pathname}?${params.toString()}`);
  // };

  return (
    <>
      <div className="flex justify-between">
        <UserAvatar className="h-12 w-12" />
        <article className="mt-2 whitespace-pre-wrap">Username: {username}</article>
        <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={handleChangeName}
            disabled={loading}
          >
            切換使用者
          </button>
      </div>
      <div className="flex w-full flex-col px-2">
        <div className="flex mb-2 mt-6 justify-between">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="搜尋活動"
            
          />
          <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={handleSearch}
            disabled={loading}
          >
            搜尋
          </button>
        </div>
        <Separator />

        <div className="flex justify-end">
          <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={handleAddTweet}
            disabled={loading}
          >
            新增活動
          </button>
        </div>
      </div>
    </>

  );
}

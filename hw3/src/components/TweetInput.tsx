"use client";

import { useRef } from "react";

import { ChevronDown } from "lucide-react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

import GrowingTextarea from "@/components/GrowingTextarea";
import UserAvatar from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";
import { useRouter,usePathname,useSearchParams } from "next/navigation";

import { validateDate } from "@/lib/utils";

export default function TweetInput() {
  const { username, handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const startdateRef = useRef<HTMLInputElement>(null);
  const enddateRef = useRef<HTMLInputElement>(null);
  const { postTweet, loading } = useTweet();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;
    const start = startdateRef.current?.value;
    if (!start) return;
    const end = enddateRef.current?.value;
    if(!end) return;
    if (validateDate(start,end) === false){
      alert("dates must be valid and within 7 days!");
      return;
    }
    try {
      await postTweet({
        handle,
        content,
        start,
        end,
      });
      textareaRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
    const params = new URLSearchParams(searchParams);
    params.set("username", username!);
    params.set("handle", handle!);
    params.set("editing", "false");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    // <div className="flex gap-4" onClick={() => textareaRef.current?.focus()}>
    <div className="flex gap-4">
      <UserAvatar className="h-12 w-12" />
      <div className="flex w-full flex-col px-2">
        <button className="flex w-fit items-center rounded-full border-[1px] border-gray-300 px-2 text-sm font-bold text-brand">
          Everyone
          <ChevronDown size={16} className="text-gray-300" />
        </button>
        <div className="mb-2 mt-6">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="去中央球場打球！"
          />
          <Label htmlFor="name" className="text-right">
            Start time
          </Label>
          <Input
            placeholder="1990-07-02-05"
            // defaultValue={searchParams.get("username") ?? ""}
            // className={cn(usernameError && "border-red-500", "col-span-3")}
            className={cn("border-red-500", "col-span-3")}
            ref={startdateRef}
          />
          <Label htmlFor="name" className="text-right">
            End time
          </Label>
          <Input
            placeholder="1990-07-08-04"
            // defaultValue={searchParams.get("username") ?? ""}
            // className={cn(usernameError && "border-red-500", "col-span-3")}
            className={cn("border-red-500", "col-span-3")}
            ref={enddateRef}
          />
        </div>
        <Separator />
        <div className="flex justify-end">
          <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={handleTweet}
            disabled={loading}
          >
            新增
          </button>
        </div>
      </div>
    </div>
  );
}

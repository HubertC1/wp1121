"use client";

import Link from "next/link";

import { BadgeCheck} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getAvatar } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

// import LikeButton from "./LikeButton";
import TimeText from "./TimeText";
// import { useEffect, useState } from "react";

type TweetProps = {
  username?: string;
  handle?: string;
  id: number;
  authorName: string;
  authorHandle: string;
  content: string;
  start: string;
  end: string;
  likes: number;
  createdAt: Date;
  liked?: boolean;
  isReply: boolean;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Tweet({
  username,
  handle,
  id,
  authorName,
  authorHandle,
  content,
  start,
  end,
  likes,
  createdAt,
  liked,
  isReply,
}: TweetProps) {
  // const searchParams = useSearchParams();
  // useEffect(() => {
  //     const username = searchParams.get("username");
  //     const handle = searchParams.get("handle");
  //     const editing = searchParams.get("editing");
  //   // if any of the username or handle is not valid, open the dialog
  //   // setDialogOpen(!validateUsername(username) || !validateHandle(handle));
  // }, [searchParams]);
  const IsSearched = () => {
    const SearchParam = useSearchParams();
    const searching = SearchParam.get("searching");
    // console.log(searching);
    // console.log(content);
    if (searching === null || searching === ""){
      // alert("fuck1!");
      return true;
    }
    if (content.includes(searching!)){
      // alert("fuck!");
      return true;
    }else{
      return false;
    }
  }

  const checkSearched = IsSearched();
  console.log(checkSearched);

  return (
    <>
    {!isReply?
    <>
     {(checkSearched===true)?
      <Link
      className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
      href={{
        pathname: `/tweet/${id}`,
        query: {
          username,
          handle,
        },
      }}
    >
      {/* <p>pissoff</p> */}
      <div className="flex gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAvatar(authorName)}
          alt="avatar"
          className="h-12 w-12 rounded-full"
        />
        <article className="flex grow flex-col">
          <p className="font-bold">
            {authorName}
            <span className="ml-2 font-normal text-gray-400">
              @{authorHandle}
            </span>
            <time className="ml-2 font-normal text-gray-400">
              <TimeText date={createdAt} format="h:mm A · D MMM YYYY" />
            </time>
          </p>
          {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
          <div className="flex justify-between">
            <article className="mt-2 whitespace-pre-wrap">{content}</article>
            {(liked===true)?
            <div className="flex justify-between">
              
              <p className="mt-2 whitespace-pre-wrap">{likes}人參加   </p>
              <BadgeCheck size={30} />
            </div>
            :
            <article className="mt-2 whitespace-pre-wrap">{likes??0}人參加          </article>
            }
          </div>
          <article className="mt-2 whitespace-pre-wrap">start time:{start}</article>
          <article className="mt-2 whitespace-pre-wrap">end time:{end}</article>
          <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
            {/* <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <MessageCircle size={20} className="-scale-x-100" />
            </button>
            <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <Repeat2 size={22} />
            </button>
            <LikeButton
              initialLikes={likes}
              initialLiked={liked===true}
              tweetId={id}
              handle={handle}
            />
            <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <Share size={18} />
            </button> */}
          </div> 
        </article>
      </div>
    </Link>:
    <>
      {/* <p>science bitch!</p> */}
    </>
     }
    </>

    :
    <div
    className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
  >
    <div className="flex gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getAvatar(authorName)}
        alt="avatar"
        className="h-12 w-12 rounded-full"
      />
      <article className="flex grow flex-col">
        <p className="font-bold">
          {authorName}
          <span className="ml-2 font-normal text-gray-400">
            @{authorHandle}
          </span>
          <time className="ml-2 font-normal text-gray-400">
            <TimeText date={createdAt} format="h:mm A · D MMM YYYY" />
          </time>
        </p>
        {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
        <div className="flex justify-between">
          <article className="mt-2 whitespace-pre-wrap">{content}</article>
          {/* {(liked===true)?
          <div className="flex justify-between">
            
            <p className="mt-2 whitespace-pre-wrap">{likes}人參加   </p>
            <BadgeCheck size={30} />
          </div>
          :
          <article className="mt-2 whitespace-pre-wrap">{likes??0}人參加          </article>
          } */}
        </div>

        <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
          {/* <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
            <MessageCircle size={20} className="-scale-x-100" />
          </button>
          <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
            <Repeat2 size={22} />
          </button>
          <LikeButton
            initialLikes={likes}
            initialLiked={liked===true}
            tweetId={id}
            handle={handle}
          />
          <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
            <Share size={18} />
          </button> */}
        </div> 
      </article>
    </div>
  </div> 
  }

      <Separator />
    </>
  );
}

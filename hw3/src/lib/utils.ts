import { faker } from "@faker-js/faker";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// this utility function is used to merge tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generate a random avatar for a user
export function getAvatar(username?: string | null) {
  faker.seed(username ? getSeed(username) : 42069);
  return faker.internet.avatar();
}

// convert username to a number for consistent seeding
function getSeed(username: string) {
  const code = new TextEncoder().encode(username);
  return Array.from(code).reduce(
    (acc, curr, i) => (acc + curr * i) % 1_000_000,
    0,
  );
}

export function validateHandle(handle?: string | null) {
  if (!handle) return false;
  return /^[a-z0-9\\._-]{1,25}$/.test(handle);
}

export function validateUsername(username?: string | null) {
  if (!username) return false;
  if (username === "") return false;
  return /^[a-zA-Z0-9 ]{1,50}$/.test(username);
}


function isValidDate(dateString:string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function validateDate(start?: string | null, end?: string|null){
  if (!start || !end) return false;
  if (!isValidDate(start.substring(0,10)) || !isValidDate(end.substring(0,10))){
    return false;
  }else{
    const startdate = new Date(start.substring(0,10));
    const enddate = new Date(end.substring(0,10));
    const between = enddate.getTime() - startdate.getTime();
    console.log(between);
    if (between > 604800000){
      return false;
    }
    if (startdate === enddate){
      const starttime1:number = +start.substring(12,13);
      const starttime2:number = +start.substring(13,14);
      const endtime1:number = +end.substring(12,13);
      const endtime2:number = +end.substring(13,14);
      const starttime:number = starttime1*10+starttime2;
      const endtime:number = endtime1*10+endtime2;
      console.log(starttime)
      if (endtime < starttime){
        return false;
      }
    }
    return true;
  }
}




export function validateEditing(editing?: string | null){
  if (!editing) return false;
  if (editing === "true"){
    return true;
  }else{
    return false;
  }
}

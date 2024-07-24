import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(size: string, decimals = 2): string {
  const bytes = parseInt(size);
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getFileExtension(url: string): string | null {
  // Create a URL object
  const urlObject = new URL(url);

  // Extract the pathname from the URL
  const pathname = urlObject.pathname;

  // Find the last occurrence of a dot in the pathname and get the extension
  const extensionMatch = pathname.match(/\.([a-zA-Z0-9]+)$/);

  // Return the extension if found, otherwise null
  return extensionMatch ? extensionMatch[1] : null;
}

export const downloadContent = async (content: {
  url: string;
  name: string;
}) => {
  const imageSrc = await fetch(content.url);
  const imageBlob = await imageSrc.blob();
  const imageURL = URL.createObjectURL(imageBlob);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = content.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function shortenFileName(name: string, maxLength: number = 20): string {
  if (name.length <= maxLength) {
    return name;
  }

  // Truncate the name and add an ellipsis
  return name.slice(0, maxLength - 3) + "...";
}

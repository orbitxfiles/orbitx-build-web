"use client";

import { useState } from "react";
import Image from "next/image";
import { memberInitials, type TeamMember } from "@/lib/team-data";

export function TeamAvatar({
  member,
  size = "lg",
}: {
  member: TeamMember;
  size?: "md" | "lg" | "xl";
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const dims =
    size === "xl"
      ? { box: "h-32 w-32 text-2xl", img: 128 }
      : size === "lg"
        ? { box: "h-24 w-24 text-xl", img: 96 }
        : { box: "h-16 w-16 text-sm", img: 64 };

  const imagePath = `/images/team/${member.slug}.jpg`;
  const showPhoto = !imgFailed;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-[0_4px_20px_rgba(10,52,80,0.12)] ${dims.box} flex items-center justify-center font-semibold text-white`}
      style={{
        background: `linear-gradient(145deg, ${member.accent} 0%, #0a3450 100%)`,
      }}
    >
      {showPhoto ? (
        <Image
          src={imagePath}
          alt={member.name}
          width={dims.img}
          height={dims.img}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : null}
      {!showPhoto ? (
        <span className="relative select-none" aria-hidden>
          {memberInitials(member.name)}
        </span>
      ) : null}
    </div>
  );
}

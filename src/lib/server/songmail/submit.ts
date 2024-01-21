"use server";

import { prisma } from "@/app/layout";
import { Song } from "@prisma/client";

const submitSongmail = async (
  selectedItem: Song | null,
  previousState: any,
  formData: FormData
) => {
  // console.log(selectedItem, Array.from(formData.entries()));
  const from = formData.get("from");
  const subject = formData.get("subject");
  const body = formData.get("body");

  if (!selectedItem) {
    return null;
  }

  const existingSong = await prisma.song.findUnique({
    where: {
      last_fm_url: selectedItem.last_fm_url,
    },
  });

  if (!existingSong) {
    await prisma.song.create({
      data: {
        ...selectedItem,
      },
    });
  }

  const response = await prisma.message.create({
    data: {
      from: from as string,
      subject: subject as string,
      body: body as string,
      ...selectedItem,
      time_created: new Date(),
    },
  });

  return "Successfully updated";
};

export { submitSongmail };

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export default function UI() {
  const { toast } = useToast();

  return (
    <div>
      <h1 className="text-5xl font-medium">welcome the component library</h1>
      <h2 className="text-5xl text-muted-foreground">built from shadcn/ui</h2>
      <h3 className="text-4xl font-medium">built in canada</h3>
      <p className="xl">
        all custom animations through{" "}
        <a href="https://www.framer.com/motion/" className="underline">
          framer-motion
        </a>
      </p>
      <div className="flex gap-x-4">
        <Button variant={"outline"}>i am secondary</Button>
        <Button variant={"outline-green"}>green</Button>
        <Button variant={"outline-purple"}>purple</Button>
        <Button variant={"ghost"}>ghost button</Button>
      </div>
      <div className="flex gap-x-4">
        <Button
          variant={"outline-green"}
          onClick={() => {
            toast({
              title: "Scheduled: Catch up ",
              description: "Friday, February 10, 2023 at 5:57 PM",
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
            });
          }}
        >
          Toast Me!
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <Button variant="outline-purple">Edit Profile</Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

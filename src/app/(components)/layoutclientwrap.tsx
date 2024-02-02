"use client";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  NO_GROUP,
  KBarResults,
} from "kbar";
import React from "react";
import { RenderResults } from "./kbarResults";

const LayoutClientWrap = ({ children }: any) => {
  const actions = [
    {
      id: "blog",
      name: "Blog",
      shortcut: ["b"],
      keywords: "writing words",
      perform: () => (window.location.pathname = "blog"),
    },
    {
      id: "contact",
      name: "Contact",
      shortcut: ["c"],
      keywords: "email",
      perform: () => (window.location.pathname = "contact"),
    },
  ];
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator>
            <div className="p-4 bg-accent-lighter  rounded-xl flex flex-col gap-y-4">
              <KBarSearch className="p-4 w-[50vw] max-w-[600px] rounded-xl border" />
              <div className="flex flex-col">
                <RenderResults></RenderResults>
              </div>
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export default LayoutClientWrap;

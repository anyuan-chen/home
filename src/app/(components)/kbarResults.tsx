import {
  // ...
  KBarResults,
  useMatches,
  NO_GROUP,
} from "kbar";

export function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? "#E9E8E3" : "transparent",
              // filter: active
              //   ? "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))"
              //   : "none",
            }}
            className="p-4 rounded-xl"
          >
            {item.name}
          </div>
        )
      }
    />
  );
}

let mode: "text" | "inline" | "block" = "text";
let backtickBuffer = "";
let currentNode: HTMLElement;

export function parseAndAppend(
  chunk: string,
  container: HTMLElement
) {
  for (let i = 0; i < chunk.length; i++) {
    const ch = chunk[i];

    if (ch === "`") {
      backtickBuffer += "`";
      continue;
    }

    // Handle buffered backticks
    if (backtickBuffer.length > 0) {
      if (backtickBuffer.length === 3) {
        if (mode === "block") {
          mode = "text";
          currentNode = container;
        } else {
          mode = "block";
          const pre = document.createElement("pre");
          pre.style.background = "#eee";
          pre.style.padding = "6px";
          container.appendChild(pre);
          currentNode = pre;
        }
      } else if (backtickBuffer.length === 1) {
        if (mode === "inline") {
          mode = "text";
          currentNode = container;
        } else {
          mode = "inline";
          const span = document.createElement("span");
          span.style.background = "#ddd";
          span.style.fontFamily = "monospace";
          container.appendChild(span);
          currentNode = span;
        }
      } else {
        container.append(backtickBuffer);
      }
      backtickBuffer = "";
    }

    if (!currentNode) currentNode = container;
    currentNode.append(ch);
  }
}

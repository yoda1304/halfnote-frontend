// The runtime globals @halfnote/data may use. Present in browsers, Node 18+, and React Native.
// This replaces the "dom" lib on purpose: window, document, and localStorage stay undeclared,
// so using them here fails the typecheck. Apps compile this source with their own libs.
declare class Blob {
  readonly size: number;
  readonly type: string;
}

declare class FormData {
  append(name: string, value: string | Blob): void;
}

interface RequestInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string | FormData;
}

interface Response {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  text(): Promise<string>;
}

declare function fetch(url: string, init?: RequestInit): Promise<Response>;
declare function setTimeout(callback: () => void, ms?: number): number;
declare function clearTimeout(id: number | undefined): void;

interface ImportMetaEnv {
  readonly PUBLIC_TG_GATEWAY?: string;
  readonly PUBLIC_TG_APP_SECRET?: string;
}

interface Window {
  ym?: (id: number, action: string, target: string) => void;
}

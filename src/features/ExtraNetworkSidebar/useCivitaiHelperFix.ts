import { consola } from 'consola';
import { useEffect, useRef, useState } from 'react';

import civitaiHelperFix from '@/scripts/civitaiHelperFix';

/*
  Legacy WebUI had one refresh button per tab (#txt2img_extra_refresh). Forge Neo
  namespaces it per extra-network page (#txt2img_lora_extra_refresh, ...), so
  there can now be several. Match both shapes and handle each one found.
*/
const findRefreshButtons = (type: 'txt' | 'img') =>
  [
    ...document.querySelectorAll(
      `#${type}2img_extra_refresh, #${type}2img_extra_tabs [id$='_extra_refresh']`,
    ),
  ] as HTMLElement[];

const replaceCivitaiHelper = (type: 'txt' | 'img') => {
  for (const button of findRefreshButtons(type)) {
    button.click();

    const civitaiButton = button.nextSibling as HTMLButtonElement | null;
    if (civitaiButton) {
      civitaiButton.onclick = civitaiHelperFix;
    }
  }
};

interface CivitaiHelperFixOptions {
  debug?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  timeout?: number;
}
export const useCivitaiHelperFix = ({
  onStart,
  onSuccess,
  debug,
  timeout = 500,
}: CivitaiHelperFixOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const isInject = useRef(false);
  useEffect(() => {
    if (isInject.current) return;
    onStart?.();
    const canInject =
      !!document.querySelector('#tab_civitai_helper') && findRefreshButtons('txt').length > 0;

    let timoutFn: any;

    if (canInject) {
      // The work happens inside the timeout, so the try/catch has to live there
      // too — wrapping setTimeout itself only guards registering the callback.
      timoutFn = setTimeout(() => {
        try {
          replaceCivitaiHelper('txt');
          replaceCivitaiHelper('img');
          civitaiHelperFix();
        } catch (error: any) {
          setIsLoading(false);
          if (debug) consola.error(`🤯 ${debug}`, error);
        }
      }, timeout);
    }

    onSuccess?.();
    isInject.current = true;

    setIsLoading(false);
    if (debug) consola.success(`🤯 ${debug}`);

    return () => {
      if (timoutFn) clearTimeout(timoutFn);
    };
  }, []);

  return {
    isLoading,
  };
};

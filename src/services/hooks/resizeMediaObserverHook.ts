import { useCallback, useEffect } from "react";
import { LivoAppContainer } from "../../App";
import CallbackEventListener from "../../core/callbackEventListener";

const ResizeMediaCallback = "ResizeMediaCallback";

let lastInlineSizeSmall = false;
let observerInitialized = false;
const callbackEventListener = new CallbackEventListener();

const initResizeObserver = () => {
  if (!observerInitialized) {
    const element = document.getElementsByClassName(LivoAppContainer)[0];
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentBoxSize[0]) {
        const height = entries[0].contentBoxSize[0].blockSize;
        const width = entries[0].contentBoxSize[0].inlineSize;
        if (width < 500 && height < 300 && !lastInlineSizeSmall) {
          callbackEventListener.call(ResizeMediaCallback, width);
          lastInlineSizeSmall = true;
        } else if (width > 500 && height < 300 && lastInlineSizeSmall) {
          callbackEventListener.call(ResizeMediaCallback, width);
          lastInlineSizeSmall = false;
        }
      }
    });
    resizeObserver.observe(element);
  }
  observerInitialized = true;
};

export const useOnResizeMediaCallback = (setSmallScreen) => {
  return useCallback(
    (inlineWidth: number) => {
      if (inlineWidth < 500) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    },
    [setSmallScreen]
  );
};

export const useResizeMediaObserver = (callback: Function) => {
  useEffect(() => {
    initResizeObserver();
    callbackEventListener.on(ResizeMediaCallback, callback);
  }, []);
};

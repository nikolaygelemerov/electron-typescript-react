export class GlobalModel {
  static clearRAFInterval = (rafIdInfo: { id: number | null }) => {
    rafIdInfo?.id && cancelAnimationFrame(rafIdInfo.id);
  };

  static setRAFInterval = (callback: () => void, interval: number) => {
    if (!callback || !interval) {
      return;
    }

    const rafIdInfo: { id: number | null } = {
      id: null
    };

    let startTime = performance.now();

    const wait = (timestamp: number) => {
      const elapsedTime = timestamp - startTime;

      if (elapsedTime >= interval) {
        callback();
        startTime = timestamp;
      }

      GlobalModel.clearRAFInterval(rafIdInfo);
      rafIdInfo.id = requestAnimationFrame(wait);
    };

    rafIdInfo.id = requestAnimationFrame(wait);

    return rafIdInfo;
  };

  static idGenerator = () => '_' + Math.random().toString(36).substr(2, 9);
}

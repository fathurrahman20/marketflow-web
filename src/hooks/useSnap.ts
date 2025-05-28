import { useState, useEffect } from "react";

const useSnap = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [snap, setSnap] = useState<any>(null);

  useEffect(() => {
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_ID;
    const script = document.createElement("script");
    script.src = `${import.meta.env.VITE_MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setSnap((window as any).snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const snapEmbed = (snap_token: string) => {
    if (snap) {
      snap.pay(snap_token);
      // , {
      // embedId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // onSuccess: function (result: any) {
      //   console.log("success", result);
      //   action.onSuccess(result);
      // },
      // // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // onPending: function (result: any) {
      //   console.log("pending", result);
      //   action.onPending(result);
      // },
      // onClose: function () {
      //   action.onClose();
      // },
      // });
    }
  };

  return { snapEmbed };
};

export default useSnap;

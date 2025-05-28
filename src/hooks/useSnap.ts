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

  // const snapEmbed = (snap_token: any, embedId: any, action: any) => {
  //   if (snap) {
  //     snap.embed(snap_token, {
  //       embedId,
  //       onSuccess: function (result: unknown) {
  //         console.log("success", result);
  //         action.onSuccess(result);
  //       },
  //       onPending: function (result: unknown) {
  //         console.log("pending", result);
  //         action.onPending(result);
  //       },
  //       onClose: function () {
  //         action.onClose();
  //       },
  //     });
  //   }
  // };
  const snapEmbed = (snap_token: string) => {
    if (snap) {
      snap.pay(snap_token, {
        onSuccess: function (result: unknown) {
          console.log("success");
          console.log(result);
        },
        onPending: function (result: unknown) {
          console.log("pending");
          console.log(result);
        },
        onError: function (result: unknown) {
          console.log("error");
          console.log(result);
        },
        onClose: function () {
          console.log(
            "customer closed the popup without finishing the payment"
          );
        },
      });
      // , {
      // embedId,
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

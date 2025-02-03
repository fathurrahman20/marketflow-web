import { useEffect } from "react";

const useTitlePage = (title: string | undefined) => {
  useEffect(() => {
    document.title = `MarketFlow | ${title}`;
  }, [title]);
};

export default useTitlePage;

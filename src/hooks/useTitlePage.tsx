import { useEffect } from "react";

const useTitlePage = (title: string) => {
  useEffect(() => {
    document.title = `MarketFlow | ${title}`;
  }, [title]);
};

export default useTitlePage;

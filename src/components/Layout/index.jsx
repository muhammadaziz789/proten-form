import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { websiteActions } from "store/website/websiteSlice";
import useTranslation from "next-translate/useTranslation";

export default function Layout({ children }) {
  const router = useRouter();
  const { lang } = useTranslation("common");
  const dispatch = useDispatch();
  const noHeaderPages = useSelector(
    (state) => state.websiteRoutes.noHeaderPages
  );
  const noFooterPages = useSelector(
    (state) => state.websiteRoutes.noFooterPages
  );
  const skeleton = useSelector((state) => state.website.skeleton);
  const skeletonTime = useSelector((state) => state.website.skeletonTime);

  useEffect(() => {
    setTimeout(() => {
      dispatch(websiteActions.setSkeletonActive(false));
    }, skeletonTime);
  }, [dispatch, skeletonTime]);

  useEffect(() => {
    if (lang) dispatch(websiteActions.setWebsiteLang(lang));
  }, [lang, dispatch]);

  return (
    <>
      {/* {!noHeaderPages?.includes(router.pathname) ? <Header /> : ""} */}
      {children}
      {/* {!noFooterPages.includes(router.pathname) ? <Footer /> : ""} */}
    </>
  );
}

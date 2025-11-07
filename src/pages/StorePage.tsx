import { lazy, Suspense, useContext } from "react";
//import Store from '../components/Store/Store'
import { ELanguages } from "../types";
import Hero from "../components/Hero/Hero";
import { ICartItem } from "../types/store";
import styles from "../components/Store/store.module.css";
import { LanguageContext } from "../contexts/LanguageContext";
import * as HelmetAsync from "react-helmet-async";
const { Helmet } = HelmetAsync;

interface StoreProps {
  language: ELanguages;
  heading: string;
  text: string;
  type: string;
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (itemId: string) => void;
}

const Store = lazy(() => import("../components/Store/Store"));

const StorePage: React.FC<StoreProps> = ({
  language,
  heading,
  text,
  type,
  cart,
  addToCart,
  removeFromCart,
}) => {
  const { t } = useContext(LanguageContext)!;

  return (
    <>
      <Helmet prioritizeSeoTags={true}>
        <title>{t("Store")} | react.jenniina.fi</title>
        <meta
          name="description"
          content={`${t("Store")} | ${t("WebpagesAndGraphicDesign")}`}
        />
        <link rel="canonical" href={`https://react.jenniina.fi/store`} />
        <meta
          property="og:title"
          content={`${t("Store")} | react.jenniina.fi`}
        />
        <meta
          property="og:description"
          content={`${t("Store")} | ${t("WebpagesAndGraphicDesign")}`}
        />
        <meta property="og:url" content={`https://react.jenniina.fi/store`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className={`store ${type} ${styles.store}`}>
        <div className={`inner-wrap ${styles["inner-wrap"]}`}>
          <Suspense
            fallback={
              <div className="flex center margin0auto textcenter">
                {t("Loading")}...
              </div>
            }
          >
            <Store
              language={language}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default StorePage;

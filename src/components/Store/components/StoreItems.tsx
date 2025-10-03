import { FC, ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../store.module.css";
import { FaWordpress, FaReact, FaNodeJs } from "react-icons/fa";
import { ImImages } from "react-icons/im";
import { BsCart2 } from "react-icons/bs";
import { ELanguages } from "../../../types";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { ICartItem } from "../../../types/store";
import { notify } from "../../../reducers/notificationReducer";
import { useTheme } from "../../../hooks/useTheme";
import AdditionalInfo from "./AdditionalInfo";
import { splitToLines } from "../../../utils";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { useConfirm } from "../../../contexts/ConfirmContext";

interface Props {
  language: ELanguages;
  items: ICartItem[];
  name: string;
  id: string;
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (itemId: string) => void;
  intro: string;
  link: ReactNode | null;
}

const StoreItems: FC<Props> = ({
  language,
  items,
  name,
  id,
  cart,
  addToCart,
  removeFromCart,
  intro,
  link,
}) => {
  const { t } = useContext(LanguageContext)!;
  const confirm = useConfirm();

  const dispatch = useAppDispatch();
  const lightTheme = useTheme();

  return (
    <>
      <section
        className={`card ${styles.card} ${styles["store-items"]} ${
          lightTheme ? styles.light : ""
        }`}
        style={{ width: "100%", position: "relative", zIndex: 2 }}
      >
        <div>
          <div className={`${styles["store-wrap"]} ${styles[id]}`}>
            {id !== "misc" && (
              <h2 id={id}>
                {id === "wordpress" ? (
                  <>
                    <FaWordpress />
                  </>
                ) : id === "react" ? (
                  <>
                    <FaReact />
                  </>
                ) : id === "graphic" ? (
                  <>
                    <ImImages />
                  </>
                ) : (
                  ""
                )}
                <span>{name}</span>
                {id === "react" ? (
                  <>
                    <FaNodeJs />
                  </>
                ) : (
                  ""
                )}
              </h2>
            )}
            {intro && intro.trim() !== "" && (
              <p style={{ margin: 0, minWidth: "100%" }}>{intro}</p>
            )}
            {link && (
              <div
                className={styles["links"]}
                style={{ marginTop: 0, minWidth: "100%" }}
              >
                {link}
              </div>
            )}

            <AdditionalInfo
              type={id}
              language={language}
              styles={styles}
              classNameWrap={styles["additional-information"]}
              isOpen={true}
              setIsFormOpen={() => {}}
            />

            {items.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className={`${styles["store-item"]} ${
                  language !== ELanguages.en && language !== ELanguages.fi
                    ? styles.foreign
                    : ""
                }`}
              >
                <h3>{item.name}</h3>
                <p className={styles.grow}>{splitToLines(item.description)}</p>

                <p>
                  {t("Price")}: {item.price} €{" "}
                  {item.id === "misc-quote" ? null : (
                    <small>({t("ContainsVAT")})</small>
                  )}
                </p>

                {(() => {
                  const cartItem = cart.find(
                    (cartItem) => cartItem.id === item.id
                  );
                  return cartItem && cartItem.quantity > 0 ? (
                    <>
                      <p className={styles.added}>
                        <span>{t("AddedToCart")}</span>{" "}
                        <button
                          className={`${styles["remove-from-cart"]} danger delete`}
                          onClick={async () => {
                            if (
                              await confirm({
                                message: `${t("Remove")} ${item.name} ${t(
                                  "Cart"
                                )}?`,
                              })
                            )
                              removeFromCart(item.id);
                          }}
                        >
                          {t("Remove")}
                        </button>
                      </p>
                    </>
                  ) : (
                    <button
                      id="add-to-cart"
                      className={styles["add-to-cart"]}
                      onClick={() => {
                        const existingItemInCart = cart.find(
                          (cartItem) => cartItem.id === item.id
                        );
                        if (existingItemInCart) {
                          addToCart({
                            ...item,
                            quantity: existingItemInCart.quantity + 1,
                          });
                          dispatch(
                            notify(`${t("SavingSuccessful")}`, false, 3)
                          );
                        } else {
                          addToCart({ ...item, quantity: 1 });
                          dispatch(
                            notify(`${t("SavingSuccessful")}`, false, 3)
                          );
                        }
                      }}
                    >
                      <BsCart2 style={{ fontSize: "1.3em" }} />{" "}
                      <span>{t("AddToCart")}</span>
                    </button>
                  );
                })()}

                {cart.map(
                  (cartItem) =>
                    cartItem.id === item.id &&
                    cartItem.quantity > 0 && (
                      <Link
                        key={cartItem.id}
                        to="/cart"
                        className={styles["cart-link"]}
                      >
                        <BsCart2 style={{ fontSize: "1.3em" }} />{" "}
                        <big>{t("GoToCart")} &raquo;</big>
                      </Link>
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default StoreItems;
